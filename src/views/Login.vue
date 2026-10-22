<template>
    <div class="row justify-content-center py-4">
        <div class="col-xl-10">
            <div class="card shadow-sm auth-card">
                <div class="row g-0">
                    <div class="col-lg-5">
                        <div class="auth-visual">
                            <img
                                src="https://images.unsplash.com/photo-1579829984491-b0460ee17cae?auto=format&fit=crop&w=1400&q=85"
                                alt="Khán giả cùng thưởng thức buổi hòa nhạc dưới ánh đèn sân khấu"
                            >
                            <div class="auth-visual-copy">
                                <p class="auth-visual-kicker">MY BLOG · CỘNG ĐỒNG GIẢI TRÍ</p>
                                <h2>Rất vui vì bạn đã quay lại.</h2>
                                <p>Đăng nhập để tiếp tục đọc, trò chuyện và chia sẻ góc nhìn của bạn.</p>
                                <a
                                    class="auth-photo-credit"
                                    href="https://unsplash.com/es/fotos/personas-en-un-concierto-durante-la-noche-1wGQdP5aBWE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ảnh: Travis Colbert / Unsplash
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-7">
                        <div class="auth-form">
                            <div class="mb-4">
                                <p class="mag-kicker">WELCOME BACK</p>
                                <h1 class="mag-heading mb-2">Đăng nhập</h1>
                                <p class="mag-subtitle mb-0">
                                    Tiếp tục khám phá những bài viết thú vị.
                                </p>
                            </div>

                            <div v-if="error" class="alert alert-danger" role="alert">
                                {{ error }}
                            </div>

                            <form @submit.prevent="login">
                                <div class="mb-3">
                                    <label for="login-email" class="form-label">Email</label>
                                    <input
                                        id="login-email"
                                        v-model.trim="email"
                                        type="email"
                                        autocomplete="username"
                                        class="form-control"
                                        placeholder="name@example.com"
                                        required
                                    >
                                </div>

                                <PasswordField
                                    id="login-password"
                                    v-model="password"
                                    label="Mật khẩu"
                                    autocomplete="current-password"
                                    wrapper-class="mb-4"
                                    placeholder="Nhập mật khẩu"
                                    required
                                />

                                <button type="submit" class="btn btn-primary w-100">
                                    Đăng nhập
                                </button>
                            </form>

                            <div class="text-center mt-4">
                                <span class="text-secondary">Chưa có tài khoản?</span>
                                <router-link to="/register" class="fw-bold ms-1">
                                    Đăng ký ngay
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PasswordField from '../components/PasswordField.vue'
import { findUserByEmail, signIn } from '../utils/auth.js'

export default {
    components: { PasswordField },

    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },

    methods: {
        login() {
            this.error = ''

            const user = findUserByEmail(this.email)

            if (!user) {
                this.error = 'Tài khoản chưa được đăng ký.'
                return
            }

            if (this.password === user.password) {
                if (!signIn(user)) {
                    this.error = 'Không thể đăng nhập trên thiết bị này.'
                    return
                }

                const redirect = this.$route.query.redirect
                const destination = typeof redirect === 'string' &&
                    redirect.startsWith('/') &&
                    !redirect.startsWith('//')
                    ? redirect
                    : '/'

                this.$router.push(destination)
            } else {
                this.error = 'Email hoặc mật khẩu không đúng.'
            }
        }
    }
}
</script>
