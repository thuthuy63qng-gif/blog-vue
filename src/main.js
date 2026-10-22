import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { seedSamplePosts } from './utils/blog.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/blog.css'

seedSamplePosts()

createApp(App)
    .use(router)
    .mount('#app')
