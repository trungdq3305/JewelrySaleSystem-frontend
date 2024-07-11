import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  TextField,
} from '@mui/material'
import React from 'react'

const PayByCashModal = ({
  total,
  change,
  cash,
  handleCloseCash,
  createBill,
}) => {
  return (
    <>
      <Stack>
        <FormControl defaultValue="" required>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <FormLabel>Cash advance</FormLabel>
            <Input
              onChange={cash}
              placeholder="Type in here…"
              variant="solid"
              type="number"
              sx={{ width: '50%' }}
            />
          </div>
        </FormControl>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ fontSize: '30px', lineHeight: '0px' }}>Total</h3>
          <p style={{ fontSize: '30px' }}>
            {Number(total.toFixed(0)).toLocaleString('vn')}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ fontSize: '30px', lineHeight: '0px' }}>Change</h3>
          <p style={{ fontSize: '30px', lineHeight: '0px' }}>
            {Number(change.toFixed(0)).toLocaleString('vn')}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={handleCloseCash}
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
            Cancel
          </Button>
          <Button
            onClick={createBill}
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
            Continue
          </Button>
        </div>
      </Stack>
    </>
  )
}

export default PayByCashModal
