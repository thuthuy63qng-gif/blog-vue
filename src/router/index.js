import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PostDetail from '../views/PostDetail.vue'
import CreatePost from '../views/CreatePost.vue'
import EditPost from '../views/EditPost.vue'
import MyPosts from '../views/MyPosts.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'
import { isAuthenticated } from '../utils/auth.js'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/post/:id', component: PostDetail },
    {
        path: '/create-post',
        component: CreatePost,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-post/:id',
        component: EditPost,
        meta: { requiresAuth: true }
    },
    {
        path: '/my-posts',
        component: MyPosts,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(to => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        return {
            path: '/login',
            query: { redirect: to.fullPath }
        }
    }
})

export default router
