import express from 'express'; 
import dotnenv from 'dotenv';
import authRoutes from './routes/auth.route.js';   
import { connectDB } from './lib/db.js';

dotnenv.config();
const app  = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})