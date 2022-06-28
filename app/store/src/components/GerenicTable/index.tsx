import { FC } from 'react'
import { TextFieldProps as MUITextFieldProps } from '@mui/material'
import { StyledTextField } from './styles'

interface TextFieldProps extends Omit<MUITextFieldProps, 'variant'> {
  measuringUnit?: string
}

export const TextField: FC<TextFieldProps> = ({
  children,
  measuringUnit,
  ...textFieldProps
}) => {
  return (
    <StyledTextField
      variant="filled"
      InputProps={{
        ...textFieldProps.InputProps,
        disableUnderline: true,
        endAdornment: measuringUnit,
      }}
      sx={{
        ...textFieldProps.sx,
        '& .MuiInputBase-root': {
          outline: `${textFieldProps.value ?? ''}`.length
            ? 'white solid 1px'
            : '',
        },
      }}
      {...textFieldProps}
    >
      {children}
    </StyledTextField>
  )
}
