import React from 'react'
import styles from '../BillInfor/BillInfor.module.scss'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import DiscountIcon from '@mui/icons-material/Discount'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const BillInfor = ({ handleOpen }) => {
  const [age, setAge] = React.useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.Customer}>
        <div className={styles.Title}>
          <PersonAddAltIcon sx={{ fontSize: 30 }} />
          <button onClick={handleOpen}>
            <h2>Customer</h2>
          </button>
        </div>
        <div className={styles.content}>
          <p>Nguyen Van A</p>
          <p>Point: 1000</p>
        </div>
      </div>
      <hr></hr>
      <div className={styles.Voucher}>
        <div className={styles.Title}>
          <DiscountIcon sx={{ fontSize: 25 }} />

          <h2>Voucher</h2>
        </div>
        <div className={styles.content}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <hr></hr>
      {/* <div className={styles.Payment}>
        <div className={styles.Title}>
          <PointOfSaleIcon sx={{ fontSize: 25 }} />

          <h2>Payment</h2>
        </div>
        <div className={styles.content}>
          <div>
            <button>
              <p>Pay by cash</p>
            </button>
          </div>
          <div>
            <button>
              <p>Pay by card</p>{' '}
            </button>
          </div>
        </div>
      </div> */}
      <Button
        variant="contained"
        sx={{
          background: 'black',
          color: '#ffdbf0',
          marginLeft: '90px ',
          marginTop: '30px',
          '&:hover': {
            backgroundColor: '#ffdbf0',
            color: 'black',
          },
        }}
      >
        Pay by cash
      </Button>
      <Button
        variant="contained"
        sx={{
          background: 'black',
          color: '#ffdbf0',
          marginLeft: '90px ',
          marginTop: '30px',
          '&:hover': {
            backgroundColor: '#ffdbf0',
            color: 'black',
          },
        }}
      >
        Pay by card
      </Button>
    </div>
  )
}

export default BillInfor
