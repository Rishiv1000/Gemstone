import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';
import { NewtonsCradle } from '@uiball/loaders';
import { Link } from 'react-router-dom';

// Components
import Slide from './Slide';
import ProductsMenu from './customer/components/ProductsMenu';

// Assets
import bannerImage from '../assets/nn.jpeg';
import adImage from '../assets/Shop.png';
import logo from '../assets/logo.png'; // Add your logo image here
const blueSapphire = 'linear-gradient(90deg, rgba(181, 181, 255, 0.6) 0%, rgba(136, 255, 177, 0.8) 100%)';


const Home = () => {
  const dispatch = useDispatch();
  const { productData, responseProducts, error } = useSelector(state => state.user);
  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setShowNetworkError(true), 40000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <div id="top">
      {/* Mobile Menu */}
      <MobileMenuContainer>
        <ProductsMenu dropName="Products" />
      </MobileMenuContainer>

      {/* Banner Image */}
      <BannerBox>
        <img
          src={bannerImage}
          alt="Banner"
          style={{ width: '100%', height: '250px', borderRadius: 8, objectFit: 'cover' }}
        />
      </BannerBox>

      {/* Error or Loading */}
      {showNetworkError ? (
        <CenteredContent>
          <Typography variant="h4">Sorry, network error.</Typography>
        </CenteredContent>
      ) : error ? (
        <CenteredContent>
          <Typography variant="h5">Please Wait A Second</Typography>
          <NewtonsCradle size={70} speed={1.4} color="black" />
        </CenteredContent>
      ) : responseProducts ? (
        <CenteredContent>
          <Typography variant="h6" gutterBottom>
            No products found right now
          </Typography>
          <Typography variant="body1">
            Become a seller to add products{' '}
            <Link to="/Sellerregister" style={{ textDecoration: 'none', color: '#007bff' }}>
              Join
            </Link>
          </Typography>
        </CenteredContent>
      ) : (
        <MainContent>
          <LeftSection>
            <Slide products={productData} title="Top Selection" />
          </LeftSection>
          <RightSection>
            <img src={adImage} alt="Advertisement" style={{ width: 217, borderRadius: 8 }} />
          </RightSection>
        </MainContent>
      )}

      {/* Footer */}
      <Footer>
        <FooterContainer>
          <Logo src={logo} alt="Neelam Jewellers Logo" />
          <FooterText>
            <Typography variant="h6" gutterBottom>
              Neelam Jewellers
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Address: C Block, Yashoda Nagar, Kanpur Nagar , Uttar Pradesh
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Serving with excellence for over 35 years in the gemstone industry.
            </Typography>
          </FooterText>
        </FooterContainer>
      </Footer>
    </div>
  );
};

export default Home;


//
// Styled Components
//

const MobileMenuContainer = styled(Container)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    paddingTop: theme.spacing(2),
  },
}));

const BannerBox = styled(Box)`
  padding: 20px 10px;
  background: #f9f9f9;
`;

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const LeftSection = styled(Box)(({ theme }) => ({
  width: '83%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  background: '#ffffff',
  width: '17%',
  marginLeft: theme.spacing(1),
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 8,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CenteredContent = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 0;
  text-align: center;
`;


const Footer = styled(Box)`
  background:  ${blueSapphire};
  padding: 30px 0;
  margin-top: 40px;
  border-top: 1px solid #ddd;
`;

const FooterContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Logo = styled('img')`
  width: 80px;
  height: auto;
  border-radius: 8px;
`;

const FooterText = styled(Box)`
  text-align: left;
  max-width: 400px;
`;