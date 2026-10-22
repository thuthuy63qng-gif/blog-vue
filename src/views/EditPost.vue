<template>
    <div class="row justify-content-center py-3">
        <div class="col-lg-9">
            <div class="mb-4">
                <p class="mag-kicker">MANAGE YOUR STORY</p>
                <h1 class="mag-heading">Chỉnh sửa bài viết</h1>
                <p class="mag-subtitle">
                    Cập nhật nội dung và hình ảnh bài viết của bạn.
                </p>
            </div>

            <div class="card shadow-sm">
                <div class="card-header bg-white">
                    <h5 class="mb-0">Thông tin bài viết</h5>
                </div>

                <div class="card-body">
                    <div v-if="error" class="alert alert-danger" role="alert">
                        {{ error }}
                    </div>

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
                            <label for="edit-post-image" class="form-label">Link hình ảnh</label>
                            <input
                                v-model.trim="image"
                                id="edit-post-image"
                                type="url"
                                class="form-control"
                                placeholder="https://example.com/image.jpg"
                            >
                        </div>

                        <div v-if="image" class="mb-4">
                            <img
                                :src="image"
                                alt="Ảnh bài viết"
                                class="article-cover rounded"
                                style="max-height: 300px;"
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
                                rows="10"
                                required
                            ></textarea>
                            <div class="d-flex justify-content-between mt-2 text-secondary small">
                                <span>{{ wordCount }} từ · khoảng {{ readingMinutes }} phút đọc</span>
                                <span>Gợi ý: chia nội dung thành các đoạn ngắn để dễ đọc.</span>
                            </div>
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
import { readPosts, savePosts, getReadingMinutes } from '../utils/blog.js'
import { getStoredUser, isAuthenticated } from '../utils/auth.js'

export default {
    data() {
        return {
            title: '',
            image: '',
            content: '',
            error: '',
            postId: null,
            canEdit: false,
            imagePreviewError: false
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
        this.loadPost()
    },

    watch: {
        '$route.params.id'() {
            this.loadPost()
        }
    },

    methods: {
        loadPost() {
            this.title = ''
            this.image = ''
            this.content = ''
            this.error = ''
            this.canEdit = false

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
        },

        updatePost() {
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
            posts[index].image = this.image ||
                'https://placehold.co/1000x600/eaf2ff/12336b?text=MY+BLOG'
            posts[index].content = this.content
            posts[index].updatedAt = new Date().toLocaleString('vi-VN')

            if (!savePosts(posts)) {
                this.error = 'Không thể lưu thay đổi trên thiết bị này.'
                return
            }

            alert('Cập nhật bài viết thành công!')
            this.$router.push('/my-posts')
        }
    }
}
</script>
