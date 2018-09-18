import BlogPost from "../components/BlogPost.vue";
import BlogFeed from "../components/BlogFeed.vue";
import About from "../components/About.vue";

export default [
    { path: '/about', component: About },
    { path: '/', component: BlogFeed },
    { path: '*', redirect: '/' },
    { path: '/read/:post', props: true, component: BlogPost }
]