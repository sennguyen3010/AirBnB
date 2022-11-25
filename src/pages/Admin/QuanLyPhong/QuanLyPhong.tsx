import { Pagination, PaginationProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateRoom from './CreateRoom/CreateRoom';
import { AppDispatch, RootState } from '../../../redux/configStore';
import { getLocationAPI } from '../../../redux/reducers/locationDetailReducer';
import {
  deleteRoomApi,
  getRoomALLApi,
  getRoomPageApi,
  searchRoomAdminApi,
  setUpdataRoom,
  updataRoom,
} from '../../../redux/reducers/roomDetailReducer';

import UpdataPhong from './UpdataPhong';
import { ACCESS_TOKEN, getStore, getStoreJSON, USER_LOGIN } from '../../../util/setting';
import { getUserAPi } from '../../../redux/reducers/userReducer';

type Props = {};
let timeout: any = null;

export default function QuanLyPhong({}: Props) {
  const { room, arrRoomPage } = useSelector((state: RootState) => state.roomDetailReducer);
  const arrLocation = useSelector((state: RootState) => state.locationDetailReducer.viTri);

  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [search, setSearch] = useState<string | number | undefined>('');

  const dispatch: AppDispatch = useDispatch();
  let userStore = getStoreJSON(USER_LOGIN);

  useEffect(() => {
    timeout = setTimeout(() => {
      let action3 = getUserAPi(userStore?.user.id);
      dispatch(action3);
    }, 1000);
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, []);
  useEffect(() => {
    let action = getRoomALLApi();
    dispatch(action);
    let action2 = getLocationAPI();
    dispatch(action2);
  }, []);
  useEffect(() => {
    let action = getRoomPageApi(page, pageSize);
    dispatch(action);
  }, [page]);

  useEffect(() => {
    timeout = setTimeout(() => {
      let action = searchRoomAdminApi(search, page, pageSize);
      dispatch(action);
    }, 1000);
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [search]);

  const renderRoomList = () => {
    return arrRoomPage?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.tenPhong}</td>
          <td>
            <img src={item.hinhAnh} alt="hinh Ảnh" />
          </td>
          {/* có mã vị trí call api => tỉnh thành từ api('/vi-tri/${mã vị trí}) */}
          <td>{renderViTri(item?.maViTri)}</td>
          <td>{item.khach}</td>
          <td>
            <button
              className="btn btn-info mx-2"
              data-bs-toggle="modal"
              data-bs-target="#modalIdUpdataRoom"
              onClick={() => {
                let updataRoom: updataRoom = {
                  room: item,
                  page: page,
                  pageSize: pageSize,
                };
                const action = setUpdataRoom(updataRoom);
                dispatch(action);
              }}
            >
              Sửa
            </button>

            <button
              className="btn btn-danger"
              onClick={() => {
                let token = getStore(ACCESS_TOKEN);
                if (token) {
                  let actionDelete = deleteRoomApi(item.id, token, page, pageSize);
                  dispatch(actionDelete);
                }
              }}
            >
              X
            </button>
          </td>
        </tr>
      );
    });
  };
  const renderViTri = (id: number) => {
    let index = arrLocation.findIndex((item, index) => item.id == id);
    return arrLocation[index]?.tinhThanh;
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };
  return (
    <>
      <CreateRoom />
      <UpdataPhong />
      <div className="container thongTinPhong">
        <div className="row py-3">
          <button className="btn btn-danger col-3 add" data-bs-toggle="modal" data-bs-target="#modalIdCreateRoom">
            Thêm Phòng
          </button>
          <div className="form-group d-flex col-9">
            <input
              type="text"
              name="search"
              id="search"
              className="form-control"
              placeholder="Nhập vào tên phòng"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <button className="btn btn-success mx-2 px-4">Tìm</button>
          </div>
        </div>
        <div>
          <table className="table text-center">
            <thead className="table-dark">
              <tr>
                <th>Mã phòng</th>
                <th>Tên phòng</th>
                <th>Hình ảnh</th>
                <th>Địa điểm</th>
                <th>Số lượng tối đa</th>
                <th colSpan={4}>Chức năng</th>
              </tr>
            </thead>
            <tbody>{renderRoomList()}</tbody>
          </table>
          <div>
            <Pagination
              className="admin_location-page"
              current={page}
              defaultPageSize={4}
              onChange={onChange}
              total={search == '' ? room.length : arrRoomPage.length}
            />
          </div>
        </div>
      </div>
    </>
  );
}
