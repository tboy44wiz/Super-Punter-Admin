import { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";

/*==== Import React Iconsax ====*/
import { ArrowLeft } from 'iconsax-react';

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../../contexts/AppContextProvider";

/*==== Import AppLayoutHOC HOC ====*/
import AppLayoutHOC from "../../../components/layouts/AppLayout_HOC/AppLayout_HOC";

/*==== Import _EditeAudience_View scss ====*/
import "./_EditAudience_View.scss";

/*==== Import Images. ====*/
import UserAvatar from "../../../assets/images/user_avatar.png";


const EditAudienceView = () => {

    // Global State
    const { isLoading, handleUpdateAudience } = useContext(AppStoreContext);

    const location = useLocation();
    const [audience, setAudience] = useState(location.state);
    // console.log("AUDIENCE:::", audience);

    //  Input Change Handler.
    const handleInputChange = (event) => {
        setAudience((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
        console.log(audience.isVerified);
    };

    const updateAudience = (event) => {
        handleUpdateAudience(event, audience.id, {
            name: audience.name,
            email: audience.email,
            phone: audience.phone,
            isVerified: audience.isVerified,
            status: audience.status,
        });
    }

  return (
    <AppLayoutHOC>
        <div className="EditAudienceView">

            {/*==== AudienceView  Body Wrapper ====*/}
            <div className="container-fluid container-md EditAudienceView-main__wrapper">

                {/*==== Page Title ====*/}
                <h1 className="page__title">Audience</h1>
                <Link to="/audience" className="back-to-home__link">
                    <ArrowLeft className="back-arror__icon" />
                    Audience
                </Link>

                <br />
                

                {/*=== Edit Audience Form ===*/}
                <div className="form__wrapper">
                    <form onSubmit={ event => updateAudience(event) } className="edit-audience__form">

                        <div
                            style={{
                                background: `url(${(audience.picture !== null) ? (audience.picture) : UserAvatar}) no-repeat center #9d9d9d`,
                                height: "190px",
                                width: "180px",
                                margin: "0 auto",
                                borderRadius: "50px",

                                display: "block",
                                gridColumn: "1 / 3",
                            }}
                        />

                        <div className="form-group audience-name__form--group">
                            <label htmlFor="audience_name" className="form__label">Name:</label>
                            <input type="text" id="audience_name" 
                                name="name" 
                                value={ audience.name }
                                onChange={ (event) => handleInputChange(event) }
                                className="form-control form__input"
                                placeholder="Name of the audience."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="audience_email" className="form__label">Email:</label>
                            <input type="text" id="audience_email" 
                                name="email" 
                                value={ audience.email }
                                onChange={ (event => handleInputChange(event)) }
                                className="form-control form__input"
                                placeholder="Phone number of the audience."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="audience_phone" className="form__label">Phone:</label>
                            <input type="text" id="audience_phone" 
                                name="phone" 
                                value={ audience.phone }
                                onChange={ (event => handleInputChange(event)) }
                                className="form-control form__input"
                                placeholder="Phone number of the audience."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="audience_status" className="form__label">Status:</label>
                            <div className="select-box__wrapper">
                                <select
                                    id="audience_status"
                                    name="status"
                                    value={ audience.status }
                                    onChange={ (event => handleInputChange(event)) }
                                    className="form-select form__select"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div> 
                        </div>

                        <div className="form-group">
                            <label htmlFor="audience_verification" className="form__label">Verification:</label>
                            <div className="select-box__wrapper">
                                <select
                                    aria-label="Default select example"
                                    id="audience_verification"
                                    name="isVerified"
                                    value={ audience.isVerified }
                                    onChange={ (event) => handleInputChange(event) }
                                    className="form-select form__select"
                                >
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </select>
                            </div>
                        </div>


                        <button className="btn btn-block mCard update__button">
                            {
                                (isLoading) ? ("Please wait...") : ("Update")
                            }
                        </button> 
                    </form>
                </div>
            </div>
        </div>
    </AppLayoutHOC>
  )
}

export default EditAudienceView;