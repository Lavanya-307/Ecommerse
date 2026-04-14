import React from "react";
import { AppBar, Toolbar, Button, Typography, InputBase, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Features/AuthSlice";
import { setSearch } from "../Features/ProductSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { search } = useSelector(state => state.products);
  const navigate = useNavigate();

  const count = items.reduce((a, b) => a + b.quantity, 0);

  const handleLogout=()=>{
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>E-Commerce</Typography>
        
        {isLoggedIn && (
          <Box
            sx={{
              background: "white",
              borderRadius: "5px",
              px: 2,
              mr: 2
            }}
          >
            <InputBase
              placeholder="Search products..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
          </Box>
        )}

        {isLoggedIn && (
          <>
            <Button color="inherit" onClick={() => navigate("/products")}>
              Products
            </Button>
            <Button color="inherit" onClick={() => navigate("/cart")}>
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