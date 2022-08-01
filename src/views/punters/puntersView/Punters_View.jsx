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


/*==== IImport _Punters_View scss ====*/
import "./_Punters_View.scss";


const PuntersView = () => {


    // Global State
    const { puntersArray, handleGetAllPunters, handleDeletePunter } = useContext(AppStoreContext);

    //  Internal State.
    const [state, setState] = useState({
        punterId: "",
        showDeleteModal: false,
    });

    const navigate = useNavigate();

    /*==== Go to Edit Punters Screen ====*/
    const goToPuntersEditScreen = (selectedRow) => {
        navigate(`/punters/edit/${ selectedRow.id }`, { state: selectedRow });
        console.log(selectedRow);
    };

    /*==== Show delete Punters Modal ====*/
    const showDeletePunterModal = (event, punterId) => {
        event.stopPropagation();
        setState((prevState) => ({
            ...prevState,
            punterId: punterId,
            showDeleteModal: true,
        }));
    };
    const handleCloseDeleteModal = () => {
        setState((prevState) => ({
            ...prevState,
            showDeleteModal: false,
        }));
    };

    const onHandleDeletePunter = (punterId) => {
        handleDeletePunter(punterId);
        handleCloseDeleteModal();
    }


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
                        onClick= {() => { goToPuntersEditScreen(row) }}
                        className= "edit__icon"
                    />
                    <Trash
                        onClick= {(event) => { showDeletePunterModal(event, row.id) }}
                        className= "delete__icon"
                    />
                </>
            ),           
            maxWidth: "100px",
        },
    ];

    const data = puntersArray;


    useEffect(() => {
        handleGetAllPunters();
    }, []);


  return (
    <AppLayoutHOC>
        <div className="PuntersView">

            {/*==== PuntersView  Body Wrapper ====*/}
            <div className="container-fluid container-md PuntersView-main__wrapper">

                {/*==== Page Title ====*/}
                <h1 className="page__title">Punters</h1>
                <Link to="/" className="back-to-home__link">
                    <ArrowLeft className="back-arror__icon" />
                    Home
                </Link>

                <br />

                <div className="table__wrapper">
                    <DataTable
                        title="Punters List"
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


            {/*==== Show Delete Punter's Dialog Modal ====*/}
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
                    <Button variant="primary" onClick={ () => onHandleDeletePunter(state.punterId) } className="button submit__button">Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>

        {/*==== This is responsible for displaying Toast message on the screen ====*/}
        {/* <ToastContainer /> */}
    </AppLayoutHOC>
  )
}

export default PuntersView;