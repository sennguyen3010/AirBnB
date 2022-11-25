import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/configStore';
import { postRoomApi, Room } from '../../../../redux/reducers/roomDetailReducer';
import { ACCESS_TOKEN, getStore } from '../../../../util/setting';

type Props = {};

export default function CreateRoom({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const initialValues: Room = {
    id: 0,
    tenPhong: '',
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: '',
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
    hinhAnh: '',
  };
  const CreateRoomSchema = Yup.object().shape({
    tenPhong: Yup.string().required('Không được bỏ trống!'),
    khach: Yup.string().required('Không được bỏ trống!'),
    phongNgu: Yup.string().required('Không được bỏ trống!'),
    phongTam: Yup.string().required('Không được bỏ trống!'),
    giaTien: Yup.string().required('Không được bỏ trống!'),
    maViTri: Yup.string().required('Không được bỏ trống!'),
    moTa: Yup.string().required('Không được bỏ trống!'),
  });
  return (
    <div>
      {/* Modal trigger button */}
      {/* <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#modalIdCreateRoom"
      >
        Launch
      </button> */}
      {/* Modal Body */}
      {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
      <div
        className="modal fade"
        id="modalIdCreateRoom"
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
                Create Room
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="container">
                <Formik
                  initialValues={initialValues}
                  validationSchema={CreateRoomSchema}
                  onSubmit={(values) => {
                    let token = getStore(ACCESS_TOKEN);
                    if (token) {
                      let action = postRoomApi(token, values);
                      dispatch(action);
                    }
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className=" row">
                        <div className="form-group col-4 ">
                          <p className="py-2">Tên phòng</p>
                          <Field className="form-control" type="text" name="tenPhong" id="tenPhong" />
                          {errors.tenPhong && touched.tenPhong ? (
                            <p className="text-danger">{errors.tenPhong}</p>
                          ) : null}
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Số khách</p>
                          <Field className="form-control" type="number" name="khach" id="khach" />
                          {errors.khach && touched.khach ? <p className="text-danger">{errors.khach}</p> : null}
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Phòng Ngủ</p>
                          <Field className="form-control" type="number" name="phongNgu" id="phongNgu" />
                          {errors.phongNgu && touched.phongNgu ? (
                            <p className="text-danger">{errors.phongNgu}</p>
                          ) : null}
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Giường</p>
                          <Field className="form-control" type="number" name="giuong" id="giuong" />
                          {errors.giuong && touched.giuong ? (
                            <p id="err" className="text-danger">
                              {errors.giuong}
                            </p>
                          ) : null}
                        </div>

                        <div className="form-group col-4">
                          <p className="py-2">Phòng tắm</p>
                          <Field className="form-control" type="number" name="phongTam" id="phongTam" />
                          {errors.phongTam && touched.phongTam ? (
                            <p className="text-danger">{errors.phongTam}</p>
                          ) : null}
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Giá tiền</p>
                          <Field className="form-control" type="number" name="giaTien" id="giaTien" />
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Máy giặt</p>
                          <Field as="select" name="mayGiat" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Bàn là</p>
                          <Field as="select" name="banLa" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Ti vi</p>
                          <Field as="select" name="tivi" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Điều hòa nhiệt độ</p>
                          <Field as="select" name="dieuHoa" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Wifi</p>
                          <Field as="select" name="wifi" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Bếp</p>
                          <Field as="select" name="bep" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Đỗ xe</p>
                          <Field as="select" name="doXe" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Hồ Bơi</p>
                          <Field as="select" name="hoBoi" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Bàn ủi</p>
                          <Field as="select" name="banUi" className="form-control">
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Field>
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Mã vị trí</p>
                          <Field type="number" name="maViTri" id="maViTri" className="form-control" />
                          {errors.maViTri && touched.maViTri ? <p className="text-danger">{errors.maViTri}</p> : null}
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Hình ảnh</p>
                          <Field type="text" name="hinhAnh" id="hinhAnh" className="form-control" />
                        </div>
                        <div className="form-group col-4">
                          <p className="py-2">Mô tả</p>
                          <Field type="textarea" name="moTa" id="moTa" className="form-control" />
                          {errors.moTa && touched.moTa ? <p className="text-danger">{errors.moTa}</p> : null}
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
