<template>
    <div class="d-flex flex-column min-vh-100">
        <a class="skip-link" href="#main-content">Bỏ qua điều hướng</a>
        <Navbar />

        <main id="main-content" class="container flex-grow-1">
            <router-view />
        </main>

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
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
    components: {
        Navbar
    }
}
</script>
