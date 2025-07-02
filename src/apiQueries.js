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