import { database } from '../db'
import { synchronize } from '@nozbe/watermelondb/sync'

export const sync = async () => {
    await synchronize({
        database,
        pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
            // Mock pull
            console.log('Syncing... pulling changes', { lastPulledAt, schemaVersion, migration })
            return {
                changes: {},
                timestamp: Date.now(),
            }
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
            // Mock push
            console.log('Syncing... pushing changes', changes, lastPulledAt)
        },
        migrationsEnabledAtVersion: 1,
    })
}

// Auto sync every 5 minutes
export const startAutoSync = () => {
    setInterval(() => {
        sync().catch(err => console.error('Sync failed', err))
    }, 5 * 60 * 1000)
}
