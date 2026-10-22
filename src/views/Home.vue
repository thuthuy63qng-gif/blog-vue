<template>
    <div>
        <!-- Tieu de tap chi -->
        <header class="mag-masthead">
            <p class="mag-kicker">THE DIGITAL JOURNAL</p>
            <h1>MY BLOG<span class="text-primary">.</span></h1>
            <p>Tin giải trí, chuyện hậu trường và góc nhìn gần gũi về những gương mặt bạn quan tâm.</p>
        </header>

        <!-- Tim kiem -->
        <div class="row g-3 align-items-end mb-4">
            <div class="col-lg-5">
                <div class="mag-section-heading mb-0">
                    <div>
                        <p class="mag-kicker mb-1">ĐỌC VÀ KHÁM PHÁ</p>
                        <h2>Chuyện đang được quan tâm</h2>
                    </div>
                </div>
            </div>

            <div class="col-md-7 col-lg-4">
                <input
                    v-model="keyword"
                    type="search"
                    class="form-control"
                    placeholder="Tìm tiêu đề, nội dung, tác giả..."
                    aria-label="Tìm kiếm bài viết"
                >
            </div>
            <div class="col-md-5 col-lg-3">
                <label for="category-filter" class="form-label small mb-1">Chủ đề</label>
                <select
                    id="category-filter"
                    v-model="selectedCategory"
                    class="form-select"
                    aria-label="Lọc bài viết theo chủ đề"
                >
                    <option value="">Tất cả chủ đề</option>
                    <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>
        </div>

        <!-- Bai noi bat -->
        <section
            v-if="featuredPost && !hasFilters"
            class="featured-story mb-5"
        >
            <div class="row g-0">
                <div class="col-lg-7">
                    <div class="featured-image-wrap">
                        <img
                            :src="getImage(featuredPost)"
                            :alt="featuredPost.title"
                            class="featured-image"
                            @error="handleImageError"
                        >
                    </div>
                </div>

                <div class="col-lg-5">
                    <div class="featured-copy">

                        <p class="mag-kicker mt-4 mb-1">
                            ĐÁNG CHÚ Ý
                        </p>

                        <h2>{{ featuredPost.title }}</h2>

                        <p>
                            {{ excerpt(featuredPost.content, 190) }}
                        </p>

                        <div class="story-meta mb-4">
                            <strong>{{ featuredPost.author }}</strong>
                            <span class="mx-2">•</span>
                            {{ featuredPost.date }}
                            <span class="mx-2">•</span>
                            <span class="story-likes">♥ {{ featuredPost.likes?.length || 0 }}</span>
                        </div>

                        <div class="d-flex flex-wrap gap-2">
                            <router-link
                                :to="'/post/' + featuredPost.id"
                                class="btn btn-primary"
                            >
                                Khám phá câu chuyện →
                            </router-link>

                            <router-link
                                v-if="isOwnPost(featuredPost)"
                                :to="'/edit-post/' + featuredPost.id"
                                class="btn btn-outline-primary"
                            >
                                Chỉnh sửa
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Danh muc va danh sach -->
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="mag-section-heading">
                    <div>
                        <p class="mag-kicker mb-1">TỪ CỘNG ĐỒNG</p>
                        <h2>
                            {{ hasFilters ? 'Kết quả tìm kiếm' : 'Bài viết mới nhất' }}
                        </h2>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <span class="text-secondary small text-nowrap">
                            {{ displayedPostCount }} bài viết
                        </span>
                        <label for="post-sort" class="visually-hidden">Sắp xếp bài viết</label>
                        <select
                            id="post-sort"
                            v-model="sortBy"
                            class="form-select form-select-sm"
                            aria-label="Sắp xếp bài viết"
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="likes">Nhiều lượt thích</option>
                            <option value="comments">Nhiều bình luận</option>
                        </select>
                    </div>
                </div>

                <div
                    v-if="posts.length === 0"
                    class="card text-center"
                >
                    <div class="card-body py-5">
                        <h4 class="fw-bold">Chưa có bài viết nào</h4>
                        <p class="text-secondary">
                            Hãy là người đầu tiên chia sẻ câu chuyện của bạn.
                        </p>
                        <router-link
                            :to="isLogin ? '/create-post' : '/register'"
                            class="btn btn-primary mt-3"
                        >
                            {{ isLogin ? 'Viết bài đầu tiên' : 'Tham gia My Blog' }}
                        </router-link>
                    </div>
                </div>

                <div
                    v-else-if="hasFilters && filteredPosts.length === 0"
                    class="card text-center"
                >
                    <div class="card-body py-5">
                        <h4 class="fw-bold">Chưa tìm thấy bài viết</h4>
                        <p class="text-secondary">Hãy thử từ khóa hoặc chủ đề khác.</p>
                        <button class="btn btn-outline-primary mt-3" @click="clearFilters">
                            Xóa bộ lọc
                        </button>
                    </div>
                </div>

                <div v-else-if="visiblePosts.length" class="row g-4">
                    <div
                        v-for="post in visiblePosts"
                        :key="post.id"
                        class="col-md-6"
                    >
                        <article class="story-card">
                            <img
                                :src="getImage(post)"
                                :alt="post.title"
                                class="story-image"
                                @error="handleImageError"
                            >

                            <div class="story-copy">
                                <div class="d-flex flex-wrap gap-2 mb-3">
                                    <span
                                        v-if="isOwnPost(post)"
                                        class="badge bg-primary"
                                    >
                                        Bài của bạn
                                    </span>
                                    <span class="mag-category">{{ getCategory(post) }}</span>
                                </div>

                                <router-link
                                    :to="'/post/' + post.id"
                                    class="story-title d-block mb-2"
                                >
                                    {{ post.title }}
                                </router-link>

                                <p class="story-excerpt">
                                    {{ excerpt(post.content, 115) }}
                                </p>

                                <div class="story-meta mb-3">
                                    <strong>{{ post.author }}</strong>
                                    <span class="mx-1">•</span>
                                    {{ post.date }}
                                    <span class="mx-1">•</span>
                                    <span class="story-likes">♥ {{ post.likes?.length || 0 }}</span>
                                </div>

                                <div class="d-flex flex-wrap gap-2">
                                    <router-link
                                        :to="'/post/' + post.id"
                                        class="btn btn-sm btn-primary"
                                    >
                                        Đọc tiếp
                                    </router-link>

                                    <router-link
                                        v-if="isOwnPost(post)"
                                        :to="'/edit-post/' + post.id"
                                        class="btn btn-sm btn-outline-primary"
                                    >
                                        Sửa bài
                                    </router-link>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>

                <nav
                    v-if="pageCount > 1"
                    class="d-flex justify-content-between align-items-center gap-3 mt-4"
                    aria-label="Phân trang bài viết"
                >
                    <button
                        class="btn btn-outline-primary"
                        :disabled="page === 1"
                        @click="page--"
                    >
                        ← Bài mới hơn
                    </button>
                    <span class="small text-secondary" aria-live="polite">
                        Trang {{ page }} / {{ pageCount }}
                    </span>
                    <button
                        class="btn btn-outline-primary"
                        :disabled="page === pageCount"
                        @click="page++"
                    >
                        Bài cũ hơn →
                    </button>
                </nav>
            </div>

            <!-- Sidebar -->
            <aside class="col-lg-4">
                <div class="mag-sidebar mb-4">
                    <p class="mag-kicker mb-2">VỀ MY BLOG</p>
                    <h3 class="h5 fw-bold">Showbiz qua nhiều góc nhìn</h3>
                    <p class="text-secondary mb-0">
                        Cập nhật chuyện giải trí, âm nhạc, phim ảnh và đời sống nghệ sĩ — cùng những góc nhìn từ cộng đồng độc giả.
                    </p>
                </div>

                <div class="mag-sidebar">
                    <p class="mag-kicker mb-2">BẠN CÓ Ý TƯỞNG?</p>
                    <h3 class="h5 fw-bold">Góc nhìn của bạn xứng đáng được chia sẻ</h3>
                    <p class="text-secondary">
                        Viết về câu chuyện giải trí bạn quan tâm và cùng bắt đầu cuộc trò chuyện với cộng đồng.
                    </p>

                    <router-link
                        v-if="isLogin"
                        to="/create-post"
                        class="btn btn-primary w-100"
                    >
                        + Viết bài mới
                    </router-link>

                    <router-link
                        v-else
                        to="/register"
                        class="btn btn-primary w-100"
                    >
                        Tham gia My Blog
                    </router-link>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
import { readPosts, seedSamplePosts, getPostImage, getPostCategory, getExcerpt } from '../utils/blog.js'
import { getStoredUser, isAuthenticated } from '../utils/auth.js'

export default {
    data() {
        return {
            posts: [],
            keyword: '',
            selectedCategory: '',
            sortBy: 'newest',
            page: 1,
            pageSize: 6,
            isLogin: false,
            currentEmail: ''
        }
    },

    computed: {
        hasFilters() {
            return this.keyword.trim() !== '' || this.selectedCategory !== ''
        },

        categories() {
            return [...new Set(this.posts.map(post => this.getCategory(post)))].sort()
        },

        displayedPostCount() {
            return this.filteredPosts.length + (!this.hasFilters && this.featuredPost ? 1 : 0)
        },

        pageCount() {
            return Math.max(1, Math.ceil(this.filteredPosts.length / this.pageSize))
        },

        visiblePosts() {
            const start = (this.page - 1) * this.pageSize
            return this.filteredPosts.slice(start, start + this.pageSize)
        },

        featuredPost() {
            if (this.posts.length === 0) {
                return null
            }

            return this.posts[0]
        },

        filteredPosts() {
            const keyword = this.keyword.trim().toLowerCase()

            const filteredPosts = this.posts.filter(post => {
                // Khong lap lai bai noi bat khi dang xem mac dinh
                if (!this.hasFilters && this.featuredPost &&
                    post.id === this.featuredPost.id) {
                    return false
                }

                const searchableText = [
                    post.title,
                    post.content,
                    post.author
                ].join(' ').toLowerCase()

                const matchesKeyword =
                    searchableText.includes(keyword)
                const matchesCategory = !this.selectedCategory ||
                    this.getCategory(post) === this.selectedCategory
                return matchesKeyword && matchesCategory
            })

            return filteredPosts.sort((a, b) => {
                if (this.sortBy === 'likes') {
                    return (b.likes?.length || 0) - (a.likes?.length || 0) ||
                        Number(b.id) - Number(a.id)
                }

                if (this.sortBy === 'comments') {
                    return (b.comments?.length || 0) - (a.comments?.length || 0) ||
                        Number(b.id) - Number(a.id)
                }

                return Number(b.id) - Number(a.id)
            })
        }
    },

    mounted() {
        this.loadPosts()
        this.checkLogin()
    },

    watch: {
        keyword() {
            this.page = 1
        },
        selectedCategory() {
            this.page = 1
        },
        sortBy() {
            this.page = 1
        },
        '$route'() {
            this.page = 1
            this.loadPosts()
            this.checkLogin()
        }
    },

    methods: {
        loadPosts() {
            seedSamplePosts()
            this.posts = readPosts()

            this.posts.sort((a, b) => Number(b.id) - Number(a.id))
        },

        checkLogin() {
            const user = getStoredUser()
            this.isLogin = isAuthenticated()
            this.currentEmail = this.isLogin ? user.email || '' : ''
        },

        isOwnPost(post) {
            return this.isLogin &&
                post.email === this.currentEmail
        },

        excerpt(content, maxLength = 120) {
            return getExcerpt(content, maxLength)
        },

        getCategory(post) {
            return getPostCategory(post)
        },

        getImage(post) {
            return getPostImage(post)
        },

        clearFilters() {
            this.keyword = ''
            this.selectedCategory = ''
            this.page = 1
        },

        handleImageError(event) {
            event.target.onerror = null
            event.target.src =
                'https://placehold.co/1000x600/eaf2ff/12336b?text=MY+BLOG'
        }
    }
}
</script>
