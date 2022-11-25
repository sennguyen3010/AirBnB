import { TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'
import {useField} from 'formik'

type DateFieldProps = {
    dateFieldKey: string
} & TextFieldProps

const DatePicker = ({dateFieldKey,...props}:DateFieldProps)=>{
    const [field,meta] = useField(dateFieldKey)
    return(
        <TextField type={'date'}
        variant = 'outlined'
        fullWidth
        name={field.name}
        id={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        
        {...props}
        />
    )
}

export default DatePicker