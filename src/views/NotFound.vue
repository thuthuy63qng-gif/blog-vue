<template>
    <div class="row justify-content-center py-5">
        <div class="col-md-8 col-lg-6">
            <section class="card text-center shadow-sm">
                <div class="card-body py-5 px-4">
                    <p class="mag-kicker mb-2">KHÔNG TÌM THẤY TRANG</p>
                    <p class="not-found-code mb-2" aria-hidden="true">404</p>
                    <h1 class="mag-heading mb-3">Có vẻ bạn đã đi lạc.</h1>
                    <p class="text-secondary mb-4">
                        Đường dẫn này không tồn tại hoặc nội dung đã được chuyển đi.
                    </p>
                    <router-link to="/" class="btn btn-primary">
                        ← Về trang chủ
                    </router-link>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.not-found-code {
    color: #dce8fb;
    font-size: clamp(5rem, 18vw, 10rem);
    font-weight: 900;
    letter-spacing: -0.09em;
    line-height: 1;
}
</style>
