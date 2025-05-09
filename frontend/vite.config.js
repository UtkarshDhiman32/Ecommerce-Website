// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    port: 5173,
    open: true, // optional: opens the browser automatically
    host: true, // optional: allows access from network IP
  }
})
