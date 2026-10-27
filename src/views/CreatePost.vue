<template>
    <div class="row justify-content-center py-3">
        <div class="col-xl-10 col-lg-11 create-post-page">
            <div class="mb-4">
                <p class="mag-kicker">TẠO BÀI VIẾT</p>
                <h1 class="mag-heading">Viết bài mới</h1>
                <p class="mag-subtitle">
                    Chia sẻ câu chuyện và góc nhìn của bạn với cộng đồng My Blog.
                </p>
            </div>

            <div class="card shadow-sm create-post-card">
                <div class="card-header bg-white create-post-card-header">
                    <span class="create-post-icon" aria-hidden="true">✎</span>
                    <div>
                        <h5 class="mb-1">Thông tin bài viết</h5>
                        <p class="mb-0 small text-secondary">Tiêu đề, ảnh bìa và nội dung</p>
                    </div>
                </div>

                <div class="card-body">
                    <div v-if="error" class="alert alert-danger" role="alert">
                        {{ error }}
                    </div>
                    <p class="small text-secondary mb-3" aria-live="polite">
                        {{ draftStatus || 'Bản nháp được lưu tự động trên thiết bị này.' }}
                    </p>

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

                        <div class="row g-3 mb-3">
                            <div class="col-md-7">
                                <label for="post-image" class="form-label">Link ảnh bìa <span class="text-secondary fw-normal">(không bắt buộc)</span></label>
                                <input
                                    v-model.trim="image"
                                    id="post-image"
                                    type="url"
                                    class="form-control"
                                    placeholder="https://example.com/image.jpg"
                                    @input="removeUploadedImage"
                                >
                            </div>
                            <div class="col-md-5">
                                <label for="post-image-file" class="form-label">Hoặc chọn ảnh từ máy</label>
                                <input id="post-image-file" ref="imageFile" type="file" accept="image/*" class="form-control create-image-file" @change="handleImageUpload">
                            </div>
                            <div class="col-12 d-flex flex-wrap align-items-center gap-2">
                                <small class="text-secondary">Ảnh tải lên được tự động thu nhỏ (tối đa 12 MB).</small>
                                <button v-if="uploadedImage" type="button" class="btn btn-sm btn-link p-0 ms-auto" @click="removeUploadedImage">Bỏ ảnh đã chọn</button>
                                <p v-if="imageUploadError" class="w-100 text-danger small mb-0" role="alert">{{ imageUploadError }}</p>
                            </div>
                        </div>

                        <div v-if="previewImage" class="mb-4">
                            <p class="form-label">Xem trước hình ảnh</p>
                            <img
                                :src="previewImage"
                                alt="Xem trước ảnh bài viết"
                                style="max-height: 210px;"
                                class="article-cover rounded create-image-preview"
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
                                rows="8"
                                placeholder="Bắt đầu viết nội dung của bạn..."
                                required
                            ></textarea>
                            <small class="d-block mt-2 text-secondary">
                                Bạn có thể chia nội dung thành các đoạn ngắn để dễ đọc.
                            </small>
                            <div class="d-flex flex-wrap gap-3 mt-2 small text-secondary" aria-live="polite">
                                <span>{{ wordCount }} từ</span>
                                <span>Thời gian đọc dự kiến: {{ readingMinutes }} phút</span>
                            </div>
                        </div>

                        <div class="mb-4">
                            <button type="button" class="btn btn-outline-primary btn-sm" @click="showPreview = !showPreview">
                                {{ showPreview ? 'Ẩn xem trước' : 'Xem trước bài viết' }}
                            </button>
                            <article v-if="showPreview" class="compose-preview mt-3">
                                <img v-if="previewImage && !imagePreviewError" :src="previewImage" :alt="title || 'Ảnh bài viết'" @error="imagePreviewError = true" @load="imagePreviewError = false">
                                <div class="compose-preview-copy">
                                    <p class="mag-kicker mb-2">XEM TRƯỚC BÀI VIẾT</p>
                                    <h2>{{ title || 'Tiêu đề bài viết' }}</h2>
                                    <p>{{ content || 'Nội dung bài viết sẽ hiển thị ở đây.' }}</p>
                                </div>
                            </article>
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
import { readPosts, savePosts, getReadingMinutes, prepareImageUpload } from '../utils/blog.js'
import { getStoredUser, isAuthenticated } from '../utils/auth.js'
import { showAppDialog } from '../utils/dialog.js'

export default {
    data() {
        return {
            title: '',
            image: '',
            uploadedImage: '',
            content: '',
            error: '',
            imagePreviewError: false,
            showPreview: false,
            draftStatus: '',
            draftTimer: null,
            imageUploadError: ''
        }
    },

    computed: {
        wordCount() {
            return this.content.trim().split(/\s+/).filter(Boolean).length
        },
        readingMinutes() {
            return getReadingMinutes(this.content)
        },
        previewImage() {
            return this.uploadedImage || this.image
        }
    },

    mounted() {
        this.restoreDraft()
    },

    beforeUnmount() {
        this.persistDraft()
    },

    watch: {
        title() { this.scheduleDraftSave() },
        image() { this.scheduleDraftSave() },
        uploadedImage() { this.scheduleDraftSave() },
        content() { this.scheduleDraftSave() }
    },

    methods: {
        draftStorageKey() {
            const user = getStoredUser()
            return user?.email ? `blog-vue:draft:create:${user.email.toLowerCase()}` : null
        },

        restoreDraft() {
            const key = this.draftStorageKey()
            if (!key) return
            try {
                const saved = localStorage.getItem(key)
                if (!saved) return
                const draft = JSON.parse(saved)
                this.title = draft.title || ''
                this.image = draft.image || ''
                this.uploadedImage = draft.uploadedImage || ''
                this.content = draft.content || ''
                this.draftStatus = 'Đã khôi phục bản nháp trước đó.'
            } catch {
                this.draftStatus = 'Không thể đọc bản nháp đã lưu.'
            }
        },

        scheduleDraftSave() {
            if (!this.draftStorageKey()) return
            this.draftStatus = 'Đang lưu bản nháp…'
            clearTimeout(this.draftTimer)
            this.draftTimer = setTimeout(this.persistDraft, 450)
        },

        persistDraft() {
            clearTimeout(this.draftTimer)
            if (this.draftStatus === 'Bản nháp đã được xóa.') return
            const key = this.draftStorageKey()
            if (!key) return
            if (!this.title && !this.image && !this.uploadedImage && !this.content) {
                try { localStorage.removeItem(key) } catch { /* Storage may be unavailable. */ }
                return
            }
            try {
                localStorage.setItem(key, JSON.stringify({ title: this.title, image: this.image, uploadedImage: this.uploadedImage, content: this.content }))
                this.draftStatus = 'Bản nháp đã lưu trên thiết bị này.'
            } catch {
                this.draftStatus = 'Không thể lưu bản nháp trên thiết bị này.'
            }
        },

        clearDraft() {
            clearTimeout(this.draftTimer)
            const key = this.draftStorageKey()
            if (key) {
                try { localStorage.removeItem(key) } catch { /* Storage may be unavailable. */ }
            }
            this.draftStatus = 'Bản nháp đã được xóa.'
        },

        async handleImageUpload(event) {
            const file = event.target.files?.[0]
            this.imageUploadError = ''
            if (!file) return
            try {
                this.uploadedImage = await prepareImageUpload(file)
                this.imagePreviewError = false
            } catch (error) {
                this.imageUploadError = error.message || 'Không thể tải ảnh lên.'
                event.target.value = ''
            }
        },

        removeUploadedImage() {
            this.uploadedImage = ''
            this.imagePreviewError = false
            this.imageUploadError = ''
            if (this.$refs.imageFile) this.$refs.imageFile.value = ''
        },

        async createPost() {
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
                image: this.uploadedImage || this.image || '/blog-placeholder.svg',
                author: user.name,
                email: user.email,
                date: new Date().toLocaleString('vi-VN'),
                comments: []
            }

            posts.push(newPost)

            if (!savePosts(posts)) {
                this.error = 'Không thể lưu bài viết trên thiết bị này.'
                return
            }
            this.clearDraft()
            await showAppDialog({
                title: 'Đăng bài thành công',
                message: 'Bài viết của bạn đã được đăng.',
                tone: 'success'
            })
            this.$router.push('/')
        },

        async resetForm() {
            if (this.title || this.image || this.uploadedImage || this.content) {
                const confirmed = await showAppDialog({
                    title: 'Xóa nội dung hiện tại?',
                    message: 'Bạn có muốn xóa tiêu đề, hình ảnh và nội dung đã nhập không?',
                    confirm: true,
                    confirmLabel: 'Xóa nội dung',
                    cancelLabel: 'Giữ lại',
                    danger: true
                })
                if (!confirmed) return
            }

            this.title = ''
            this.image = ''
            this.content = ''
            this.error = ''
            this.imagePreviewError = false
            this.showPreview = false
            this.uploadedImage = ''
            this.imageUploadError = ''
            if (this.$refs.imageFile) this.$refs.imageFile.value = ''
            this.clearDraft()
        }
    }
}
</script>
