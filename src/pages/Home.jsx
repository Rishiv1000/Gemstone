import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';

// Components
import Slide from './Slide';

// Assets
import bannerImage from '../assets/nn.png';
import adImage from '../assets/Shop.png';
import logo from '../assets/logo.png';

const blueSapphire = 'linear-gradient(90deg, rgba(53, 52, 80, 0.98) 0%, rgba(1, 15, 122, 0.8) 100%)';

const Home = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait 2 seconds before loading products
    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(getProducts());
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return (
      <LoadingContainer>
        <Typography variant="h5">Loading Neelam Jewellers...</Typography>
      </LoadingContainer>
    );
  }

  return (
    <div id="top">
      <BannerBox>
        <img
          src={bannerImage}
          alt="Banner"
          style={{ width: '100%', height: '250px', borderRadius: 8, objectFit: 'cover' }}
        />
      </BannerBox>

      <MainContent>
        <LeftSection>
          <Slide products={productData} title="Top Selection" />
        </LeftSection>
        <RightSection>
          <img src={adImage} alt="Advertisement" style={{ width: 217, borderRadius: 8 }} />
        </RightSection>
      </MainContent>

      <Footer>
        <FooterContainer>
          <Logo src={logo} alt="Neelam Jewellers Logo" />
          <FooterText>
            <Typography variant="h6" color="white" gutterBottom>
              Neelam Jewellers
            </Typography>
            <Typography variant="body2" color="white">
              Address: C Block, Yashoda Nagar, Kanpur Nagar, Uttar Pradesh
            </Typography>
            <Typography variant="body2" color="white">
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

const Footer = styled(Box)`
  background: ${blueSapphire};
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

const LoadingContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
`;
