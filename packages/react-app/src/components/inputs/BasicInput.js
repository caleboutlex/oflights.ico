import React from 'react';
import { theme } from '../../theme';
import { 
    TextField,
} from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
    root: {
        color: 'white',
        width: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        '& .MuiInputBase-root': {
            color: 'inherit',
          },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            borderColor: theme.palette.primary.main,
            },
        },
    },
    
})(TextField);


const BasicInput = (props) => {
   
    return (
        <CssTextField
            variant='standard'
            InputLabelProps={{
                shrink: true,
            }}
            size="medium"
            type={props.type}
            label={props.label}
            defaultValue={props.defaultValue}
            helperText={props.helperText}
            onChange={props.onChange}
        />
    )
}

export default BasicInput; 