import { TextField, styled } from '@mui/material'
import { theme } from '..'

export const StyledTextField = styled(TextField)(() => ({
  fontFamily: theme.typography.fontFamily,
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputBase-root': {
    color: theme.palette.text.primary,
    borderRadius: 10,
    backgroundColor: 'rgb(255,255,255,0.06)',
  },
  '& .MuiFilledInput-input': {
    fontWeight: 700,
  },
  '& .MuiInputBase-root.Mui-focused': {
    outline: `${theme.palette.secondary.main} solid 1px`,
  },
}))
