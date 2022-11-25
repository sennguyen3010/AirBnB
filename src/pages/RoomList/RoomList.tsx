import { Hidden, Box, Stack, Typography, Button, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RoomCard from "../../components/Cards/RoomCard";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getRoomListByLocation, Room } from "../../redux/reducers/roomDetailReducer";
// import {
//   getRoomListByLocation,
//   RoomInfo,
//   RoomState,
// } from "../../redux/reducers/roomReducer";
import GoogleMap from "./GoogleMap";

type Props = {};

export default function RoomList({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const { room } = useSelector((state: RootState) => state.roomDetailReducer);

  useEffect(() => {
    const actionthunk = getRoomListByLocation(id);
    dispatch(actionthunk);
  }, [id]);
  return (
    <div className="container">
      <Stack direction={"row"}>
        <Box
          className="room-list"
          sx={{
            width: {
              xs: "100%",
              md: "100%",
              lg: "50%",
              xl: "50%",
            },
          }}
        >
          <Box className="list-content">
            <Typography
              component={"h3"}
              sx={{
                fontSize: "0.9rem",
                color: grey[500],
                px: "4px",
              }}
            >
              Over 1,000 homes
            </Typography>
            <Box className="button-list d-flex gap-2 mt-2">
              <Button variant="outlined">Type of Place</Button>
              <Button variant="outlined">Price</Button>
              <Button variant="outlined">Rooms and Beds</Button>
              <Button variant="outlined">More</Button>
            </Box>
            <Box className="mt-2 pb-3">
              {room?.map((item: Room,index) => {
                return <RoomCard key={index} roomInfo={item}></RoomCard>;
              })}
            </Box>
          </Box>
        </Box>
        <Hidden lgDown>
          <Box
            className="map"
            sx={{
              width: "50%",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                height: "100vh",
                top: "80px",
              }}
            >
              <Box>
                <GoogleMap></GoogleMap>
              </Box>
            </Box>
          </Box>
        </Hidden>
      </Stack>
    </div>
  );
}
