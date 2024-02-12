import React, { useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import { LoadingContext } from './LoadingContext';
import { ButtonContext } from './ButtonContext';

export const withHocks = (Component) => {
    return (props) => {
        const { currentUser } = useContext(AuthContext);
        const { isLoading, dispatchLoading } = useContext(LoadingContext);
        const { dataButtonList:state, dispatch } = useContext(ButtonContext);

        return (
            <Component
                {...props}
                params={useParams()}
                navigate={useNavigate()}
                dataLogin={currentUser}
                buttonHeader={{ dataButtonList:state, dispatch }}
                loadingParam={{ isLoading, dispatchLoading }}
            />
        )
    };
}
