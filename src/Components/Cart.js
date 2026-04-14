import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../Features/CartSlice";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!items.length) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h5">Your cart is empty</Typography>
        <Typography sx={{ marginTop: 2 }}>
          Add products to the cart to see details here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Cart
      </Typography>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid size={{ xs: 12, sm: 5, md: 3 }} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                image={item.thumbnail || item.images?.[0]}
                alt={item.title}
                sx={{ height: 180, objectFit: "contain", background: "#f5f5f5" }}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" sx={{ marginY: 1 }}>
                  {item.description?.slice(0, 100)}{item.description?.length > 100 ? "..." : ""}
                </Typography>
                <Typography>Price: Rs. {item.price}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
                  <Typography>Qty:</Typography>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    sx={{ border: '1px solid #ccc' }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: '30px', textAlign: 'center' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    sx={{ border: '1px solid #ccc' }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
                <Typography sx={{ fontWeight: "bold", marginTop: 1 }}>
                  Subtotal: Rs. {item.price * item.quantity}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    startIcon={<Delete />}
                  >
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6">Total: Rs. {total}</Typography>
      </Box>
    </Box>
  );
};

export default Cart;