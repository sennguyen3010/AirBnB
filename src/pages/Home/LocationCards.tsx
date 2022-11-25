import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { http } from '../../util/setting'
import {FaHeart} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { ViTri } from '../../redux/reducers/locationDetailReducer'
type Props = {}

export default function LocationCards({}: Props) {
  const [locationArr, setLocationArr] = useState<ViTri[]>([])
  const [page , setPage] = useState(1)
  const handleScroll = ():void=>{

    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      setPage(prev => prev + 1)
    }
  }
  useEffect(()=>{
   let callLocationAPI = async () => {
    try{
      let result = await http.get(`/vi-tri/phan-trang-tim-kiem?pageIndex=${page}&pageSize=8`)
      setLocationArr(prev => [...prev, ...result.data.content.data])
    }
    catch(err){
      console.log(err);
    }
   }
   callLocationAPI();
  },[page])

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return ()=> window.removeEventListener('scroll', handleScroll)
  },[])
  return (
    <Box
    >
      <Grid
      container
      rowSpacing={3}
      columnSpacing={3}
      >
        {          
          locationArr?.map(location =>{
            return <Grid item key={location.id} xs={12} lg={3} md={4}>
              <NavLink to={`/roomlist/${location.id}`} style={{
                display: 'block'
              }}>
              <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                width: '100%',
                overflow: 'hidden',
                zIndex: 1
                
              }}
              >
                <Box
                sx={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px'
                }}
                >
                  <FaHeart style={{
                    width: '24px',
                    height: '24px',
                    fill: 'rgba(0,0,0,0.5)',
                  }}/>
                </Box>
                <Box component='img' src={location.hinhAnh}
                sx={{
                  width: '100%',
                  objectFit: 'cover',
                  height: '285px',
                  borderRadius: '10px'
                }}
                ></Box>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                  <Typography component='h3' sx={{fontWeight: 600, mt:1}}>{location.tenViTri} - {location.quocGia}</Typography>
                  <Typography component='h5'>{location.tinhThanh}</Typography>
                  </Box>
                  <Box sx={{
                    mx: 2,
                    my: 1
                  }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <AiFillStar size={16}/>
                    <Typography component={'h3'} sx={{
                      marginLeft: '2px'
                    }}>5.0</Typography>
                    
                    </Box>
                  </Box>
                </Box>
              </Box>
                              
              </NavLink>
            </Grid>
          })
        }
      </Grid>
    </Box>
  )
}