import React from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import styles from './component_styles.module.scss'

const Header: React.FC = () => {
    return (
        <div>
            <ul className={styles.menu}>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/settings'>Settings</NavLink></li>
            </ul>
        </div>
    );
};

export default Header;