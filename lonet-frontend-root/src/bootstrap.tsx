import React from 'react';
import { createRoot } from "react-dom/client";
import { Router } from './routing/Router';

const root = createRoot(document.getElementById('shell-root')!);
root.render(<Router />);

export {};
