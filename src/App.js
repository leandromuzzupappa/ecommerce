import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

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

const App = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, []);

    return (
        <div className="App">
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        // En el render puedo returnear directo o si seteo el arrow function
                        // de la siguiente manera tengo que hacer un return () => {return (<MainLayout> ... </MainLayout>)}
                        <HomeLayout>
                            <Homepage />
                        </HomeLayout>
                    )}
                />

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
                    path="/recovery"
                    render={() => (
                        <MainLayout>
                            <Recovery />
                        </MainLayout>
                    )}
                />

                <Route
                    path="/dashboard"
                    render={() => (
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
};

export default App;
