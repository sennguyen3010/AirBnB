import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/configStore';
import * as Yup from 'yup';
import { BookRoom, postBookRoomAdminApi } from '../../../redux/reducers/roomDetailReducer';

type Props = {};

export default function CreateDatPhong({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const initialValues: BookRoom = {
    id: 0,
    maPhong: 0,
    ngayDen: '',
    ngayDi: '',
    soLuongKhach: 0,
    maNguoiDung: 0,
  };
  const CreateRoomSchema = Yup.object().shape({
    maPhong: Yup.string().required('Không được bỏ trống!'),
    ngayDen: Yup.string().required('Không được bỏ trống!'),
    ngayDi: Yup.string().required('Không được bỏ trống!'),
    soLuongKhach: Yup.string().required('Không được bỏ trống!'),
    maNguoiDung: Yup.string().required('Không được bỏ trống!'),
  });
  return (
    <div>
      {/* Modal trigger button */}
      {/* <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#modalIdCreateDatPhong"
      >
        Launch
      </button> */}
      {/* Modal Body */}
      {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
      <div
        className="modal fade"
        id="modalIdCreateDatPhong"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Thêm đặt phòng
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="container">
                <Formik
                  initialValues={initialValues}
                  validationSchema={CreateRoomSchema}
                  onSubmit={(values) => {
                    let action = postBookRoomAdminApi(values);
                    dispatch(action);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className=" row">
                        <div className="form-group col-4 ">
                          <p className="py-2">Mã Phòng</p>
                          <Field className="form-control" type="number" name="maPhong" id="maPhong" />
                          {errors.maPhong && touched.maPhong ? <p className="text-danger">{errors.maPhong}</p> : null}
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Mã khách hàng</p>
                          <Field className="form-control" type="number" name="maNguoiDung" id="maNguoiDung" />
                          {errors.maNguoiDung && touched.maNguoiDung ? (
                            <p className="text-danger">{errors.maNguoiDung}</p>
                          ) : null}
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Ngày nhận phòng:</p>
                          <Field
                            type="date"
                            name="ngayDen"
                            id="ngayDen"
                            min="1989-1-1"
                            max="2022-10-31"
                            className="form-control"
                          />
                          {errors.ngayDen && touched.ngayDen ? <p className="text-danger">{errors.ngayDen}</p> : null}
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Ngày trả phòng:</p>
                          <Field
                            type="date"
                            name="ngayDi"
                            id="ngayDi"
                            min="1989-1-1"
                            max="2022-10-31"
                            className="form-control"
                          />
                          {errors.ngayDi && touched.ngayDi ? (
                            <p id="err" className="text-danger">
                              {errors.ngayDi}
                            </p>
                          ) : null}
                        </div>

                        <div className="form-group col-4">
                          <p className="py-2">Số lượng khách</p>
                          <Field className="form-control" type="number" name="soLuongKhach" id="soLuongKhach" />
                          {errors.soLuongKhach && touched.soLuongKhach ? (
                            <p className="text-danger">{errors.soLuongKhach}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="mt-2 footer_register">
                        <button type="submit" className="btn btn-success">
                          Create Room
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Place to the bottom of scripts */}
    </div>
  );
}
