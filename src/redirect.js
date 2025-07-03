import { getAllPostsQuery, getMyComments, getPostCommentsQuery, getPostQuery } from "./apiQueries"
import { allPosts } from "./components/posts"
import htmlTruncate from 'html-truncate'
import { viewPost } from "./components/view-post"
import { postComments } from "./components/post-comments"
import { signupLogin } from "./components/signup-login"
import { destroyJwt, destroyUsername, getJwt, getUsername } from "./utilities"
import { signupLoginButtons } from "./components/signup-login-buttons"
import { myComments } from "./components/my-comments"

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
            main.replaceChildren(viewPost(post, {redirectPage: data.redirectPage}), postComments(comments, {
                postId: data.postId,
                isAuthenticated: (getJwt() === null) ? false : true,
                username: getUsername()
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
        case 'my-comments':
            try {
                const comments = await getMyComments(getJwt())
                main.replaceChildren(myComments(comments))
            } catch (e) {
                main.replaceChildren(signupLoginButtons({
                    redirectPage: 'my-comments'
                }))
            }
            break
        default:
            main.textContent = 'This page does not exit'
    }
}