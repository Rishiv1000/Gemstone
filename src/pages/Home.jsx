import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';
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
  { name: 'माणिक्य (Ruby)', color: '#FF0000' },
  { name: 'मोती (Pearl)', color: '#D4F1F9' },
  { name: 'पन्ना (Emerald)', color: '#50C878' },
  { name: 'हीरा (Diamond)', color: '#C0C0C0' },
  { name: 'लाल मूंगा (Red Coral)', color: '#FF4500' },
  { name: 'लहसुनिया (Cat\'s Eye)', color: '#B5A642' },
  { name: 'गोमेद (Hessonite)', color: '#D2691E' },
  { name: 'नीलम (Blue Sapphire)', color: '#0000FF' },
  { name: 'पुखराज (Yellow Sapphire)', color: '#FFD700' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { productData, error } = useSelector((state) => state.user);
  const [step, setStep] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState([]);

  // Step Manager
  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 5000); // Initial 5s loading
    } else if (step === 1) {
      setTimeout(() => setStep(2), 8000); // 8s loading line
    } else if (step === 2) {
      setTimeout(() => {
        dispatch(getProducts());
        setStep(3); // Begin product reveal
      }, 8000); // Allow Gemstone to scroll for 8s
    }
  }, [step, dispatch]);

  // Animate product display one by one
  useEffect(() => {
    if (step === 3 && productData?.length) {
      let index = 0;
      const interval = setInterval(() => {
        setVisibleProducts((prev) => [...prev, productData[index]]);
        index++;
        if (index >= productData.length) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [step, productData]);

  return (
    <div id="top">
      <BannerBox>
        <img
          src={bannerImage}
          alt="Banner"
          style={{ width: '100%', height: '250px', borderRadius: 8, objectFit: 'cover' }}
        />
      </BannerBox>

      {/* Step 0: 5s Initial Loader */}
      {step === 0 && (
        <CenteredContent>
          <Typography variant="h5">Loading Neelam Jewellers...</Typography>
        </CenteredContent>
      )}

      {/* Step 1: 8s Loading Line */}
      {step === 1 && <LoadingLine />}

      {/* Step 2: Scrolling Gemstones */}
      {step === 2 && <GemstoneShowcase />}

      {/* Step 3: Products Load One by One */}
      {step === 3 && (
        <MainContent>
          <LeftSection>
            <Slide products={visibleProducts} title="Top Selection" />
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

const LoadingLine = styled(Box)`
  height: 6px;
  width: 0%;
  background: linear-gradient(90deg, #ff007a, #000b76, #00e0ff);
  animation: loadLine 8s ease-out forwards;

  @keyframes loadLine {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

const CenteredContent = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 0;
  text-align: center;
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

//
// Gemstone Showcase (Horizontal Scroll like a train)
//

const GemstoneShowcase = () => (
  <HorizontalScroller>
    <Track>
      {gemstones.concat(gemstones).map((gem, index) => (
        <GlowingScrollText key={index} glowcolor={gem.color}>
          {gem.name}
        </GlowingScrollText>
      ))}
    </Track>
  </HorizontalScroller>
);

const HorizontalScroller = styled(Box)`
  overflow: hidden;
  width: 100%;
  background: linear-gradient(90deg, #000, #222, #000);
  padding: 30px 0;
`;

const Track = styled(Box)`
  display: flex;
  gap: 80px;
  animation: scrollLeft 20s linear infinite;
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

