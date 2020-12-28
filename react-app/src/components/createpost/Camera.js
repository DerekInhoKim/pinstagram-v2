import React, {useState, useRef, useCallback, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import Webcam from "react-webcam";
import {useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {uploadImage, createPost, getPosts} from '../../services/post'

const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
};

const WebcamComponent = () => {
    const currentUser = useSelector(state => state.users.user)
    const webcamRef = useRef(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [image, setImage] = useState({})
    const [fileName, setFileName] = useState("")
    const [caption, setCaption] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [posts, setPosts] = useState(0)
    const [preview, setPreview] = useState(true)

    useEffect(() => {
        (async () => {
            const allPosts = await getPosts(currentUser.id)
            setPosts(allPosts.posts.length)
        })()
    },[currentUser.id])

    useEffect(() => {
        (async () => {
            if(imgSrc && posts){
                setFileName(currentUser.fullname + posts.toString())
            }

        })()
    },[imgSrc])

    useEffect(() => {
        if(fileName){
            setImage(dataURLtoFile(imgSrc, fileName))
        }
    }, [fileName, imgSrc])

    // This file takes the base64 encoded data from the webcam, and converts it to a file to send to S3.
    const dataURLtoFile = (dataurl, filename) => {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type:mime});
    }

    const updateValue = (setfunc) => (e) => {
        setfunc(e.target.value)
    }

    const setPreviewHelper = () => {
        if (preview){
            setPreview(false)

        } else {
            setPreview(true)
        }
    }

    const capture = useCallback(
        () => {
            setImgSrc(webcamRef.current.getScreenshot())

        },[webcamRef])

    const submitImagePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", image)
        console.log(image)

        const newImage = await uploadImage(data)
        const imageUrl = newImage.output

        const post = await createPost( caption, imageUrl);
        if(!post.errors){
            setRedirect(true)

        } else {
            console.log('something went wrong', image)
        }
    }

    if(redirect){
        return <Redirect to={`/`} />
    }


    return (
        <div className="webcam_container">
            <div className="webcam_center">
                <div className="webcam_camera_container">
                    <Webcam
                    audio={false}
                    height={300}
                    width={300}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    />
                </div>
                <div className="webcam_capture_button">
                    <Button className="edit_button" color="primary" variant="contained" onClick={capture}>Capture Photo</Button>
                    {preview ? <Button className="edit_button" color="primary" variant="outlined" onClick={setPreviewHelper}>Hide Preview</Button> :
                        <Button className="edit_button" color="primary" variant="contained" onClick={setPreviewHelper}>Show Preview</Button>}
                </div>
            </div>
            <div className="webcam_caption">
                <form className="webcam_form" encType='multipart/formdata' onSubmit={submitImagePost}>
                    <TextField
                            name='caption'
                            type='text'
                            label="Caption"
                            variant="outlined"
                            placeholder='Tell us about your image...'
                            value={caption}
                            onChange={updateValue(setCaption)}
                            required
                            fullWidth
                            />
                    {/* <TextField fullWidth variant="outlined" type="file" name="user_file" required onChange={setImageHelper}/> */}
                    <Button className="edit_button" color="primary" variant="contained" type="submit">Post</Button>
                </form>
            </div>
            <div className="camera_image_preview">
                {preview && imgSrc &&
                (<div className="image_preview">
                    <div className="image_preview_header">Preview Photo</div>
                    <img
                    src={imgSrc}
                    height={400}
                    width={400}
                    />
                </div>)}
            </div>
        </div>
    )
}

export default WebcamComponent
