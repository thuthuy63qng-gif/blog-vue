<template>
    <div class="row justify-content-center py-3">
        <div class="col-lg-10">
            <div v-if="post">
                <div class="mb-4">
                    <router-link
                        to="/"
                        class="small fw-bold"
                    >
                        ← Quay lại trang chủ
                    </router-link>
                </div>

                <article class="card shadow-sm mb-4 post-detail-card">
                    <img
                        :src="getImage(post)"
                        :alt="post.title"
                        class="article-cover post-detail-cover"
                        @error="handleImageError"
                    >
                    <div v-if="getImageSource(post)" class="article-image-credit">
                        Nguồn ảnh:
                        <a :href="post.imageSource || post.image" target="_blank" rel="noopener noreferrer">
                            {{ getImageSource(post) }}
                        </a>
                    </div>

                    <div class="card-body p-md-5 post-detail-body">
                        <p class="mag-kicker post-detail-category">{{ getCategory(post) }}</p>
                        <h1 class="article-title mb-4">
                            {{ post.title }}
                        </h1>

                        <div class="d-flex flex-wrap gap-2 align-items-center text-secondary mb-4 post-detail-meta">
                            <strong>
                                {{ post.author }}
                            </strong>
                            <span>•</span>
                            <span>{{ post.date }}</span>
                            <template v-if="post.updatedAt">
                                <span>•</span>
                                <span>Cập nhật {{ post.updatedAt }}</span>
                            </template>
                            <span>•</span>
                            <span>{{ readingMinutes }} phút đọc</span>
                        </div>

                        <hr class="mb-4">

                        <div class="article-content">
                            {{ post.content }}
                        </div>

                        <div
                            v-if="isOwnPost"
                            class="mt-4 pt-3 border-top"
                        >
                            <router-link
                                :to="'/edit-post/' + post.id"
                                class="btn btn-outline-primary"
                            >
                                Chỉnh sửa bài viết
                            </router-link>
                        </div>
                    </div>
                </article>

                <section class="card shadow-sm post-comments-card">
                    <div class="card-header bg-white">
                        <h4 class="mb-0 fw-bold">
                            Bình luận ({{ post.comments.length }})
                        </h4>
                    </div>

                    <div class="card-body">
                        <div v-if="commentError" class="alert alert-danger" role="alert">
                            {{ commentError }}
                        </div>
                        <div v-if="commentMessage" class="alert alert-success" role="status">
                            {{ commentMessage }}
                        </div>

                        <div v-if="isLogin">
                            <form @submit.prevent="addComment">
                                <div class="mb-3">
                                    <label for="comment-content" class="form-label">
                                        Viết bình luận của bạn
                                    </label>

                                    <textarea
                                        v-model.trim="comment"
                                        id="comment-content"
                                        class="form-control"
                                        rows="3"
                                        placeholder="Chia sẻ suy nghĩ của bạn..."
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" class="btn btn-primary">
                                    Gửi bình luận
                                </button>
                            </form>

                            <hr class="my-4">
                        </div>

                        <div v-else class="alert alert-info">
                            <router-link to="/login" class="fw-bold">
                                Đăng nhập
                            </router-link>
                            để tham gia bình luận.
                        </div>

                        <div
                            v-if="post.comments.length === 0"
                            class="text-secondary text-center py-3"
                        >
                            Chưa có bình luận nào. Hãy là người đầu tiên!
                        </div>

                        <div
                            v-for="item in post.comments"
                            :key="item.id"
                            class="comment-item"
                        >
                            <div class="d-flex justify-content-between flex-wrap gap-2">
                                <strong>{{ item.author }}</strong>
                                <small class="text-secondary">
                                    {{ item.date }}
                                </small>
                            </div>

                            <small v-if="item.editedAt" class="text-secondary">Đã chỉnh sửa · {{ item.editedAt }}</small>

                            <form v-if="editingCommentId === item.id" class="mt-2" @submit.prevent="saveCommentEdit(item.id)">
                                <label :for="'edit-comment-' + item.id" class="visually-hidden">Chỉnh sửa bình luận</label>
                                <textarea :id="'edit-comment-' + item.id" v-model.trim="editCommentContent" class="form-control mb-2" rows="3" required></textarea>
                                <div class="d-flex flex-wrap gap-2">
                                    <button type="submit" class="btn btn-sm btn-primary">Lưu bình luận</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="cancelCommentEdit">Hủy</button>
                                </div>
                            </form>

                            <p v-else class="mb-0 mt-2" style="white-space: pre-line;">
                                {{ item.content }}
                            </p>

                            <div v-if="isOwnComment(item) && editingCommentId !== item.id" class="d-flex gap-2 mt-3">
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="startCommentEdit(item)">Sửa</button>
                                <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteComment(item.id)">Xóa</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section v-if="relatedPosts.length" class="mb-4 mt-4">
                    <div class="mag-section-heading">
                        <div>
                            <p class="mag-kicker mb-1">ĐỌC TIẾP</p>
                            <h2>Bài viết liên quan</h2>
                        </div>
                    </div>
                    <div class="row g-3">
                        <div v-for="related in relatedPosts" :key="related.id" class="col-md-4">
                            <article class="story-card related-post-card">
                                <img :src="getImage(related)" :alt="related.title" class="story-image" @error="handleImageError">
                                <div class="story-copy">
                                    <span class="mag-category mb-2">{{ getCategory(related) }}</span>
                                    <router-link :to="'/post/' + related.id" class="story-title d-block">{{ related.title }}</router-link>
                                    <p class="story-excerpt mt-2 mb-0">{{ excerpt(related.content, 100) }}</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

            </div>

            <div v-else class="card">
                <div class="card-body text-center py-5">
                    <h3 class="fw-bold">Không tìm thấy bài viết</h3>
                    <p class="text-secondary">
                        Bài viết có thể đã bị xóa hoặc đường dẫn không đúng.
                    </p>
                    <router-link to="/" class="btn btn-primary">
                        Về trang chủ
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    readPosts,
    savePosts,
    seedSamplePosts,
    getPostImage,
    getPostCategory,
    getReadingMinutes,
    getExcerpt
} from '../utils/blog.js'
import { getStoredUser, isAuthenticated } from '../utils/auth.js'
import { showAppDialog } from '../utils/dialog.js'

export default {
    data() {
        return {
            post: null,
            posts: [],
            comment: '',
            editingCommentId: null,
            editCommentContent: '',
            commentError: '',
            commentMessage: '',
            isLogin: false,
            currentEmail: ''
        }
    },

    computed: {
        relatedPosts() {
            if (!this.post) return []
            const category = this.getCategory(this.post)
            return this.posts
                .filter(item => item.id !== this.post.id && this.getCategory(item) === category)
                .slice(0, 3)
        },

        readingMinutes() {
            return getReadingMinutes(this.post?.content)
        },

        isOwnPost() {
            return this.isLogin &&
                this.post &&
                this.post.email === this.currentEmail
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
            seedSamplePosts()
            this.isLogin = isAuthenticated()
            const user = getStoredUser()

            this.currentEmail = user ? user.email : ''

            const id = Number(this.$route.params.id)

            const posts = readPosts()
            this.posts = posts

            const foundPost = posts.find(item => item.id === id)

            if (foundPost) {
                if (!Array.isArray(foundPost.comments)) {
                    foundPost.comments = []
                }
                this.post = foundPost
            } else {
                this.post = null
            }
        },

        addComment() {
            this.commentError = ''
            this.commentMessage = ''

            if (!this.comment.trim() || !this.post) {
                this.commentError = 'Vui lòng nhập nội dung bình luận.'
                return
            }

            if (!isAuthenticated()) {
                this.$router.push('/login')
                return
            }

            const user = getStoredUser()

            if (!user) {
                this.commentError = 'Không tìm thấy tài khoản. Vui lòng đăng nhập lại.'
                return
            }

            const newComment = {
                id: Date.now(),
                author: user.name,
                email: user.email,
                content: this.comment.trim(),
                date: new Date().toLocaleString('vi-VN')
            }

            const posts = readPosts()

            const index = posts.findIndex(
                item => item.id === this.post.id
            )

            if (index === -1) {
                this.commentError = 'Không tìm thấy bài viết.'
                return
            }

            if (!Array.isArray(posts[index].comments)) {
                posts[index].comments = []
            }

            const updatedComments = [
                ...(Array.isArray(posts[index].comments) ? posts[index].comments : []),
                newComment
            ]
            posts[index] = {
                ...posts[index],
                comments: updatedComments
            }

            if (!savePosts(posts)) {
                this.commentError = 'Không lưu được bình luận. Vui lòng thử lại.'
                return
            }

            this.post = {
                ...this.post,
                comments: updatedComments
            }
            this.posts = posts
            this.comment = ''
            this.commentMessage = 'Bình luận đã được gửi.'
        },

        isOwnComment(item) {
            return this.isLogin && item.email && item.email === this.currentEmail
        },

        startCommentEdit(item) {
            if (!this.isOwnComment(item)) return
            this.editingCommentId = item.id
            this.editCommentContent = item.content || ''
        },

        cancelCommentEdit() {
            this.editingCommentId = null
            this.editCommentContent = ''
        },

        saveCommentEdit(commentId) {
            this.commentError = ''
            this.commentMessage = ''
            const content = this.editCommentContent.trim()
            if (!content || !this.post) {
                this.commentError = 'Bình luận không được để trống.'
                return
            }

            const posts = readPosts()
            const postIndex = posts.findIndex(item => item.id === this.post.id)
            if (postIndex === -1) {
                this.commentError = 'Không tìm thấy bài viết.'
                return
            }

            const comments = Array.isArray(posts[postIndex].comments) ? posts[postIndex].comments : []
            const commentIndex = comments.findIndex(item => item.id === commentId)
            if (commentIndex === -1 || comments[commentIndex].email !== this.currentEmail) {
                this.commentError = 'Bạn không có quyền sửa bình luận này.'
                this.cancelCommentEdit()
                return
            }

            const updatedComments = comments.map(item => item.id === commentId
                ? { ...item, content, editedAt: new Date().toLocaleString('vi-VN') }
                : item)
            posts[postIndex] = { ...posts[postIndex], comments: updatedComments }
            if (!savePosts(posts)) {
                this.commentError = 'Không lưu được thay đổi. Vui lòng thử lại.'
                return
            }

            this.post = { ...this.post, comments: updatedComments }
            this.posts = posts
            this.cancelCommentEdit()
            this.commentMessage = 'Bình luận đã được cập nhật.'
        },

        async deleteComment(commentId) {
            if (!this.post) return
            const confirmed = await showAppDialog({
                title: 'Xóa bình luận này?',
                message: 'Bạn có chắc muốn xóa bình luận này?',
                confirm: true,
                confirmLabel: 'Xóa bình luận',
                cancelLabel: 'Giữ lại',
                danger: true
            })
            if (!confirmed) return

            const posts = readPosts()
            const postIndex = posts.findIndex(item => item.id === this.post.id)
            if (postIndex === -1) {
                this.commentError = 'Không tìm thấy bài viết.'
                return
            }
            const comments = Array.isArray(posts[postIndex].comments) ? posts[postIndex].comments : []
            const target = comments.find(item => item.id === commentId)
            if (!target || target.email !== this.currentEmail) {
                this.commentError = 'Bạn không có quyền xóa bình luận này.'
                return
            }

            const updatedComments = comments.filter(item => item.id !== commentId)
            posts[postIndex] = { ...posts[postIndex], comments: updatedComments }
            if (!savePosts(posts)) {
                this.commentError = 'Không xóa được bình luận. Vui lòng thử lại.'
                return
            }
            this.post = { ...this.post, comments: updatedComments }
            this.posts = posts
            if (this.editingCommentId === commentId) this.cancelCommentEdit()
            this.commentMessage = 'Bình luận đã được xóa.'
        },

        getCategory(post) {
            return getPostCategory(post)
        },

        excerpt(content, maxLength = 100) {
            return getExcerpt(content, maxLength)
        },

        getImage(post) {
            return getPostImage(post)
        },

        getImageSource(post) {
            const source = post?.imageSource || post?.image
            if (!/^https?:\/\//i.test(source || '')) return ''
            try {
                return new URL(source).hostname.replace(/^www\./, '')
            } catch {
                return 'liên kết ảnh'
            }
        },

        handleImageError(event) {
            event.target.onerror = null
            event.target.src = '/blog-placeholder.svg'
        }
    }
}
</script>
