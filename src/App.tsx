import { observer } from 'mobx-react-lite';
import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from './components/LoginForm';
import {Context} from "./index";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import { Popup } from './elements/Popup'
import {Navigate, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

const App: FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect( () => {
        setUsers([])
        if(localStorage.getItem('token')) store.checkAuth()
    }, [])


    async function getUsers () {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    if(store.isLoading) return <div>Loading...</div>
    // console.log(!store.isAuth)

    // if(!store.isAuth) {
    //     return <Navigate to='/login' replace/>
    // }

    function onLogoutClick () {
        store.logout()
        setUsers([])
    }

        return (
            <div>
                <Routes>
                    <Route path='/login' element={<LoginForm />}/>
                    <Route path='/' element={<HomePage />}/>
                    <Route path='/settings' element={<SettingsPage />}/>
                </Routes>
                {/*{(!store.isAuth && !store.isLoading) && <Navigate to='/login' />}*/}
                {/*{(store.isAuth && !store.isLoading) && <Navigate to='/' replace={true}/>}*/}

                {/*<h1>{store.isAuth ?  <Navigate to='/' /> : <Navigate to='/login' />}</h1>*/}
                {/*{!store.user.isActivated && store.isAuth && <Popup title='The account has not been activated yet!'/>}*/}
                {/*{store.isAuth && <button onClick={onLogoutClick}>Logout</button>}*/}
                {/*{store.isAuth && <div>*/}
                {/*    <button onClick={getUsers}>Get clients</button>*/}
                {/*</div>*/}
                {/*}*/}
                {/*{users.map(user => <div key={user.email}>{user.email}</div>)}*/}

            </div>
        );
};

export default observer(App)