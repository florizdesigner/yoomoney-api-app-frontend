import React, {useContext} from 'react';
import Header from '../components/Header';
import {Context} from '../index';
import styles from './pages_styles.module.scss'
import '../styles/elements.scss'

const SettingsPage: React.FC = () => {
    const [passwordToggle, setPasswordToggle] = React.useState(false)

    const changePassword = () => {
        // вешать экшн о смене пароля (проверять верность текущего + новые)
    }

    const {store} = useContext(Context)
    console.log(store.user)
    return (
        <div>
            <Header/>
            <div className={styles.block_wrapper}>
            <div className={styles.block}>
                <span>E-mail:</span>
                <span>{store.user.email}</span>
            </div>
            <div className={styles.block}>
                <span>Your password:</span>
                <span>************</span>
            </div>
            <div className={styles.block}>
                <button onClick={() => setPasswordToggle(bool => !bool)}>{passwordToggle ? 'Close form' : "Change password"}</button>
            </div>
                {passwordToggle && (
                    <div className={styles.block_password}>
                        <input placeholder='Enter current password'/>
                        <input placeholder='Enter new password'/>
                        <input placeholder='Repeat new password'/>
                        <button>Confirm password</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;