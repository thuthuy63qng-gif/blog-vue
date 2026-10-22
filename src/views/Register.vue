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
                                <h2>Nơi câu chuyện của bạn được lắng nghe.</h2>
                                <p>Chia sẻ góc nhìn, khám phá câu chuyện mới và kết nối cùng những người cùng sở thích.</p>
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
                                <p class="mag-kicker">JOIN OUR COMMUNITY</p>
                                <h1 class="mag-heading mb-2">Tạo tài khoản</h1>
                                <p class="mag-subtitle mb-0">
                                    Đăng ký để viết bài và chia sẻ góc nhìn giải trí.
                                </p>
                            </div>

                            <div v-if="message" class="alert alert-success" role="status">
                                {{ message }}
                            </div>

                            <div v-if="error" class="alert alert-danger" role="alert">
                                {{ error }}
                            </div>

                            <form @submit.prevent="register">
                                <div class="mb-3">
                                    <label for="register-name" class="form-label">Họ và tên</label>
                                    <input
                                        id="register-name"
                                        v-model.trim="name"
                                        type="text"
                                        autocomplete="name"
                                        class="form-control"
                                        placeholder="Nhập họ và tên"
                                        required
                                    >
                                </div>

                                <div class="mb-3">
                                    <label for="register-email" class="form-label">Email</label>
                                    <input
                                        id="register-email"
                                        v-model.trim="email"
                                        type="email"
                                        autocomplete="email"
                                        class="form-control"
                                        placeholder="name@example.com"
                                        required
                                    >
                                </div>

                                <PasswordField
                                    id="register-password"
                                    v-model="password"
                                    label="Mật khẩu"
                                    autocomplete="new-password"
                                    :minlength="6"
                                    placeholder="Ít nhất 6 ký tự"
                                    required
                                />

                                <PasswordField
                                    id="register-confirm-password"
                                    v-model="confirmPassword"
                                    label="Nhập lại mật khẩu"
                                    autocomplete="new-password"
                                    wrapper-class="mb-4"
                                    placeholder="Nhập lại mật khẩu"
                                    required
                                />

                                <button type="submit" class="btn btn-primary w-100">
                                    Tạo tài khoản
                                </button>
                            </form>

                            <p class="text-center mt-4 mb-0">
                                Đã có tài khoản?
                                <router-link to="/login" class="fw-bold">
                                    Đăng nhập
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PasswordField from '../components/PasswordField.vue'
import { registerUser, userEmailExists } from '../utils/auth.js'

export default {
    components: { PasswordField },

    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            message: '',
            error: ''
        }
    },

    methods: {
        register() {
            this.message = ''
            this.error = ''

            if (
                !this.name ||
                !this.email ||
                !this.password ||
                !this.confirmPassword
            ) {
                this.error = 'Vui lòng nhập đầy đủ thông tin.'
                return
            }

            if (this.password.length < 6) {
                this.error = 'Mật khẩu cần có ít nhất 6 ký tự.'
                return
            }

            if (this.password !== this.confirmPassword) {
                this.error = 'Mật khẩu nhập lại không khớp.'
                return
            }

            if (userEmailExists(this.email)) {
                this.error = 'Email này đã được đăng ký.'
                return
            }

            const user = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            if (!registerUser(user)) {
                this.error = 'Không thể lưu tài khoản trên thiết bị này.'
                return
            }

            this.message = 'Đăng ký thành công! Đang chuyển đến đăng nhập...'

            setTimeout(() => {
                this.$router.push('/login')
            }, 1000)
        }
    }
}
</script>
