import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './services/store';
import './index.css';
import App from './pages/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateCompany from './pages/CreateCompany';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: 'editCompany/:id',
    element: <CreateCompany />
  }
])
const queryClient = new QueryClient()
ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);