import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router/AppRouter';
import 'antd/dist/antd.css';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppRouter />
);
