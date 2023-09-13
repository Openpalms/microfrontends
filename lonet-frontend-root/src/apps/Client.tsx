import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { mount } from "client/ClientAPP";
import { prefixes, navigationEvents } from "shared/constants";
import { client } from "shared/apollo";

import { store } from '../redux';

const appName = `/${prefixes.client}`;

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to navigation events dispatched inside mfe.
  useEffect(() => {
    const appNavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `${appName}${pathname}`;
      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener(navigationEvents.client, appNavigationEventHandler);

    return () => {
      window.removeEventListener(
          navigationEvents.client,
          appNavigationEventHandler
      );
    };
  }, [location]);

  // Listen for root location changes and dispatch a notification.
  useEffect(
    () => {
      if (location.pathname.startsWith(appName)) {
        window.dispatchEvent(
          new CustomEvent(navigationEvents.root, {
            detail: location.pathname.replace(appName, ""),
          })
        );
      }
    },
    [location],
  );

  const isFirstRunRef = useRef(true);
  const unmountRef = useRef(() => {});
  // Mount MFE
  useEffect(
    () => {
      if (!isFirstRunRef.current) {
        return;
      }
      unmountRef.current = mount({
        mountPoint: wrapperRef.current!,
        initialPathname: location.pathname.replace(
          appName,
          ''
        ),
        store,
        apolloClient: client
      });
      isFirstRunRef.current = false;
    },
    [location],
  );

  useEffect(() => unmountRef.current, []);

  return <div ref={wrapperRef} id={prefixes.client} />;
};
