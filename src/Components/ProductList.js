import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Features/ProductSlice";
import { addToCart } from "../Features/CartSlice";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {items.map((product) => (
        <Grid  size={{xs:12,sm:6,md:4,lg:3}} key={product.id}>
          <Card
            sx={{
              height: 420,                
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              component="img"
              image={product.thumbnail || product.images?.[0]}
              alt={product.title}
              sx={{
                height: 150,
                objectFit: "contain",
                padding: 2,
                background: "#f5f5f5",
              }}
            />

            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "10px",
                  overflow: "hidden",
                }}
              >
                {product.title}
              </Typography>

              <Typography
                sx={{
                  fontWeight: "bold",
                  marginTop: 1,
                }}
              >
                Rs {product.price}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;