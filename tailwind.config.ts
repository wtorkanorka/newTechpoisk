/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        // sans: ["sans-regular", "sans-light", "sans-semiBold"],
        sansRegular: ["sans-regular"],
        sansLight: ["sans-light"],
        sansSemiBold: ["sans-semiBold"],
        // inter: ["inter-light", "inter-medium", "inter-regular"],
        interLight: ["inter-light"],
        interMedium: ["inter-medium"],
        interRegular: ["inter-regular"],
        // alatsi: ["alatsi-regular"],
        alatsiRegular: ["alatsi-regular"],
      },
      transitionProperty: {
        height: "height",
      },
    },
    defaultFontFamily: "sans",
    screens: {
      ssm: "485px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
