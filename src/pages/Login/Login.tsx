import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/configStore';
import { postSignin } from '../../redux/reducers/userReducer';
import { NavLink } from 'react-router-dom';

type Props = {};

export default function Loign({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };
  const loginSchema = Yup.object().shape({
    password: Yup.string().required('Không được bỏ trống!').min(3, 'Password nhiều hơn 3 ký tự!'),
    email: Yup.string().required('Không được bỏ trống!').email('Email không hợp lệ'),
  });
  return (
    <div className="login">
      <div className="container">
        <h3 className="py-4 text-center">ĐĂNG NHẬP </h3>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            const action = postSignin(values);
            dispatch(action);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group mt-2">
                <p className="modal_ad-lable">Email</p>
                <Field className="form-control modal_ad-input" type="text" name="email" id="email" />
                {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : null}
              </div>
              <div className="form-group mt-2">
                <p className="modal_ad-lable">Mật khẩu</p>
                <Field className="form-control modal_ad-input" type="password" name="password" id="password" />
                {errors.password && touched.password ? <p className="text-danger">{errors.password}</p> : null}
              </div>

              <div className="py-4 footer_login">
                <button type="submit" className="modal_ad-btn-submit">
                  Đăng nhập
                </button>
                <NavLink type="button" className="modal_ad-btn-submit btn_update" to={'/register'}>
                  Đăng ký
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
