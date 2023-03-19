require('dotenv').config();
require('./config/connectDb');
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const uploadRoute = require('./routes/uploadRoute');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cors());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api', uploadRoute);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
