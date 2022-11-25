import {
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { FormikTextField } from "./TextFieldWrapper";
import { SelecFieldWrapper, SelectOptions } from "./SelectFieldWrapper";
import { Dayjs } from 'dayjs';
import { http } from "../../util/setting";
import { userDataType } from "../../pages/Admin/UserManagement/DataTable/UserDataTable";
import DatePicker from "./DatePicker";
import {FaPlus} from 'react-icons/fa'

type Props = {
  totalRow: number,
  loading: React.Dispatch<React.SetStateAction<boolean>>
};

interface dataAddType {
  id: number;
  email: string;
  password: string;
  name: string;
  gender: boolean;
  phone: string;
  confirmPassw: string;
  role: string;
  birthday: string
}

export default function AddUserForm({loading,totalRow}: Props) {
  const handleSubmitAddForm = async (value: dataAddType) => {
    try {
      loading(true)
      let result =await http.post('/users',value)
      alert(result.data.content)
      loading(prev => !prev)
      
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  const genderOption: SelectOptions[] = [
    {
      value: true as any,
      label: "Nam",
    },
    {
      value: false as any,
      label: "Nữ",
    },
  ];
  const roleOption: SelectOptions[] = [
    {
      value: "ADMIN",
      label: "Admin",
    },
    {
      value: "USER",
      label: "User",
    },
  ];

  const formik = {
    id:0,
    email: ``,
    password: ``,
    name: ``,
    gender: true,
    phone: ``,
    confirmPassw: "",
    role: "",
    birthday:''
  };
  const validation = Yup.object().shape({
    email: Yup.string().required("Email is required!").email("Invalid email!"),
    name: Yup.string().required("Name is required!"),
    phone: Yup.string().required("Phone is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(4, "Password must have at least 4 characters"),
    confirmPassw: Yup.string()
      .required("Confirm password is required!")
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component={"h2"}
          sx={{
            fontSize: "1.5rem",
            textAlign: "center",
            padding: '12px 0 16px'
          }}
        >
          Thêm người dùng
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={formik}
          validationSchema={validation}
          onSubmit={(value) => {
            handleSubmitAddForm(value)
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SelecFieldWrapper
                  selectFieldKey="role"
                  label="Role"
                  options={roleOption}
                  defaultValue={"user"}
                  color='success'
                ></SelecFieldWrapper>
              </Grid>
              <Grid item xs={6}>
                
                <FormikTextField
                  formikKey="name"
                  label="Name"
                  color="success"
                  variant="outlined"
                />
                <FormikTextField
                  sx={{
                    my: "10px",
                  }}
                  formikKey="email"
                  label="Email"
                  color="success"
                  variant="outlined"
                />
                <FormikTextField
                  formikKey="phone"
                  label="Phone"
                  color="success"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <SelecFieldWrapper
                  selectFieldKey="gender"
                  label="Gender"
                  options={genderOption}
                  defaultValue={true}
                ></SelecFieldWrapper>
                <DatePicker dateFieldKey="birthday" color="success" sx={{
                    my: "10px",
                  }}/>
                <FormikTextField
                  formikKey="password"
                  label="Password"
                  color="success"
                  variant="outlined"
                />
                <FormikTextField
                  formikKey="confirmPassw"
                  label="Confirm Password"
                  color="success"
                  variant="outlined"
                  sx={{
                    my: "10px",
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sx={{
                textAlign:'end'
              }}>
                {/* <button type="submit">Submit</button> */}
                <Button type={"submit"} 
                variant='contained'
                startIcon={<FaPlus />}
                color={'success'}
                >Thêm</Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}
