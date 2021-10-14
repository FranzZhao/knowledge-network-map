import React from 'react';
import TextField from '@material-ui/core/TextField';

interface State {
    id: string;
    label: string;
    color?: 'primary' | 'secondary';
    value: any;
    handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errorMsg?: string;
    style?: {};
}

export const TextFieldWithVerification: React.FC<State> = ({
    id, label, color='primary', value, handleChangeText, errorMsg = '', style = {}
}) => {
    return (
        <>
            {
                errorMsg === '' ? (
                    <TextField
                        id={id}
                        label={label}
                        color={color}
                        value={value}
                        onChange={handleChangeText}
                        style={style}
                    />
                ) : (
                    <TextField
                        error
                        helperText={errorMsg}
                        id={id}
                        label={label}
                        color={color}
                        value={value}
                        onChange={handleChangeText}
                        style={style}
                    />
                )
            }
        </>
    )
}
