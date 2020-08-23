import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

import './default.scss';

// hoc
import WithAuth from './hoc/withAuth';

// Layouts
import MainLayout from './layout/MainLayout';
import HomeLayout from './layout/HomeLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';


const App = props => {

  const { setCurrentUser, currentUser } = props;

  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async userAuth => {

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

    return () => {
      authListener(); // Me desuscribo
    }
  }, [])

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
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} 
        />

        <Route 
          path="/login" 
          render={() => (
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

        <Route 
          path="/dashboard" render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )} 
        />


      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
