import { getAllPostsQuery, getPostCommentsQuery, getPostQuery } from "./apiQueries"
import { allPosts } from "./components/posts"
import htmlTruncate from 'html-truncate'
import { viewPost } from "./components/view-post"
import { postComments } from "./components/post-comments"
import { signupLogin } from "./components/signup-login"
import { destroyJwt, destroyUsername, getJwt } from "./utilities"

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
            let post = await getPostQuery(data.postId)
            let comments = await getPostCommentsQuery(data.postId)
            main.replaceChildren(viewPost(post), postComments(comments, {
                postId: data.postId,
                isAuthenticated: (getJwt() === null) ? false : true
            }))
            break
        case 'login':
            destroyJwt()
            destroyUsername()
            main.replaceChildren(signupLogin('login', data))
            break
        case 'signup':
            destroyJwt()
            destroyUsername()
            main.replaceChildren(signupLogin('signup', data))
            break
        default:
            main.textContent = 'This page does not exit'
    }
}