import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  //remote deploytmnet
  base: "/IBM_front_final_plant_project",

  //local development
  //base: "/shoppingreact",
  plugins: [react()],
})
