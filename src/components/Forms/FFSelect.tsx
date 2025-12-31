import { SxProps, TextField, MenuItem, Select, InputLabel, FormControl, Chip, Box } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";

type TFFSelectProps = {
    name: string;
    label?: string;
    options: { label: string; value: string }[];
    fullWidth?: boolean;
    required?: boolean;
    multiple?: boolean;
    sx?: SxProps;
};

const FFSelect = ({
    name,
    label,
    options,
    fullWidth = true,
    required = false,
    multiple = false,
    sx,
}: TFFSelectProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth={fullWidth} required={required} sx={sx} size="small">
                    {label && <InputLabel>{label}</InputLabel>}
                    <Select
                        {...field}
                        label={label}
                        multiple={multiple}
                        value={field.value || (multiple ? [] : "")}
                        onChange={(e) => field.onChange(e.target.value)}
                        renderValue={multiple ? (selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={options.find(opt => opt.value === value)?.label || value} />
                                ))}
                            </Box>
                        )) : undefined}
                        error={!!error?.message}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default FFSelect;
