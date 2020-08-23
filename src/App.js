import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './default.scss';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import MainLayout from './layout/MainLayout';
import HomeLayout from './layout/HomeLayout';
import Login from './pages/Login';
import {auth, handleUserProfile} from './firebase/utils'

const initialState = {
  currentUser: null
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  // creo un evento
  authListener = null;

  // me suscribo
  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {

      // si existe el usuario
      if(userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          // updateo el local state
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      // si no existe
      this.setState({
        ...initialState
      })


    });
  }

  // me desuscribo
  componentWillUnmount() {
    this.authListener();
  }


  render() {

    const {currentUser} = this.state;

    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" render={()=>(
            // En el render puedo returnear directo o si seteo el arrow function
            // de la siguiente manera tengo que hacer un return () => {return (<MainLayout> ... </MainLayout>)}
            <HomeLayout currentUser={currentUser}>
              <Homepage />
            </HomeLayout>
          )} />
  
          <Route 
            path="/registration" 
            render={()=> currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )} 
          />
  
          <Route 
            path="/login" 
            render={()=> currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} 
          />
        </Switch>
      </div>
    )
  }
}

export default App
