// Sends a request to create a commentt
export const createComment = async (message, postId, userId) => {
    const response = await fetch('/api/comments/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message,
            postId,
            userId
        })
    })
    const comment = await response.json()
    return comment
}

// Sends a request to retrieve comments for a single post
export const getComments = async (postId) => {
    const response = await fetch(`/api/comments/post/${postId}`)
    return await response.json()
}
