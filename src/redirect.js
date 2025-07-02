import { getAllPostsQuery, getPostCommentsQuery, getPostQuery } from "./apiQueries"
import { allPosts } from "./components/posts"
import htmlTruncate from 'html-truncate'
import { viewPost } from "./components/view-post"
import { postComments } from "./components/post-comments"

export const redirect = async (page, data) => {
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
        case 'view-post':
            let post = await getPostQuery(data.id)
            let comments = await getPostCommentsQuery(data.id)
            main.replaceChildren(viewPost(post), postComments(comments))
            break
        default:
            main.textContent = 'This page does not exit'
    }
}