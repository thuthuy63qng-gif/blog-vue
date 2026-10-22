<template>
    <div class="row justify-content-center py-3">
        <div class="col-lg-8">
            <div class="mb-4">
                <p class="mag-kicker">YOUR ACCOUNT</p>
                <h1 class="mag-heading">Hồ sơ cá nhân</h1>
                <p class="mag-subtitle">
                    Quản lý thông tin tài khoản My Blog của bạn.
                </p>
            </div>

            <div class="card shadow-sm">
                <div class="card-body p-md-4">
                    <div class="row g-4 align-items-start">
                        <div class="col-md-4 text-center">
                            <img
                                :src="avatar || defaultAvatar"
                                alt="Ảnh đại diện"
                                class="profile-avatar mb-3"
                                @error="handleAvatarError"
                            >

                            <h5 class="fw-bold mb-1">{{ name }}</h5>
                            <p class="text-secondary small">
                                Thành viên My Blog
                            </p>
                        </div>

                        <div class="col-md-8">
                                <div v-if="message" class="alert alert-success" role="status">
                                {{ message }}
                            </div>

                                <div v-if="error" class="alert alert-danger" role="alert">
                                {{ error }}
                            </div>

                            <form @submit.prevent="updateProfile">
                                <div class="mb-3">
                                    <label for="profile-name" class="form-label">Họ và tên</label>
                                    <input
                                        v-model.trim="name"
                                        id="profile-name"
                                        type="text"
                                        autocomplete="name"
                                        class="form-control"
                                        required
                                    >
                                </div>

                                <div class="mb-3">
                                    <label for="profile-email" class="form-label">Email</label>
                                    <input
                                        v-model="email"
                                        id="profile-email"
                                        type="email"
                                        autocomplete="email"
                                        class="form-control"
                                        required
                                    >
                                    <small class="text-secondary">
                                        Email mới sẽ được cập nhật ở bài viết và bình luận của bạn.
                                    </small>
                                </div>

                                <PasswordField
                                    id="profile-password"
                                    v-model="password"
                                    label="Mật khẩu mới"
                                    autocomplete="new-password"
                                    :minlength="6"
                                    placeholder="Để trống nếu không đổi mật khẩu"
                                />

                                <div class="mb-4">
                                    <label for="profile-avatar" class="form-label">
                                        Link ảnh đại diện
                                    </label>
                                    <input
                                        v-model.trim="avatar"
                                        id="profile-avatar"
                                        type="url"
                                        class="form-control"
                                        placeholder="https://example.com/avatar.jpg"
                                    >
                                </div>

                                <button type="submit" class="btn btn-primary">
                                    Lưu thông tin
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PasswordField from '../components/PasswordField.vue'
import { getStoredUser, isAuthenticated, saveUser, userEmailExists } from '../utils/auth.js'
import { readPosts, savePosts } from '../utils/blog.js'

export default {
    components: { PasswordField },

    data() {
        return {
            name: '',
            email: '',
            password: '',
            avatar: '',
            defaultAvatar: 'https://i.pravatar.cc/150?img=12',
            originalPassword: '',
            message: '',
            error: ''
        }
    },

    mounted() {
        if (!isAuthenticated()) {
            this.$router.push('/login')
            return
        }

        this.loadProfile()
    },

    methods: {
        loadProfile() {
            const user = getStoredUser()

            if (!user) {
                this.$router.push('/login')
                return
            }

            this.name = user.name || ''
            this.email = user.email || ''
            this.originalPassword = user.password || ''
            this.password = ''
            this.avatar = user.avatar || this.defaultAvatar
        },

        updateProfile() {
            this.message = ''
            this.error = ''

            const user = getStoredUser()

            if (!user) {
                this.error = 'Không tìm thấy tài khoản.'
                return
            }

            if (!this.name.trim()) {
                this.error = 'Vui lòng nhập họ và tên.'
                return
            }

            const originalEmail = user.email
            const nextEmail = this.email.trim().toLowerCase()
            if (!nextEmail) {
                this.error = 'Vui lòng nhập email.'
                return
            }

            if (nextEmail !== originalEmail.toLowerCase() && userEmailExists(nextEmail)) {
                this.error = 'Email này đã được tài khoản khác sử dụng.'
                return
            }

            if (this.password && this.password.length < 6) {
                this.error = 'Mật khẩu mới cần có ít nhất 6 ký tự.'
                return
            }

            user.name = this.name.trim()
            user.email = nextEmail
            user.password = this.password || this.originalPassword
            user.avatar = this.avatar || this.defaultAvatar

            if (!saveUser(user, originalEmail)) {
                this.error = 'Không thể lưu thông tin trên thiết bị này.'
                return
            }

            const posts = readPosts()
            posts.forEach(post => {
                if (post.email?.toLowerCase() === originalEmail.toLowerCase()) {
                    post.email = nextEmail
                    post.author = user.name
                }
                if (Array.isArray(post.comments)) {
                    post.comments.forEach(comment => {
                        if (comment.email?.toLowerCase() === originalEmail.toLowerCase()) {
                            comment.email = nextEmail
                            comment.author = user.name
                        }
                    })
                }
            })

            if (!savePosts(posts)) {
                saveUser({ ...user, email: originalEmail }, nextEmail)
                this.error = 'Không lưu được email mới vào bài viết. Thông tin tài khoản đã được hoàn tác.'
                return
            }

            this.email = nextEmail
            this.name = user.name
            this.originalPassword = user.password
            this.password = ''
            this.message = 'Cập nhật thông tin thành công!'
        },

        handleAvatarError(event) {
            event.target.onerror = null
            event.target.src = this.defaultAvatar
        }
    }
}
</script>
