import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/database.js';
import userRoute from "./routes/user.route.js";
import servicesRoute from "./routes/services.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";


dotenv.config({});


const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = { 
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

const PORT =process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/services", servicesRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})