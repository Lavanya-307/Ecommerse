import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../Features/ProductFetch";
import { addToCart} from "../Features/CartDetails";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box
} from "@mui/material";
import { selectFilteredProducts } from "../Features/Getting";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredProducts = useSelector(selectFilteredProducts);
  const { status, search } = useSelector((state) => state.products);
  
    useEffect(() => {
    // Only fetch products if they haven't been loaded yet
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);


  const [page, setPage] = useState(1);
  const itemsPerPage = 10;



  useEffect(() => {
    setPage(1);
  }, [search]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


  if (status === "loading") {
    return (
      <Box sx={{ textAlign: "center", mt: 10, width: "100%" }}>
        <Typography variant="h6" color="text.secondary">
          Loading products...
        </Typography>
      </Box>
    );
  }

  if (filteredProducts.length === 0 && status !== "loading") {
    return (
      <Box sx={{ textAlign: "center", mt: 10, width: "100%" }}>
        <Typography variant="h6" color="text.secondary">
          No products found matching your search.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {search && (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">
            Showing results for "<b>{search}</b>" ({filteredProducts.length} results)
          </Typography>
        </Box>
      )}


      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          padding: 2,
        }}
      >
        {paginatedProducts.map((product) => (
          <Box key={product.id}>
            <Card
              sx={{
                height: 420,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                "&:hover": {
                  // transform: "translateY(-4px)",
                  // boxShadow: 4,
                  // transition: "all 0.2s ease-in-out"
                }
              }}
              onClick={() => navigate(`/product/${product.id}`)}
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
                <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: 500 }}>
                  {product.title}
                </Typography>

                <Typography sx={{ fontWeight: "bold", marginTop: 1 }}>
                  Rs {product.price}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart(product));
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>

        <Typography sx={{ alignSelf: "center" }}>
          Page {page} of {totalPages}
        </Typography>

        <Button
          variant="contained"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default ProductList;