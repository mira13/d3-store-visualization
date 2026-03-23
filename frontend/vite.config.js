import {defineConfig} from 'vite';
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
   test: {
       globals: true,
       setupFiles: 'src/setupTests.js',      
       browser: {
        enabled: true,
        provider: playwright(),
        headless: false,
        instances: [
          { browser: 'chromium' }
        ],
      },
   },
});