import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

import './default.scss';

// Layouts
import MainLayout from './layout/MainLayout';
import HomeLayout from './layout/HomeLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';


class App extends Component {

  // creo un evento
  authListener = null;

  // me suscribo
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.authListener = auth.onAuthStateChanged(async userAuth => {

      // si existe el usuario
      if(userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          // updateo el local state
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      }

      // si no existe
      setCurrentUser(userAuth);
    });
  }

  // me desuscribo
  componentWillUnmount() {
    this.authListener();
  }


  render() {

    const { currentUser } = this.props;

    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" render={() => (
            // En el render puedo returnear directo o si seteo el arrow function
            // de la siguiente manera tengo que hacer un return () => {return (<MainLayout> ... </MainLayout>)}
            <HomeLayout>
              <Homepage />
            </HomeLayout>
          )} />
  
          <Route 
            path="/registration" 
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )} 
          />
  
          <Route 
            path="/login" 
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Login />
              </MainLayout>
            )} 
          />

          <Route 
            path="/recovery" render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )} 
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
