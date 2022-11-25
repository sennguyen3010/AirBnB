import { Box, Hidden } from '@mui/material'
import React from 'react'
import { IconContext } from 'react-icons/lib'
import {Outlet} from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import FooterMobile from '../../components/Footer/FooterMobile'
import Header from '../../components/Header/Header'
import MUIThemeProvider from '../../themes/MUIThemeProvider'
type Props = {}

export default function UserTemplate({}: Props) {
  return (
    <MUIThemeProvider>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <>
        <Header></Header>
        <Outlet></Outlet>
        
        <Hidden mdDown>
        <Footer></Footer>
        </Hidden>
        <Hidden mdUp>
          <FooterMobile></FooterMobile>
        </Hidden>
        
      </>
      </IconContext.Provider>
      
    </MUIThemeProvider>
  )
}