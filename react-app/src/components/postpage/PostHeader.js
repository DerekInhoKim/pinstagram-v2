import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {isFollowing, followUser} from '../../services/following'
import {deletePost} from '../../services/post'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles({
    buttonStyle: {
        fontWeight: "bold",
        color: "black",
        marginLeft: "1rem"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'gray',
        border: '2px solid #000',
    },
})


const PostHeader = () => {
    const currentUser = useSelector(state => state.users.user)
    const postUser = useSelector(state => state.postUser)
    const post = useSelector(state => state.posts)
    const [following, setFollowing] = useState(false)
    const [isFollowingState, setIsFollowingState] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const history = useHistory()

    const classes = useStyles()

    useEffect(() => {
        (async () => {
            const followingResponse = await isFollowing(currentUser.id, postUser.id)
            setFollowing(followingResponse.following)
        })()
    }, [postUser.id, isFollowingState])

    // Sends a request to create a new following between two users
    // isFollowingState is used to prevent infinite loop in the use effect when the following status is changed
    const handleFollow = async () => {
        const followingStatus = await followUser(currentUser.id, postUser.id)
        setIsFollowingState(followingStatus)
    }

    // Handles the display of the delete button
    const showDelete =  () => {
        setDeleteModal(true)
    }

    // Handles the display of the delete button
    const hideDelete = () => {
        setDeleteModal(false)
    }

    const handleDelete = async () => {
        debugger
        const deleteResponse = await deletePost(post.id)
        if(deleteResponse.message === 'success'){
            history.push("/")
        }
    }

    return (
        <div className="post_header">
            <div className="post_center">
                <div className="post_links">
                    <Link to={`/user/${postUser.id}`}>
                        <img className="post_header_image" src={postUser.profilePicture} alt=""/>
                    </Link>
                    <Link to={`/user/${postUser.id}`}>
                        <div className="post_header_username">{postUser.username}</div>
                    </Link>

                </div>
                {(currentUser.id !== postUser.id) ? <div>{following ?
                    <Button className={classes.buttonStyle} onClick={handleFollow}>Following</Button> :
                    <Button className={classes.buttonStyle} onClick={handleFollow}>Follow</Button>}
                </div> : ''}
                {currentUser.id === postUser.id ?
                    <div >
                        <Button className={classes.buttonStyle} onClick={showDelete}>Delete</Button>
                        <Modal
                        open={deleteModal}
                        onClose={hideDelete}
                        aria-labelledby="server-modal-title"
                        aria-describedby="server-modal-description"
                        >
                            <div className={classes.paper}>
                                <Button onClick={handleDelete}>Yes</Button>
                                <Button onClick={hideDelete}>No</Button>
                            </div>
                        </Modal>
                    </div> : ""}

            </div>

        </div>
    )
}

export default PostHeader
