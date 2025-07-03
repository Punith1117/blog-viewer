import { deleteComment } from "../apiQueries"
import { redirect } from "../redirect"
import { getJwt } from "../utilities"

export const myComments = (comments) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'my-comments'
    comments.forEach(comment => {
        const commentDiv = document.createElement('div')
        commentDiv.className = 'comment'
        commentDiv.dataset.id = comment.id
            const content = document.createElement('p')
            content.className = 'content'
            content.textContent = comment.content
            const utilities = document.createElement('div')
            utilities.className = 'utilities'
                const deleteButton = document.createElement('button')
                deleteButton.className = 'delete'
                deleteButton.textContent = 'delete'
                deleteButton.addEventListener('click', async () => {
                    await deleteComment(getJwt(), comment.id)
                    await redirect('my-comments')
                })
                const viewPostButton = document.createElement('button')
                viewPostButton.className = 'view-post'
                viewPostButton.textContent = 'view post'
                viewPostButton.addEventListener('click', async () => {
                    await redirect('view-post', {postId: comment.postId, redirectPage: 'my-comments'})
                })
            utilities.appendChild(deleteButton)
            utilities.appendChild(viewPostButton)
        commentDiv.appendChild(content)
        commentDiv.appendChild(utilities)
        wrapper.appendChild(commentDiv)
    })
    return wrapper
}