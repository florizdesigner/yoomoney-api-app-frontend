import { observer } from 'mobx-react-lite';
import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
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
    if(!store.isAuth) return <LoginForm/>

        return (
            <div>
                <h1>{store.isAuth ? `User is authorized ${store.user.email}` : "Авторизуйтесь!"}</h1>
            <h1>{store.user.isActivated ? "Account is activated" : "Warning! Account isn't activated"}</h1>
                <button onClick={() => store.logout()}>Logout</button>
                <div>
                    <button onClick={getUsers}>Get clients</button>
                </div>
                {users.map(user => <div key={user.email}>{user.email}</div>)}
            </div>
        );
};

export default observer(App)