const URL = 'https://blog-api-p64x.onrender.com'

export const getAllPostsQuery = async () => {
    const { posts } = await fetch(`${URL}/post`)
        .then(res => res.json())
    return posts
}

export const getPostQuery = async (id) => {
    const { posts } = await fetch(`${URL}/post/${id}`)
        .then(res => res.json())
    return posts
}

export const getPostCommentsQuery = async (id) => {
    const { comments } = await fetch(`${URL}/post/${id}/comment`)
        .then(res => res.json())
    return comments
}

export const loginQuery = async (username, password) => {
    return await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(async res => {
        if (!res.ok) {
            res = await res.json()
            throw new Error(res.message)
        }
        return res.json()
    })
}

export const signupQuery = async (username, password) => {
    await fetch(`${URL}/auth/signup`, {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(async res => {
        if (!res.ok) {
            res = await res.json()
            throw new Error(res.message)
        }
        return await res.json()
    })
}


export const addComment = async (token, commentDetails) => {
    await fetch(`${URL}/user/me/comment`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId: commentDetails.postId,
            content: commentDetails.content
        })
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.status)
        }
    })
}

export const deleteComment = async (token, commentId) => {
    await fetch(`${URL}/user/me/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.status)
        }
    })
}

export const getMyComments = async (token) => {
    const {comments} = await fetch(`${URL}/user/me/comment`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        if (!res.ok)
            throw new Error(res.status)
        return res.json()
    })
    
    return comments
}