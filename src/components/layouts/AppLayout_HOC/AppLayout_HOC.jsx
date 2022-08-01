/*==== Import ProtectedRouteHOC ====*/
import ProtectedRouteHOC from "../../auths/ProtectedRoute_HOC";


//    Import Components.
import AppHeaderComp from "../AppHeader_Comp/AppHeader_Comp";
import AppFooterComp from "../AppFooter_Comp/AppFooter_Comp";


//  Import React Toastify CSS.
import 'react-toastify/dist/ReactToastify.css';


//  Import _AppLayout_HOC scss.
import './_AppLayout_HOC.scss';

const AppLayoutHOC = (props) => {

    return (
        <ProtectedRouteHOC>
            <div className="AppLayoutComp">
                {/*==== Header ====*/}
                <header>
                    <AppHeaderComp />
                </header>

                {/*==== Body ====*/}
                <div className="AppBody__wrapper">
                    { props.children }
                </div>

                {/*==== Footer ====*/}
                <footer>
                    <AppFooterComp />
                </footer>
            </div>
        </ProtectedRouteHOC>
    );
};

export default AppLayoutHOC;
