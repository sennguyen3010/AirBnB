import { Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BsDot } from 'react-icons/bs';
import React from 'react';
import { grey } from '@mui/material/colors';
import { Room } from '../../redux/reducers/roomDetailReducer';
import { NavLink } from 'react-router-dom';

interface RoomTypeAsProp {
  roomInfo: Room;
}
export default function RoomCard({ roomInfo }: RoomTypeAsProp) {
  const amentities = Object.keys(roomInfo);
  let result = amentities.map((item, index) => {
    switch (item) {
      case 'wifi':
        return roomInfo[item] ? 'Wifi' : undefined;
      case 'bep':
        return roomInfo[item] ? 'Bếp' : undefined;
      case 'mayGiat':
        return roomInfo[item] ? 'Máy giặt' : undefined;

      case 'banLa':
        return roomInfo[item] ? 'Bàn là' : undefined;

      case 'tivi':
        return roomInfo[item] ? 'TV' : undefined;

      case 'dieuHoa':
        return roomInfo[item] ? 'Điều hòa' : undefined;

      case 'doXe':
        return roomInfo[item] ? 'Đỗ xe' : undefined;

      case 'hoBoi':
        return roomInfo[item] ? 'Hồ bơi' : undefined;

      case 'banUi':
        return roomInfo[item] ? 'Bàn ủi' : undefined;
    }
  });

  let result1 = result.filter((item, index) => {
    return item;
  });

  return (
    <NavLink to={`/detail/${roomInfo?.id}`}>
      <Box
        sx={{
          cursor: 'pointer',
          py: '16px',
          minHeight: {
            xs: 450,
            md: 'unset',
          },
        }}
      >
        <Stack
          direction={{
            md: 'row',
            xs: 'column',
          }}
          sx={{
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: {
                xs: '100%',
                md: '50%',
              },
              borderRadius: '15px',
              marginRight: '12px',
              overflow: 'hidden',
            }}
          >
            <Box
              component={'img'}
              src={roomInfo.hinhAnh}
              sx={{
                width: '100%',
                minHeight: '250px',
                objectFit: 'cover',
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              marginTop: {
                xs: '12px',
                md: 0,
              },
              width: {
                xs: '100%',
                md: '50%',
              },
              paddingBottom: {
                xs: '30px',
                md: 0,
              },
            }}
          >
            <Typography
              component={'h4'}
              sx={{
                fontSize: '0.8rem',
                color: grey[500],
              }}
            >
              Toàn bộ căn hộ dịch vụ
            </Typography>
            <Typography
              component={'h3'}
              sx={{
                fontWeight: 500,
                fontSize: '1.2rem',
                overflow: 'hidden',
                lineClamp: 1,
                textOverflow: 'ellipsis',
                boxOrient: 'vertical',
              }}
            >
              {roomInfo.tenPhong}
            </Typography>
            <Divider
              sx={{
                width: '4em',
                my: '10px',
              }}
            ></Divider>
            <Typography
              component={'h4'}
              sx={{
                color: grey[600],
                fontSize: '0.9rem',
              }}
            >
              {roomInfo.khach} khách
              <BsDot size={12} />
              {roomInfo.phongNgu} phòng ngủ
              <BsDot size={12} />
              {roomInfo.phongTam} phòng tắm{' '}
            </Typography>
            <Typography
              component={'h4'}
              sx={{
                color: grey[600],
                fontSize: '0.9rem',
              }}
            >
              {result1.map((item, index) => {
                return (
                  <Box key={index} component={'span'}>
                    {item}
                    <BsDot size={12} />
                  </Box>
                );
              })}
            </Typography>
            <Box
              className="room-price"
              sx={{
                position: 'absolute',
                right: '20px',
                bottom: 0,
                fontSize: '18px',
              }}
            >
              <strong>${roomInfo.giaTien} </strong>
            </Box>
          </Box>
        </Stack>
      </Box>
    </NavLink>
  );
}
