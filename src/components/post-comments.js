export const postComments = (comments) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'post-comments'
    const heading = document.createElement('h4')
    heading.textContent = 'Comments'
    comments.forEach(comment => {
        const commentDiv = document.createElement('div')
        commentDiv.className = 'comment'
            const content = document.createElement('p')
            content.textContent = comment.content
            content.className = 'content'
            const username = document.createElement('p')
            username.textContent = comment.user.username
            username.className = 'username'
        commentDiv.appendChild(heading)
        commentDiv.appendChild(content)
        commentDiv.appendChild(username)
        wrapper.appendChild(commentDiv)
    })
    return wrapper
}