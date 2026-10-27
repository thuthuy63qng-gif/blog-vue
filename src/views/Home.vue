<template>
    <div class="home-page">
        <!-- Tieu de tap chi -->
        <header class="mag-masthead home-hero">
            <div class="home-hero-inner">
                <p class="home-eyebrow"><span></span> TẠP CHÍ GIẢI TRÍ &amp; VĂN HÓA</p>
                <h1>Văn hóa đại chúng,<br><em>qua góc nhìn riêng.</em></h1>
                <p class="home-hero-deck">Những câu chuyện về âm nhạc, nghệ sĩ và điều đang chuyển động quanh chúng ta — được kể bằng góc nhìn gần gũi.</p>
                <a href="#stories" class="home-scroll-link">Khám phá bài viết <span aria-hidden="true">↓</span></a>
            </div>
        </header>

        <nav class="home-topic-nav" aria-label="Lọc bài viết theo chủ đề">
            <span class="home-topic-label">CHỦ ĐỀ</span>
            <button
                type="button"
                class="home-topic-chip"
                :class="{ active: !selectedCategory }"
                @click="selectTopic('')"
            >Tất cả</button>
            <button
                v-for="category in categories"
                :key="category"
                type="button"
                class="home-topic-chip"
                :class="{ active: selectedCategory === category }"
                @click="selectTopic(category)"
            >{{ category }}</button>
        </nav>

        <div class="home-search-panel mb-4">
            <label for="post-search" class="visually-hidden">Tìm kiếm bài viết</label>
            <input
                id="post-search"
                v-model.trim="keyword"
                type="search"
                class="form-control"
                placeholder="Tìm tiêu đề, nội dung hoặc tác giả..."
            >
        </div>

        <section v-if="featuredPost && !hasFilters" class="home-featured mb-4">
            <div class="row g-0">
                <div class="col-lg-7 home-featured-media">
                    <div class="featured-image-wrap">
                        <img
                            :src="getImage(featuredPost)"
                            :alt="featuredPost.title"
                            class="featured-image"
                            @error="handleImageError"
                        >
                    </div>
                </div>

                <div class="col-lg-5 home-featured-overlay">
                    <div class="featured-copy">
                        <span class="home-featured-label">BÀI VIẾT HOT</span>
                        <span class="mag-category home-featured-category">{{ getCategory(featuredPost) }}</span>
                        <h2>{{ featuredPost.title }}</h2>
                        <p>{{ excerpt(featuredPost.content, 145) }}</p>
                        <div class="story-meta mb-3">
                            <strong>{{ featuredPost.author }}</strong>
                            <span class="mx-2">•</span>
                            {{ featuredPost.date }}
                            <span class="mx-2">•</span>
                            {{ featuredPost.comments?.length || 0 }} bình luận
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <router-link :to="'/post/' + featuredPost.id" class="btn btn-primary">Đọc bài viết →</router-link>
                            <router-link v-if="isOwnPost(featuredPost)" :to="'/edit-post/' + featuredPost.id" class="btn btn-outline-primary">Sửa bài</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Danh muc va danh sach -->
        <div class="row g-4">
            <div id="stories" class="col-lg-8 home-latest">
                <div class="mag-section-heading home-latest-heading">
                    <div>
                        <p class="mag-kicker mb-1">CÁC BÀI ĐÃ ĐĂNG</p>
                        <h2>Bài viết mới nhất</h2>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <span class="home-post-count">{{ listingPosts.length }} bài</span>
                        <label for="post-sort" class="visually-hidden">Sắp xếp bài viết</label>
                        <select id="post-sort" v-model="sortBy" class="form-select form-select-sm home-sort-select">
                            <option value="newest">Mới nhất</option>
                            <option value="comments">Nhiều bình luận</option>
                            <option value="title">Tên bài A–Z</option>
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

                <div v-else-if="filteredPosts.length === 0" class="card text-center">
                    <div class="card-body py-5">
                        <h4 class="fw-bold">Chưa tìm thấy bài viết</h4>
                        <p class="text-secondary">Thử từ khóa hoặc chủ đề khác nhé.</p>
                        <button class="btn btn-outline-primary" @click="clearFilters">Xóa bộ lọc</button>
                    </div>
                </div>

                <div v-else-if="listingPosts.length === 0" class="card text-center">
                    <div class="card-body py-5">
                        <h4 class="fw-bold">Đó là bài viết nổi bật phía trên</h4>
                        <p class="text-secondary mb-0">Hiện chưa có bài viết nào khác trong danh sách.</p>
                    </div>
                </div>

                <div v-else class="row g-4 home-story-grid">
                    <div
                        v-for="(post, index) in visiblePosts"
                        :key="post.id"
                        class="col-md-6"
                    >
                        <article class="story-card home-story-card">
                            <img
                                :src="getImage(post)"
                                :alt="post.title"
                                class="story-image"
                                @error="handleImageError"
                            >

                            <div class="story-copy">
                                <div class="home-story-labels">
                                    <span
                                        v-if="isOwnPost(post)"
                                        class="badge bg-primary"
                                    >
                                        Bài của bạn
                                    </span>
                                    <span class="mag-category">{{ getCategory(post) }}</span>
                                    <span class="home-story-index">{{ String(index + 1).padStart(2, '0') }}</span>
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
                                </div>

                                <div class="d-flex flex-wrap gap-2">
                                    <router-link
                                        :to="'/post/' + post.id"
                                        class="btn btn-sm btn-primary home-read-button"
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

                <nav v-if="pageCount > 1" class="home-pagination" aria-label="Phân trang bài viết">
                    <button class="btn btn-outline-primary" :disabled="page === 1" @click="page--">← Bài mới hơn</button>
                    <span aria-live="polite">Trang {{ page }} / {{ pageCount }}</span>
                    <button class="btn btn-outline-primary" :disabled="page === pageCount" @click="page++">Bài cũ hơn →</button>
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

                <div class="mag-sidebar home-sidebar-reading">
                    <p class="mag-kicker mb-2">ĐỌC TIẾP</p>
                    <h3 class="h5 fw-bold mb-3">Có thể bạn quan tâm</h3>
                    <router-link
                        v-for="post in sidebarPosts"
                        :key="post.id"
                        :to="'/post/' + post.id"
                        class="home-sidebar-story"
                    >
                        <span>{{ getCategory(post) }}</span>
                        <strong>{{ post.title }}</strong>
                        <small>{{ getReadingTime(post.content) }} phút đọc <span aria-hidden="true">↗</span></small>
                    </router-link>
                    <p v-if="sidebarPosts.length === 0" class="text-secondary mb-0">Chưa có bài viết để gợi ý.</p>
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
            pageSize: 4,
            isLogin: false,
            currentEmail: ''
        }
    },

    computed: {
        hasFilters() {
            return !!this.keyword.trim() || !!this.selectedCategory
        },

        categories() {
            return [...new Set(this.posts.map(post => this.getCategory(post)))].sort()
        },

        sidebarPosts() {
            return [...this.posts]
                .sort((a, b) => Number(b.id) - Number(a.id))
                .slice(0, 3)
        },

        featuredPost() {
            if (!this.posts.length) return null
            return [...this.posts].sort((a, b) =>
                (b.comments?.length || 0) - (a.comments?.length || 0) || Number(b.id) - Number(a.id)
            )[0]
        },

        filteredPosts() {
            const keyword = this.keyword.toLowerCase()
            return this.posts.filter(post => {
                const text = `${post.title || ''} ${post.content || ''} ${post.author || ''}`.toLowerCase()
                return text.includes(keyword) &&
                    (!this.selectedCategory || this.getCategory(post) === this.selectedCategory)
            }).sort((a, b) => {
                if (this.sortBy === 'comments') {
                    return (b.comments?.length || 0) - (a.comments?.length || 0) || Number(b.id) - Number(a.id)
                }
                if (this.sortBy === 'title') return (a.title || '').localeCompare(b.title || '', 'vi')
                return Number(b.id) - Number(a.id)
            })
        },

        listingPosts() {
            if (this.hasFilters || !this.featuredPost) return this.filteredPosts
            return this.filteredPosts.filter(post => post.id !== this.featuredPost.id)
        },

        visiblePosts() {
            const start = (this.page - 1) * this.pageSize
            return this.listingPosts.slice(start, start + this.pageSize)
        },

        pageCount() {
            return Math.max(1, Math.ceil(this.listingPosts.length / this.pageSize))
        }
    },

    mounted() {
        this.loadPosts()
        this.checkLogin()
    },

    watch: {
        keyword() { this.page = 1 },
        selectedCategory() { this.page = 1 },
        sortBy() { this.page = 1 },
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

        getImage(post) {
            return getPostImage(post)
        },

        getCategory(post) {
            return getPostCategory(post)
        },

        getReadingTime(content) {
            const words = (content || '').trim().split(/\s+/).filter(Boolean).length
            return Math.max(1, Math.ceil(words / 200))
        },

        selectTopic(category) {
            this.selectedCategory = category
            this.page = 1
        },

        clearFilters() {
            this.keyword = ''
            this.selectedCategory = ''
            this.page = 1
        },

        handleImageError(event) {
            event.target.onerror = null
            event.target.src = '/blog-placeholder.svg'
        }
    }
}
</script>

<style scoped>
.home-hero {
    position: relative;
    display: grid;
    min-height: 290px;
    place-items: center;
    overflow: hidden;
    width: 100vw;
    margin: -24px calc(50% - 50vw) 28px;
    padding: 34px 24px 32px;
    background: radial-gradient(ellipse at 50% 120%, rgba(213, 106, 72, .36), transparent 55%),
        linear-gradient(115deg, #0e272d, #1e4649);
    color: #fff;
}

.home-hero::after {
    position: absolute;
    top: -245px;
    right: 8%;
    width: 390px;
    height: 390px;
    border: 1px solid rgba(255, 255, 255, .13);
    border-radius: 50%;
    box-shadow: 0 0 0 36px rgba(255,255,255,.025), 0 0 0 72px rgba(255,255,255,.02);
    content: '';
    pointer-events: none;
}

.home-hero-inner {
    position: relative;
    z-index: 1;
    width: min(100%, 1000px);
    margin: 0 auto;
    text-align: left;
}

.home-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin: 0 0 11px;
    color: #f0b59b;
    font-size: .72rem;
    font-weight: 800;
    letter-spacing: 2px;
}

.home-eyebrow span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #d56a48;
}

.home-hero h1 {
    margin: 0;
    color: #fff;
    font-size: clamp(2.35rem, 5vw, 3.7rem);
    font-weight: 900;
    line-height: .99;
    letter-spacing: -2px;
}

.home-hero h1 em { color: #f0b59b; font-weight: 900; }

.home-hero-deck {
    max-width: 590px;
    margin: 12px 0 11px;
    color: rgba(255,255,255,.78);
    font-size: 1rem;
    line-height: 1.7;
}

.home-scroll-link { color: #fff; font-size: .86rem; font-weight: 700; }
.home-scroll-link span { color: #f0b59b; font-size: 1.1rem; }
.home-scroll-link:hover { color: #f0b59b; }

.home-topic-nav { display: flex; align-items: center; gap: 9px; overflow-x: auto; padding: 0 0 14px; margin-bottom: 15px; border-bottom: 1px solid #e3dfd6; }
.home-topic-label { flex: 0 0 auto; margin-right: 4px; color: #788382; font-size: .68rem; font-weight: 800; letter-spacing: 1px; }
.home-topic-chip { flex: 0 0 auto; padding: 7px 13px; border: 1px solid #dedbd3; border-radius: 999px; background: #fff; color: #44575a; font-size: .82rem; font-weight: 700; }
.home-topic-chip:hover, .home-topic-chip.active { border-color: #17363c; background: #17363c; color: #fff; }
.home-search-panel { max-width: 680px; }
.home-post-count { padding: 5px 9px; border-radius: 999px; background: #f0eee8; color: #526164; font-size: .78rem; font-weight: 700; white-space: nowrap; }
.home-sort-select { width: auto; min-width: 165px; min-height: 37px; padding-block: 6px; font-size: .82rem; }
.home-pagination { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 24px; color: #68777a; font-size: .88rem; }

.home-featured {
    overflow: hidden;
    border: 1px solid #e8e5de;
    border-radius: 15px;
    box-shadow: 0 12px 32px rgba(34, 49, 48, .08);
}
.home-featured .row { position: relative; height: 285px; min-height: 0; }
.home-featured-media { position: absolute; inset: 0; width: 100%; height: 100%; }
.home-featured :deep(.featured-image-wrap) { height: 100%; min-height: 0; }
.home-featured :deep(.featured-image) { height: 100%; min-height: 0; max-height: none; }
.home-featured-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    width: 100%;
    background: linear-gradient(90deg, rgba(13, 31, 35, .84), rgba(13, 31, 35, .55) 50%, rgba(13, 31, 35, .06)),
        linear-gradient(0deg, rgba(13, 31, 35, .52), transparent 60%);
}
.home-featured :deep(.featured-copy) { align-items: flex-start; justify-content: flex-end; width: min(100%, 760px); height: 100%; padding: clamp(22px, 3vw, 40px); color: #fff; }
.home-featured-label { margin-bottom: 12px; color: #f0b59b; font-size: .7rem; font-weight: 800; letter-spacing: 1.8px; }
.home-featured-category { margin-bottom: 8px; }
.home-featured :deep(.featured-copy h2) { max-width: 650px; margin: 8px 0 12px; color: #fff; font-size: clamp(1.8rem, 3vw, 2.55rem); font-weight: 850; line-height: 1.12; }
.home-featured :deep(.featured-copy > p) { max-width: 620px; margin-bottom: 12px; color: rgba(255,255,255,.84); font-size: .94rem; line-height: 1.7; }
.home-featured :deep(.story-meta) { color: rgba(255,255,255,.72); }
.home-featured :deep(.story-meta strong) { color: #fff; }
.home-featured :deep(.home-featured-category) { background: rgba(255,255,255,.92); }
.home-featured :deep(.btn-primary) { background: #fff; border-color: #fff; color: #17363c; }
.home-featured :deep(.btn-primary:hover) { background: #f4e4dc; border-color: #f4e4dc; }
.home-featured :deep(.btn-outline-primary) { color: #fff; border-color: rgba(255,255,255,.65); }
.home-featured :deep(.btn-outline-primary:hover) { background: rgba(255,255,255,.12); }

.home-latest-heading {
    align-items: flex-end;
    padding-bottom: 15px;
    margin-bottom: 21px;
    border-bottom-width: 2px;
    border-color: #17363c !important;
}

.home-latest-heading h2 {
    color: #172b35 !important;
    font-size: clamp(1.35rem, 2.2vw, 1.8rem) !important;
    letter-spacing: -.45px;
}

.home-latest-heading .mag-kicker { color: #d56a48; }
.home-story-grid { row-gap: 18px !important; }
.home-story-grid > [class*="col-"] { display: flex; }

.home-story-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #e7e1d8;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(37, 48, 45, .055);
    transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
}

.home-story-card:hover { transform: translateY(-5px); border-color: #d8c9bc; box-shadow: 0 16px 34px rgba(37, 48, 45, .12); }
.home-story-card > .story-image { height: 185px; flex: 0 0 185px; object-position: center 42%; }
.home-story-card .story-copy { display: flex; flex: 1; flex-direction: column; padding: 15px 17px 16px; }
.home-story-labels { display: flex; min-height: 30px; align-items: center; gap: 8px; margin-bottom: 11px; }
.home-story-card .mag-category { padding: 6px 10px; border-radius: 7px; background: #fbede8; color: #b34e34; font-size: .73rem; letter-spacing: .055em; }
.home-story-index { margin-left: auto; color: #9b9e98; font-size: .76rem; font-weight: 800; letter-spacing: .08em; }
.home-story-card .story-title { display: -webkit-box; min-height: 2.8em; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; margin-bottom: 9px !important; font-size: 1.12rem; line-height: 1.42; }
.home-story-card .story-excerpt { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; margin-bottom: 10px; color: #687684; font-size: .91rem; line-height: 1.55; }
.home-story-card .story-meta { margin-top: auto; color: #87908e; font-size: .78rem; }
.home-story-card .story-meta strong { color: #53615f; }
.home-read-button { align-self: flex-start; padding: 7px 13px; border-radius: 9px; box-shadow: 0 4px 10px rgba(185, 83, 54, .15); font-weight: 700; }
.home-story-card .story-title:hover { color: #d56a48; }
.home-page :deep(.btn-primary) { background: #b95336; border-color: #b95336; }
.home-page :deep(.btn-primary:hover) { background: #99452e; border-color: #99452e; }

.home-sidebar-reading { margin-top: 20px; }
.home-sidebar-story { display: grid; gap: 5px; padding: 14px 0; border-top: 1px solid #ece8e1; color: #17363c; text-decoration: none; }
.home-sidebar-story:first-of-type { border-top: 0; padding-top: 2px; }
.home-sidebar-story > span { color: #bd5a3d; font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.home-sidebar-story strong { font-size: .96rem; line-height: 1.45; }
.home-sidebar-story small { color: #89918f; font-size: .75rem; }
.home-sidebar-story small span { float: right; color: #bd5a3d; font-size: .95rem; }
.home-sidebar-story:hover strong { color: #bd5a3d; }

@media (max-width: 767px) {
    .home-hero { min-height: 330px; margin: -16px -12px 30px; padding: 42px 20px; }
    .home-hero h1 { letter-spacing: -1.4px; }
    .home-topic-label { display: none; }
    .home-pagination .btn { padding-inline: 9px; font-size: .78rem; }
    .home-featured .row { height: 430px; }
    .home-featured :deep(.featured-image-wrap), .home-featured :deep(.featured-image) { height: 100%; min-height: 0; }
    .home-featured-overlay { background: linear-gradient(0deg, rgba(13, 31, 35, .94), rgba(13, 31, 35, .62) 58%, rgba(13, 31, 35, .08)); }
    .home-featured :deep(.featured-copy) { padding: 24px; }
    .home-featured :deep(.featured-copy h2) { font-size: 1.9rem; }
    .home-latest-heading { align-items: flex-start; }
    .home-story-card > .story-image { height: 195px; flex-basis: 195px; }
}
</style>
