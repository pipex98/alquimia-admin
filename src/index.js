import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { DashboardAdmin } from './DashboardAdmin';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <DashboardAdmin />
    </StyledEngineProvider>
  </Provider>,
  document.getElementById('root')
);
