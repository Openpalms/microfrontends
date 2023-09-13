import React, {useEffect} from "react";
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { createRouter } from "./routing/router-factory";
import { RoutingStrategy } from "./routing/types";

import { store } from './redux';
import { reducer } from './redux/reducer';

/** @todo: Подумать, как вынести в общие типы */
type Store = any;

type Props = {
  router: ReturnType<typeof createBrowserRouter>;
  store: Store;
}

const App = ({ router, store: parentAppStore }: Props) => {
  useEffect(() => {
    if (parentAppStore) {
      parentAppStore.injectReducer('transport_company', reducer);
    }
  }, [parentAppStore]);

  return (
      <Provider store={parentAppStore || store}>
        <RouterProvider router={router} />
      </Provider>
  )
}

const mount = ({
 mountPoint,
 initialPathname,
 routingStrategy,
 store
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
  store?: Store;
}) => {
  const router = createRouter({ strategy: routingStrategy, initialPathname });
  const root = createRoot(mountPoint);
  root.render(<App router={router} store={store} />);

  return () => queueMicrotask(() => root.unmount());
};

export { mount };
