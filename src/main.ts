import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes';
import { isAuthenticated } from './middleware/authenticated';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', isAuthenticated, routes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});