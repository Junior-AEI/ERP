import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig({
    test: {
        coverage: {
            provider: 'istanbul' // or 'c8'
        },
        env: loadEnv('', process.cwd(), '')
    }
})
