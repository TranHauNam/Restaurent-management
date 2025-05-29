const express = require('express');
const dotenv = require('dotenv');
const database = require('./config/database');
const clientRoutes = require('./routes/client/index.route');
const adminRoutes = require('./routes/admin/index.route');
const cors = require('cors'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');



// Load biến môi trường từ file .env
dotenv.config();

// Kết nối đến cơ sở dữ liệu MongoDB
database.connectDB();

// Khởi tạo ứng dụng express
const app = express();

// Sử dụng swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cấu hình CORS để cho phép frontend gọi API
app.use(cors());

// Middleware để parse dữ liệu JSON từ request body
app.use(express.json());

// Thiết lập các route bên phía client (ví dụ: /api/auth, /api/courses, ...)
clientRoutes(app);
adminRoutes(app);

// Chạy server tại cổng PORT (mặc định là 5001 nếu không có trong .env)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
