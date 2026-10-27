<template>
    <div v-if="isDesktop" class="desktop-app d-flex flex-column min-vh-100">
        <a class="skip-link" href="#main-content">Bỏ qua điều hướng</a>
        <Navbar />

        <main id="main-content" class="container flex-grow-1">
            <router-view />
        </main>

        <AppDialog />

        <footer class="mag-footer">
            <div class="container">
                <div class="row g-4">
                    <div class="col-md-6">
                        <h5>MY BLOG</h5>
                        <p class="mb-0">
                            Tạp chí trực tuyến cập nhật tin tức,
                            đời sống và câu chuyện showbiz.
                        </p>
                    </div>

                    <div class="col-md-6">
                        <h5>Khám phá</h5>
                        <p class="mb-0">
                            Tin sao · Âm nhạc · Phim ảnh · Thời trang
                        </p>
                    </div>
                </div>

                <hr class="footer-rule">

                <p class="text-center small mb-0">
                    © 2026 My Blog VueJS. All rights reserved.
                </p>
            </div>
        </footer>
    </div>

    <div v-else class="desktop-only-message" role="status">
        <div class="desktop-only-card">
            <span class="desktop-only-mark" aria-hidden="true">M</span>
            <p class="mag-kicker mb-2">MY BLOG</p>
            <h1>Vui lòng mở trên laptop</h1>
            <p>Trang blog hiện được thiết kế để sử dụng trên màn hình laptop hoặc máy tính.</p>
        </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import AppDialog from './components/AppDialog.vue'

export default {
    data() {
        return {
            isDesktop: window.screen.width >= 1024
        }
    },

    components: {
        Navbar,
        AppDialog
    }
}
</script>
