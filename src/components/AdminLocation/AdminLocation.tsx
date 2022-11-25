import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import {
  deleteLocationAdminApi,
  getLocationAPI,
  getLocationPageApi,
  searchLocationAdminApi,
} from '../../redux/reducers/locationDetailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import ModalAdminLocation from './ModalAdminLocation';

type Props = {};

let timeout: any = null;

export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export default function AdminLocation({}: Props) {
  const { viTri, arrPageLocation } = useSelector((state: RootState) => state.locationDetailReducer);
  const [search, setSearch] = useState<string | number | undefined>('');
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [itemClick, setItemClick] = useState<Location>({
    id: 0,
    tenViTri: '',
    tinhThanh: '',
    quocGia: '',
    hinhAnh: '',
  });

  const dispatch: AppDispatch = useDispatch();

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  function del(id: number): any {
    const action = deleteLocationAdminApi(id, page, pageSize);
    dispatch(action);
  }

  const updateLocation = (item: Location) => {
    setItemClick(item);
  };

  const renderTable = () => {
    return arrPageLocation.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item?.id}</th>
          <td>{item?.tenViTri}</td>
          <td>{item?.tinhThanh}</td>
          <td>{item?.quocGia}</td>
          <td className="admin_location-table-tdImg">
            <img className="admin_location-table-img" src={item?.hinhAnh} alt="img" />
          </td>
          <td>
            <button className="admin_location-btn" onClick={() => del(item?.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>

            <button
              className="admin_location-btn btn_update"
              onClick={() => updateLocation(item)}
              data-bs-toggle="modal"
              data-bs-target="#adminLocationModal"
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    const action = getLocationPageApi(page, pageSize);
    dispatch(action);
  }, [page]);

  useEffect(() => {
    const action1 = getLocationAPI();
    dispatch(action1);
  }, []);

  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(searchLocationAdminApi(search, page, pageSize));
    }, 1000);
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [search]);

  return (
    <div className="admin_location">
      <div className="container admin_location-layout">
        <div className="d-flex admin_location-header">
          <div className="admin_location-header-add">
            <button
              className="btn_update admin_location-btn add_btn"
              onClick={() =>
                setItemClick({
                  id: 0,
                  tenViTri: '',
                  tinhThanh: '',
                  quocGia: '',
                  hinhAnh: '',
                })
              }
              data-bs-toggle="modal"
              data-bs-target="#adminLocationModal"
            >
              <span className="me-2">Thêm vị trí</span>
              <i className="fas fa-plus-circle"></i>
            </button>
          </div>
          <ModalAdminLocation page={page} pageSize={pageSize} itemClick={itemClick} />

          <form className="d-flex admin_location-header-search" role="search">
            <input
              className="form-control me-2 search_input"
              type="search"
              placeholder="Địa điểm cần tìm?"
              aria-label="Search"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <span className="search-icon">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
        <div className="mt-3">
          <table className="table table-bordered align-middle admin_location-table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Tên vị trí</th>
                <th scope="col">Tỉnh thành</th>
                <th scope="col">Quốc gia</th>
                <th scope="col">Hình ảnh</th>
                <th className="admin_location-table-th">Action</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
          <div>
            <Pagination
              className="admin_location-page"
              current={page}
              defaultPageSize={4}
              onChange={onChange}
              total={search == '' ? viTri.length : arrPageLocation.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
