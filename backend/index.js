import express from 'express';
import connectDB from './config/dataBase.js'
import cors from 'cors';
import router from "./routes/index.js";
import cookieParser from 'cookie-parser';
import msgRoute from './routes/msgRoute.js';
import {app, server} from './socket/socket.js';
import dotenv from 'dotenv';



dotenv.config();



// const app = express();
const Port = process.env.PORT || 9000;



app.use(express.json({ limit: '100mb' })); // Increase JSON body size
app.use(express.urlencoded({ limit: '100mb', extended: true })); // Increase form data size
const frontendUrl = process.env.FRONTEND_URL;

const corsOptions = {
origin: frontendUrl,
credentials : true,  //ye cookie ko allow karta hai// 
methods: ['GET', 'POST'],
allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(cookieParser());




// app.use('/', router )
app.use('/api', router)
app.use('/api/message', msgRoute)



server.listen(Port, ()=>{
    connectDB()
    console.log(`Server is lister on port ${Port}`)
})

// import express from 'express';
// import connectDB from './config/dataBase.js';
// import cors from 'cors';
// import router from "./routes/index.js";
// import cookieParser from 'cookie-parser';
// import msgRoute from './routes/msgRoute.js';
// import {app, server} from './socket/socket.js';
// import dotenv from 'dotenv';

// dotenv.config({});

// const Port = process.env.PORT || 9000;

// // Ensure that FRONTEND_URL is correctly set in .env
// const frontendUrl = process.env.FRONTEND_URL;

// // CORS options
// const corsOptions = {
//   origin: frontendUrl,  // Allow only your frontend URL
//   credentials: true,     // Allow credentials (cookies)
// };

// // Middlewares
// app.use(cors(corsOptions)); // CORS middleware must be used before any routes
// app.use(express.json({ limit: '10mb' })); // Increase JSON body size
// app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase form data size
// app.use(cookieParser()); // For parsing cookies

// // Routes
// app.use('/api', router);
// app.use('/api/message', msgRoute);

// // Start server
// server.listen(Port, () => {
//   connectDB();
//   console.log(`Server is listening on port ${Port}`);
// });





