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
import {
  Avatar,
  Badge,
  Divider,
  Drawer,
  ListItemIcon,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Cart from './customer/components/Cart';
import Search from './customer/components/Search';
import ProductsMenu from './customer/components/ProductsMenu';
import { updateCustomer } from '../redux/userHandle';
import { NavLogo } from '../utils/styles';
import logo from '../assets/logo.png';

const blueSapphire = 'linear-gradient(90deg, rgba(53, 52, 80, 0.98) 0%, rgba(1, 15, 122, 0.8) 100%)';

const Navbar = () => {
  const { currentUser, currentRole } = useSelector((state) => state.user);
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
        {/* Use flexDirection column on Toolbar for mobile layout */}
        <Toolbar disableGutters sx={{ width: '100%', flexDirection: 'column', px: 2, py: 1 }}>

          {/* 1️⃣ Mobile Top Row: Logo + Name (centered) & Search Icon (right) */}
          <Box
            sx={{
              width: '100%',
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mx: 'auto' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: '3.2rem', height: '3.2rem', borderRadius: '8px' }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  ml: 1,
                }}
              >
                Neelam Jewellers
              </Typography>
            </Box>
            <IconButton onClick={() => navigate('/Search')} sx={{ color: '#fff' }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* 2️⃣ Mobile Second Row: Category Button aligned right */}
          {/* <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
              justifyContent: 'flex-end',
              mt: 1,
            }}
          >
            <ProductsMenu dropName="Gemstone Categories" />
          </Box> */}

          {/* 3️⃣ Desktop layout (original, visible md+) */}
          <Box
            sx={{
              width: '100%',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <HomeContainer>
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
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <img src={logo} alt="Logo" />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  Neelam Jewellers
                </Typography>
              </NavLogo>
            </HomeContainer>

            <Box sx={{ flexGrow: 4, display: 'flex', ml: 3 }}>
              <Search />
              <ProductsMenu dropName="Gemstones" />
            </Box>

            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                fontSize: '0.95rem',
                color: '#fff',
                fontWeight: 400,
                ml: 4,
              }}
            >
              35+ Years of Trust | 100% Genuine Gemstones | Contact: <strong>&nbsp;9936182620</strong>
            </Box>
          </Box>

          {/* Customer Menu (visible on all sizes if Customer) */}
          {currentRole === 'Customer' && (
            <Box sx={{ flexGrow: 0, display: 'flex', mt: { xs: 1, md: 0 } }}>
              <Tooltip title="Cart">
                <IconButton onClick={() => setIsCartOpen(true)} sx={{ color: 'inherit' }}>
                  <Badge badgeContent={totalQuantity} color="error">
                    <ShoppingCartIcon sx={{ fontSize: '2rem' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <Avatar sx={{ backgroundColor: '#ff0a0aff' }}>
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
                    <Shop2 fontSize="small" sx={{ color: '#fff' }} />
                  </ListItemIcon>
                  <Link to="/Orders" style={{ color: 'inherit', textDecoration: 'none' }}>
                    My Orders
                  </Link>
                </MenuItem>
                <Divider sx={{ bgcolor: '#444' }} />
                <MenuItem onClick={() => navigate('/Logout')}>
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: '#fff' }} />
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

  img {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 10px;
    filter: drop-shadow(0 0 8px rgba(82, 134, 255, 1));
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.08);
      filter: drop-shadow(0 0 12px rgba(255, 255, 255, 1));
    }
  }
`;

const styles = {
  styledPaper: {
    overflow: 'visible',
    mt: 1.5,
    background: 'linear-gradient(to bottom right, #000000, #1c1c1c)',
    color: '#fff',
    borderRadius: '10px',
    minWidth: '180px',
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
      bgcolor: '#1c1c1c',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
    '& .MuiMenuItem-root': {
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
};
