import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/configStore';
import { updateLocationAdminApi } from '../../redux/reducers/locationDetailReducer';
import { postLocationAdminApi } from '../../redux/reducers/locationDetailReducer';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

type Props = {
  page: number;
  pageSize: number;
  itemClick: Location;
};

export default function ModalAdminLocation({ page, pageSize, itemClick }: Props) {
  const image = require('../../assets/img/uploadImg.png');
  const [img, setImg] = useState<any>(image);
  let randomString = Math.random().toString(36);
  const [inputKey, setInputKey] = useState<any>();

  let initialValues: Location = {
    id: 0,
    tenViTri: '',
    tinhThanh: '',
    quocGia: '',
    hinhAnh: '',
  };

  const [valueUpdate, setValueUpdate] = useState(initialValues);

  const dispatch: AppDispatch = useDispatch();

  const locationSchema = Yup.object().shape({
    tenViTri: Yup.string().required('Không được bỏ trống!'),
    tinhThanh: Yup.string().required('Không được bỏ trống!'),
    quocGia: Yup.string().required('Không được bỏ trống!'),
    hinhAnh: Yup.mixed()
      .required('Không được bỏ trống!')
      .test('FILE_SIZE', 'Dung lượng hình phải dưới 1Mb', (value) => value && value.size < 1000000)
      .test(
        'FILE_TYPE',
        'Chỉ cho phép định dạng (jpg, jpeg, png, gif)',
        (value) => value && ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(value.type)
      ),
  });

  useEffect(() => {
    let values = {
      id: itemClick.id,
      tenViTri: itemClick.tenViTri,
      tinhThanh: itemClick.tinhThanh,
      quocGia: itemClick.quocGia,
      hinhAnh: '',
    };
    setValueUpdate(values);
  }, [itemClick.id, itemClick.tenViTri, itemClick.tinhThanh]);

  return (
    <div>
      <div
        className={`modal fade`}
        id="adminLocationModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <span className="detail_title">Thêm vị trí</span>
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <Formik
                enableReinitialize={true}
                initialValues={valueUpdate}
                validationSchema={locationSchema}
                onSubmit={(values, actions) => {
                  if (itemClick.id != 0) {
                    const action = updateLocationAdminApi(itemClick.id, values, page, pageSize);
                    dispatch(action);
                  } else {
                    const action = postLocationAdminApi(values, page, pageSize);
                    dispatch(action);
                  }

                  const c = document.querySelector('.btn-close') as HTMLElement;
                  c.click();
                  setInputKey(randomString);
                  setImg(image);
                  actions.resetForm();
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="tenViTri" className="form-label modal_ad-lable">
                          Tên vị trí
                        </label>
                        <Field id="tenViTri" name="tenViTri" className="form-control modal_ad-input" />
                        {errors.tenViTri && touched.tenViTri ? <p className="text-danger">{errors.tenViTri}</p> : null}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="tinhThanh" className="form-label modal_ad-lable">
                          Tỉnh thành
                        </label>
                        <Field id="tinhThanh" name="tinhThanh" className="form-control modal_ad-input" />
                        {errors.tinhThanh && touched.tinhThanh ? (
                          <p className="text-danger">{errors.tinhThanh}</p>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="quocGia" className="form-label modal_ad-lable">
                          Quốc gia
                        </label>
                        <Field id="quocGia" name="quocGia" className="form-control modal_ad-input" />
                        {errors.quocGia && touched.quocGia ? <p className="text-danger">{errors.quocGia}</p> : null}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="hinhAnh" className="form-label modal_ad-lable">
                          Hình ảnh
                        </label>
                        <input
                          onChange={(e: any) => {
                            setFieldValue('hinhAnh', e.target.files[0]);

                            let reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setImg(reader.result);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }}
                          key={inputKey || ''}
                          type="file"
                          id="hinhAnh"
                          name="hinhAnh"
                          className="form-control modal_ad-input"
                        />
                        {errors.hinhAnh && touched.hinhAnh ? <p className="text-danger">{errors.hinhAnh}</p> : ''}
                      </div>
                    </div>

                    <div className="col-6 d-flex align-items-center justify-content-center">
                      <div className="">{img && <img className="w-100 modal_ad-img" src={img} alt="img" />}</div>
                    </div>

                    <div>
                      <button type="submit" className="modal_ad-btn-submit">
                        Lưu
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
