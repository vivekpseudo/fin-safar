import { database } from '../db'
import User from '../db/models/User'

const USERS_TABLE = 'users'

export const UserService = {
    async getCurrentUser(): Promise<User | null> {
        const users = await database.get<User>(USERS_TABLE).query().fetch()
        return users.length > 0 ? users[0] : null
    },

    async createGuestUser(): Promise<User> {
        return await database.write(async () => {
            const user = await database.get<User>(USERS_TABLE).create(user => {
                user.name = 'Guest User'
                user.coins = 0
                user.badges = []
                user.isLoggedIn = false
                user.language = 'en'
                user.phone = ''
                user.notifications = {
                    dailyTips: true,
                    appUpdates: true,
                    reminders: false
                }
            })
            return user
        })
    },

    async updateUser(updates: Partial<User>) {
        const user = await this.getCurrentUser()
        if (user) {
            await database.write(async () => {
                await user.update(u => {
                    if (updates.name !== undefined) u.name = updates.name
                    if (updates.coins !== undefined) u.coins = updates.coins
                    if (updates.badges !== undefined) u.badges = updates.badges
                    if (updates.isLoggedIn !== undefined) u.isLoggedIn = updates.isLoggedIn
                    if (updates.language !== undefined) u.language = updates.language
                    if (updates.phone !== undefined) u.phone = updates.phone
                    if (updates.notifications !== undefined) u.notifications = updates.notifications
                })
            })
        }
    },

    async logout() {
        // We probably don't want to delete the user row, just set isLoggedIn to false
        // But for 'logout', we might want to clear sensitive data?
        // Usage says: "add Logout Menu Item... log the user out and redirect"
        // In this app context, logout seems to just mean 'state change'.
        await this.updateUser({ isLoggedIn: false })
    },

    observeUser() {
        // Return an observable of the first user
        return database.get<User>(USERS_TABLE).query().observeWithColumns(['name', 'coins', 'badges', 'is_logged_in', 'language', 'phone', 'notifications'])
    }
}
