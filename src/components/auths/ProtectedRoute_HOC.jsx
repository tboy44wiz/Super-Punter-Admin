import { useCallback, useContext, useEffect } from 'react';
import { CircleLoader } from "react-spinners";
import { css } from "@emotion/react";

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from '../../contexts/AppContextProvider';

/*==== Import the _AuthPage_Comp CSS ====*/
import './_AuthPage_Comp.scss';

//  Custom @emotion/core CSS
const customEmotionCSS = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`;


const ProtectedRouteHOC = (props) => {

    //  Global State.
    const { isAuthenticated, updateAuthAndLoggedUser } = useContext(AppStoreContext);


    const checkLoginStatus = useCallback( () => {
        //  Get users data from the local storage.
        const userData = localStorage.getItem("userData");
        const parsedUserData = JSON.parse(userData);

        if (parsedUserData !== null) {
            return updateAuthAndLoggedUser(true, parsedUserData);
        }
        else {
            //  Set state
            updateAuthAndLoggedUser(false, {});
            return window.open("/login", "_self");
        }
    }, []);
    
    useEffect(() => {
        (async () => {
            await checkLoginStatus()
        })();
    }, []);


    return (isAuthenticated) ? (
        props.children
    ) : (
        <div className="AuthPageComp">
            <CircleLoader
                css={ customEmotionCSS }
                size={50}
                color={"#2cb3de"}
            />
        </div>
    );

    // return (
    //     props.children
    // )
};

export default ProtectedRouteHOC;