import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

import UserTemplate from './template/user/UserTemplate';
import { Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './assets/scss/style.scss';

import MobileProfile from './pages/Profile/MobileProfile';
import ResponsiveItem from './HOC/ResponsiveItem';
import AdminLocation from './components/AdminLocation/AdminLocation';
import AdminTemplate from './template/admin/AdminTemplate';
import UserManagement from './pages/Admin/UserManagement/UserManagement';
import QuanLyPhong from './pages/Admin/QuanLyPhong/QuanLyPhong';
import QuanLyDatPhong from './pages/Admin/QuanLyDatPhong/QuanLyDatPhong';
import Loading from './components/Loading/Loading';

export const history = createBrowserHistory();
const Home = lazy(() => import('./pages/Home/Home'));
const Detail = lazy(() => import('./pages/Detail/Detail'));
const RoomList = lazy(() => import('./pages/RoomList/RoomList'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<UserTemplate />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          ></Route>

          <Route path="detail">
            <Route
              path=":idDetail"
              element={
                <Suspense fallback={<Loading />}>
                  <Detail />
                </Suspense>
              }
            ></Route>
          </Route>
          <Route path="/roomlist">
            <Route
              path=":id"
              element={
                <Suspense fallback={<Loading />}>
                  <RoomList />
                </Suspense>
              }
            ></Route>
          </Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loading />}>
                <ResponsiveItem Component={Profile} ComponentMobile={MobileProfile} />
              </Suspense>
            }
          ></Route>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>

        <Route path="/admin" element={<AdminTemplate />}>
          <Route index element={<UserManagement />}></Route>
          <Route path="2" element={<AdminLocation />}></Route>
          <Route path="3" element={<QuanLyPhong />}></Route>
          <Route path="4" element={<QuanLyDatPhong />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
