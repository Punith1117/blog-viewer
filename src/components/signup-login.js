import { redirect } from "../redirect"

export const signupLogin = (name, data) => {
    const wrapper = document.createElement('form')
    wrapper.className = `${name}-form`
        const heading = document.createElement('h3')
        heading.textContent = name
        const usernameLabel = document.createElement('label')
        usernameLabel.textContent = 'Username: '
        usernameLabel.className = 'username-label'
            const username = document.createElement('input')
            username.type = 'text'
            username.name = 'username'
        usernameLabel.appendChild(username)
        const passwordLabel = document.createElement('label')
        passwordLabel.textContent = 'Password: '
        passwordLabel.className = 'password-label'
            const password = document.createElement('input')
            password.type = 'password'
            password.name = 'password'
        passwordLabel.appendChild(password)
        const buttons = document.createElement('div')
        buttons.className = 'buttons'
            const backButton = document.createElement('button')
            backButton.textContent = 'Back'
            backButton.className = 'back'
            backButton.type = 'button'
            backButton.addEventListener('click', async () => await redirect(data.redirectPage, data))
            const submitButton = document.createElement('button')
            submitButton.textContent = name
            submitButton.className = name
            submitButton.type = 'submit'
        buttons.appendChild(backButton)
        buttons.appendChild(submitButton)
    wrapper.appendChild(heading)
    wrapper.appendChild(usernameLabel)
    wrapper.appendChild(passwordLabel)
    wrapper.appendChild(buttons)
    return wrapper
}