import React from 'react';
import {Button} from '@material-ui/core'
import { useToasts } from 'react-toast-notifications'

const Toast = ({ content }) => {
  const { addToast } = useToasts()
  return (
    <Button onClick={() => addToast(content, {
      appearance: 'success',
      autoDismiss: true,
    })}>
      Add Toast
    </Button>
  )
}

export default Toast