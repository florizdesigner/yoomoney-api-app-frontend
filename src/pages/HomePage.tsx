import React, {FC, useContext} from 'react';
import {Context} from '../index';

const HomePage: FC = () => {
    const {store} = useContext(Context)

    const scope = ["account-info", "operation-history", "operation-details"]

    const onClickBinding = async (scope: Array<string>) => {
        const resp = await store.getBindingLink(scope) // массив
        console.log(resp)
        // const id = store.user.id

        // на входе нужно забрать user_id из localstorage
        //
    }

    return (
        <div>
            <h1>HomePage</h1>
            <button onClick={() => onClickBinding(scope)}></button>
        </div>
    );
};

export default HomePage;