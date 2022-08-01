import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

/*==== Import React Iconsax ====*/
import { Eye, EyeSlash } from 'iconsax-react';

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../contexts/AppContextProvider";

/*==== Import the _AuthPage_Comp CSS ====*/
import './_AuthPage_Comp.scss';

/*==== Import Images ====*/
import SuperPunterLogo from '../../assets/images/app_logo.png';


const LoginPageComp = () => {

    // Global State
    const { email, password, isLoading, showPassword, isAuthenticated, 
        handleInputChange, handleShowPassword, updateAuthAndLoggedUser, handleLoginUser
     } = useContext(AppStoreContext);

     const checkLoginStatus = () => {
        //  Get users data from the local storage.
        const userData = localStorage.getItem("userData");

        if (userData !== null) {
            const parsedUserData = JSON.parse(userData);
            return updateAuthAndLoggedUser(true, parsedUserData);
        }
        else {
            //  Set state
            updateAuthAndLoggedUser(false, {});
        }
    };
    
    useEffect(() => {
        checkLoginStatus();
    }, []);



    
    if (isAuthenticated) {
        return <Navigate to="/admin_dashboard" />
    };

    return (
        <div className="AuthPageComp">
            <div className="main__wrapper">

                {/*=== App Logo ===*/}
                <div className="header__wrapper">
                    <img src={ SuperPunterLogo } className="img-fluid" alt="App_Logo" />
                </div>

                {/*=== Form ===*/}
                <div className="form__wrapper">
                    <form onSubmit={ event => handleLoginUser(event) } className="mCard login__form">
                        <h1 className="form__heading">LOGIN</h1>

                        <br />

                        <div className="form-group">
                            <label htmlFor="email" className="form__label">Email:</label>
                            <div className="input-box__wrapper">
                                <input type="email" name="email" value={ email }
                                       onChange={ (event => handleInputChange(event)) }
                                       className="form-control form__input"
                                       placeholder="Your email..."
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="password" className="form__label">Password:</label>
                            <div className="input-box__wrapper">
                                <input type={ (showPassword) ? "text" : "password" } name="password" value={ password }
                                       onChange={ (event => handleInputChange(event)) }
                                       className="form-control form__input"
                                       placeholder="Your password..."
                                />
                                <span
                                    onClick={ handleShowPassword }
                                    className="input--icons--suffix"
                                >
                                    { (showPassword) ? <Eye/> : <EyeSlash/> }
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-block mCard login__button">
                            {
                                (isLoading) ? ("Please wait...") : ("Login")
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPageComp;