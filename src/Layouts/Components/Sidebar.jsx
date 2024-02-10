
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../Components/Button';

import { AuthContext } from "../../Context/AuthContext";

import { MENU_LIST } from '../config';

import { getLogout } from "../../Data/Auth/Logout";

export const SidebarComponents = ({ path: currentPath }) => {
    const { currentUser: { name, email, token  } } = useContext(AuthContext);

    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    }

    const logoutHanlder = async () => {
        await getLogout(token);
    };

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <div className="brand-link">
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </div>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
                    <div className="image">
                        <img src="https://pbs.twimg.com/media/FSq_ZNUXEAEHwFJ?format=jpg&name=large" className="img-circle elevation-2" alt="User" style={{ width: '50px', height: '50px' }}/>
                    </div>
                    <div className="info">
                        <div style={{ color: '#c2c7d0' }}>
                            {name}
                            <br />
                            <small>{email} - Admin</small>
                        </div>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="true">
                        {
                            MENU_LIST.map(({id, menuName, path, icon }) => (
                                <li className="nav-item" key={id}>
                                    <div
                                        className={`nav-link ${currentPath === path && 'active'}`}
                                        style={{ color: currentPath !== path && '#c2c7d0', cursor: 'pointer' }}
                                        onClick={() => handelNavigate(path)}
                                    >
                                        <i className={icon}></i>
                                        <p>{menuName}</p>
                                    </div>
                                </li>
                            ))
                        }
                        <li className="nav-item">
                            <Button                                         
                                className="btn btn-danger btn-block my-2" 
                                label="Logout"
                                onClick={() => logoutHanlder()}
                                buttonIcon="fas fa-sign-out-alt"
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}