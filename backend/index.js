import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/database.js';
import userRoute from "./routes/user.route.js";
import servicesRoute from "./routes/services.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/admin.route.js";
import authRouter from "./routes/authRouter.js";
import Stripe from "stripe";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Get the current directory of the module (since __dirname is not available in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use('/api/static', express.static(path.join(__dirname, 'output')));  // Serving the CV files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
const corsOptions = {
    origin: 'http://localhost:5173',  // Frontend URL
    credentials: true,
};
app.use(cors(corsOptions));

// Payment route to create Stripe checkout session
app.post("/api/create-checkout-session", async (req, res) => {
    const { product } = req.body;

    // Log the received product for debugging
    console.log('Received product amount:', product);

    if (!product || typeof product !== 'number' || product <= 0) {
        return res.status(400).json({ error: "Valid product details are required" });
    }

    try {
        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',  // Use 'npr' for Nepalese Rupees, or choose a supported currency
                        product_data: {
                            name: "Applicant Payment",  // Customize the name as needed
                        },
                        unit_amount: product * 100,  // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,  // Success page URL
            cancel_url: `${process.env.CLIENT_URL}/cancel`,  // Cancel page URL
        });

        // Log the session creation for debugging
        console.log('Stripe session created:', session);

        // Respond with session ID
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: "Server error, unable to create checkout session" });
    }
});

// Routes setup
app.use("/api/v1/user", userRoute);
app.use("/api/v1/services", servicesRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/auth", authRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
