import { Box, Divider, Typography, ButtonBase } from '@mui/material';
import { FaBars, FaUser, FaMapMarkedAlt, FaBed, FaUserTag, FaAirbnb } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, clearLocalStorage, USER_LOGIN } from '../../util/setting';
import { setUserLogin } from '../../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';

type Props = {};

export default function SidebarAdmin({}: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const [isCollapsed, setCollapsed] = useState(false);
  const menuList = [
    {
      id: 1,
      title: 'Quản lý người dùng',
      icon: <FaUser size={24} />,
      path: '/admin',
    },
    {
      id: 2,
      title: 'Quản lý vị trí',
      icon: <FaMapMarkedAlt size={24} />,
      path: '/admin/2',
    },
    {
      id: 3,
      title: 'Quản lý thông tin phòng',
      icon: <FaBed size={24} />,
      path: '/admin/3',
    },
    {
      id: 4,
      title: 'Quản lý đặt phòng',
      icon: <FaUserTag size={24} />,
      path: '/admin/4',
    },
  ];

  const handleLogOut = () => {
    clearLocalStorage(ACCESS_TOKEN);
    clearLocalStorage(USER_LOGIN);
    clearLocalStorage('userSignin');
    const action = setUserLogin(null);
    dispatch(action);
    window.location.href = '/';
  };
  const handleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };
  return (
    <Box
      sx={{
        width: `${!isCollapsed ? '270px' : '80px'}`,
        height: '100vh',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'secondary.main',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
        boxShadow: '2px 0 8px #FADADD',
        borderRight: '1px solid #FADADD',
      }}
    >
      <Box
        className="admin-sidebar"
        sx={{
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <Box
          className={`top-sidebar d-flex ${
            !isCollapsed ? 'justify-content-between' : 'justify-content-center'
          } align-items-center`}
          sx={{
            px: '20px',
            minHeight: '80px',
          }}
        >
          {!isCollapsed && (
            <NavLink to={'/'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                <FaAirbnb size={40} />
                <Typography
                  component={'h3'}
                  sx={{
                    color: '#fff',
                    fontSize: '24px',
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                  }}
                >
                  airbnb
                </Typography>
              </Box>
            </NavLink>
          )}
          <Box
            component={'span'}
            onClick={handleCollapsed}
            sx={{
              cursor: 'pointer',
              color: '#fff',
            }}
          >
            <FaBars size={24} />
          </Box>
        </Box>
        <Divider
          sx={{
            height: '2px',
            backgroundColor: '#fff',
            opacity: 0.7,
          }}
        />
        <Box className="body-section my-3">
          {!isCollapsed && (
            <Box className="d-flex justify-content-center align-items-center flex-column mb-3">
              <Box
                sx={{
                  width: '80px',
                  height: '80px',
                  overflow: 'hidden',
                  borderRadius: '50%',
                  gap: '12px',
                  border: '2px solid #fff',
                }}
              >
                <Box
                  component={'img'}
                  src={userLogin?.avatar ? userLogin.avatar : require('../../assets/img/user_pic-50x50.png')}
                  sx={{
                    width: '100%',
                    objectFit: 'cover',
                  }}
                ></Box>
              </Box>
              <Typography
                component={'h3'}
                sx={{
                  mt: '8px',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {userLogin?.name}
              </Typography>
            </Box>
          )}

          {menuList.map((item, index) => {
            return (
              <Box
                key={item.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#fff',
                    'h3, svg': {
                      color: 'secondary.main',
                    },
                  },
                  '& .active': {
                    backgroundColor: '#fff',
                    'h3, svg': {
                      color: 'secondary.main',
                    },
                  },
                }}
              >
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) => (isActive ? 'active d-block w-100' : 'd-block w-100')}
                >
                  <Box
                    className={`d-flex align-items-center ${!isCollapsed ? '' : 'justify-content-center'} w-100`}
                    sx={{
                      padding: '16px 12px',
                      gap: '12px',
                      overflow: 'hidden',
                      color: '#fff',
                    }}
                  >
                    {item.icon}
                    {!isCollapsed && (
                      <Typography
                        component={'h3'}
                        sx={{
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          color: '#fff',
                        }}
                      >
                        {item.title}
                      </Typography>
                    )}
                  </Box>
                </NavLink>
              </Box>
            );
          })}
        </Box>
        <Divider
          sx={{
            height: '2px',
            backgroundColor: '#fff',
            opacity: 0.7,
          }}
        />

        <Box className="footer-section mt-2">
          <ButtonBase
            onClick={handleLogOut}
            className={`d-flex align-items-center ${!isCollapsed ? 'justify-content-start' : 'justify-content-center'}`}
            sx={{
              padding: '16px 12px',
              width: '100%',
              fontWeight: 600,
              fontSize: '1rem',
              gap: '12px',
              color: '#fff',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#fff',
                'h3, svg': {
                  color: 'secondary.main',
                },
              },
            }}
          >
            <ImExit size={24} />
            {!isCollapsed && (
              <Typography
                component={'h3'}
                sx={{
                  color: '#fff',
                }}
              >
                Đăng xuất
              </Typography>
            )}
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
}
