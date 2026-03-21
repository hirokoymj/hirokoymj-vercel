import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface FormInputTextProps {
  name: string;
  label: string;
  type?: 'text' | 'password' | 'number' | 'email';
  placeholder?: string;
  style?: React.CSSProperties;
  focused?: boolean;
}

export const FormInputText: FC<FormInputTextProps> = ({ name, label, type, placeholder, style, focused }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={type ? type : 'text'}
          placeholder={placeholder || placeholder}
          style={{ ...style }}
          focused={focused}
        />
      )}
    />
  );
};
