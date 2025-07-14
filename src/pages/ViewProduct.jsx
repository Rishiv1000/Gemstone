import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';

import styled from 'styled-components';

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
  object-fit: cover;
`;

const ProductInfo = styled.div`
  flex: 2;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const ProductName = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
`;

const PriceContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
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
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const ReviewWritingContainer = styled.div`
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
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
`;

const ReviewDetails = styled.div`
  flex: 1;
`;
