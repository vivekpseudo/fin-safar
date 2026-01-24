import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import { mySchema } from './schema'
import User from './models/User'

const adapter = new LokiJSAdapter({
    schema: mySchema,
    // (You might want to comment out the following line in production)
    useWebWorker: false,
    useIncrementalIndexedDB: true,
    // dbName: 'myapp', // optional db name
    // jsi: true, // preferred to false (experimental)
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
        console.error('Database failed to load', error)
    }
})

export const database = new Database({
    adapter,
    modelClasses: [
        User,
    ],
})
