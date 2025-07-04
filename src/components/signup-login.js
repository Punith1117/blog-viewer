import { loginQuery, signupQuery } from "../apiQueries"
import { redirect } from "../redirect"
import { saveJwt, saveUsername } from "../utilities"

export const signupLogin = (name, data) => {
    const wrapper = document.createElement('form')
    wrapper.className = `${name}-form`
        const heading = document.createElement('h3')
        heading.textContent = name
        let message
        if (data.message != undefined) {
            message = document.createElement('p')
            message.textContent = data.message
        }
        const usernameLabel = document.createElement('label')
        usernameLabel.textContent = 'Username: '
        usernameLabel.className = 'username-label'
            const username = document.createElement('input')
            username.type = 'text'
            username.name = 'username'
            username.required = 'true'
        usernameLabel.appendChild(username)
        const passwordLabel = document.createElement('label')
        passwordLabel.textContent = 'Password: '
        passwordLabel.className = 'password-label'
            const password = document.createElement('input')
            password.type = 'password'
            password.name = 'password'
            password.required = 'true'
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
    wrapper.addEventListener('submit', async (e) => {
        e.preventDefault()
        let res
        if (name == 'login') {
            try {
                res = await loginQuery(username.value, password.value)
                saveJwt(res.token)
                saveUsername(res.user.username)
                await redirect(data.redirectPage, {...data, redirectPage: data.rootRedirectPage})
            } catch (e) {
                redirect('login', {
                    ...data,
                    message: e.message
                })
            }
        } else {
            try {
                res = await signupQuery(username.value, password.value)
                console.log(res)
                await redirect('login', data)
            } catch (e) {
                redirect('signup', {
                    ...data,
                    message: e.message
                })
            }
        }
    })
    wrapper.appendChild(heading)
    if (message != undefined) {
        wrapper.appendChild(message)
    }
    wrapper.appendChild(usernameLabel)
    wrapper.appendChild(passwordLabel)
    wrapper.appendChild(buttons)
    return wrapper
}