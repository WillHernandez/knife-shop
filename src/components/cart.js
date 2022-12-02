import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
// import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

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

const Cart = ({userEmail, setCartItems}) => {
	const [userCart, setCart] = useState({})

	useEffect(()=> {
		if(userEmail) {
			axios(`http://localhost:4000/api/orders/${userEmail}`)
			.then(res => setCart(res.data))
			.catch(() => setCart(JSON.parse(window.sessionStorage.getItem("user"))))
		} else {
			setCart(JSON.parse(window.sessionStorage.getItem("user")));
    }
	}, [userEmail])


  const rows = [];
  if(userCart && userCart.cartItems) {
    for(let cartItem of userCart.cartItems) {
      rows.push({...cartItem});
    }
  }

  const handleDelete = async e => {
    e.preventDefault();
    const cartCopy = JSON.parse(JSON.stringify(userCart));
    for(let i = 0; i < cartCopy.cartItems.length; ++i) {
      if(cartCopy.cartItems[i].item === e.target.className) {
        cartCopy.cartItems.splice(i,1);
      }
    }
    setCart(cartCopy);
    setCartItems(cartCopy);
  
    await axios.patch(`http://localhost:4000/api/orders/${userEmail}`, cartCopy)
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
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {row.item}
              </StyledTableCell>
              <StyledTableCell align="right">{`$${row.price}.00`}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">
                <button className={`${row.item}`} onClick={handleDelete}>
                  <DeleteIcon style={{'pointerEvents':'none'}} className={`deleteCartIcon`}/>
                </button>
                  {/* <IconButton className={`${row.item}`}>
                  </IconButton> */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Cart;