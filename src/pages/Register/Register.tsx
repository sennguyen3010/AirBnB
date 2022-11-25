import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/configStore';
import { postSignupUser } from '../../redux/reducers/userReducer';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';

type Props = {};
export interface userRegister {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  passwordConfirm: string;
}
export default function Register({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const initialValues: userRegister = {
    id: 0,
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: true,
    role: '',
    name: '',
    passwordConfirm: '',
  };
  const registerSchema = Yup.object().shape({
    password: Yup.string().required('Không được bỏ trống!').min(3, 'Password phải nhiều hơn 3 ký tự!'),
    passwordConfirm: Yup.string()
      .required('Không được bỏ trống!')
      .min(3, 'Password phải nhiều hơn 3 ký tự!')
      .oneOf([Yup.ref('password')], 'Nhập lại mật khẩu không khớp với mật khẩu!'),
    email: Yup.string().required('Không được bỏ trống!').email('Email không hợp lệ'),
    name: Yup.string().required('Không được bỏ trống!'),
    gender: Yup.string().required('Không được bỏ trống!'),
    phone: Yup.string()
      .required('Không được bỏ trống!')
      .length(10, 'Số điện thoại phải đủ 10 số!')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Số điện thoại phải là số!'
      ),
  });

  return (
    <div className="register">
      <div className="container">
        <h3 className="py-3 text-center">ĐĂNG KÝ</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            const aciton = postSignupUser(values);
            dispatch(aciton);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <p className="modal_ad-lable">Họ tên</p>
                <Field className="form-control modal_ad-input" type="text" name="name" id="name" />
                {errors.name && touched.name ? <p className="text-danger">{errors.name}</p> : null}
              </div>
              <div className="form-group">
                <p className="modal_ad-lable">Email</p>
                <Field className="form-control modal_ad-input" type="email" name="email" id="email" />
                {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : null}
              </div>
              <div className="form-group">
                <p className="modal_ad-lable">Mật khẩu</p>
                <Field className="form-control modal_ad-input" type="password" name="password" id="password" />
                {errors.password && touched.password ? <p className="text-danger">{errors.password}</p> : null}
              </div>
              <div className="form-group">
                <p className="modal_ad-lable">Nhập lại mật khẩu</p>
                <Field
                  className="form-control modal_ad-input"
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                />
                {errors.passwordConfirm && touched.passwordConfirm ? (
                  <p id="err" className="text-danger">
                    {errors.passwordConfirm}
                  </p>
                ) : null}
              </div>

              <div className="form-group">
                <p className="modal_ad-lable">Số điện thoại</p>
                <Field className="form-control modal_ad-input" type="text" name="phone" id="phone" />
                {errors.phone && touched.phone ? <p className="text-danger">{errors.phone}</p> : null}
              </div>
              <div className=" form-group row mt-2 align-items-center">
                <div className="col-4">
                  <p className="modal_ad-lable">Giới tính: </p>
                </div>
                <div className="col-4 row">
                  <div className=" col-6 text-center">
                    <Field className="form-check-input" id="nam" type="radio" name="gender" value="true" />
                    <label htmlFor="nam" className="ms-2 reigster_label form-check-label">
                      Nam
                    </label>
                  </div>
                  <div className=" col-6 text-center">
                    <Field className="form-check-input" id="nu" type="radio" name="gender" value="false" />
                    <label htmlFor="nu" className="ms-2 reigster_label form-check-label">
                      Nữ
                    </label>
                  </div>
                </div>
                <div>{errors.gender && touched.gender ? <p className="text-danger">{errors.gender}</p> : null}</div>
              </div>

              <div className="row">
                <div className="form-group col-6">
                  <p className="modal_ad-lable">Birthday:</p>
                  <Field
                    type="date"
                    name="birthday"
                    id="birthday"
                    min="1989-1-1"
                    max="2022-10-31"
                    className="form-control modal_ad-input"
                  />
                </div>
              </div>
              <div className="mt-2 footer_register">
                <button type="submit" className="modal_ad-btn-submit">
                  Đăng ký
                </button>
                <NavLink to="/login" type="button" className="mx-2 modal_ad-btn-submit btn_update">
                  Đăng nhập
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
