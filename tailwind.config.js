/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': 'fit-content(300px) 1fr',
      },
    },
  },
  plugins: [
    tailwindScrollbar, // Use the imported plugin
  ],
};
