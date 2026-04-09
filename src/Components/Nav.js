import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Features/AuthSlice";

const Navbar = ({ setPage }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { isLoggedIn } = useSelector(state => state.auth);

  const count = items.reduce((a, b) => a + b.quantity, 0);

  const handleLogout=()=>{
    dispatch(logout());
    setPage("login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>E-Commerce</Typography>
        

        {isLoggedIn && (
          <>
            <Button color="inherit" onClick={() => setPage("products")}>
              Products
            </Button>

            <Button color="inherit" onClick={() => setPage("cart")}>
              Cart ({count})
            </Button>

            {/* <Button color="inherit" onClick={() => dispatch(logout())}>
              Logout
            </Button> */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;