import('./bootstrap').then(
  ({ mount }) => {
    const localRoot = document.getElementById('client-local');

    mount({
      mountPoint: localRoot!,
      routingStrategy: 'browser',
    });
  }
);

export {};
