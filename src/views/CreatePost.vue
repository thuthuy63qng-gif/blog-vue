<template>
    <div class="row justify-content-center py-3">
        <div class="col-lg-9">
            <div class="mb-4">
                <p class="mag-kicker">CONTRIBUTE TO THE JOURNAL</p>
                <h1 class="mag-heading">Viết bài mới</h1>
                <p class="mag-subtitle">
                    Chia sẻ một ý tưởng hay với cộng đồng My Blog.
                </p>
            </div>

            <div class="card shadow-sm">
                <div class="card-header bg-white">
                    <h5 class="mb-0">Nội dung bài viết</h5>
                </div>

                <div class="card-body">
                    <div v-if="error" class="alert alert-danger" role="alert">
                        {{ error }}
                    </div>

                    <div v-if="draftMessage" class="alert alert-info" role="status">
                        {{ draftMessage }}
                    </div>

                    <form @submit.prevent="createPost">
                        <div class="mb-3">
                            <label for="post-title" class="form-label">Tiêu đề bài viết</label>
                            <input
                                v-model.trim="title"
                                id="post-title"
                                type="text"
                                class="form-control"
                                placeholder="Nhập tiêu đề hấp dẫn..."
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <label for="post-image" class="form-label">Link hình ảnh</label>
                            <input
                                v-model.trim="image"
                                id="post-image"
                                type="url"
                                class="form-control"
                                placeholder="https://example.com/image.jpg"
                            >
                            <small class="text-secondary">
                                Dùng đường dẫn trực tiếp tới file ảnh, không dùng link trang Pinterest.
                            </small>
                        </div>

                        <div v-if="image" class="mb-4">
                            <p class="form-label">Xem trước hình ảnh</p>
                            <img
                                :src="image"
                                alt="Xem trước ảnh bài viết"
                                class="article-cover rounded"
                                style="max-height: 320px;"
                                @error="imagePreviewError = true"
                                @load="imagePreviewError = false"
                            >
                            <p
                                v-if="imagePreviewError"
                                class="text-danger small mt-2 mb-0"
                            >
                                Không tải được ảnh. Hãy kiểm tra lại link.
                            </p>
                        </div>

                        <div class="mb-4">
                            <label for="post-content" class="form-label">Nội dung</label>
                            <textarea
                                v-model.trim="content"
                                id="post-content"
                                class="form-control"
                                rows="10"
                                placeholder="Bắt đầu viết nội dung của bạn..."
                                required
                            ></textarea>
                            <div class="d-flex justify-content-between mt-2 text-secondary small">
                                <span>{{ wordCount }} từ · khoảng {{ readingMinutes }} phút đọc</span>
                                <span>Gợi ý: chia nội dung thành các đoạn ngắn để dễ đọc.</span>
                            </div>
                        </div>

                        <div class="d-flex flex-wrap gap-2">
                            <button type="submit" class="btn btn-primary">
                                Đăng bài viết
                            </button>

                            <button
                                type="button"
                                class="btn btn-outline-secondary"
                                @click="resetForm"
                            >
                                Làm lại
                            </button>

                            <router-link
                                to="/"
                                class="btn btn-light border"
                            >
                                Hủy
                            </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { readPosts, savePosts, getReadingMinutes } from '../utils/blog.js'
import { getStoredUser, isAuthenticated } from '../utils/auth.js'

export default {
    data() {
        return {
            title: '',
            image: '',
            content: '',
            error: '',
            imagePreviewError: false,
            draftReady: false,
            draftMessage: ''
        }
    },

    computed: {
        wordCount() {
            return this.content.trim().split(/\s+/).filter(Boolean).length
        },

        readingMinutes() {
            return getReadingMinutes(this.content)
        }
    },

    mounted() {
        this.restoreDraft()
    },

    watch: {
        title() { this.saveDraft() },
        image() { this.saveDraft() },
        content() { this.saveDraft() }
    },

    methods: {
        draftKey() {
            const user = getStoredUser()
            return user?.email ? `myBlogPostDraft:${user.email}` : null
        },

        restoreDraft() {
            const key = this.draftKey()

            if (key) {
                try {
                    const draft = JSON.parse(localStorage.getItem(key) || 'null')
                    if (draft && typeof draft === 'object') {
                        this.title = draft.title || ''
                        this.image = draft.image || ''
                        this.content = draft.content || ''
                        if (this.title || this.image || this.content) {
                            this.draftMessage = 'Đã khôi phục bản nháp được lưu trên thiết bị này.'
                        }
                    }
                } catch {
                    localStorage.removeItem(key)
                }
            }

            this.draftReady = true
        },

        saveDraft() {
            if (!this.draftReady) return

            const key = this.draftKey()
            if (!key) return

            if (!this.title && !this.image && !this.content) {
                localStorage.removeItem(key)
                this.draftMessage = ''
                return
            }

            try {
                localStorage.setItem(key, JSON.stringify({
                    title: this.title,
                    image: this.image,
                    content: this.content
                }))
                this.draftMessage = 'Bản nháp được tự động lưu trên thiết bị này.'
            } catch {
                this.draftMessage = 'Không thể lưu bản nháp. Thiết bị có thể đã hết dung lượng lưu trữ.'
            }
        },

        createPost() {
            this.error = ''

            if (!this.title || !this.content) {
                this.error = 'Vui lòng nhập tiêu đề và nội dung.'
                return
            }

            if (!isAuthenticated()) {
                this.$router.push('/login')
                return
            }

            const user = getStoredUser()
            if (!user) {
                this.error = 'Không tìm thấy tài khoản. Vui lòng đăng nhập lại.'
                return
            }

            const posts = readPosts()

            const newPost = {
                id: Date.now(),
                title: this.title,
                content: this.content,
                image: this.image ||
                    'https://placehold.co/1000x600/eaf2ff/12336b?text=MY+BLOG',
                author: user.name,
                email: user.email,
                date: new Date().toLocaleString('vi-VN'),
                comments: [],
                likes: []
            }

            posts.push(newPost)

            if (!savePosts(posts)) {
                this.error = 'Không thể lưu bài viết trên thiết bị này.'
                return
            }
            this.clearDraft()

            alert('Đăng bài thành công!')
            this.$router.push('/')
        },

        resetForm() {
            if ((this.title || this.image || this.content) &&
                !confirm('Xóa nội dung hiện tại và bản nháp đã lưu?')) {
                return
            }

            this.title = ''
            this.image = ''
            this.content = ''
            this.error = ''
            this.imagePreviewError = false
            this.clearDraft()
        },

        clearDraft() {
            const key = this.draftKey()
            if (key) localStorage.removeItem(key)
            this.draftMessage = ''
        }
    }
}
</script>
