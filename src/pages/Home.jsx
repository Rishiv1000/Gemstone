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
import bannerImage from '../assets/nn.png';
import adImage from '../assets/Shop.png';
import logo from '../assets/logo.png';

const blueSapphire = 'linear-gradient(90deg, rgba(53, 52, 80, 0.98) 0%, rgba(1, 15, 122, 0.8) 100%)';

const gemstones = [
  { name: 'माणिक्य (Ruby)',  color: '#FF0000' },
  { name: 'मोती (Pearl)', color: '#D4F1F9' },
  { name: 'पन्ना (Emerald)', color: '#50C878' },
  { name: 'हीरा (Diamond)',  color: '#C0C0C0' },
  { name: 'लाल मूंगा (Red Coral)',  color: '#FF4500' },
  { name: 'लहसुनिया (Cat\'s Eye)', color: '#B5A642' },
  { name: 'गोमेद (Hessonite)',  color: '#D2691E' },
  { name: 'नीलम (Blue Sapphire)', color: '#0000FF' },
  { name: 'पुखरा (Yellow Sapphire)',  color: '#FFD700' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { productData, responseProducts, error } = useSelector((state) => state.user);
  const [showNetworkError, setShowNetworkError] = useState(false);
  const [showLoadingLine, setShowLoadingLine] = useState(true);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setShowNetworkError(true), 40000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoadingLine(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="top">
      <BannerBox>
        <img
          src={bannerImage}
          alt="Banner"
          style={{ width: '100%', height: '250px', borderRadius: 8, objectFit: 'cover' }}
        />
      </BannerBox>

      {/* Gemstone Showcase */}
      <GemstoneShowcase />

      {/* Loading Line */}
      {showLoadingLine && <LoadingLine />}

      {/* Error or Loading State */}
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
            <Typography variant="h6" color="white" gutterBottom>
              Neelam Jewellers
            </Typography>
            <Typography variant="body2" color="white">
              Address: C Block, Yashoda Nagar, Kanpur Nagar , Uttar Pradesh
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

const LoadingLine = styled(Box)`
  height: 6px;
  width: 0%;
  background: linear-gradient(90deg, #005eff, #000b76, #005eff);
  animation: loadLine 20s ease-out forwards;

  @keyframes loadLine {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
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

//
// GemstoneShowcase Component
//
//
// GemstoneShowcase Component - Horizontal Marquee Style
//
const GemstoneShowcase = () => {
  return (
    <HorizontalScroller>
      <Track>
        {gemstones.concat(gemstones).map((gem, index) => (
          <GlowingScrollText key={index} glowcolor={gem.color}>
            {gem.name} <span style={{ fontWeight: 'normal', color: '#000000cc' }}>{gem.en}</span>
          </GlowingScrollText>
        ))}
      </Track>
    </HorizontalScroller>
  );
};

const HorizontalScroller = styled(Box)`
  overflow: hidden;
  width: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.98) 0%, rgba(1, 22, 74, 0.8) 100%);
  padding: 30px 0;
  position: relative;
`;

const Track = styled(Box)`
  display: flex;
  gap: 80px;
  animation: scrollLeft 40s linear infinite;
  white-space: nowrap;

  @keyframes scrollLeft {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const GlowingScrollText = styled(Typography)`
  font-size: 22px;
  font-weight: bold;
  color: ${({ glowcolor }) => glowcolor};
  text-shadow: 0 0 10px ${({ glowcolor }) => glowcolor}, 0 0 20px ${({ glowcolor }) => glowcolor};
  display: inline-block;
  min-width: max-content;
`;
