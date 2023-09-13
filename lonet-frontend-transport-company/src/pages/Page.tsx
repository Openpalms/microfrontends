import React from 'react';
import { useSelector } from 'react-redux';

export function Page() {
  const state = useSelector(state => state)
  return (
      <div>
        {JSON.stringify(state)}
      </div>
  )
}
