import React from 'react'
import {Link} from 'react-router-dom'

const DisplayComments = ({comment}) => {
    return (
        <div className="display_comments" key={comment.id}>
            <Link className="display_comments_router" to={`/user/${comment.user.id}`}>
                <img className='comment_image' src={comment.user.profilePicture} alt=""/>
                {comment.user.username}
            </Link>

            <div>{comment.message}</div>
        </div>
    )

}

export default DisplayComments
