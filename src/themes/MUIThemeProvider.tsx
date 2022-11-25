import { createTheme, ThemeProvider } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

type Props = {
  children: JSX.Element
}

const theme = createTheme({
  palette:{
    primary:{
      main: grey[700]
    },
    secondary:{
      main: '#FF385C'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1333,
    },
  },
  components: {
    MuiButton:{
      variants: [
        {
          props: {variant: 'outlined'},
          style:{
            borderRadius: '20px'
          }
        }
      ]
    }
  }
})

const MUIThemeProvider:React.FC<Props> = ({children}) => {
  return (
    
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default MUIThemeProvider

