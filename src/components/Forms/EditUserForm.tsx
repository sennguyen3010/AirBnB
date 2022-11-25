import { Box, Button, ButtonBase, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { FormikTextField } from './TextFieldWrapper';
import { SelecFieldWrapper, SelectOptions } from './SelectFieldWrapper';
import { userLogin } from '../../redux/reducers/userReducer';
import { http } from '../../util/setting';
import { userDataType } from '../../pages/Admin/UserManagement/DataTable/UserDataTable';
import { FaEdit } from 'react-icons/fa';
import DatePicker from './DatePicker';
type Props = {
  dataDefault: userLogin | null | undefined;
  loading: React.Dispatch<React.SetStateAction<boolean>>;
};

interface dataEditType {
  email: string;
  password: string;
  name: string;
  gender: boolean;
  phone: string;
  confirmPassw: string;
  role: string;
  birthday: string;
}

export default function EditUserForm({ dataDefault, loading }: Props) {
  const handleSubmitEditForm = async (value: dataEditType) => {
    try {
      const dataEdit: userLogin = { ...dataDefault, ...value };
      loading(true);
      await http.put(`/users/${dataEdit.id}`, dataEdit);
      alert('Cập nhật thành công!');
      loading((prev) => !prev);
    } catch (err) {
      alert(err);
    }
  };
  const genderOption: SelectOptions[] = [
    {
      value: true as any,
      label: 'Nam',
    },
    {
      value: false as any,
      label: 'Nữ',
    },
  ];
  const roleOption: SelectOptions[] = [
    {
      value: 'ADMIN',
      label: 'Admin',
    },
    {
      value: 'USER',
      label: 'User',
    },
  ];

  const formik = {
    email: `${dataDefault?.email}`,
    password: `${dataDefault?.password}`,
    name: `${dataDefault?.name}`,
    gender: true,
    phone: `${dataDefault?.phone}`,
    confirmPassw: '',
    role: `${dataDefault?.role}`,
    birthday: '',
  };
  const validation = Yup.object().shape({
    email: Yup.string().required('Email is required!').email('Invalid email!'),
    name: Yup.string().required('Name is required!'),
    phone: Yup.string().required('Phone is required!'),
    password: Yup.string().required('Password is required!').min(4, 'Password must have at least 4 characters'),
    confirmPassw: Yup.string()
      .required('Confirm password is required!')
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
      }),
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component={'h2'}
          sx={{
            fontSize: '1.5rem',
            textAlign: 'center',
            padding: '12px 0 16px',
          }}
        >
          Điều chỉnh thông tin
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={formik}
          validationSchema={validation}
          onSubmit={(value) => {
            handleSubmitEditForm(value);
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormikTextField
                  formikKey="name"
                  label="Name"
                  color="warning"
                  variant="outlined"
                  defaultValue={dataDefault?.name}
                />
                <FormikTextField
                  sx={{
                    my: '10px',
                  }}
                  formikKey="email"
                  label="Email"
                  color="warning"
                  variant="outlined"
                  defaultValue={dataDefault?.email}
                />
                <FormikTextField
                  formikKey="phone"
                  label="Phone"
                  color="warning"
                  variant="outlined"
                  defaultValue={dataDefault?.phone}
                />
              </Grid>
              <Grid item xs={6}>
                <SelecFieldWrapper
                  color="warning"
                  selectFieldKey="gender"
                  label="Gender"
                  options={genderOption}
                  defaultValue={dataDefault?.gender}
                ></SelecFieldWrapper>
                <DatePicker
                  dateFieldKey="birthday"
                  color="warning"
                  sx={{
                    my: '10px',
                  }}
                />
                <FormikTextField
                  sx={{
                    mb: '10px',
                  }}
                  formikKey="password"
                  label="Password"
                  color="warning"
                  variant="outlined"
                  defaultValue={dataDefault?.password}
                />
                <FormikTextField formikKey="confirmPassw" label="Confirm Password" color="warning" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <SelecFieldWrapper
                  selectFieldKey="role"
                  label="Role"
                  options={roleOption}
                  defaultValue={dataDefault?.role}
                ></SelecFieldWrapper>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: 'end',
                }}
              >
                <Button type={'submit'} variant="contained" startIcon={<FaEdit />} color="warning">
                  Chỉnh sửa
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}
