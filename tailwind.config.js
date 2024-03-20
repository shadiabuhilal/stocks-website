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
      'grid-border-color': '#DADADA',
      'link-color': '#9EBBD9',
      'remove-btn-color': '#8F99A2',
      'action-color': '#EDF6FA',
      'dropdown-action-color': '#E6E6E6',
      'dropdown-icon-color': '#5A5A5A',
      'input-border-color': '#9A9A9A',
      white: '#FFFFFF',
      'loading-from-color': '#DEDEDE',
      'loading-to-color': '#EFEFEF',
      'no-data-color': '#CCCCCC',
    },
    extend: {},
  },
  plugins: [],
};
