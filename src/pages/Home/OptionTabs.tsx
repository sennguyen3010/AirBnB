import { Box, Tabs , Tab } from '@mui/material';
import React, { useState } from 'react'
import {MdOutlineApartment,MdKitesurfing,MdDownhillSkiing,MdHouseboat} from 'react-icons/md'
import {GiUfo,GiIsland,GiGolfFlag,GiTreehouse,GiCampingTent,GiFarmTractor,GiCastle,GiDesert,GiMountainCave,GiWindmill,GiWoodCabin,GiRiver} from 'react-icons/gi'
import {FaSwimmingPool,FaUmbrellaBeach,FaCity} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs'
type Props = {}

export default function OptionTabs({}: Props) {
    const dataLocation = [
        {id:1, label: 'OMG!', icon: <GiUfo size={24}/>},
        {id:2, label: 'Design', icon: <MdOutlineApartment size={24}/>},
        {id:3, label: 'Pool', icon: <FaSwimmingPool size={24}/>},
        {id:4, label: 'Amazing View!', icon: <GiIsland size={24}/>},
        {id:5, label: 'Golfing', icon: <GiGolfFlag size={24}/>},
        {id:6, label: 'Beach', icon: <FaUmbrellaBeach size={24}/>},
        {id:7, label: 'Arctic', icon: <BsSnow size={24}/>},
        {id:8, label: 'Treehouses', icon: <GiTreehouse size={24}/>},
        {id:9, label: 'Campers', icon: <GiCampingTent size={24}/>},
        {id:10, label: 'Farms', icon: <GiFarmTractor size={24}/>},
        {id:11, label: 'Castle', icon: <GiCastle size={24}/>},
        {id:12, label: 'Surffing', icon: <MdKitesurfing size={24}/>},
        {id:13, label: 'Desert', icon: <GiDesert size={24}/>},
        {id:14, label: 'Cave', icon: <GiMountainCave size={24}/>},
        {id:15, label: 'Skiing', icon: <MdDownhillSkiing size={24}/>},
        {id:16, label: 'WindMill', icon: <GiWindmill size={24}/>},
        {id:17, label: 'Houseboat', icon: <MdHouseboat size={24}/>},
        {id:18, label: 'Cabin', icon: <GiWoodCabin size={24}/>},
        {id:19, label: 'City', icon: <FaCity size={24}/>},
        {id:20, label: 'River', icon: <GiRiver size={24}/>},
    ]
    const [value,setValue] = useState(0);

    const handleChange = (e:any ,newValue:number) =>{
        setValue(newValue)
    }
  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '20px 0',
        position: 'sticky',
        top: '60px',
        backgroundColor: '#fff',
        zIndex: 2
    }}>
        <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable' 
            textColor='secondary'
            indicatorColor='secondary'           
        >
            {dataLocation.map(tab =>{
                return <Tab key={tab.id} icon={tab.icon} label={tab.label}></Tab>
            })}
        </Tabs>
    </Box>
  )
}