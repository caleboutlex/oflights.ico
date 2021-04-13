import React from 'react';
import { theme } from '../../theme';
import { withStyles } from '@material-ui/core/styles';
import { Button as MaterialButton } from '@material-ui/core';

const StyledButton = withStyles({
    root: {
      background: theme.palette.gradient.main,
      borderRadius: 3,
      border: 0,
      color: theme.palette.text.primary,
      minHeight: 38,
      padding: '0 30px',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(MaterialButton);
  
const Button =(props) => {
    return (
        <StyledButton
            size={props.size}
        >
            {props.label}
        </StyledButton>
    )
};

export default Button;