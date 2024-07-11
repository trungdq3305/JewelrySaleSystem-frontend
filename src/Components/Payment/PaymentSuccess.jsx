import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button } from '@mui/material'

const PaymentSuccess = () => {
  return (
    <>
      <div>Payment Successfully</div>
      <div>
        <CheckCircleIcon />
      </div>
      <Button
        onClick={() => {}}
        variant="contained"
        sx={{
          background: 'black',
          height: '50px',
          width: '120px',
          color: '#ffdbf0',
          marginRight: '20px',
          '&:hover': {
            backgroundColor: '#ffdbf0',
            color: 'black',
          },
        }}
      >
        Back to homepage
      </Button>
      <Button
        variant="contained"
        sx={{
          marginRight: '20px',
          width: '120px',
          height: '50px',
          background: 'black',
          color: '#ffdbf0',

          '&:hover': {
            backgroundColor: '#ffdbf0',
            color: 'black',
          },
        }}
      >
        Send warranty
      </Button>
    </>
  )
}

export default PaymentSuccess
