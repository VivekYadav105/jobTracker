import typography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'

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
        plugin(function({addComponents,theme}){
          addComponents([{
            '.icon-button':{
              '@apply p-2 bg-white shadow-lg border-2 border-transparent duration-300 rounded-md':{},
              '&:hover':{
                backgroundColor: theme('colors.green.500'),
                borderColor: theme('colors.green.800'),
                color: theme('colors.green.800'),
              },
              '& .danger':{
                backgroundColor: theme('colors.red.500'),
                borderColor: theme('colors.red.800'),
                color: theme('colors.red.800'),
              },
              '& .sucess':{
                backgroundColor: theme('colors.green.500'),
                borderColor: theme('colors.green.800'),
                color: theme('colors.green.800'),
              },
              '& .warning':{
                backgroundColor: theme('colors.yellow.500'),
                borderColor: theme('colors.yellow.800'),
                color: theme('colors.yellow.800'),
              }
            },
            '.main-button':{
              '@apply flex items-center rounded-md justify-center duration-300 border-2 border-transparent gap-2 text-white w-full shadow-md p-2':{},
              backgroundColor: theme('colors.green.500'),
              color: theme('colors.white'),
              '&:hover':{
                backgroundColor: theme('colors.transparent'),
                color: theme('colors.green.800'),
                borderColor: theme('colors.green.800'),
              }     
            }
          }])
        })
    ],
  }

export default config