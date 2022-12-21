import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useGlobalState, setGlobalState } from '../state/index';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Cart = () => {
  const globalCartItems = useGlobalState('cartItems')[0];
  const [cartItems, setCartItems] = useState([]);

	useEffect(()=> {
    if(globalCartItems.length) {
      setCartItems(globalCartItems);
    } else if (sessionStorage.getItem('cartItems')) {
      const localCartItems = JSON.parse(sessionStorage.cartItems);
      setCartItems(localCartItems);
    }
	}, [globalCartItems]);

  // setGlobalState after delete... confirm working
  const handleDelete = async e => {
    e.preventDefault();
    
    const cartCopy = JSON.parse(sessionStorage.cartItems);
    for(let i = 0; i < cartCopy.length; ++i) {
      if(cartCopy[i].item === e.target.className) {
        cartCopy.splice(i,1);
        break;
      }
    }
    sessionStorage.setItem('cartItems', JSON.stringify(cartCopy));
    setCartItems(cartCopy);
    setGlobalState('cartItems', cartCopy);

    let user;
    if(sessionStorage.getItem('userOrder')) {
      user = JSON.parse(sessionStorage.userOrder);
      user.cartItems = cartCopy;
    }
    // confirm deleting from DB Correctly... must provide complete user obj with new cartItems arr
    await axios.patch(`http://localhost:4000/api/orders/${user.email}`, user)
    .catch(err => console.log({err: err.message}))
  }

  return (
    <TableContainer className='tableContainer' component={Paper}>
      <Table sx={{ width: '90vw' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Quantity&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Delete&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems && cartItems.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">{row.item}</StyledTableCell>
              <StyledTableCell align="right">{`$${row.price}.00`}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">
                <button className={`${row.item}`} onClick={handleDelete}>
                  <DeleteIcon style={{'pointerEvents':'none'}} className={`deleteCartIcon`}/>
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Cart;