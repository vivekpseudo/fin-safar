import { Model } from '@nozbe/watermelondb'
import { field, text, json, date, readonly } from '@nozbe/watermelondb/decorators'

export default class User extends Model {
    static table = 'users'

    @text('name') name!: string
    @field('coins') coins!: number
    @field('is_logged_in') isLoggedIn!: boolean
    @text('language') language!: string
    @text('phone') phone!: string

    // Custom JSON parsing for complex objects
    @json('badges', (raw) => Array.isArray(raw) ? raw : []) badges!: string[]
    @json('notifications', (raw) => raw || { dailyTips: true, appUpdates: true, reminders: false }) notifications!: {
        dailyTips: boolean;
        appUpdates: boolean;
        reminders: boolean;
    }

    @readonly @date('created_at') createdAt!: Date
    @readonly @date('updated_at') updatedAt!: Date
}
