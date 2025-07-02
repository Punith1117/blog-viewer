const URL = 'http://localhost:3000'

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