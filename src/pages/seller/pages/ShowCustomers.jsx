import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCustomers } from '../../../redux/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { Typography } from '@mui/material';
import { IndigoButton } from '../../../utils/buttonStyles';

const ShowCustomers = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  useEffect(() => {
    dispatch(getCustomers(productId, "getInterestedCustomers"));
  }, [dispatch, productId]);

  const { loading, customersList, responseCustomersList } = useSelector(state => state.user);

  console.log("Fetched customersList:", customersList);

  const customersColumns = [
    { id: 'name', label: 'Customer Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 180 },
    { id: 'phone', label: 'Phone', minWidth: 120 },
    { id: 'address', label: 'Address', minWidth: 220 },
    { id: 'quantity', label: 'Quantity', minWidth: 80 },
  ];

  const customersRows = Array.isArray(customersList) && customersList.length > 0
    ? customersList.map((entry) => {
        // Support both entry.email or entry.buyer.email
        const buyer = entry.buyer || entry;
        const shipping = entry.shippingData || buyer.shippingData || {};

        const email = buyer.email || entry.email || "N/A";
        const phone = shipping.phoneNo || "N/A";
        const address = shipping.address
          ? `${shipping.address}, ${shipping.city}, ${shipping.state} - ${shipping.pinCode}`
          : "N/A";

        return {
          id: entry._id || buyer._id,
          name: buyer.name || entry.customerName || "N/A",
          email,
          phone,
          address,
          quantity: entry.productsQuantity || entry.quantity || 0,
        };
      })
    : [];

  const CustomersButtonHaver = ({ row }) => (
    <IndigoButton onClick={() => console.log("Customer ID:", row.id)}>
      View Customer History
    </IndigoButton>
  );

  if (loading) return <h1>Loading...</h1>;
  if (responseCustomersList) return <h1>No Customers Till Now</h1>;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Customers List:
      </Typography>
      <TableTemplate
        buttonHaver={CustomersButtonHaver}
        columns={customersColumns}
        rows={customersRows}
      />
    </>
  );
};

export default ShowCustomers;
