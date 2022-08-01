import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


/*=== Import the App SCSS ===*/
import './App.scss';


/*==== Import AppStoreProvider HOC ====*/
import AppContextProvider from "./contexts/AppContextProvider";

/*====================================================================================================
*                               Components Imports.
* ===================================================================================================*/
import SignUpPageComp from './components/auths/SignUpPage_Comp';
import LoginPageComp from './components/auths/LoginPage_Comp';
import AdminDashboardView from './views/adminDashboard/AdminDashboard_View';
import AddPodcastView from './views/addPodcast/AddPodcast_View';
import PodcastsView from './views/podcasts/Podcasts_View';
import PuntersView from './views/punters/puntersView/Punters_View';
import EditPunterView from './views/punters/editPunterView/EditPunter_View';
import AudienceView from './views/audience/audienceView/Audience_View';
import EditAudienceView from './views/audience/editAudienceView/EditAudience_View';

const App = () => {
  return (
    <div className="App">
      <Router>
        <AppContextProvider>

          <Routes>
            {/*======================== Auth Pages =======================*/}
            <Route path="/signUp" element={ <SignUpPageComp /> } />
            <Route path="/login" element={ <LoginPageComp /> } />

            {/*======================== Landing Page =======================*/}
            <Route path="/" element={ <Navigate replace to="/admin_dashboard" /> } />
            <Route path="/admin_dashboard" element={ <AdminDashboardView /> } />

            {/*======================== Podcast Page =======================*/}
            <Route path="/add_podcast" element={ <AddPodcastView /> } />
            <Route path='/podcasts' element={ <PodcastsView /> } />
            <Route path="/podcasts/edit/:id" element={ <AddPodcastView /> } />

            {/*======================== Punters Page =======================*/}
            <Route path='/punters' element={ <PuntersView /> } />
            <Route path='/punters/edit/:id' element={ <EditPunterView /> } />

            {/*======================= Audience Page =======================*/}
            <Route path='/audience' element={ <AudienceView /> } />
            <Route path='/audience/edit/:id' element={ <EditAudienceView /> } />
          </Routes>
        </AppContextProvider>
      </Router>

      {/*==== This is responsible for displaying Toast message on the screen ====*/}
      <ToastContainer />
    </div>
  )
}


export default App;
