import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";


/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from '../../../contexts/AppContextProvider';

//  Import _AppHeader_Comp scss.
import './_AppHeader_Comp.scss';

/*==== Import Images ====*/
import MaleAvatar from "../../../assets/images/male_avatar.jpg";

const AppHeaderComp = (props) => {
    //  Global State.
    const { user } = useContext(AppStoreContext);

    const [state, setState] = useState({
        isShowHideProfileDropdown: false,
    });

    const handleShowHideProfileOption = () => {
        setState(prevState => ({
            ...prevState,
            isShowHideProfileDropdown: !state.isShowHideProfileDropdown,
        }));
    }
    const logoutUser = () => {
        localStorage.removeItem('userData');
        props.history.replace("/login");
    };

    return (
        <div className="AppHeaderComp">

            <Link to="/" >
                <div className="brand_logo"></div>
            </Link>
            

            <div className="user-name__wrapper">
                <span className="admin__name">{ user.name }</span>
                <span onClick={ handleShowHideProfileOption } className="profile__dropdown">
                    <img src={(user.picture !== null)
                        ? (user.picture)
                        : (MaleAvatar)
                    } alt="ProfilePicture" className="rounded-avatar"/>
                </span>
            </div>
            {
                (state.isShowHideProfileDropdown) ? (
                    <div className="drop-down-menu dropdown-menu-right">
                        <Link to="/user_profile" className="profile-dropdown__item has-icon">
                            <span className="dropdown__icon" /> Profile
                        </Link>
                        <Link to="#" onClick={ logoutUser } className="profile-dropdown__item has-icon">
                            <span className="dropdown__icon" /> Logout
                        </Link>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default AppHeaderComp;
