import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {uploadImage} from '../../services/post'
import {setPicture} from '../../services/user'
import {setUser} from '../../redux/actions/users';
import TextField from '@material-ui/core/TextField';
import WebcamComponent from './Camera'
import Button from '@material-ui/core/Button'
import NavBar from '../NavBar'

const ProfilePictureUpload = ({setAuthenticated}) => {
    const currentUser = useSelector(state => state.users.user)
    const [image, setImage] = useState({})
    const [postType, setPostType] = useState("upload")
    const dispatch = useDispatch()
    let history = useHistory()

    // Sets the image as the file that has been submitted
    const setImageHelper = (e) => {
        setImage(e.target.files[0])
    }

    // Handles the post type as a file upload
    const setUploadPostType = () => {
        setPostType("upload")
    }

    // Handles the post type as the camera option
    const setCameraPostType = () => {
        setPostType("camera")
    }

    // Fires when a profile picture is submitted, will update the user in redux, as well as
    // updates the database with the user's new photo
    const submitProfilePicture = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("file", image)

        const newImage = await uploadImage(data)
        const imageUrl = newImage.output

        const user = await setPicture(imageUrl)
        if(user){
            dispatch(setUser(user))
            history.push(`/user/${currentUser.id}`)
            window.location.reload()
        }

    }

    if(postType === "camera"){
        return (
            <div className="top_userpage_container">
            <NavBar setAuthenticated={setAuthenticated}/>
            <div className="createpost_container">
                <div className="createpost_webcam_container_center">
                    <div className="createpost_header">
                    Update Profile Picture
                    </div>
                    <div className="createpost_type_button">
                        <Button onClick={setUploadPostType} variant="contained" color="primary">Upload Image</Button>
                        <Button onClick={setCameraPostType} variant="contained" color="primary">Take Photo</Button>
                    </div>
                    <WebcamComponent />
                </div>
            </div>

        </div>
        )
    }

    return (
        <div className="top_userpage_container">
            <NavBar setAuthenticated={setAuthenticated}/>
            <div className="update_profile_picture_container">
                <div className="update_profile_picture_center">
                    <div className="update_profile_picture_header">
                        Update Profile Picture
                    </div>
                    <div className="update_profile_picture_title">
                        choose a photo to upload
                    </div>
                    <div className="createpost_type_button">
                        <Button onClick={setUploadPostType} variant="contained" color="primary">Upload Image</Button>
                        <Button onClick={setCameraPostType} variant="contained" color="primary">Take Photo</Button>
                    </div>
                    <form className="update_profile_picture_form" encType='multipart/formdata' onSubmit={submitProfilePicture}>
                        <TextField fullWidth variant="outlined" type="file" name="user_file" required onChange={setImageHelper}/>
                        <Button className="edit_button" color="primary" variant="contained" type="submit">Upload</Button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ProfilePictureUpload
