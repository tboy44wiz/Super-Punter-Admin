import { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";

/*==== Import React Iconsax ====*/
import { ArrowLeft } from 'iconsax-react';

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../../contexts/AppContextProvider";

/*==== Import AppLayoutHOC HOC ====*/
import AppLayoutHOC from "../../../components/layouts/AppLayout_HOC/AppLayout_HOC";

/*==== Import _EditePunter_View scss ====*/
import "./_EditPunter_View.scss";

/*==== Import Images. ====*/
import UserAvatar from "../../../assets/images/user_avatar.png";


const EditPunterView = () => {

    // Global State
    const { isLoading, handleUpdatePunter } = useContext(AppStoreContext);

    const location = useLocation();
    const [punter, setPunter] = useState(location.state);
    // console.log("PUNTER:::", punter);

    //  Input Change Handler.
    const handleInputChange = (event) => {
        setPunter((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const updatePunter = (event) => {
        handleUpdatePunter(event, punter.id, {
            name: punter.name,
            email: punter.email,
            phone: punter.phone,
            isVerified: punter.isVerified,
            status: punter.status,
        });
    }

  return (
    <AppLayoutHOC>
        <div className="EditPunterView">

            {/*==== PuntersView  Body Wrapper ====*/}
            <div className="container-fluid container-md EditPunterView-main__wrapper">

                {/*==== Page Title ====*/}
                <h1 className="page__title">Punters</h1>
                <Link to="/punters" className="back-to-home__link">
                    <ArrowLeft className="back-arror__icon" />
                    Punters
                </Link>

                <br />
                

                {/*=== Edit Punters Form ===*/}
                <div className="form__wrapper">
                    <form onSubmit={ event => updatePunter(event) } className="edit-punter__form">

                        <div
                            style={{
                                background: `url(${(punter.picture !== null) ? (punter.picture) : UserAvatar}) no-repeat center #9d9d9d`,
                                height: "190px",
                                width: "180px",
                                margin: "0 auto",
                                borderRadius: "50px",

                                display: "block",
                                gridColumn: "1 / 3",
                            }}
                        />

                        <div className="form-group punters-name__form--group">
                            <label htmlFor="punters_name" className="form__label">Name:</label>
                            <input type="text" id="punter_name" 
                                name="name" 
                                value={ punter.name }
                                onChange={ (event) => handleInputChange(event) }
                                className="form-control form__input"
                                placeholder="Name of the punter."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="punters_email" className="form__label">Email:</label>
                            <input type="text" id="punter_email" 
                                name="email" 
                                value={ punter.email }
                                onChange={ (event => handleInputChange(event)) }
                                className="form-control form__input"
                                placeholder="Phone number of the punter."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="punters_phone" className="form__label">Phone:</label>
                            <input type="text" id="punters_phone" 
                                name="phone" 
                                value={ punter.phone }
                                onChange={ (event => handleInputChange(event)) }
                                className="form-control form__input"
                                placeholder="Phone number of the punter."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="punters_status" className="form__label">Status:</label>
                            <div className="select-box__wrapper">
                                <select
                                    id="punters_status"
                                    name="status"
                                    value={ punter.status }
                                    onChange={ (event) => handleInputChange(event) }
                                    className="form-select form__select"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div> 
                        </div>

                        <div className="form-group">
                            <label htmlFor="punters_verification" className="form__label">Verification:</label>
                            <div className="select-box__wrapper">
                                <select
                                    aria-label="Default select example"
                                    id="punters_verification"
                                    name="isVerified"
                                    value={ punter.isVerified }
                                    onChange={ (event) => handleInputChange(event) }
                                    className="form-select form__select"
                                >
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </select>
                            </div>
                        </div>


                        <button type="submit" className="btn btn-block mCard update__button">
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

export default EditPunterView;