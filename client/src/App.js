import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import GeneralAlert from './components/Alert';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavBar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
        <GeneralAlert />
      </Provider>
    );
  }
}

export default App;
