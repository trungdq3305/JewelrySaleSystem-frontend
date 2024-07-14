import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import { useNavigate } from 'react-router-dom'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined'
const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#FFDBF0',
  color: '#000000',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#FFDBF0',
  color: '#ffffff',
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function ManagerSideBar() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [manageOpen, setManageOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleManageClick = () => {
    setManageOpen(!manageOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => {
              navigate('/Dashboard')
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleManageClick}>
            <ListItemIcon>
              <GroupsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Manage List" />
            {manageOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={manageOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  navigate('/ManagerHomePage/ManageGem')
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <DiamondOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gem" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  navigate('/ManagerHomePage/ManageDiscount')
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <LocalOfferOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Discount"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  navigate('/ManagerHomePage/ManageProduct')
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <CategoryOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Product"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  navigate('/ManagerHomePage/ManageCashier')
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <PeopleOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Cashier"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  navigate('/ManagerHomePage/ManageUsers')
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <PeopleAltOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="User" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  navigate('/ManagerHomePage/ManageCustomer')
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <PersonOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Customer"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  navigate('/ManagerHomePage/ManageVoucher')
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <CardGiftcardOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Voucher"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  navigate('/ManagerHomePage/ManageGold')
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <CardGiftcardOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gold" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/Settings'); }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => {
              navigate('/ManagePage')
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Back to Homepage"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}
