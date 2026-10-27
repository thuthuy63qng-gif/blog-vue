export function showAppDialog(options = {}) {
    return new Promise(resolve => {
        window.dispatchEvent(new CustomEvent('my-blog:dialog', {
            detail: { ...options, resolve }
        }))
    })
}
