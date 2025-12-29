import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TFormInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  required?: boolean;
  rows?: number;
  multiline?: boolean;
};

const FFInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  required,
  rows,
  multiline,
}: TFormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{
            ...sx
          }}
          label={label}
          placeholder={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          required={required}
          rows={rows}
          multiline={multiline}
          error={!!error?.message}
          helperText={error?.message}

        />
      )}
    />
  );
};

export default FFInput;
