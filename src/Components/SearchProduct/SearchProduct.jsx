import React from 'react'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
const SearchProduct = ({
  setSearchQuery,
  handleSearchBy,
  searchBy,
  handleSearch,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    handleSearch()
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Search By"
        value={searchBy}
        onChange={handleSearchBy}
        sx={{
          width: '100px',
          height: '40px',
          marginRight: '10px',
        }}
      >
        <MenuItem value="Name">Name</MenuItem>
        <MenuItem value="Id">Id</MenuItem>
      </Select>

      <TextField
        id="search-bar"
        className="text"
        onInput={setSearchQuery}
        label="Search"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: 'blue' }} />
      </IconButton>
    </form>
  )
}

export default SearchProduct
