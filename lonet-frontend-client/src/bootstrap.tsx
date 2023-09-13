import React, {useEffect} from "react";
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { createRouter } from "./routing/router-factory";
import { RoutingStrategy } from "./routing/types";

import { store } from './redux';
import { reducer } from './redux/reducer';
import { ApolloProvider } from "@apollo/client";

/** @todo: Подумать, как вынести в общие типы */
type Store = any;

type Props = {
  router: ReturnType<typeof createBrowserRouter>;
  store: Store;
  apolloClient: any;
}

const App = ({ router, store: parentAppStore, apolloClient: parentApolloClient }: Props) => {
  useEffect(() => {
    if (parentAppStore) {
      parentAppStore.injectReducer('client', reducer);
    }
  }, [parentAppStore]);

  return (
    <Provider store={parentAppStore || store}>
      <ApolloProvider client={parentApolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  )
}

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
  store,
  apolloClient
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
  store?: Store;
  apolloClient?: any
}) => {
  const router = createRouter({ strategy: routingStrategy, initialPathname });
  const root = createRoot(mountPoint);
  root.render(<App router={router} store={store} apolloClient={apolloClient} />);

  return () => queueMicrotask(() => root.unmount());
};

export { mount };
