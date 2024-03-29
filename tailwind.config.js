/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  daisyui: {
    themes: [
      {
        test4: {
          primary: "#a991f7",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          "primary-content": "#ffffff",

          "--rounded-box": "0", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1", // border width of buttons
          "--tab-border": "1", // border width of tabs
          "--tab-radius": "0", // border radius of tabs
        },
      },
    ],
  },
  // Tailwind general theme
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0',
      DEFAULT: '0',
      'md': '0',
      'lg': '0',
      'full': '0',
      'large': '0',
    },
    // References used:
    // - https://yesviz.com/devices.php
    // - https://ricostacruz.com/til/css-media-query-breakpoints
    // - https://tailwindcss.com/docs/responsive-design/#customizing-breakpoints
    screens: {
      xs: { max: '575px' }, // Mobile (iPhone 3 - iPhone XS Max).
      sm: { min: '576px', max: '897px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
      md: { min: '898px', max: '1199px' }, // Tablet (matches max: iPad Pro @ 1112px).
      lg: { min: '1200px' }, // Desktop smallest.
      xl: { min: '1159px' }, // Desktop wide.
      '2xl': { min: '1359px' } // Desktop widescreen.
    },
  },
  // Plugins
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

