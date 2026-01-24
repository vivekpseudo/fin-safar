import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
    version: 2,
    tables: [
        tableSchema({
            name: 'users',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'coins', type: 'number' },
                { name: 'badges', type: 'string' }, // We will store JSON stringified array
                { name: 'is_logged_in', type: 'boolean' },
                { name: 'language', type: 'string' },
                { name: 'phone', type: 'string' },
                { name: 'notifications', type: 'string' }, // JSON stringified object
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
    ],
})
