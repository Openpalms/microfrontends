import React, { PropsWithChildren } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { redirect } from "react-router-dom";

import { useAuthentificationData } from '../../apollo/hooks';

type Permission = 'private' | 'public';

type Props = {
    // @todo: Здесь добавлять пермишены
    permissions: Permission[]
}

export const PermittedRoute = ({ permissions, children }: PropsWithChildren<Props>) => {
    const { isAuthorized, isLoading } = useAuthentificationData();

    const isLoadingPermission = isLoading;

    if (isLoadingPermission) {
        return null
    }

    if (permissions.includes('private') && !isAuthorized) {
        return <Navigate to="/login"  />;
    }

    if (permissions.includes('public') && isAuthorized) {
        return <Navigate to="/"  />;
    }

    return children;
}
