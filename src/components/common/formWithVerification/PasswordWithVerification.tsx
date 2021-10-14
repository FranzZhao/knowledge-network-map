import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useState } from 'react'

interface State {
    id: string;
    label: string;
    color?: 'primary' | 'secondary',
    value: any;
    handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errorMsg?: string;
}

export const PasswordWithVerification: React.FC<State> = ({
    id, label, color = 'primary', value, handleChangeText, errorMsg = ''
}) => {
    const [showPassword, setShowPassword] = useState(false);

    // show password
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            {
                errorMsg === '' ? (
                    <FormControl>
                        <InputLabel htmlFor={id} color={color}>{label}</InputLabel>
                        <Input
                            id={id}
                            type={showPassword ? 'text' : 'password'}
                            color={color}
                            value={value}
                            onChange={handleChangeText}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                ) : (
                    <FormControl error>
                        <InputLabel htmlFor={id} color={color}>{label}</InputLabel>
                        <Input
                            id={id}
                            type={showPassword ? 'text' : 'password'}
                            color={color}
                            value={value}
                            onChange={handleChangeText}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="component-error-text">{errorMsg}</FormHelperText>
                    </FormControl>
                )
            }
        </React.Fragment>
    )
}
