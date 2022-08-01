import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

/*==== Import React Iconsax ====*/
import { AddSquare, Microphone, Profile2User } from 'iconsax-react';

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../contexts/AppContextProvider";

/*==== Import AppLayoutHOC HOC ====*/
import AppLayoutHOC from '../../components/layouts/AppLayout_HOC/AppLayout_HOC';


//  Import _AdminDashboard_View scss.
import "./_AdminDashboard_View.scss";

const AdminDashboardView = () => {

    // Global State
    const { user } = useContext(AppStoreContext);

    const notify = () => toast("Wow so easy!");


    return (
        <AppLayoutHOC>
            <div className="AdminDashBoardView">
                {/*==== AdminDashboard  Body Wrapper ====*/}
                <div className="container-fluid container-md Admin-dashboard-main__wrapper">

                    {/*==== Page Title ====*/}
                    <h1 className="page__title">Dashboard</h1>

                    {/*==== Greeting Wrapper ====*/}
                    <div className="greeting__wrapper">
                        <h3>Welcome back,</h3>
                        <h1>{ user.name }</h1>
                    </div>

                    <br />

                    {/*==== mCards Wrapper ====*/}
                    <div className="mCards__wrapper">
                        <Link to="/add_podcast">
                            <div className="mCard mCard__item">
                                <AddSquare className="mCard__item--icon t-event__icon" />
                                <h2>Add Podcast</h2>
                            </div>
                        </Link>

                        <Link to="/podcasts">
                            <div className="mCard mCard__item">
                                <Microphone className="mCard__item--icon c-event__icon" />
                                <h2>View Podcasts</h2>
                            </div>
                        </Link>

                        <Link to="/punters">
                            <div className="mCard mCard__item item__three">
                                <Profile2User className="mCard__item--icon un-event__icon" />
                                <h2>View Punters</h2>
                            </div>
                        </Link>

                        <Link to="/audience">
                            <div className="mCard mCard__item item__three">
                                <Profile2User className="mCard__item--icon un-event__icon" />
                                <h2>View Audience</h2>
                            </div>
                        </Link>
                        {/* <ToastContainer /> */}
                    </div>
                </div>

            </div>
        </AppLayoutHOC>
    )
}

export default AdminDashboardView;
