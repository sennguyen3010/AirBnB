import { Button, Drawer, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegHeart, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UserMenu from "../Menu/UserMenu";

type Anchor = "top" | "left" | "bottom" | "right";

export default function FooterMobile() {
  const [drawerDirection, setDrawerDirection] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerDirection({ ...drawerDirection, [anchor]: open });
    };

  return (
    <Box
      className="d-flex justify-content-center align-items-center"
      sx={{
        position: "sticky",
        bottom: 0,
        backgroundColor: "#fff",
        zIndex: 10,
      }}
    >
      <Stack direction={"row"} spacing={2}>

        <Button color="secondary">
          <NavLink to={"/"}>
            <Stack
              sx={{ justifyContent: "center", alignItems: "center" }}
              direction={"column"}
              spacing={1}
            >
              <FaHome size={18} />
              <Typography>Home</Typography>
            </Stack>
          </NavLink>
        </Button>
        <Button color="secondary">
          <NavLink to={"/"}>
            <Stack
              sx={{ justifyContent: "center", alignItems: "center" }}
              direction={"column"}
              spacing={1}
            >
              <FaRegHeart size={18} />
              <Typography>WishLish</Typography>
            </Stack>
          </NavLink>
        </Button>
        <Button color="secondary" onClick={toggleDrawer("right", true)}>
          <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            direction={"column"}
            spacing={1}
          >
            <AiOutlineMenu size={18} />
            <Typography>Menu</Typography>
          </Stack>
        </Button>
        <Drawer
          anchor={"right"}
          open={drawerDirection["right"]}
          onClose={toggleDrawer("right", false)}
        >  
          <Box sx={{display: 'flex', justifyContent:'center',marginBottom:'12px'}}>

          <Box component={"img"} src={require('../../assets/img/airbnb-logo.png')} sx={{
            width: '120px',
            height: '60px',
            objectFit: 'cover',
          }}></Box>

            </Box>  
          <UserMenu
            custom={{
              fontSize: { sm: "20px", xs: "18px" },
              padding: { xs: "16px", sm: "20px 18px" },
            }}
          />
        </Drawer>
      </Stack>
    </Box>
  );
}
