const URL = 'http://localhost:3000'

export const getAllPostsQuery = async () => {
    const { posts } = await fetch(`${URL}/post`)
        .then(res => res.json())
    return posts
}