import { addComment, deleteComment } from "../apiQueries"
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
        commentDiv.dataset.id = comment.id
            const content = document.createElement('p')
            content.textContent = comment.content
            content.className = 'content'
            const username = document.createElement('p')
            username.textContent = comment.user.username
            username.className = 'username'
            let deleteButton
            if (data.isAuthenticated && (data.username === comment.user.username)) {
                deleteButton = document.createElement('button')
                deleteButton.textContent = 'Delete'
                deleteButton.className = 'delete'
                deleteButton.addEventListener('click', async () => {
                    try {
                        await deleteComment(getJwt(), comment.id)
                        await redirect('view-post', {postId: data.postId, redirectPage: data.redirectPage})
                    } catch (e) {
                        destroyJwt()
                        destroyUsername()
                        redirect('view-post', {postId: data.postId, redirectPage: data.redirectPage})
                    }
                })
            }
        commentDiv.appendChild(content)
        commentDiv.appendChild(username)
        if (deleteButton != undefined)
            commentDiv.appendChild(deleteButton)
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
        conditionalDiv.appendChild(signupLoginButtons({redirectPage: 'view-post', postId: data.postId, rootRedirectPage: data.redirectPage}))
    }
    wrapper.appendChild(conditionalDiv)
    return wrapper
}