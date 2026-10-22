<template>
    <div class="mag-topline d-none d-md-block">
        <div class="container d-flex justify-content-between">
            <span>TẠP CHÍ SHOWBIZ & GIẢI TRÍ</span>
            <span>Tin sao · Phim ảnh · Âm nhạc</span>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark mag-navbar">
        <div class="container">
            <router-link class="navbar-brand" to="/" @click="closeMenu">
                <span class="brand-mark">M</span> MY BLOG
            </router-link>

            <button
                class="navbar-toggler"
                type="button"
                :aria-expanded="menuOpen"
                aria-controls="navbarMenu"
                :aria-label="menuOpen ? 'Đóng menu' : 'Mở menu'"
                @click="menuOpen = !menuOpen"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="navbarMenu" class="collapse navbar-collapse" :class="{ show: menuOpen }">
                <ul class="navbar-nav me-auto ms-lg-4">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" @click="closeMenu">
                            Trang chủ
                        </router-link>
                    </li>

                    <li v-if="isLogin" class="nav-item">
                        <router-link class="nav-link" to="/create-post" @click="closeMenu">
                            Đăng bài
                        </router-link>
                    </li>

                    <li v-if="isLogin" class="nav-item">
                        <router-link class="nav-link" to="/my-posts" @click="closeMenu">
                            Bài viết của tôi
                        </router-link>
                    </li>

                    <li v-if="isLogin" class="nav-item">
                        <router-link class="nav-link" to="/profile" @click="closeMenu">
                            Cá nhân
                        </router-link>
                    </li>
                </ul>

                <div v-if="!isLogin" class="d-flex flex-wrap gap-2 py-3 py-lg-0">
                    <router-link to="/login" class="btn btn-outline-light" @click="closeMenu">
                        Đăng nhập
                    </router-link>

                    <router-link
                        to="/register"
                        class="btn btn-light text-primary"
                        @click="closeMenu"
                    >
                        Đăng ký
                    </router-link>
                </div>

                <div
                    v-else
                    class="d-flex align-items-center flex-wrap gap-3 py-3 py-lg-0"
                >
                    <span class="text-white">
                        Xin chào, <strong>{{ username }}</strong>
                    </span>

                    <button class="btn btn-light text-primary" @click="logout">
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { getStoredUser, isAuthenticated, signOut } from '../utils/auth.js'

export default {
    data() {
        return {
            isLogin: false,
            username: '',
            menuOpen: false
        }
    },

    mounted() {
        this.checkLogin()
    },

    methods: {
        checkLogin() {
            const user = getStoredUser()
            this.isLogin = isAuthenticated()
            this.username = this.isLogin ? user.name || '' : ''
        },

        logout() {
            signOut()

            this.isLogin = false
            this.username = ''
            this.closeMenu()

            this.$router.push('/login')
        },

        closeMenu() {
            this.menuOpen = false
        }
    },

    watch: {
        '$route'() {
            this.closeMenu()
            this.checkLogin()
        }
    }
}
</script>
