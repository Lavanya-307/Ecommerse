import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography,
     Card, CardMedia, CardContent, Table, TableBody,
      TableCell, TableContainer, TableRow, Paper, IconButton, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { addToCart } from "../Features/CartDetails";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = useSelector((state) =>
        state.products.items.find((p) => p.id === Number(id))
    );

    const allProducts = useSelector((state) => state.products.items);
    const remainingProducts = allProducts.filter((p) => p.id !== Number(id) && p.category === product.category);

    if (!product) return <Typography>Not available</Typography>;

    return (
        <Box>
            <Box sx={{ padding: 2 }}>
                <IconButton
                    onClick={() => navigate("/products")}
                    sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "primary.dark"
                        }
                    }}
                >
                    <ArrowBack />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, padding: 4 }}>
                <Box sx={{ flex: 1, padding: 4 }}>
                    <Typography variant="h4" sx={{ mb: 3 }}>{product.title}</Typography>

                    <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            width="200"
                            style={{ borderRadius: "8px" }}
                        />
                        <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Price:</TableCell>
                                        <TableCell>Rs {product.price}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Category:</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Brand:</TableCell>
                                        <TableCell>{product.brand || "N/A"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Stock:</TableCell>
                                        <TableCell>{product.stock || "N/A"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Rating:</TableCell>
                                        <TableCell>{product.rating || "N/A"} ⭐</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>Description:</Typography>
                        <Typography>{product.description}</Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => dispatch(addToCart(product))}
                            sx={{
                                backgroundColor: "primary.main",
                                color: "white",
                                padding: "12px 24px",
                                fontSize: "16px",
                                "&:hover": {
                                    backgroundColor: "primary.dark"
                                }
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>

                {/* Remaining Products - Right Side */}
                <Box sx={{ flex: 1, padding: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3 }}>Other {product.category} Products</Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 2,
                        }}
                    >
                        {remainingProducts.map((product) => (
                            <Card
                                key={product.id}
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 4,
                                        transition: "all 0.2s ease-in-out"
                                    }
                                }}
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <CardMedia
                                    component="img"
                                    image={product.thumbnail || product.images?.[0]}
                                    alt={product.title}
                                    sx={{
                                        height: 120,
                                        objectFit: "contain",
                                        padding: 1,
                                        background: "#f5f5f5",
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 500 }}>
                                        {product.title}
                                    </Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                        Rs {product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetails;