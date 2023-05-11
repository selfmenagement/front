import { TextField } from '@mui/material';

export default function TextFiled({
  value,
  isForm,
  password,
  name,
  message,
  change
}: {
  change: (text: string) => void;
  value: string;
  isForm: boolean;
  password: boolean;
  name: string;
  message: string;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    change(e.target.value);
  };

  return (
    <TextField
      color={value.length !== 0 && isForm ? 'success' : 'primary'}
      focused={value.length !== 0 && isForm ? true : false}
      type={password ? 'password' : ''}
      error={value.length !== 0 && !isForm}
      name={name}
      label={name}
      value={value}
      onChange={onChange}
      helperText={value.length !== 0 && !isForm ? message : ' '}
    />
  );
}
