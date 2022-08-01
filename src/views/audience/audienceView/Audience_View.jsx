import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';

/*==== Import React Iconsax ====*/
import { ArrowLeft, ArrowUp, Edit, Trash } from 'iconsax-react';

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../../contexts/AppContextProvider";

/*==== Import AppLayoutHOC HOC ====*/
import AppLayoutHOC from "../../../components/layouts/AppLayout_HOC/AppLayout_HOC";

//  Import React Toastify CSS.
import 'react-toastify/dist/ReactToastify.css';


/*==== IImport _Audience_View scss ====*/
import "./_Audience_View.scss";


const AudienceView = () => {


    // Global State
    const { audienceArray, handleGetAllAudience, handleDeleteAudience } = useContext(AppStoreContext);

    //  Internal State.
    const [state, setState] = useState({
        audienceId: "",
        showDeleteModal: false,
    });

    const navigate = useNavigate();

    /*==== Go to Edit Audience Screen ====*/
    const goToAudienceEditScreen = (selectedRow) => {
        navigate(`/audience/edit/${ selectedRow.id }`, { state: selectedRow });
    };

    /*==== Show delete Audience Modal ====*/
    const showDeleteAudienceModal = (event, audienceId) => {
        event.stopPropagation();
        setState((prevState) => ({
            ...prevState,
            audienceId: audienceId,
            showDeleteModal: true,
        }));
    };
    const handleCloseDeleteModal = () => {
        setState((prevState) => ({
            ...prevState,
            showDeleteModal: false,
        }));
    };

    const onHandleDeleteAudience = (audienceId) => {
        handleDeleteAudience(audienceId);
        handleCloseDeleteModal();
    };


    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            maxWidth: "130px"
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            maxWidth: "180px"
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            hide: "sm",
            maxWidth: "150px"
        },
        {
            name: 'Status',
            // selector: row => row.status,
            sortable: true,
            maxWidth: "150px",
            cell: row => (row.status === "Active") ? (
                <span style={{ color: "green" }}>{ row.status }</span>
            ) : (
                <span style={{ color: "red" }}>{ row.status }</span>
            )
        },
        {
            name: 'IsVerified',
            selector: row => row.isVerified,
            format: row => (row.isVerified === true) ? "True" : "False",
            sortable: true,
            maxWidth: "150px"
        },
        {
            name: 'Picture',
            selector: row => row.picture,
            hide: "md",
            // maxWidth: "200px",
            format: row => (row.picture !== null)
                ? `${row.picture.slice(0, 40)}...`
                : null
        },
        {
            name: 'Actions',
            // selector: row => row.picture,
            cell: row => (
                <>
                    <Edit
                        onClick= {() => { goToAudienceEditScreen(row) }}
                        className= "edit__icon"
                    />
                    <Trash
                        onClick= {(event) => { showDeleteAudienceModal(event, row.id) }}
                        className= "delete__icon"
                    />
                </>
            ),           
            maxWidth: "100px",
        },
    ];

    const data = audienceArray


    useEffect(() => {
        handleGetAllAudience();
    }, []);


  return (
    <AppLayoutHOC>
        <div className="AudienceView">

            {/*==== AudienceView  Body Wrapper ====*/}
            <div className="container-fluid container-md AudienceView-main__wrapper">

                {/*==== Page Title ====*/}
                <h1 className="page__title">Audience</h1>
                <Link to="/" className="back-to-home__link">
                    <ArrowLeft className="back-arror__icon" />
                    Home
                </Link>

                <br />

                <div className="table__wrapper">
                    <DataTable
                        title="Audience List"
                        columns = { columns }
                        data = { data }
                        pagination
                        fixedHeader = { true }
                        striped = { true }
                        highlightOnHover = { true }
                        sortIcon = { <ArrowUp size="32" color="black" /> }
                        defaultSortField = "createdAt"
                        responsive
                        dense
                        // selectableRows
                        // defaultSortAsc={false}
                    />
                </div>
            </div>


            {/*==== Show Delete Audience's Dialog Modal ====*/}
            <Modal
                show={ state.showDeleteModal }
                onHide={ handleCloseDeleteModal }
                backdrop="static"
                keyboard={false}
                className="confirm__modal"
            >
                <Modal.Body className="confirm-modal__body">
                    <h1 className="lead__heading">Confirm Delete?</h1>
                    <p>Are you sure you want to continue this action?</p>
                </Modal.Body>

                <Modal.Footer className="modal__footer">
                    <Button onClick={ handleCloseDeleteModal } className="button cancel__button">No</Button>
                    <Button variant="primary" onClick={ () => onHandleDeleteAudience(state.audienceId) } className="button submit__button">Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    </AppLayoutHOC>
  )
}

export default AudienceView;