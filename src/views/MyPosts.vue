<template>
    <div class="py-3">
        <div class="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
            <div>
                <p class="mag-kicker mb-2">MY CONTRIBUTIONS</p>
                <h1 class="mag-heading mb-2">Bài viết của tôi</h1>
                <p class="mag-subtitle mb-0">
                    Quản lý những nội dung bạn đã chia sẻ.
                </p>
            </div>

            <router-link to="/create-post" class="btn btn-primary">
                + Viết bài mới
            </router-link>
        </div>

        <div class="card shadow-sm">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Danh sách bài viết</h5>
                <span class="badge bg-primary">
                    <template v-if="keyword">{{ filteredPosts.length }} / </template>{{ posts.length }} bài
                </span>
            </div>

            <div v-if="posts.length > 0" class="px-3 pt-3">
                <input
                    v-model.trim="keyword"
                    type="search"
                    class="form-control"
                    placeholder="Tìm trong tiêu đề và nội dung bài viết..."
                    aria-label="Tìm bài viết của tôi"
                >
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

            <div v-else-if="filteredPosts.length === 0" class="card-body text-center py-5">
                <h4 class="fw-bold">Không tìm thấy bài viết phù hợp</h4>
                <p class="text-secondary">Thử một từ khóa khác nhé.</p>
                <button class="btn btn-outline-primary" @click="keyword = ''">
                    Xóa tìm kiếm
                </button>
            </div>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>Ảnh</th>
                            <th>Tiêu đề bài viết</th>
                            <th>Ngày đăng</th>
                            <th class="text-center">Bình luận</th>
                            <th class="text-center">Lượt thích</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="post in filteredPosts" :key="post.id">
                            <td>
                                <img
                                    :src="post.image"
                                    :alt="post.title"
                                    class="story-image-small"
                                    @error="handleImageError"
                                >
                            </td>

                            <td style="min-width: 220px;">
                                <router-link
                                    :to="'/post/' + post.id"
                                    class="fw-bold text-dark"
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

                            <td class="text-center">
                                {{ Array.isArray(post.likes) ? post.likes.length : 0 }}
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

export default {
    data() {
        return {
            posts: [],
            keyword: ''
        }
    },

    computed: {
        filteredPosts() {
            const keyword = this.keyword.toLowerCase()
            if (!keyword) return this.posts

            return this.posts.filter(post =>
                `${post.title || ''} ${post.content || ''}`
                    .toLowerCase()
                    .includes(keyword)
            )
        }
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

        deletePost(id) {
            if (!confirm('Bạn có chắc muốn xóa bài viết này?')) {
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
                alert('Bạn không có quyền xóa bài viết này.')
                return
            }

            allPosts = allPosts.filter(post => post.id !== id)

            if (!savePosts(allPosts)) {
                alert('Không thể xóa bài viết trên thiết bị này.')
                return
            }

            this.loadPosts()
        },

        excerpt(content) {
            return getExcerpt(content, 65)
        },

        handleImageError(event) {
            event.target.onerror = null
            event.target.src =
                'https://placehold.co/240x180/eaf2ff/12336b?text=MY+BLOG'
        }
    }
}
</script>
