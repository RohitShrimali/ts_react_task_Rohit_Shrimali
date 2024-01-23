import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import Table from './Table';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import users from './Table2';
// import Table2 from './Table2';
// import Table1 from './Table1';
// import Table2 from './Table2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  {/* <App/> */}
  <Table/>
  {/* <Table1/> */}
  {/* <Table2/> */}
{/* <SignIn/> */}
{/* <Table2/> */}
</Provider>
);

