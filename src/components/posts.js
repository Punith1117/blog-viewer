export const allPosts = (posts) => {
    const allPostsDiv = document.createElement('div')
    allPostsDiv.className = 'posts'
    posts.forEach(post => {
        const postDiv = document.createElement('div')
        postDiv.className = 'post'
            const title = document.createElement('h3')
            title.textContent = post.title
            title.className = 'title'
            const content = document.createElement('div')
            content.innerHTML = post.content
            content.className = 'content'
            const username = document.createElement('p')
            username.textContent = post.user.username
            username.className = 'username'
            const viewButton = document.createElement('button')
            viewButton.textContent = 'view'
            viewButton.className = 'view'
        postDiv.appendChild(title)
        postDiv.appendChild(content)
        postDiv.appendChild(username)
        postDiv.appendChild(viewButton)
        allPostsDiv.appendChild(postDiv)
    })
    return allPostsDiv
}