import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import * as Yup from 'yup';
import { putUserApi, userLogin } from '../../redux/reducers/userReducer';

type Props = {};

export default function UpdateProfile({}: Props) {
  const userLogin = useSelector((state: RootState) => state.userReducer.userLogin);
  const dispatch: AppDispatch = useDispatch();
  const initialValues: userLogin = {
    id: 0,
    email: '',
    phone: '',
    birthday: '',
    gender: true,
    role: '',
    name: '',
  };
  const [valueUpdate, setValueUpdate] = useState(initialValues);
  useEffect(() => {
    if (userLogin) {
      let values = {
        id: userLogin.id,
        email: userLogin.email,
        phone: userLogin.phone,
        birthday: userLogin.birthday,
        gender: userLogin.gender,
        role: '',
        name: userLogin.name,
      };
      setValueUpdate(values);
    }
  }, [userLogin?.id]);

  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Không được bỏ trống!'),
    phone: Yup.string().length(10, 'Nhập lại số điện thoại !').required('Không được bỏ trống!'),
  });
  return (
    <div>
      <div
        className="modal fade"
        id="modalIdProfile"
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
                Update Profile
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <Formik
                initialValues={valueUpdate}
                enableReinitialize={true}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                  values.email = userLogin?.email;
                  let action = putUserApi(userLogin?.id, values);
                  dispatch(action);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <p className="py-2">Họ tên</p>
                      <Field className="form-control" type="text" name="name" id="name" />
                      {errors.name && touched.name ? <p className="text-danger">{errors.name}</p> : null}
                    </div>
                    <div className="form-group">
                      <p className="py-2">Email</p>
                      <Field type="email" name="email" className="form-control" />
                    </div>

                    <div className="form-group">
                      <p className="py-2">Số điện thoại</p>
                      <Field className="form-control" type="text" name="phone" id="phone" />
                      {errors.phone && touched.phone ? <p className="text-danger">{errors.phone}</p> : null}
                    </div>
                    <div className=" form-group row mt-2">
                      <p className="col-4">Giới tính: </p>
                      <div className="col-4 row">
                        <div className=" col-6 text-center">
                          <Field type="radio" name="gender" value="true" checked />
                          <p>Nam</p>
                        </div>
                        <div className=" col-6 text-center">
                          <Field type="radio" name="gender" value="false" />
                          <p>Nữ</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-6 px-2">
                        <p className="py-2">Birthday:</p>
                        <Field
                          type="date"
                          name="birthday"
                          id="birthday"
                          min="1989-1-1"
                          max="2022-10-31"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <button type="submit" className="btn btn-success">
                        UpDate
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
  );
}
