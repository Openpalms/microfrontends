import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { hooks as apolloHooks } from 'shared/apollo';


export function Page1() {
  const state = useSelector(state => state);
  const { me } = apolloHooks.useAuthentificationData()

  return (
      <div>
          {JSON.stringify(state)}
          {JSON.stringify(me)}
      </div>
  );
}
