import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Logout, Shop2 } from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Divider, Drawer, ListItemIcon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Cart from './customer/components/Cart';
import Search from './customer/components/Search';
import ProductsMenu from './customer/components/ProductsMenu';
import { updateCustomer } from '../redux/userHandle';
import { NavLogo } from '../utils/styles';
import logo from '../assets/logo.png';

// Gradient
const blueSapphire = 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(22, 70, 39, 0.8) 100%)';

const Navbar = () => {
  const { currentUser, currentRole } = useSelector(state => state.user);
  const totalQuantity =
    currentUser?.cartDetails?.reduce((total, item) => total + item.quantity, 0) || 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (currentRole === 'Customer') {
      dispatch(updateCustomer(currentUser, currentUser._id));
    }
  }, [currentRole, currentUser, dispatch]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const open = Boolean(anchorElUser);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const homeHandler = () => navigate('/');

  return (
    <AppBar
      position="sticky"
      sx={{
        background: blueSapphire,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO (Desktop & Mobile) */}
          <HomeContainer>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
              }}
            >
              <NavLogo
                to="top"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={homeHandler}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <img src={logo} alt="Logo" style={{ width: '3.5rem', height: '3.5rem' }} />
                <span
                  style={{
                    color: 'white',
                    fontFamily: 'sans-serif',
                    fontSize: '1rem',
                  }}
                >
                  Neelam Gemstones
                </span>
              </NavLogo>
            </Typography>
          </HomeContainer>

          {/* Mobile - Search Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton size="large" onClick={() => navigate('/Search')} color="inherit">
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Desktop - Search & Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
            <Search />
            <ProductsMenu dropName="GEMSTONE" />
          </Box>

          {/* Contact Info */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              marginRight: 5,
              color: 'rgba(255, 255, 255, 1)',
              fontSize: '0.975rem',
              fontWeight: 350,
            }}
          >
           <strong>35 Year Legacy & Experience in 100% Original Gemstones ...... </strong>  <b>...  ||   Contact: 9936182620</b>
          </Box>

          {/* Customer Menu */}
          {currentRole === 'Customer' && (
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <Tooltip title="Cart">
                <IconButton onClick={() => setIsCartOpen(true)} sx={{ color: 'inherit' }}>
                  <Badge badgeContent={totalQuantity} color="error">
                    <ShoppingCartIcon sx={{ fontSize: '2rem' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={e => setAnchorElUser(e.currentTarget)}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <Avatar sx={{ backgroundColor: '#8970dc' }}>
                    {currentUser?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={open}
                onClose={() => setAnchorElUser(null)}
                PaperProps={{ elevation: 0, sx: styles.styledPaper }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => navigate('/Profile')}>
                  <Avatar />
                  <Link to="/Profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => navigate('/Orders')}>
                  <ListItemIcon>
                    <Shop2 fontSize="small" />
                  </ListItemIcon>
                  <Link to="/Orders" style={{ color: 'inherit', textDecoration: 'none' }}>
                    My Orders
                  </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate('/Logout')}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Link to="/Logout" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Cart Drawer */}
      {isCartOpen && (
        <Drawer
          anchor="right"
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: '400px',
              boxSizing: 'border-box',
            },
          }}
        >
          <Cart setIsCartOpen={setIsCartOpen} />
        </Drawer>
      )}
    </AppBar>
  );
};

export default Navbar;

// Styled Components
const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};
