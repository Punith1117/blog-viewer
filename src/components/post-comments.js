import { addComment } from "../apiQueries"
import { redirect } from "../redirect"
import { destroyJwt, destroyUsername, getJwt } from "../utilities"
import { signupLoginButtons } from "./signup-login-buttons"

export const postComments = (comments, data) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'post-comments'
    const heading = document.createElement('h4')
    heading.textContent = 'Comments'
    wrapper.appendChild(heading)
    comments.forEach(comment => {
        const commentDiv = document.createElement('div')
        commentDiv.className = 'comment'
            const content = document.createElement('p')
            content.textContent = comment.content
            content.className = 'content'
            const username = document.createElement('p')
            username.textContent = comment.user.username
            username.className = 'username'
        commentDiv.appendChild(content)
        commentDiv.appendChild(username)
        wrapper.appendChild(commentDiv)
    })
    let conditionalDiv // allow the user to add comment if authenticated
    if (data.isAuthenticated) {
        conditionalDiv = document.createElement('form')
        conditionalDiv.className = 'comment-form'
            const comment = document.createElement('input')
            comment.type = 'text'
            comment.className = 'comment'
            comment.name = 'comment'
            comment.required = 'true'
            comment.placeholder = 'Enter your opinion...'
            const submitButton = document.createElement('button')
            submitButton.type = 'submit'
            submitButton.textContent = 'Submit'
            submitButton.className = 'submit'
        conditionalDiv.addEventListener('submit', async (e) => {
            e.preventDefault()
            let form = e.target
            let comment = form.elements['comment'].value
            try {
                await addComment(getJwt(), {
                    postId: data.postId,
                    content: comment
                })
            } catch (e) {
                destroyJwt()
                destroyUsername()
                redirect('view-post', data)
            }
            redirect('view-post', data)
        })
        conditionalDiv.appendChild(comment)
        conditionalDiv.appendChild(submitButton)
    } else {
        conditionalDiv = document.createElement('div')
        conditionalDiv.className = 'comment-div'
            const comment = document.createElement('input')
            comment.type = 'text'
            comment.className = 'comment'
            comment.placeholder = 'Login to comment...'
        conditionalDiv.appendChild(comment)
        conditionalDiv.appendChild(signupLoginButtons({redirectPage: 'view-post', postId: data.postId}))
    }
    wrapper.appendChild(conditionalDiv)
    return wrapper
}