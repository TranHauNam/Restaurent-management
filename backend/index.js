const express = require('express');
const dotenv = require('dotenv');
const database = require('./config/database');
const clientRoutes = require('./routes/client/index.route');
const cors = require('cors'); 

// Load biến môi trường từ file .env
dotenv.config();

// Kết nối đến cơ sở dữ liệu MongoDB
database.connectDB();

// Khởi tạo ứng dụng express
const app = express();

// Cấu hình CORS để cho phép frontend gọi API
app.use(cors());

// Middleware để parse dữ liệu JSON từ request body
app.use(express.json());

// Thiết lập các route bên phía client (ví dụ: /api/auth, /api/courses, ...)
clientRoutes(app);

// Chạy server tại cổng PORT (mặc định là 5000 nếu không có trong .env)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
