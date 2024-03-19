/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Add the paths to all project files.
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      // Support custom colors
      'grid-header-color': '#E1E1E1',
      'grid-border-color': '#E6E6E6',
      'link-color': '#B2CCF0',
      'remove-btn-color': '#B6BCC2',
      'action-color': '#F6FAFD',
      white: '#FFFFFF',
      'loading-from-color': '#EEEEEE',
      'loading-to-color': '#DDDDDD',
      'no-data-color': '#CCCCCC',
    },
    extend: {},
  },
  plugins: [],
};
