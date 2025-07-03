import { getAllPostsQuery, getMyComments, getPostCommentsQuery, getPostQuery } from "./apiQueries"
import { allPosts } from "./components/posts"
import htmlTruncate from 'html-truncate'
import { viewPost } from "./components/view-post"
import { postComments } from "./components/post-comments"
import { signupLogin } from "./components/signup-login"
import { destroyJwt, destroyUsername, getJwt, getUsername } from "./utilities"
import { signupLoginButtons } from "./components/signup-login-buttons"
import { myComments } from "./components/my-comments"
import { displayLoading } from "./components/loading"

export const redirect = async (page, data) => {
    displayLoading()
    const main = document.querySelector('main')
    switch (page) {
        case 'posts':
            handleUserDiv()
            handleNavClass('posts')
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
            handleUserDiv()
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
            handleUserDiv()
            handleNavClass('my-comments')
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

const handleUserDiv = () => {
    let userDiv
    if (getUsername() !== null) {
        userDiv = document.querySelector('.authenticated-user')
        userDiv.innerHTML = ''
            let userGreeting = document.createElement('p')
            userGreeting.textContent = 'Welcome, ' + getUsername()
            let logoutButton = document.createElement('button')
            logoutButton.textContent = 'logout'
            logoutButton.addEventListener('click', async () => {
                destroyUsername()
                destroyJwt()
                await redirect('posts')
            })
        userDiv.appendChild(userGreeting)
        userDiv.appendChild(logoutButton)
    } else {
        userDiv = document.querySelector('.authenticated-user')
        userDiv.innerHTML = ''
    }
}

const handleNavClass = (page) => {
    let postsButton = document.querySelector('.posts-button')
    let myCommentsButton = document.querySelector('.my-comments-button')
    if (page == 'posts') {
        postsButton.classList.add('on-this-tab')
        myCommentsButton.classList.remove('on-this-tab')
    } else {
        myCommentsButton.classList.add('on-this-tab')
        postsButton.classList.remove('on-this-tab')
    }
}