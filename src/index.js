import { redirect } from "./redirect";
import "./styles/reset.css";

(async () => await redirect('posts'))()

document.querySelector('.posts-button')
    .addEventListener('click', () => redirect('posts'))
document.querySelector('.my-comments-button')
    .addEventListener('click', () => redirect('my-comments'))