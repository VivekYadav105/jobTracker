import typography from '@tailwindcss/typography'

const config = {
    content: ["./src/**/*.{html,jsx,tsx,js}"],
    theme: {
      extend: {
        colors:{
          blue:"#3969A4",
          orange:"#ff8c00",
          glassBlue:"#3969a48d",
          paleGreen:"rgba(152, 251, 152, 0.583)"
        }
      },
    },
    plugins: [
        typography,
    ],
  }

export default config