import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import { CircleLoader } from "react-spinners";
import { css } from "@emotion/react";

/*==== Import React Iconsax ====*/
import { ArrowLeft, ArrowUp, Edit, Trash } from 'iconsax-react';

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../contexts/AppContextProvider";

/*==== Import AppLayoutHOC HOC ====*/
import AppLayoutHOC from "../../components/layouts/AppLayout_HOC/AppLayout_HOC";

//  Import React Toastify CSS.
import 'react-toastify/dist/ReactToastify.css';


/*==== IImport _Podcasts_View scss ====*/
import "./_Podcasts_View.scss";

//  Custom @emotion/core CSS
const customEmotionCSS = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`;


const PodcastsView = () => {


    // Global State
    const { podcasts, handleGetAllPodcasts, isLoading, handleDeletePodcast } = useContext(AppStoreContext);

    //  Internal State.
    const [state, setState] = useState({
        podcastId: "",
        showDeleteModal: false,
    });

    const navigate = useNavigate();

    /*==== Go to Edit Punters Screen ====*/
    const goToAddPodcastScreen = (selectedRow) => {
        navigate(`/podcasts/edit/${ selectedRow.id }`, { state: selectedRow });
        // console.log(selectedRow);
    };

     /*==== Show delete Punters Modal ====*/
     const showDeletePodcastModal = (event, podcastId) => {
        event.stopPropagation();
        setState((prevState) => ({
            ...prevState,
            podcastId: podcastId,
            showDeleteModal: true,
        }));
    };
    const handleCloseDeleteModal = () => {
        setState((prevState) => ({
            ...prevState,
            showDeleteModal: false,
        }));
    };

    const onHandleDeletePunter = (podcastId) => {
        handleDeletePodcast(podcastId);
        handleCloseDeleteModal();
    }


    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            maxWidth: "130px"
        },
        {
            name: 'Team A',
            selector: row => row.contestantA,
            sortable: true,
            maxWidth: "130px"
        },
        {
            name: 'Team B',
            selector: row => row.contestantB,
            sortable: true,
            maxWidth: "180px"
        },
        {
            name: 'Sports',
            selector: row => row.sportsName,
            maxWidth: "150px"
        },
        {
            name: 'League',
            selector: row => row.leagueName,
            maxWidth: "150px"
        },
        {
            name: 'League Abbrev',
            selector: row => row.leagueAbbrev,
            hide: "md",
            maxWidth: "150px"
        },
        {
            name: 'Duration',
            selector: row => row.duration,
            hide: "sm",
            maxWidth: "150px"
        },
        {
            name: 'Image',
            // selector: row => row.featuredImageFile,
            hide: "md",
            cell: row => (
                <img src={ row.featuredImageFile } alt="Podcast Featured Image" height="30px" width="50px" />
            ),
        },
        {
            name: 'Video',
            selector: row => row.featuredVideoFile,
            hide: "md",
            format: row => (row.featuredVideoFile !== null)
                ? `${row.featuredVideoFile.slice(0, 40)}...`
                : null
        },
        {
            name: 'Actions',
            // selector: row => row.picture,
            cell: row => (
                <>
                    <Edit
                        onClick= {() => { goToAddPodcastScreen(row) }}
                        className= "edit__icon"
                    />
                    <Trash
                        onClick= {(event) => { showDeletePodcastModal(event, row.id) }}
                        className= "delete__icon"
                    />
                </>
            ),           
            maxWidth: "100px",
        },
    ];

    const data = podcasts;

    useEffect(() => {
        handleGetAllPodcasts();
    }, []);


  return (
    <AppLayoutHOC>
        <div className="PodcastsView">

            {/*==== PodcastsView  Body Wrapper ====*/}
            <div className="container-fluid container-md PodcastsView-main__wrapper">

                {/*==== Page Title ====*/}
                <h1 className="page__title">Podcast</h1>
                <Link to="/" className="back-to-home__link">
                    <ArrowLeft className="back-arror__icon" />
                    Home
                </Link>

                <br />

                <div className="table__wrapper">
                    <DataTable
                        title="Podcast List"
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
                    <Button variant="primary" onClick={ () => onHandleDeletePunter(state.podcastId) } className="button submit__button">Yes</Button>
                </Modal.Footer>
            </Modal>


            {/*==== Loading Overlay Wrapper ====*/}
            {(isLoading) && (
                <div className="PodcastsView__CircleLoader">
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

export default PodcastsView;