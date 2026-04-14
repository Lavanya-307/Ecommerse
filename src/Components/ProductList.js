import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../Features/ProductFetch";
import { addToCart } from "../Features/CartDetails";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { selectFilteredProducts } from "../Features/Getting";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredProducts = useSelector(selectFilteredProducts);
  const { status, search } = useSelector((state) => state.products);

  // Progressive responsive hooks for media queries
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isSmallTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
  const isLargeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')); // 900px - 1200px
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // > 1200px

  useEffect(() => {
    // Only fetch products if they haven't been loaded yet
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const [page, setPage] = useState(1);
  const itemsPerPage = isMobile ? 4 : isSmallTablet ? 6 : isLargeTablet ? 8 : 12;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100);
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
      <Box sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: isMobile ? 2 : isSmallTablet ? 2.5 : 3,
        marginBottom: 2,
        // borderRadius: 1
      }}>
        <Typography
          variant={isMobile ? "h5" : isSmallTablet ? "h4" : "h3"}
          sx={{
            textAlign: 'center',
            marginBottom: 1,
            fontWeight: "bold",
            background: "linear-gradient(99deg, red, orange, blue, purple)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          🛍️ Welcome to Our Store
        </Typography>
        <Typography
          variant={isMobile ? "body1" : isSmallTablet ? "h6" : "h5"}
          sx={{ textAlign: 'center', opacity: 0.9 }}>
          Get Amazing products with Amazing offer
        </Typography>
      </Box>

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
          gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : isSmallTablet ? "repeat(2, 1fr)" : isLargeTablet ? "repeat(4, 1fr)" : "repeat(6, 1fr)",
          gap: isMobile ? 2 : isSmallTablet ? 2.5 : 3,
          padding: isMobile ? 1 : isSmallTablet ? 1.5 : 2,
        }}
      >
        {paginatedProducts.map((product) => (
          <Box key={product.id}>
            <Card
              sx={{
                height: isMobile ? 320 : isSmallTablet ? 360 : isLargeTablet ? 400 : 420,
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
                  height: isMobile ? 100 : isSmallTablet ? 120 : isLargeTablet ? 140 : 150,
                  objectFit: "contain",
                  padding: isMobile ? 1 : isSmallTablet ? 1.5 : 2,
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
                  variant={isMobile ? "caption" : isSmallTablet ? "body2" : "body1"}
                  sx={{
                    fontSize: isMobile ? "11px" : isSmallTablet ? "12px" : "14px",
                    fontWeight: 500,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                  {product.title}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginTop: 1,
                    fontSize: isMobile ? "12px" : isSmallTablet ? "14px" : "16px"
                  }}>
                  Rs {product.price}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  size={isMobile ? "small" : isSmallTablet ? "small" : "medium"}
                  sx={{
                    marginTop: 2,
                    fontSize: isMobile ? "10px" : isSmallTablet ? "11px" : "14px"
                  }}
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

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        gap: isMobile ? 1 : isSmallTablet ? 1.5 : 2,
        mb: 3,
        flexWrap: isMobile ? "wrap" : "nowrap"
      }}>
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          size={isMobile ? "small" : isSmallTablet ? "small" : "medium"}
        >
          {isMobile ? "«" : "Previous"}
        </Button>

        <Typography
          sx={{
            alignSelf: "center",
            fontSize: isMobile ? "12px" : isSmallTablet ? "13px" : "16px",
            padding: isMobile ? "0 4px" : "0"
          }}>
          Page {page} of {totalPages}
        </Typography>

        <Button
          variant="contained"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          size={isMobile ? "small" : isSmallTablet ? "small" : "medium"}
        >
          {isMobile ? "»" : "Next"}
        </Button>
      </Box>
    </>
  );
};

export default ProductList;