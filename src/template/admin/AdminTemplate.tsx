import { Box } from "@mui/material";
import { message } from "antd";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { history } from "../..";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import MUIThemeProvider from "../../themes/MUIThemeProvider";
import { getStoreJSON, USER_LOGIN } from "../../util/setting";

type Props = {};

export default function AdminTemplate({}: Props) {
  let userStore = getStoreJSON(USER_LOGIN);
  useEffect(() => {
    if (userStore.user.role !== "ADMIN") {
      message.warning("Không phải quyền Admin!");
      history.push("/login");
    }
  });
  return (
    <MUIThemeProvider>
      <>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <SidebarAdmin></SidebarAdmin>
          <Box
            className=""
            sx={{
              flex: 1,
              padding: "12px",
            }}
          >
            <Outlet></Outlet>
          </Box>
        </Box>
      </>
    </MUIThemeProvider>
  );
}
