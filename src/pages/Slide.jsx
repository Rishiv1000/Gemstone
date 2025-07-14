import {
    Box,
    Typography,
    Button,
    styled,
    Container,
    Grid,
    Pagination
} from '@mui/material';

import { Link } from 'react-router-dom';
import { useState } from 'react';

const ITEMS_PER_PAGE = 15;

const ProductGrid = ({ products = [], title }) => {
    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    const handleChange = (_, value) => {
        setPage(value);
    };

    return (
        <Component>
            <Header>
                <Title>{title}</Title>
            </Header>

            <Grid container spacing={2}>
                {currentItems.map((product, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                        <Link to={`/product/view/${product._id}`} style={{ textDecoration: 'none' }}>
                            <ProductCard>
                                <Image src={product.productImage} alt={product.productName} />
                                <Name>{product.productName}</Name>
                                <PriceRow>
                                    <OldPrice>₹{product.price.mrp}</OldPrice>
                                    <CurrentPrice>₹{product.price.cost}</CurrentPrice>
{/*                                     <Discount>{product.price.discountPercent} %</Discount> */}
                                </PriceRow>
                                <Tagline>{product.tagline}</Tagline>
                            </ProductCard>
                        </Link>
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                    />
                </Box>
            )}
        </Component>
    );
};

export default ProductGrid;

// Styled Components
const Component = styled(Box)`
    background: #fff;
    padding: 20px;
`;

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled(Typography)`
    font-size: 24px;
    font-weight: 600;
`;

const ProductCard = styled(Box)`
    padding: 16px;
    background: #f9f9f9;
    border-radius: 8px;
    text-align: center;
    transition: 0.3s;
    &:hover {
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
`;

const Image = styled('img')`
    width: auto;
    height: 140px;
    object-fit: contain;
    margin-bottom: 10px;
`;

const Name = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PriceRow = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
`;

const OldPrice = styled(Typography)`
    font-size: 13px;
    color: #888;
    text-decoration: line-through;
`;

const CurrentPrice = styled(Typography)`
    font-size: 14px;
    font-weight: 500;
`;

const Discount = styled(Typography)`
    font-size: 13px;
    color: green;
`;

const Tagline = styled(Typography)`
    font-size: 12px;
    color: #666;
`;
