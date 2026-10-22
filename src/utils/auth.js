const USERS_KEY = 'users'
const ACTIVE_EMAIL_KEY = 'currentUserEmail'

function readLegacyUser() {
    try {
        const user = JSON.parse(localStorage.getItem('user') || 'null')
        return user && typeof user === 'object' ? user : null
    } catch {
        return null
    }
}

export function getStoredUsers() {
    try {
        const savedUsers = localStorage.getItem(USERS_KEY)
        if (savedUsers) {
            const users = JSON.parse(savedUsers)
            if (Array.isArray(users)) {
                return users.filter(user =>
                    user && typeof user === 'object' && typeof user.email === 'string'
                )
            }
        }

        // Migrate the app's previous single-account format on first read.
        const legacyUser = readLegacyUser()
        if (!legacyUser) return []

        const users = [legacyUser]
        localStorage.setItem(USERS_KEY, JSON.stringify(users))
        return users
    } catch {
        return []
    }
}

export function findUserByEmail(email) {
    const normalizedEmail = (email || '').trim().toLowerCase()
    return getStoredUsers().find(
        user => (user.email || '').toLowerCase() === normalizedEmail
    ) || null
}

export function userEmailExists(email) {
    return !!findUserByEmail(email)
}

export function getStoredUser() {
    try {
        const activeEmail = localStorage.getItem(ACTIVE_EMAIL_KEY)
        if (activeEmail) return findUserByEmail(activeEmail)
    } catch {
        return null
    }

    // Keep existing sessions usable until they sign in with the new format.
    return readLegacyUser()
}

export function isAuthenticated() {
    try {
        return localStorage.getItem('isLogin') === 'true' && !!getStoredUser()
    } catch {
        return false
    }
}

export function registerUser(user) {
    if (!user || typeof user !== 'object' || typeof user.email !== 'string' || !user.email.trim()) return false

    const users = getStoredUsers()
    const email = user.email.trim().toLowerCase()
    if (users.some(item => item.email.toLowerCase() === email)) {
        return false
    }

    users.push({ ...user, email: user.email.trim() })
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users))
        return true
    } catch {
        return false
    }
}

export function saveUser(user, originalEmail = user?.email) {
    if (!user || typeof user !== 'object' || typeof user.email !== 'string' || !user.email.trim()) return false

    const users = getStoredUsers()
    const previousEmail = (originalEmail || '').trim().toLowerCase()
    const email = user.email.trim()
    const normalizedEmail = email.toLowerCase()
    const index = users.findIndex(item => item.email.toLowerCase() === previousEmail)
    if (index === -1) return false
    if (users.some((item, itemIndex) =>
        itemIndex !== index && item.email.toLowerCase() === normalizedEmail
    )) return false

    users[index] = { ...user, email }
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users))

        const legacyUser = readLegacyUser()
        if (legacyUser?.email?.toLowerCase() === previousEmail) {
            localStorage.setItem('user', JSON.stringify(users[index]))
        }

        if (localStorage.getItem(ACTIVE_EMAIL_KEY)?.toLowerCase() === previousEmail) {
            localStorage.setItem(ACTIVE_EMAIL_KEY, email)
            localStorage.setItem('username', user.name || '')
        }
        return true
    } catch {
        return false
    }
}

export function signIn(user) {
    if (!user?.email) return false

    try {
        localStorage.setItem(ACTIVE_EMAIL_KEY, user.email)
        localStorage.setItem('isLogin', 'true')
        localStorage.setItem('username', user.name || '')
        return true
    } catch {
        return false
    }
}

export function signOut() {
    try {
        localStorage.removeItem('isLogin')
        localStorage.removeItem('username')
        localStorage.removeItem(ACTIVE_EMAIL_KEY)
    } catch {
        // The current view still clears its local signed-in state.
    }
}
