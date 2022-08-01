import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import YupValidator from "../utils/Yup_Validator";
import { toast } from 'react-toastify';

import { user_login_url, update_single_user_url, delete_single_user_url, delete_single_punter_url, delete_single_audience_url,
    create_podcast_url, update_single_podcast_url, delete_single_podcast_url, get_all_podcasts_url,
    get_all_punters_url, get_all_audience_url } from "../routes/API_Routes";


const AppStoreContext = createContext(undefined, undefined);

const AppContextProvider = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        user: {},

        // Podcast
        title: "",
        contestantA: "",
        contestantB: "",
        sportsName: "",
        leagueName: "",
        leagueAbbrev: "",
        duration: "",
        addPunter: "",
        punters: [],
        featuredVideoFile: "",
        featuredImageFile: "",
        podcast: {},
        podcasts: [],

        sports: [],

        //  Audience
        audienceArray: [
            "Football",
            "Basketball",
            "Tennis",
            "Baseball",
            "Golf",
            "Running",
            "Volleyball",
            "Swimming",
            "Boxing",
            "Table tennis",
            "Cricket",
            "Horse racing",
            "Cycling"
        ],

        //  Punter
        puntersArray: [],

        isLoading: false,
        showPassword: false,
        isAuthenticated: false,
        isVideoDragActiveClass: false, 
        isImageDragActiveClass: false,
    });

    const navigate = useNavigate();


    //  React Toast  Custom Methods.
    const successToast = (message) => {
        return toast.success(message, { hideProgressBar: true });
    };
    const warningToast = (message) => {
        return toast.warning(message, { hideProgressBar: true });
    }
    const errorToast = (message) => {
        return toast.error(message, { hideProgressBar: true });
    };



    const updateAuthAndLoggedUser = (value, userData) => {
        setState((prevState) => ({
            ...prevState,
            isAuthenticated: value,
            user: userData
        }));
    };



    //  Input Change Handler.
    const handleInputChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };
    //  Image File Input Change Handler.
    const handleImageFileInputChange = (event) => {
        // console.log(event.target.files[0]);

        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/png") {
                return setState((prevState) => ({
                    ...prevState,
                    [event.target.name]: event.target.files[0],
                }));
            } 
            return successToast("Unsupported file type.");
        }
    };
    //  Video File Input Change Handler.
    const handleVideoFileInputChange = (event) => {
        // console.log(event.target.files[0]);

        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].type === "video/mp4" || event.target.files[0].type === "video/avi" || event.target.files[0].type === "video/x-matroska") {
                return setState((prevState) => ({
                    ...prevState,
                    [event.target.name]: event.target.files[0],
                }));
            }
            return successToast("Unsupported file type.");
        }
    };
    



    //  Handle Show Password.
    const handleShowPassword = () => {
        setState((prevState) => ({
            ...prevState,
            showPassword: !state.showPassword,
        }));
    };
    //  Handle Login User.
    const handleLoginUser = async (event) => {
        event.preventDefault();

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
            showPassword: false,
        }));

        //  Destructure the required form data from the state.
        const { email, password } = state;

        try {
            //  Validate the form data which is the "reqBody" using yup.
            const userData = await YupValidator.userLogin.validate({ email, password });

            //  Make Axios call.
            const response = await axios({
                method: "post",
                url: user_login_url,
                data: userData,
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.success) {
                const responseData = response.data;
                const user = responseData.data;

                //  Save user data to Local Storage.
                localStorage.setItem('userData', JSON.stringify(user));

                const successMessage = responseData.message;
                successToast(successMessage);
            
                //  Update the state.
                return setState((prevState) => ({
                    ...prevState,
                    user: user,
                    isLoading: false,
                    isAuthenticated: true,
                }));
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            console.log(error);
        }
    };




    //  Handle Add Punter.
    const handleAddPunter = (event) => {
        event.preventDefault();

        if (state.addPunter === "") {
            return warningToast("This field can not be empty.");
        }
        //  Update State.
        return setState((prevState) => ({
            ...prevState,
            punters: state.punters.concat(state.addPunter),
            addPunter: ""
        }));
        // return console.log(state.punters)
    }
    //  Handle Remove Punter.
    const handleRemovePunter = (puntersIndex) => {

        const { punters } = state;
        const filteredPunters = punters.filter((_, index) => {
            return index !== puntersIndex;
        });

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            punters: filteredPunters,
        }));
    }




    //  Handle DragLeave.
    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setState((prevState) => ({
            ...prevState,
            isVideoDragActiveClass: false,
            isImageDragActiveClass: false,
        }));
    };


    //  Handle Video DragOver, Drop and Select.
    const handleVideoDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setState((prevState) => ({
            ...prevState,
            isVideoDragActiveClass: true,
            isImageDragActiveClass: false,
        }));      
    };
    const handleFeaturedVideoDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log(event.dataTransfer.files[0]);

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            if (event.dataTransfer.files[0].type === "video/mp4" || event.dataTransfer.files[0].type === "video/avi" || event.dataTransfer.files[0].type === "video/x-matroska") {
                return setState((prevState) => ({
                    ...prevState,
                    featuredVideoFile: event.dataTransfer.files[0],
                    isVideoDragActiveClass: false,
                    isImageDragActiveClass: false,
                }));
            }
            return successToast("Unsupported file type.");
        }
    };
    const handleSelectFeaturedVideoFile = () => {
        const featuredVideoFileInputElement = document.getElementById("featuredVideoFileInput");
        featuredVideoFileInputElement.click();
    };


    //  Handle Image DragOver, Drop and Select.
    const handleImageDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setState((prevState) => ({
            ...prevState,
            isImageDragActiveClass: true,
            isVideoDragActiveClass: false,
        }));       
    };
    const handleFeaturedImageDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log(event.dataTransfer.files[0]);

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            if (event.dataTransfer.files[0].type === "image/jpg" || event.dataTransfer.files[0].type === "image/jpeg" || event.dataTransfer.files[0].type === "image/png") {
                return setState((prevState) => ({
                    ...prevState,
                    featuredImageFile: event.dataTransfer.files[0],
                    isVideoDragActiveClass: false,
                    isImageDragActiveClass: false,
                }));
            } 
            return successToast("Unsupported file type.");
        }
    };
    const handleSelectFeaturedImageFile = () => {
        const featuredImageFileInputElement = document.getElementById("featuredImageFileInput");
        featuredImageFileInputElement.click();
    };




    //  Handle Podcast.
    const handleCreatePodcast = async (event, podcastId, action) => {
        event.preventDefault();
        // console.log("ACTION::: ", action, podcastId);

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        //  Destructure the required form data from the state.
        const { title, contestantA, contestantB, sportsName, leagueName, leagueAbbrev, duration, punters, featuredImageFile, featuredVideoFile } = state;

        try {
            //  Validate the form data which is the "reqBody" using yup.
            const podcastData = await YupValidator.podcastValidation.validate({
                title, contestantA, contestantB, sportsName, leagueName, leagueAbbrev, duration, punters, featuredImageFile, featuredVideoFile
            });

            const formData = new FormData();
            for (const podcastItem in podcastData) {
                formData.append(podcastItem, podcastData[podcastItem]);
            }
            
            
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: (action === "POST") ? "post" : "put",
                url: (action === "POST") ? create_podcast_url : `${update_single_podcast_url}/${podcastId}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;
                const podcast = responseData.data;

                const successMessage = responseData.message;
                successToast(successMessage);
            
                //  Update the state.
                setState((prevState) => ({
                    ...prevState,
                    podcast: podcast,
                    contestantA: "",
                    contestantB: "",
                    sportsName: "",
                    leagueName: "",
                    leagueAbbrev: "",
                    duration: "",
                    addPunter: "",
                    punters: [],
                    featuredVideoFile: "",
                    featuredImageFile: "",
                    isLoading: false,
                }));

                return navigate("/podcasts");
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            console.log(error);
        }
    
    };
    const handleGetAllPodcasts = async () => {

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        try {
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: "get",
                url: get_all_podcasts_url,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;
                const podcasts = responseData.data;


                //  Sort the Leads in the order of date created using the "createdAt" property.
                podcasts.sort((podcastA, podcastB) => new Date(podcastA.createdAt) - new Date(podcastB.createdAt));

                // console.log("Podcasts::: ", responseData);
            
                //  Update the state.
                return setState((prevState) => ({
                    ...prevState,
                    podcasts: podcasts,
                    isLoading: false,
                }));
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
            }
            else {
                errorMessage = error.response.data.message;
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            console.log(error);
            // return errorToast(errorMessage);
        };
    };
    const handleUpdateSelectecPodcast = (selectedPodcast) => {
        const { title, contestantA, contestantB, sportsName, leagueName, leagueAbbrev, duration, punters } = selectedPodcast;
        const puntersArray = punters.split(",");

        setState((prevState) => ({
            ...prevState,
            title,
            contestantA,
            contestantB,
            sportsName,
            leagueName,
            leagueAbbrev,
            duration,
            punters: puntersArray,
        }));
    };
    const handleDeletePodcast = async (podcastId) => {

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        try {
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: "delete",
                url: `${delete_single_podcast_url}/${podcastId}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;
                const podcasts = responseData.data;

                //  Sort the Leads in the order of date created using the "createdAt" property.
                podcasts.sort((podcastA, podcastB) => new Date(podcastA.createdAt) - new Date(podcastB.createdAt));
            
                // console.log("PUNTERS::: ", podcasts);

                //  Update the state.
                setState((prevState) => ({
                    ...prevState,
                    podcasts: podcasts,
                    isLoading: false,
                }));

                return navigate("/podcasts");
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            // return window.location.reload();
            // console.log(error);
        }
    };




    //  Handle Punters.
    const handleGetAllPunters = async () => {

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        try {
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: "get",
                url: get_all_punters_url,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;
                const punters = responseData.data;

                //  Sort the Leads in the order of date created using the "createdAt" property.
                punters.sort((punterA, punterB) => new Date(punterA.createdAt) - new Date(punterB.createdAt));
            
                // console.log("PUNTERS::: ", punters);

                //  Update the state.
                return setState((prevState) => ({
                    ...prevState,
                    puntersArray: punters,
                    isLoading: false,
                }));
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            // console.log(error);
        };
    };
    const handleUpdatePunter = async (event, punterId, userUpdateData) => {
        event.preventDefault();

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        try {
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: "put",
                url: `${update_single_user_url}/${punterId}`,
                data: userUpdateData,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;

                const successMessage = responseData.message;
                successToast(successMessage);

                // console.log("RESPONSE DATA::: ", responseData);
            
                //  Update the state.
                setState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));

                return navigate("/punters");
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            console.log(error);
        };
    };
    const handleDeletePunter = async (punterId) => {

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        try {
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: "delete",
                url: `${delete_single_punter_url}/${punterId}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;
                const punters = responseData.data;

                //  Sort the Leads in the order of date created using the "createdAt" property.
                punters.sort((punterA, punterB) => new Date(punterA.createdAt) - new Date(punterB.createdAt));
            
                console.log("PUNTERS::: ", punters);

                //  Update the state.
                setState((prevState) => ({
                    ...prevState,
                    puntersArray: punters,
                    isLoading: false,
                }));

                return navigate("/punters");
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            return window.location.reload();
            // console.log(error);
        };
    };



    
    //  Handle Aundience.
    const handleGetAllAudience = async () => {

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        try {
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: "get",
                url: get_all_audience_url,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;
                const audience = responseData.data;

                //  Sort the Leads in the order of date created using the "createdAt" property.
                audience.sort((punterA, punterB) => new Date(punterA.createdAt) - new Date(punterB.createdAt));
            
                // console.log("AUDIENCE::: ", audience);

                //  Update the state.
                return setState((prevState) => ({
                    ...prevState,
                    audienceArray: audience,
                    isLoading: false,
                }));
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            console.log(error);
        };
    };
    const handleUpdateAudience = async (event, aundienceId, userUpdateData) => {
        event.preventDefault();

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        console.log("AUDIENCE TTTT::: ", userUpdateData);

        try {
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: "put",
                url: `${update_single_user_url}/${aundienceId}`,
                data: userUpdateData,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;

                const successMessage = responseData.message;
                successToast(successMessage);

                console.log("RESPONSE DATA::: ", responseData);
            
                //  Update the state.
                setState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));

                return navigate("/audience");
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            console.log(error);
        };
    };
    const handleDeleteAudience = async (aundienceId) => {

        //  Update State.
        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        try {
            //  Get the Token.
            const userData = localStorage.getItem('userData');

            let token;
            if (userData !== null) {
                token = JSON.parse(userData).token;
            }

            //  Make Axios call.
            const response = await axios({
                method: "delete",
                url: `${delete_single_audience_url}/${aundienceId}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.data.success) {
                const responseData = response.data;
                const audience = responseData.data;
                
                //  Sort the Leads in the order of date created using the "createdAt" property.
                audience.sort((punterA, punterB) => new Date(punterA.createdAt) - new Date(punterB.createdAt));
            
                // console.log("AUDIENCE::: ", audience);

                //  Update the state.
                setState((prevState) => ({
                    ...prevState,
                    audienceArray: audience,
                    isLoading: false,
                }));

                return navigate("/audience");
            }
        } catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0];
                errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                errorToast(errorMessage);
            }
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            // console.log(error);
            return window.location.reload();
        };
    };




    return (
        <AppStoreContext.Provider value={{
            ...state,
            
            updateAuthAndLoggedUser: updateAuthAndLoggedUser,


            handleInputChange: handleInputChange,
            handleImageFileInputChange: handleImageFileInputChange,
            handleVideoFileInputChange: handleVideoFileInputChange,


            handleShowPassword: handleShowPassword,
            handleLoginUser: handleLoginUser,


            handleAddPunter: handleAddPunter,
            handleRemovePunter: handleRemovePunter,


            //  Handle DragLeave.
            handleDragLeave: handleDragLeave,

            //  Handle Video DragOver, Drop and Select.
            handleVideoDragOver: handleVideoDragOver,
            handleFeaturedVideoDrop: handleFeaturedVideoDrop,
            handleSelectFeaturedVideoFile: handleSelectFeaturedVideoFile,


            //  Handle Image DragOver, Drop and Select.
            handleImageDragOver: handleImageDragOver,
            handleFeaturedImageDrop: handleFeaturedImageDrop,
            handleSelectFeaturedImageFile: handleSelectFeaturedImageFile,


            //  Handle Podcast.
            handleCreatePodcast: handleCreatePodcast,
            handleGetAllPodcasts: handleGetAllPodcasts,
            handleUpdateSelectecPodcast: handleUpdateSelectecPodcast,
            handleDeletePodcast: handleDeletePodcast,


            //  Handle Punters.
            handleGetAllPunters: handleGetAllPunters,
            handleUpdatePunter: handleUpdatePunter,
            handleDeletePunter: handleDeletePunter,


            //  Handle Aundience.
            handleGetAllAudience: handleGetAllAudience,
            handleUpdateAudience: handleUpdateAudience,
            handleDeleteAudience: handleDeleteAudience,
        }}>
            { props.children }
        </AppStoreContext.Provider>
    );
};


export { AppStoreContext };
export default AppContextProvider;