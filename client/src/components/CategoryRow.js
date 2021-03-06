import {categoryStyle, descriptionStyle, textStyle, deleteStyle} from "../containers/LandingPage/LandingStyles";
import React, {useState} from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PopUpAlert from "./PopUpAlert";
import { clone } from "ramda"

const CategoryRow = (props) => {
    const [ isLoading, setLoading ] = useState(false);
    const [ errorStatus, setError ] = useState({
        isError: false,
        errorMessage: ""
    })
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    let history = useHistory();
    let clickHandler = () => {
        history.push(`/dashboard/category/${props.category.name}`)
    }

    let triggerDeleteModal = () => {
        setShowDelete(true);
    }

    let deleteHandler = () => {
        let categories = clone(props.categories);
        let name = props.category.name;
        setLoading(true);
        let payload = {
            suborgName: props.category.name
        }
        axios.delete(`/api/suborg?suborg=${props.category.name}`, { withCredentials: true} )
            .then((response) => {
                if(response.status === 204){
                    let index = categories.findIndex((c) => {
                       return c.name === name;
                    });
                    categories.splice(index,1)
                    props.set({ categories: categories });
                }
                setShowDelete(false);
            }).catch((error) => {
            if (error.response) {
                console.log(error.response.data.message);
                console.log(error.response.status);
                setError({
                    isError: true,
                    errorMessage: error.response.data.message
                })
            }
            else{
                setError({
                    isError: true,
                    errorMessage: "Something went wrong!\n" + error.message
                })
            }
            setLoading(false);
        })
    }

    return (
        <>
        <tr>
            <td style={categoryStyle} onClick={clickHandler}>{props.category.name}</td>
            <td style={descriptionStyle}>{props.category.description}</td>
            <td style={deleteStyle} onClick={triggerDeleteModal}>Delete</td>
        </tr>
            {
                showDelete? <PopUpAlert
                    show={showDelete}
                    isLoading={isLoading}
                    handleClose={handleCloseDelete}
                    variant="danger"
                    fireFunction={deleteHandler}
                    buttonToTrigger="Delete"
                    heading={`Delete Category - ${props.category.name}`}
                    body={ errorStatus.isError ? errorStatus.errorMessage : `Are you sure you want to delete the category - '${props.category.name}'?`}
                /> : null
            }

        </>
    );
}

export default CategoryRow;

