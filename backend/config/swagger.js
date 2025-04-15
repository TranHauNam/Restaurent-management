// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Tài liệu Nhà hàng',
      version: '1.0.0',
      description: 'Tài liệu mô tả các API của ứng dụng quản lý nhà hàng',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
  },
  apis: ['./routes/**/*.js'], // <-- match tất cả các file .js trong /routes và các thư mục con
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
