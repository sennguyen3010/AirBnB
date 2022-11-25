import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../Popper/Popper';
import SearchHeader from './SearchHeader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { ButtonBase, Box } from '@mui/material';
import { ACCESS_TOKEN, clearLocalStorage, USER_LOGIN } from '../../util/setting';
import { setUserLogin } from '../../redux/reducers/userReducer';
import { openNotificationWithIcon } from '../Notification/Notification';
type Props = {};

export default function Header({}: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const [activeSearch, setActiveSearch] = useState(false);

  const handleLogOut = () => {
    clearLocalStorage(ACCESS_TOKEN);
    clearLocalStorage(USER_LOGIN);
    clearLocalStorage('userSignin');

    const action = setUserLogin(null);
    dispatch(action);
    window.location.href = '/';
  };

  const handleNavProfile = () => {
    if (userLogin === null) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };
  const handleNavigate = () => {
    if (userLogin === null || userLogin?.role !== 'ADMIN') {
      openNotificationWithIcon(
        'warning',
        'Tài khoản không có quyền truy cập vào trang ADMIN!',
        'Vui lòng liên hệ ADMIN để đăng ký!'
      );
    } else {
      navigate('/admin');
    }
  };

  const profileMenu = [
    {
      login: false,
      menu: [
        {
          id: 1,
          content: 'Đăng nhập',
          link: '/login',
        },
        {
          id: 2,
          content: 'Đăng ký',
          link: '/register',
        },
        {
          id: 3,
          content: 'Cho thuê nhà',
          link: '/',
        },
        {
          id: 4,
          content: 'Tổ chức trải nghiệm',
          link: '/',
        },
        {
          id: 5,
          content: 'Trợ giúp',
          link: '/',
        },
      ],
    },
    {
      login: true,
      menu: [
        {
          id: 6,
          content: 'Giới thiệu chủ nhà',
          link: '/',
        },
        {
          id: 7,
          content: 'Tài khoản',
          link: '/profile',
        },
        {
          id: 8,
          content: 'Trợ giúp',
          link: '/',
        },
        {
          id: 9,
          content: 'Đăng xuất',
          link: '/',
          action: handleLogOut,
        },
      ],
    },
  ];
  const user = !!userLogin;
  const renderMenuProfile = () => {
    let obj = profileMenu.find((item) => item.login === !!user);
    let menuList = obj?.menu;
    return menuList?.map((menu, index) => {
      if (menu.action) {
        return (
          <ButtonBase
            key={index}
            sx={{
              padding: '12px 16px',
              justifyContent: 'start',
              width: '100%',
              color: '#000',
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#ddd',
              },
            }}
            onClick={handleLogOut}
          >
            {menu.content}
          </ButtonBase>
        );
      } else {
        return (
          <NavLink key={index} className="menu-item" to={menu.link}>
            {menu.content}
          </NavLink>
        );
      }
    });
  };

  let isActiveCheck = activeSearch ? 'active' : null;

  return (
    <header>
      <div className="container h-100">
        <div className="header-wrap d-flex justify-content-between align-items-center h-100">
          <div className="left-header">
            <NavLink to={'/'} className="logo-brand d-flex align-items-center">
              <span className="logo me-1">
                <i className="fab fa-airbnb"></i>
              </span>
              <span className="brand-name">airbnb</span>
            </NavLink>
          </div>
          <div className="middle-header">
            <div className="search" onClick={() => setActiveSearch(true)}>
              <button className={`wrapper ${isActiveCheck}`}>
                <div className={`auto-typing ${isActiveCheck}`}>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString('Discover the colorful world...')
                        .pauseFor(2000)
                        .deleteAll()
                        .pauseFor(2000)
                        .start();
                    }}
                    options={{
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      wrapperClassName: `typer-wrapper`,
                    }}
                  />
                </div>
                {activeSearch && <SearchHeader />}
                <span className="search-icon">
                  <i className="fas fa-search"></i>
                </span>
              </button>
            </div>
          </div>
          <div className="right-header">
            <div className="d-flex align-items-center">
              <div className="host-language d-flex align-items-center me-2">
                <ButtonBase onClick={handleNavigate} className="host">
                  Become a host
                </ButtonBase>

                <div className="language">
                  <i className="fas fa-globe"></i>
                </div>
              </div>
              <div className="profile">
                <Tippy
                  trigger="click"
                  interactive={true}
                  render={(attrs) => (
                    <div key={attrs.toString()} className="profile-popper" tabIndex={-1} {...attrs}>
                      <PopperWrapper>
                        <div className="menu-content">{renderMenuProfile()}</div>
                      </PopperWrapper>
                    </div>
                  )}
                >
                  <Box className="wrapper d-flex align-items-center">
                    <div className="burger-menu me-3">
                      <i className="fas fa-bars"></i>
                    </div>
                    <ButtonBase onClick={handleNavProfile} className="user-info">
                      <img
                        src="https://www.tutorsvalley.com/public/storage/uploads/tutor/1574383712-1AB5217C-5A13-4888-A5A1-BE0BCADBC655.png"
                        alt=""
                        className="user-img w-100"
                      />
                    </ButtonBase>
                  </Box>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
