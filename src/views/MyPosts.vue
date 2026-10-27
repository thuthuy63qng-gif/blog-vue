<template>
    <div class="py-3 my-posts-page">
        <div class="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
            <div>
                <p class="mag-kicker mb-2">KHÔNG GIAN CỦA BẠN</p>
                <h1 class="mag-heading mb-2">Bài viết của tôi</h1>
                <p class="mag-subtitle mb-0">
                    Quản lý những nội dung bạn đã chia sẻ.
                </p>
            </div>

            <router-link to="/create-post" class="btn btn-primary">
                + Viết bài mới
            </router-link>
        </div>

        <div class="card shadow-sm my-posts-card">
            <div class="card-header bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div class="d-flex align-items-center gap-3">
                    <span class="create-post-icon" aria-hidden="true">▤</span>
                    <div>
                        <h5 class="mb-1">Danh sách bài viết</h5>
                        <p class="small text-secondary mb-0">Quản lý và cập nhật nội dung đã đăng</p>
                    </div>
                </div>
                <span class="my-posts-count">{{ posts.length }} bài viết</span>
            </div>

            <div v-if="posts.length === 0" class="card-body text-center py-5">
                <h4 class="fw-bold">Bạn chưa có bài viết nào</h4>
                <p class="text-secondary">
                    Hãy bắt đầu chia sẻ bài viết đầu tiên.
                </p>
                <router-link to="/create-post" class="btn btn-primary">
                    Đăng bài ngay
                </router-link>
            </div>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle my-posts-table">
                    <thead class="table-light">
                        <tr>
                            <th>Ảnh</th>
                            <th>Tiêu đề bài viết</th>
                            <th>Ngày đăng</th>
                            <th class="text-center">Bình luận</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="post in posts" :key="post.id">
                            <td>
                                <img
                                    :src="post.image"
                                    :alt="post.title"
                                    class="story-image-small my-posts-image"
                                    @error="handleImageError"
                                >
                            </td>

                            <td style="min-width: 220px;">
                                <router-link
                                    :to="'/post/' + post.id"
                                    class="fw-bold my-posts-title"
                                >
                                    {{ post.title }}
                                </router-link>
                                <div class="story-meta mt-1">
                                    {{ excerpt(post.content) }}
                                </div>
                            </td>

                            <td style="min-width: 150px;">
                                {{ post.date }}
                            </td>

                            <td class="text-center">
                                {{ post.comments ? post.comments.length : 0 }}
                            </td>

                            <td style="min-width: 150px;">
                                <div class="d-flex gap-2">
                                    <router-link
                                        :to="'/edit-post/' + post.id"
                                        class="btn btn-sm btn-outline-primary"
                                    >
                                        Sửa
                                    </router-link>

                                    <button
                                        class="btn btn-sm btn-outline-danger"
                                        @click="deletePost(post.id)"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { readPosts, savePosts, getExcerpt } from '../utils/blog.js'
import { getStoredUser, isAuthenticated } from '../utils/auth.js'
import { showAppDialog } from '../utils/dialog.js'

export default {
    data() {
        return { posts: [] }
    },

    mounted() {
        this.loadPosts()
    },

    methods: {
        loadPosts() {
            const user = getStoredUser()

            if (!isAuthenticated() || !user) {
                this.posts = []
                return
            }

            const allPosts = readPosts()

            this.posts = allPosts
                .filter(post => post.email === user.email)
                .sort((a, b) => Number(b.id) - Number(a.id))
        },

        async deletePost(id) {
            const confirmed = await showAppDialog({
                title: 'Xóa bài viết này?',
                message: 'Bài viết và các bình luận liên quan sẽ bị xóa khỏi thiết bị.',
                confirm: true,
                confirmLabel: 'Xóa bài viết',
                cancelLabel: 'Giữ lại',
                danger: true
            })
            if (!confirmed) {
                return
            }

            const user = getStoredUser()

            if (!isAuthenticated() || !user) {
                this.$router.push('/login')
                return
            }

            let allPosts = readPosts()

            const target = allPosts.find(post => post.id === id)

            if (!target || target.email !== user.email) {
                await showAppDialog({
                    title: 'Không thể xóa bài viết',
                    message: 'Bạn không có quyền xóa bài viết này.',
                    tone: 'error'
                })
                return
            }

            allPosts = allPosts.filter(post => post.id !== id)

            if (!savePosts(allPosts)) {
                await showAppDialog({
                    title: 'Xóa chưa thành công',
                    message: 'Không thể lưu thay đổi trên thiết bị này.',
                    tone: 'error'
                })
                return
            }

            this.loadPosts()
            await showAppDialog({
                title: 'Đã xóa bài viết',
                message: 'Bài viết và các bình luận liên quan đã được xóa.',
                tone: 'success'
            })
        },

        excerpt(content) {
            return getExcerpt(content, 65)
        },

        handleImageError(event) {
            event.target.onerror = null
            event.target.src = '/blog-placeholder.svg'
        }
    }
}
</script>
