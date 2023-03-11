import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'admin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('admin'),
      isAdmin: true,
    },
    {
      name: 'user',
      email: 'user@user.com',
      password: bcrypt.hashSync('user'),
      isAdmin: false,
    },
  ],

  products: [
    {
      // _id: '1',
      name: 'Puma Slim shirt',
      slug: 'puma-slim-shirt',
      category: 'Shirts',
      image: '/images/m1.jpeg', // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: 'puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      // _id: '2',
      name: 'Adidas Fit Shirt',
      slug: 'adidas',
      category: 'Shirts',
      image: '/images/m2.jpeg',
      price: 250,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: '3',
      name: 'Puma short',
      slug: 'puma',
      category: 'Shirts',
      image: '/images/m4.jpeg',
      price: 25,
      countInStock: 15,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      // _id: '4',
      name: 'Oldest Shirt',
      slug: 'oldest adidas Shirt',
      category: 'Shorts',
      image: '/images/m3.jpeg',
      price: 65,
      countInStock: 0,
      brand: 'Adidas',
      rating: 3.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
};
export default data;
