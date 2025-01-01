// postcss.config.js (ES Module syntax)
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss,   // Enable Tailwind CSS
    autoprefixer,   // Enable Autoprefixer for cross-browser support
  ],
};
