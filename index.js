import express from "express";
import cors from "cors";
import env from "dotenv";
import connectToDB from "./db/connection.js";
import { loginRouter } from "./routes/login.js";
import { registerRouter } from "./routes/register.js";
import { forgotPasswordRouter } from "./routes/forgotPassword.js";
import { resetPasswordRouter } from "./routes/resetPassword.js";
import { urlRouter } from "./routes/urls.js";


env.config();
const app = express();
const port=process.env.PORT || 4000;

await connectToDB();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter)
app.use('/register', registerRouter )
app.use('/forgotPassword', forgotPasswordRouter)
app.use('/resetPassword', resetPasswordRouter)
app.use('/url', urlRouter)

app.get('/', (req, res) =>{
    res.send('Welcome')
})



app.listen(port, () => console.log('listening on port', port));