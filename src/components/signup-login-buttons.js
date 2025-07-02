import { redirect } from "../redirect"

export const signupLoginButtons = (data) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'signup-login-buttons'
        const signupButton = document.createElement('button')
        const loginButton = document.createElement('button')
        signupButton.textContent = 'Sign up'
        loginButton.textContent = 'Log in'
        signupButton.addEventListener('click', () => redirect('signup', data))
        loginButton.addEventListener('click', () => redirect('login', data))
    wrapper.appendChild(signupButton)
    wrapper.appendChild(loginButton)
    return wrapper
}