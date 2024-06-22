import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const loginUser = async (credentials) => {
    return axios.post(`${API_URL}/user/login`, credentials);
};

export const signupUser = async (userData) => {
    return axios.post(`${API_URL}/user/signup`, userData);
};

export const getBooks = async () => {
    return axios.get(`${API_URL}/book`);
};

export const getBookById = async (id) => {      
    return axios.get(`${API_URL}/book/${id}`);
};

export const addItemToCart = async (book) => {
    return axios.post(`${API_URL}/cart`, book);
};

export const getCartItems = async (userId) => {
    return axios.get(`${API_URL}/cart/${userId}`);
};

export const removeCartItems = async (id) => {
    return axios.delete(`${API_URL}/cart/${id}`);
};

export const createOrder = async (body) => {
    return axios.post(`${API_URL}/order`, body);
};

export const getOrders = async (userId) => {
    return axios.get(`${API_URL}/order/${userId}`);
};

