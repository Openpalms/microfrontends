import React, { ReactElement, useEffect } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../routing/routes';
import { navigationEvents } from 'shared/constants';

interface NavigationManagerProps {
  children: ReactElement;
}

export function NavigationManager({ children }: NavigationManagerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function shellNavigationHandler(event: Event) {
      const pathname = (event as CustomEvent<string>).detail;
      if (location.pathname === pathname || !matchRoutes(routes, { pathname })) {
        return;
      }
      navigate(pathname);
    }

    window.addEventListener(navigationEvents.root, shellNavigationHandler);

    return () => {
      window.removeEventListener(navigationEvents.root, shellNavigationHandler);
    };
  }, [location]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(navigationEvents.company, { detail: location.pathname })
    );
  }, [location]);

  return children;
}
