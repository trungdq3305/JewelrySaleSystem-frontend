import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  Snackbar,
} from '@mui/material'
const GoldTable = ({ goldList }) => {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}
      >
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Id
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Name
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Purchase price
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                SalePrice
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                World price
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Modified By
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Modified Date
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Kara
              </TableCell>
              <TableCell
                align="right"
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              >
                Gold Percent
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell> G001</TableCell>
              <TableCell> Vàng SJC 1L - 10L - 1KG</TableCell>

              <TableCell align="right">
                {Number(10000000).toLocaleString('en')}
              </TableCell>
              <TableCell align="right">
                {Number(10000000).toLocaleString('en')}
              </TableCell>
              <TableCell align="right">
                {Number(10000000).toLocaleString('en')}
              </TableCell>
              <TableCell align="right">USR05</TableCell>
              <TableCell align="right">15/07/2024</TableCell>

              <TableCell align="right">24K</TableCell>
              <TableCell align="right">99.9%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </>
  )
}

export default GoldTable
