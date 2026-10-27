<template>
    <div class="row justify-content-center py-3 create-post-page edit-post-page">
        <div class="col-xl-10 col-lg-11">
            <div class="mb-4">
                <p class="mag-kicker">CẬP NHẬT BÀI VIẾT</p>
                <h1 class="mag-heading">Chỉnh sửa bài viết</h1>
                <p class="mag-subtitle">
                    Cập nhật nội dung và hình ảnh bài viết của bạn.
                </p>
            </div>

            <div class="card shadow-sm create-post-card">
                <div class="card-header bg-white create-post-card-header">
                    <span class="create-post-icon" aria-hidden="true">✎</span>
                    <div>
                        <h5 class="mb-1">Chỉnh sửa nội dung</h5>
                        <p class="mb-0 small text-secondary">Cập nhật tiêu đề, ảnh bìa và bài viết</p>
                    </div>
                </div>

                <div class="card-body">
                    <div v-if="error" class="alert alert-danger" role="alert">
                        {{ error }}
                    </div>
                    <p v-if="canEdit" class="small text-secondary mb-3" aria-live="polite">
                        {{ draftStatus || 'Bản nháp sửa bài được lưu tự động trên thiết bị này.' }}
                    </p>

                    <form v-if="canEdit" @submit.prevent="updatePost">
                        <div class="mb-3">
                            <label for="edit-post-title" class="form-label">Tiêu đề</label>
                            <input
                                v-model.trim="title"
                                id="edit-post-title"
                                type="text"
                                class="form-control"
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <div class="row g-3 mb-3">
                                <div class="col-md-7">
                                    <label for="edit-post-image" class="form-label">Link ảnh bìa</label>
                                    <input
                                        v-model.trim="image"
                                        id="edit-post-image"
                                        type="url"
                                        class="form-control"
                                        placeholder="https://example.com/image.jpg"
                                        @input="removeUploadedImage"
                                    >
                                </div>
                                <div class="col-md-5">
                                    <label for="edit-post-image-file" class="form-label">Hoặc chọn ảnh từ máy</label>
                                    <input id="edit-post-image-file" ref="imageFile" type="file" accept="image/*" class="form-control create-image-file" @change="handleImageUpload">
                                </div>
                                <div class="col-12 d-flex flex-wrap align-items-center gap-2">
                                    <small class="text-secondary">Ảnh tải lên được tự động thu nhỏ (tối đa 12 MB).</small>
                                    <button v-if="uploadedImage" type="button" class="btn btn-sm btn-link p-0 ms-auto" @click="removeUploadedImage">Bỏ ảnh đã chọn</button>
                                    <p v-if="imageUploadError" class="w-100 text-danger small mb-0" role="alert">{{ imageUploadError }}</p>
                                </div>
                            </div>
                        </div>

                        <div v-if="previewImage" class="mb-4">
                            <img
                                :src="previewImage"
                                alt="Ảnh bài viết"
                                class="article-cover rounded create-image-preview"
                                style="max-height: 210px;"
                                @error="imagePreviewError = true"
                                @load="imagePreviewError = false"
                            >
                            <p
                                v-if="imagePreviewError"
                                class="text-danger small mt-2"
                            >
                                Link ảnh không hợp lệ hoặc không thể tải ảnh.
                            </p>
                        </div>

                        <div class="mb-4">
                            <label for="edit-post-content" class="form-label">Nội dung</label>
                            <textarea
                                v-model.trim="content"
                                id="edit-post-content"
                                class="form-control"
                                rows="8"
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
                                Lưu thay đổi
                            </button>

                            <router-link
                                to="/my-posts"
                                class="btn btn-outline-secondary"
                            >
                                Hủy
                            </router-link>
                        </div>
                    </form>

                    <router-link
                        v-if="!canEdit"
                        to="/my-posts"
                        class="btn btn-primary"
                    >
                        Quay lại bài viết của tôi
                    </router-link>
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
            postId: null,
            canEdit: false,
            imagePreviewError: false,
            showPreview: false,
            draftStatus: '',
            draftTimer: null,
            imageUploadError: ''
        }
    },

    mounted() {
        this.loadPost()
    },

    watch: {
        '$route.params.id'() {
            this.loadPost()
        },
        title() { this.scheduleDraftSave() },
        image() { this.scheduleDraftSave() },
        uploadedImage() { this.scheduleDraftSave() },
        content() { this.scheduleDraftSave() }
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

    beforeUnmount() {
        this.persistDraft()
    },

    methods: {
        draftStorageKey() {
            const user = getStoredUser()
            return user?.email && this.postId
                ? `blog-vue:draft:edit:${user.email.toLowerCase()}:${this.postId}`
                : null
        },

        restoreDraft() {
            const key = this.draftStorageKey()
            if (!key) return
            try {
                const saved = localStorage.getItem(key)
                if (!saved) {
                    this.draftStatus = ''
                    return
                }
                const draft = JSON.parse(saved)
                this.title = draft.title ?? this.title
                this.image = draft.image ?? this.image
                this.uploadedImage = draft.uploadedImage || ''
                this.content = draft.content ?? this.content
                this.draftStatus = 'Đã khôi phục bản nháp sửa bài trước đó.'
            } catch {
                this.draftStatus = 'Không thể đọc bản nháp đã lưu.'
            }
        },

        scheduleDraftSave() {
            if (!this.canEdit || !this.draftStorageKey()) return
            this.draftStatus = 'Đang lưu bản nháp…'
            clearTimeout(this.draftTimer)
            this.draftTimer = setTimeout(this.persistDraft, 450)
        },

        persistDraft() {
            clearTimeout(this.draftTimer)
            if (this.draftStatus === 'Bản nháp đã được xóa.') return
            if (!this.canEdit) return
            const key = this.draftStorageKey()
            if (!key) return
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

        loadPost() {
            if (this.canEdit) this.persistDraft()
            this.title = ''
            this.image = ''
            this.content = ''
            this.error = ''
            this.canEdit = false
            this.showPreview = false

            if (!isAuthenticated()) {
                this.$router.push('/login')
                return
            }

            this.postId = Number(this.$route.params.id)

            const posts = readPosts()

            const post = posts.find(
                item => item.id === this.postId
            )

            if (!post) {
                this.error = 'Không tìm thấy bài viết.'
                return
            }

            const user = getStoredUser()

            if (!user || post.email !== user.email) {
                this.error = 'Bạn không có quyền sửa bài viết này.'
                return
            }

            this.title = post.title
            this.image = post.image
            this.content = post.content
            this.canEdit = true
            this.uploadedImage = ''
            this.imageUploadError = ''
            this.restoreDraft()
        },

        async updatePost() {
            this.error = ''

            if (!this.title || !this.content) {
                this.error = 'Vui lòng nhập tiêu đề và nội dung.'
                return
            }

            const user = getStoredUser()

            const posts = readPosts()

            const index = posts.findIndex(
                post => post.id === this.postId
            )

            if (index === -1) {
                this.error = 'Không tìm thấy bài viết.'
                return
            }

            if (!user || posts[index].email !== user.email) {
                this.error = 'Bạn không có quyền sửa bài viết này.'
                return
            }

            posts[index].title = this.title
            posts[index].image = this.uploadedImage || this.image || '/blog-placeholder.svg'
            posts[index].content = this.content
            posts[index].updatedAt = new Date().toLocaleString('vi-VN')

            if (!savePosts(posts)) {
                this.error = 'Không thể lưu thay đổi trên thiết bị này.'
                return
            }

            this.clearDraft()
            await showAppDialog({
                title: 'Đã lưu thay đổi',
                message: 'Bài viết của bạn đã được cập nhật.',
                tone: 'success'
            })
            this.$router.push('/my-posts')
        }
    }
}
</script>
