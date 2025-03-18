import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: '**/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    supportFile: false,
  },
})
