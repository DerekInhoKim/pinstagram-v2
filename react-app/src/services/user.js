// Returns a user's info
export const getUser = async(userId) => {
    const response = await fetch(`/api/users/${userId}`)
    return await response.json()

}

// Returns a user's followers
export const getUserFollowers = async(userId) => {
    const response = await (fetch(`/api/users/follow/${userId}`))
    return await response.json()
}

// Updates the user info's profile picture
export const setPicture = async(imageUrl) => {
    const response = await fetch('/api/users/profilePicture', {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profilePicture: imageUrl
        })
    })
    return await response.json()
}
