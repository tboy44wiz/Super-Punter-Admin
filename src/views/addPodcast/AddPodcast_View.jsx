import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { css } from "@emotion/react";

/*==== Import React Iconsax ====*/
import { Add, ArrowLeft, Video, GalleryExport, CloseSquare } from 'iconsax-react';

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../contexts/AppContextProvider";

/*==== Import AppLayoutHOC HOC ====*/
import AppLayoutHOC from "../../components/layouts/AppLayout_HOC/AppLayout_HOC";


/*==== IImport _AddPodcast_View scss ====*/
import "./_AddPodcast_View.scss";

//  Custom @emotion/core CSS
const customEmotionCSS = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`;


const AddPodcastView = () => {

    // Global State
    const { title, contestantA, contestantB, sportsName, leagueName, leagueAbbrev, duration, featuredVideoFile, featuredImageFile, addPunter, punters, isLoading, isVideoDragActiveClass, isImageDragActiveClass,
        handleInputChange, handleImageFileInputChange, handleVideoFileInputChange, handleAddPunter, handleVideoDragOver, handleImageDragOver, handleDragLeave, 
        handleFeaturedVideoDrop, handleSelectFeaturedVideoFile,
        handleFeaturedImageDrop, handleSelectFeaturedImageFile, 
        handleRemovePunter,handleUpdateSelectecPodcast, handleCreatePodcast } = useContext(AppStoreContext);

    const location = useLocation();
    // console.log("LOCATION::: ", location);

    const handleCreateOrUpdatePodcast = (event) => {
        if (location.state === null) {
            return handleCreatePodcast(event, null, "POST");
        }
        return handleCreatePodcast(event, location.state.id, "PUT");
    };

    useEffect(() => {
        if (location.state) {
            // console.log("PODCAST:::", podcast);
            return handleUpdateSelectecPodcast(location.state);
        }
    }, []);



    return (
        <AppLayoutHOC>
            <div className="AddPodcastView">

                {/*==== AdminDashboard  Body Wrapper ====*/}
                <div className="container-fluid container-md AddPodcastView-main__wrapper">

                    {/*==== Page Title ====*/}
                    <h1 className="page__title">Add podcast</h1>
                    <Link to="/" className="back-to-home__link">
                        <ArrowLeft className="back-arror__icon" />
                        Home
                    </Link>

                    <br />

                    {/*=== Podcast Form ===*/}
                    <div className="form__wrapper">
                        <form onSubmit={event => handleCreateOrUpdatePodcast(event)} className="podcast__form">

                            <div className="form-group title__form-group">
                                <label htmlFor="title" className="form__label">Title:</label>
                                <div className="input-box__wrapper">
                                    <input type="text" id="title" name="title" value={title}
                                        onChange={(event => handleInputChange(event))}
                                        className="form-control form__input"
                                        onFocus={(event) => event.target.placeholder = ""}
                                        onBlur={(event) => event.target.placeholder = "Enter title."}
                                        placeholder="Enter title."
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contestant_A" className="form__label">Contestant A:</label>
                                <div className="input-box__wrapper">
                                    <input type="text" id="contestant_A" name="contestantA" value={contestantA}
                                        onChange={(event => handleInputChange(event))}
                                        className="form-control form__input"
                                        onFocus={(event) => event.target.placeholder = ""}
                                        onBlur={(event) => event.target.placeholder = "Enter contestant A."}
                                        placeholder="Enter contestant A."
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contestant_B" className="form__label">Contestant B:</label>
                                <div className="input-box__wrapper">
                                    <input type="text" id="contestant_B" name="contestantB" value={contestantB}
                                        onChange={(event => handleInputChange(event))}
                                        className="form-control form__input"
                                        onFocus={(event) => event.target.placeholder = ""}
                                        onBlur={(event) => event.target.placeholder = "Enter contestant B."}
                                        placeholder="Enter contestant B."
                                    />
                                </div>
                            </div>


                            <div className="form-group">
                                <label htmlFor="sports_name" className="form__label">Sports name:</label>
                                <div className="input-box__wrapper">
                                    <input type="text" id="sports_name" name="sportsName" value={sportsName}
                                        onChange={(event => handleInputChange(event))}
                                        className="form-control form__input"
                                        onFocus={(event) => event.target.placeholder = ""}
                                        onBlur={(event) => event.target.placeholder = "Enter sport name."}
                                        placeholder="Enter sport name."
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="league_name" className="form__label">League name:</label>
                                <div className="input-box__wrapper">
                                    <input type="text" id="league_name" name="leagueName" value={leagueName}
                                        onChange={(event => handleInputChange(event))}
                                        className="form-control form__input"
                                        onFocus={(event) => event.target.placeholder = ""}
                                        onBlur={(event) => event.target.placeholder = "Enter league name."}
                                        placeholder="Enter league name."
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="league_abbrev" className="form__label">League abbrev:</label>
                                <div className="input-box__wrapper">
                                    <input type="text" id="league_abbrev" name="leagueAbbrev" value={leagueAbbrev}
                                        onChange={(event => handleInputChange(event))}
                                        className="form-control form__input"
                                        onFocus={(event) => event.target.placeholder = ""}
                                        onBlur={(event) => event.target.placeholder = "Enter league abbreviatio."}
                                        placeholder="Enter league abbreviatio."
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="duration" className="form__label">Duration:</label>
                                <div className="input-box__wrapper">
                                    <input type="text" id="duration" name="duration" value={duration}
                                        onChange={(event => handleInputChange(event))}
                                        className="form-control form__input"
                                        onFocus={(event) => event.target.placeholder = ""}
                                        onBlur={(event) => event.target.placeholder = "Enter duration."}
                                        placeholder="Enter duration."
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="add_punter" className="form__label">Punter:</label>

                                <div className="input-box__wrapper">
                                    <input type="text" id="add_punter" name="addPunter" value={addPunter}
                                        onChange={(event => handleInputChange(event))}
                                        className="form-control form__input"
                                        onFocus={(event) => event.target.placeholder = ""}
                                        onBlur={(event) => event.target.placeholder = "Enter punter."}
                                        placeholder="Enter punter."
                                    />
                                    <span
                                        onClick={handleAddPunter}
                                        className="input--icons--suffix"
                                    >
                                        <Add />
                                    </span>
                                </div>handlePodcastUpload
                            </div>
                            <div className="punters-badge__wrapper">{
                                (typeof punters !== "undefined" && punters.length !== 0) && 
                                punters.map((punter, index) => (
                                    <span className="punter__badge" key={ index }>
                                        { punter }
                                        <CloseSquare
                                            onClick={ () => handleRemovePunter(index) }
                                            className="delete-badge__button"
                                        />
                                    </span>
                                ))
                            }</div>


                            {/* Podcast Video */}
                            <div className="form-group video-upload__group">
                                <label htmlFor="featuredVideoFileInput" className="form__label">Video:</label>

                                <section
                                    onDragOver={ (event) => handleVideoDragOver(event) }
                                    onDragLeave={ (event) => handleDragLeave(event) }
                                    onDrop={ (event) => handleFeaturedVideoDrop(event) }
                                    className={ isVideoDragActiveClass ? "video-upload__wrapper video-upload__wrapper--active" : "video-upload__wrapper" }>
                                        <Video className="add-video__icon" />
                                        <p>Drop video to upload</p>
                                        <p>Or</p>
                                        <input type="file" name="featuredVideoFile"
                                            id="featuredVideoFileInput" hidden
                                            onChange={(event) => handleVideoFileInputChange(event)}
                                        />
                                        <button type="button"
                                            onClick={ handleSelectFeaturedVideoFile }
                                            className="btn btn-block select-file__button">
                                            Select video
                                        </button>
                                        <p className="video__name">{ featuredVideoFile.name }</p>
                                </section>
                            </div>

                            {/* Featured Image */}
                            <div className="form-group image-upload__group">
                                <label htmlFor="featuredImageFileInput" className="form__label">Featured image:</label>

                                <section
                                    onDragOver={ (event) => handleImageDragOver(event) }
                                    onDragLeave={ (event) => handleDragLeave(event) }
                                    onDrop={ (event) => handleFeaturedImageDrop(event) }
                                    className={ isImageDragActiveClass ? "image-upload__wrapper image-upload__wrapper--active" : "image-upload__wrapper" }>
                                        <GalleryExport className="add-image__icon" />
                                        <p>Drop image to upload</p>
                                        <p>Or</p>
                                        <input type="file" name="featuredImageFile"
                                            id="featuredImageFileInput" hidden 
                                            onChange={(event) => handleImageFileInputChange(event)}
                                        />
                                        <button type="button"
                                            onClick={ handleSelectFeaturedImageFile }
                                            className="btn btn-block select-file__button">
                                            Select image
                                        </button>
                                        <p className="image__name">{ featuredImageFile.name }</p>
                                        <p>(Image size: 500 x 280)</p>
                                </section>
                            </div>


                            <button type="submit" className="btn btn-block mCard upload__button">
                                {
                                    (isLoading) ?
                                    ("Please wait...") :
                                    (location.state === null) ?
                                    ("Upload") :
                                    ("Update")
                                }
                            </button>
                        </form>
                    </div>
                </div>


                {/*==== Loading Overlay Wrapper ====*/}
                {(isLoading) && (
                    <div className="AddPodcastView__CircleLoader">
                        <CircleLoader
                            css={ customEmotionCSS }
                            size={80}
                            color={"#2cb3de"}
                        />
                    </div>
                )}
            </div>
        </AppLayoutHOC>
    )
}

export default AddPodcastView;