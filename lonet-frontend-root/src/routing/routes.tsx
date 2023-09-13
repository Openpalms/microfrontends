import React, { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import { prefixes } from 'shared/constants';
import { PermittedRoute } from 'shared/navigation';

const ClientAPP = lazy(() => import("../apps/Client"));
const TransportCompanyAPP = lazy(() => import("../apps/TransportCompany"));

const Login = lazy(() => import("../components/pages/Login"));

import { App } from "../components/App";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${prefixes.client}`} />,
      },
      {
        path: `/${prefixes.client}/*`,
        element: <Suspense fallback={null}><ClientAPP /></Suspense>,
      },
      {
        path: `/${prefixes.company}/*`,
        element: <Suspense fallback={null}><TransportCompanyAPP /></Suspense>,
      },
      {
        path: '/login',
        element: <Suspense fallback={null}><PermittedRoute permissions={["public"]}><Login /></PermittedRoute></Suspense>
      },
      {
        path: '/protected',
        element: <Suspense fallback={null}><PermittedRoute permissions={["private"]}><div>Только для авторизованного</div></PermittedRoute></Suspense>
      }
    ],
  }
];
