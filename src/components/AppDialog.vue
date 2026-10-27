<template>
    <div v-if="dialog" class="app-dialog-backdrop" @click.self="close(false)">
        <section
            ref="dialogPanel"
            class="app-dialog-panel"
            :class="{ 'app-dialog-confirm': dialog.confirm }"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="app-dialog-title"
            aria-describedby="app-dialog-message"
            tabindex="-1"
            @keydown.esc="close(false)"
        >
            <div class="app-dialog-icon" :class="`is-${dialog.tone || 'info'}`" aria-hidden="true">
                {{ dialog.confirm ? '?' : dialog.tone === 'success' ? '✓' : 'i' }}
            </div>
            <p class="mag-kicker mb-2">MY BLOG</p>
            <h2 id="app-dialog-title">{{ dialog.title || (dialog.confirm ? 'Xác nhận thao tác' : 'Thông báo') }}</h2>
            <p id="app-dialog-message">{{ dialog.message || '' }}</p>
            <div class="app-dialog-actions">
                <button
                    v-if="dialog.confirm"
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="close(false)"
                >
                    {{ dialog.cancelLabel || 'Hủy' }}
                </button>
                <button
                    ref="confirmButton"
                    type="button"
                    class="btn"
                    :class="{ 'btn-primary': !dialog.danger, 'btn-danger': dialog.danger }"
                    @click="close(true)"
                >
                    {{ dialog.confirmLabel || 'Đã hiểu' }}
                </button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return { dialog: null }
    },

    mounted() {
        window.addEventListener('my-blog:dialog', this.open)
    },

    beforeUnmount() {
        window.removeEventListener('my-blog:dialog', this.open)
        if (this.dialog?.resolve) this.dialog.resolve(false)
    },

    methods: {
        open(event) {
            if (this.dialog?.resolve) this.dialog.resolve(false)
            this.dialog = event.detail
            this.$nextTick(() => this.$refs.confirmButton?.focus())
        },

        close(result) {
            const resolve = this.dialog?.resolve
            this.dialog = null
            resolve?.(result)
        }
    }
}
</script>
