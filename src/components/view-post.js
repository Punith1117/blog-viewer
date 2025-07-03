import { redirect } from "../redirect"

export const viewPost = (post, data) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'view-post'
        const title = document.createElement('h3')
        title.textContent = post.title
        title.className = 'title'
        const content = document.createElement('div')
        content.innerHTML = post.content
        content.className = 'content'
        const username = document.createElement('p')
        username.textContent = post.user.username
        username.className = 'username'
        const backButton = document.createElement('button')
        backButton.textContent = 'back'
        backButton.className = 'back-button'
        backButton.addEventListener('click', () => redirect(data.redirectPage))
    wrapper.appendChild(title)
    wrapper.appendChild(content)
    wrapper.appendChild(username)
    wrapper.appendChild(backButton)
    return wrapper
}