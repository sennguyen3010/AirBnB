import React from "react";
import { useField} from "formik";
import { TextField, TextFieldProps } from "@mui/material";



type FormikTextFieldProps = {
    formikKey: string,
} & TextFieldProps

export const FormikTextField = ({ formikKey, ...props }: FormikTextFieldProps) => {
    const [field, meta] = useField(formikKey);
    return <TextField
        fullWidth
        id={field.name}
        name={field.name}
        helperText={meta.touched ? meta.error : ""}
        error={meta.touched && Boolean(meta.error)}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...props}
    />
}