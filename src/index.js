import { redirect } from "./redirect";
import "./styles/reset.css";
import "./styles/header-nav.css";
import "./styles/posts.css";
import "./styles/view-post-comments.css";

(async () => await redirect('posts'))()

document.querySelector('.posts-button')
    .addEventListener('click', () => redirect('posts'))
document.querySelector('.my-comments-button')
    .addEventListener('click', () => redirect('my-comments'))