import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import {
  BookRoom,
  deleteBookRoomAdminApi,
  getBookRoomAdminApi,
  setUpdataBookRoomAction,
} from "../../../redux/reducers/roomDetailReducer";
import CreateDatPhong from "./CreateDatPhong";
import UpdataDatPhong from "./UpdataDatPhong";

type Props = {};

export default function QuanLyDatPhong({}: Props) {
  // lấy bookRoom từ redux về
  const { bookRoom } = useSelector(
    (state: RootState) => state.roomDetailReducer
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    let action = getBookRoomAdminApi();
    dispatch(action);
  }, []);
  const renderDatPhong = () => {
    return bookRoom.map((item: BookRoom, index: number) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.maPhong}</td>
          <td>{item.maNguoiDung}</td>
          <td>{moment(item.ngayDen).format("DD / MM / YYYY")}</td>
          <td>{moment(item.ngayDi).format("DD / MM / YYYY")}</td>
          <td>
            <button
              className="btn btn-info mx-2"
              data-bs-toggle="modal"
              data-bs-target="#modalIdUpdataDatPhong"
              onClick={() => {
                const action = setUpdataBookRoomAction(item);
                dispatch(action);
              }}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                let action = deleteBookRoomAdminApi(item.id);
                dispatch(action);
              }}
            >
              X
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <div className="container datPhong">
        <CreateDatPhong />
        <UpdataDatPhong />
        <div className="row py-3">
          <button
            className="btn btn-danger col-3 add"
            data-bs-toggle="modal"
            data-bs-target="#modalIdCreateDatPhong"
          >
            Thêm Đặt Phòng
          </button>
          <div className="form-group d-flex col-9">
            <input
              type="text"
              name="search"
              id="search"
              className="form-control"
              placeholder="Nhập vào tên phòng"
              //   onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              //     setSearch(e.target.value)
              //   }
            />
            <button
              className="btn btn-success mx-2 px-4"
              onClick={() => {
                // let action =
                // dis
              }}
            >
              Tìm
            </button>
          </div>
        </div>
        <div>
          <table className="table text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Mã phòng </th>
                <th>Tên khách hàng</th>
                <th>Ngày nhận phòng</th>
                <th>Ngày trả phòng</th>
                <th colSpan={4}>Chức năng</th>
              </tr>
            </thead>
            <tbody>{renderDatPhong()}</tbody>
          </table>
          <div>
            {/* <Pagination
              className="admin_location-page"
              current={page}
              defaultPageSize={4}
              onChange={onChange}
              total={search == "" ? room.length : arrRoomPage.length}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
