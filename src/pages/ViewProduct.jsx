import React, { useEffect, useState } from 'react';
import { Box, Container} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';
import styled from 'styled-components';

// import bannerImage from '../assets/nn.png';
import adImage from '../assets/Shop.png';
import logo from '../assets/logo.png';

// ✅ Add your banner image here
import bannerImage from '../assets/nn.jpeg';
const blueSapphire ='linear-gradient(90deg, rgba(53, 52, 80, 0.98) 0%, rgba(1, 15, 122, 0.8) 100%)';


const ViewProduct = () => {
    const dispatch = useDispatch();
    const { id: productID } = useParams();

    const { currentUser, productDetails, loading, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [dispatch, productID]);

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const reviewerId = currentUser?._id;

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };
        dispatch(updateStuff(fields, productID, "deleteProductReview"));
        handleCloseMenu();
    };

    if (loading) return <div>Loading...</div>;
    if (responseDetails) return <div>Product not found</div>;

    return (
        <>
            <BannerBox>
                <img
                    src={bannerImage}
                    alt="Banner"
                    style={{ width: '100%', height: '250px', borderRadius: 8, objectFit: 'cover' }}
                />
            </BannerBox>
            <ProductContainer>
                <ImageWrapper>
                    <ProductImage
                        src={productDetails?.productImage}
                        alt={productDetails?.productName}
                    />
                </ImageWrapper>

                <ProductInfo>
                    <ProductName>{productDetails?.productName}</ProductName>
                    <PriceContainer>
                        <PriceCost>₹{productDetails?.price?.cost}</PriceCost>
                        <PriceMrp>₹{productDetails?.price?.mrp}</PriceMrp>
                        <PriceDiscount>{productDetails?.price?.discountPercent}% off</PriceDiscount>
                    </PriceContainer>
                    <Description>{productDetails?.description}</Description>
                    <ProductDetails>
                        <p><strong>Category:</strong> {productDetails?.category}</p>
                        <p><strong>Subcategory:</strong> {productDetails?.subcategory}</p>
                    </ProductDetails>

                    <ButtonContainer>
                        <a
                            href={`https://wa.me/919140865532?text=${encodeURIComponent(
                                `Hi, I'm interested in the product: ${productDetails?.productName} (ID: ${productID}). Can you tell me more?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <BasicButton startIcon={<WhatsAppIcon />}>Chat on WhatsApp</BasicButton>
                        </a>
                    </ButtonContainer>
                </ProductInfo>
            </ProductContainer>

            <ReviewWritingContainer>
                <Typography variant="h4">Reviews</Typography>
            </ReviewWritingContainer>

            {productDetails?.reviews?.length > 0 ? (
                <ReviewContainer>
                    {productDetails.reviews.map((review, index) => (
                        <ReviewCard key={index}>
                            <ReviewCardDivision>
                                <Avatar
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        marginRight: '1rem',
                                        backgroundColor: generateRandomColor(review._id),
                                    }}
                                >
                                    {review.reviewer.name.charAt(0)}
                                </Avatar>

                                <ReviewDetails>
                                    <Typography variant="h6">{review.reviewer.name}</Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                                        {timeAgo(review.date)}
                                    </Typography>
                                    <Typography variant="subtitle1">Rating: {review.rating}</Typography>
                                    <Typography variant="body1">{review.comment}</Typography>
                                </ReviewDetails>

                                {review.reviewer._id === reviewerId && (
                                    <>
                                        <IconButton onClick={handleOpenMenu} sx={{ p: 0, ml: 1 }}>
                                            <MoreVert />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorElMenu}
                                            open={Boolean(anchorElMenu)}
                                            onClose={handleCloseMenu}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                        >
                                            <MenuItem onClick={handleCloseMenu}>
                                                <Typography>Edit</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={() => deleteHandler(review._id)}>
                                                <Typography>Delete</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </ReviewCardDivision>
                        </ReviewCard>
                    ))}
                </ReviewContainer>
            ) : (
                <ReviewWritingContainer>
                    <Typography variant="h6">No Reviews Found. Be the first to add one!</Typography>
                </ReviewWritingContainer>
            )}
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
        </>
    );
};

export default ViewProduct;

//
// Styled Components
//
const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem auto;
  padding: 1rem;
  justify-content: center;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
  }
`;


const BannerBox = styled(Box)`
  padding: 20px 10px;
  background: #f9f9f9;
`;

const ProductInfo = styled.div`
  flex: 2;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const ProductName = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 22px;
    text-align: center;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PriceCost = styled.h3`
  color: #000;
  font-weight: bold;
`;

const PriceMrp = styled.p`
  text-decoration: line-through;
  color: #888;
`;

const PriceDiscount = styled.p`
  color: darkgreen;
  font-weight: 500;
`;

const Description = styled.p`
  color: #444;
  line-height: 1.5;
`;

const ProductDetails = styled.div`
  font-size: 0.95rem;
  color: #333;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ReviewWritingContainer = styled.div`
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const ReviewContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto 4rem;
  padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
  && {
    background-color: white;
    margin-bottom: 1.5rem;
    padding: 1rem;
  }
`;

const ReviewCardDivision = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ReviewDetails = styled.div`
  flex: 1;
`; 
const Footer = styled(Box)`
  background: ${blueSapphire};
  padding: 30px 0;
  margin-top: 40px;
  border-top: 1px solid #ddd;
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
