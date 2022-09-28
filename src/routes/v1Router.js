import authRouter from './v1/auth.js';
import countryRouter from './v1/country.js';
import cityRouter from './v1/city.js';
import provinceRouter from './v1/province.js';
import breedRouter from './v1/breed.js';
import userRouter from './v1/user.js';
import commentRouter from './v1/comment.js';
import orderRouter from './v1/order.js';
import petRouter from './v1/pet.js';
import productCategoryRouter from './v1/product-category.js';
import productRouter from './v1/product.js';
import treatmentRouter from './v1/treatment.js';
import treatmentTypeRouter from './v1/treatment-type.js';
import userTypeRouter from './v1/user-type.js';
import breedTypeRouter from './v1/breed-type.js';

import express from 'express';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/countries', countryRouter);
v1Router.use('/cities', cityRouter);
v1Router.use('/provinces', provinceRouter);
v1Router.use('/breeds', breedRouter);
v1Router.use('/users', userRouter);
v1Router.use('/comments', commentRouter);
v1Router.use('/orders', orderRouter);
v1Router.use('/pets', petRouter);
v1Router.use('/product-categories', productCategoryRouter);
v1Router.use('/products', productRouter);
v1Router.use('/treatments', treatmentRouter);
v1Router.use('/treatment-types', treatmentTypeRouter);
v1Router.use('/user-types', userTypeRouter);
v1Router.use('/breed-types', breedTypeRouter);

export default v1Router;
