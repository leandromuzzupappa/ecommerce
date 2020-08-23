import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './default.scss';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import MainLayout from './layout/MainLayout';
import HomeLayout from './layout/HomeLayout';

function App () {
  return (
    <div className='App'>
      <Switch>
        <Route exact path="/" render={()=>(
          // En el render puedo returnear directo o si seteo el arrow function
          // de la siguiente manera tengo que hacer un return () => {return (<MainLayout> ... </MainLayout>)}
          <HomeLayout>
            <Homepage />
          </HomeLayout>
        )} />

        <Route path="/registration" render={()=>(
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
      </Switch>
    </div>
  )
}

export default App
