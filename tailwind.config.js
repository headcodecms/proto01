/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './theme/**/*.{js,ts,jsx,tsx,mdx}',
    './_local_repos/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
