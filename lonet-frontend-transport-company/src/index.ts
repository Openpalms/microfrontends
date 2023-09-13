import('./bootstrap').then(
  ({ mount }) => {
    const localRoot = document.getElementById('transport-company-local');

    mount({
      mountPoint: localRoot!,
      routingStrategy: 'browser',
    });
  }
);

export {};
