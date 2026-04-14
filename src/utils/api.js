import axios from 'axios';
const api=axios.create({
    baseURL:"https://192.168.1.127"
})
export default api;

//https://192.168.1.127/api/products/