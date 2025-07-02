import { getAllPostsQuery } from "./apiQueries"
import { allPosts } from "./components/posts"
import htmlTruncate from 'html-truncate'

export const redirect = async (page) => {
    const main = document.querySelector('main')
    switch (page) {
        case 'posts':
            let posts = await getAllPostsQuery()
            posts = posts.map(post => {
                return {
                    ...post,
                    content: htmlTruncate(post.content, 100)
                }
            })
            main.replaceChildren(allPosts(posts))
            break
        default:
            main.textContent = 'This page does not exit'
    }
}