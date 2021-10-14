const path = require('path');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// 定义router
const usersRouter = require('./router/users.js');
app.use('/users', usersRouter);

let options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'project api',
      version: '1.0.0',
      description: 'express swagger 案例'
    }
  },
  apis: [path.join(__dirname, './router/*.js')]
};

let swaggerSpec = swaggerJsdoc(options);
// 定义 swagger 文档路由
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('listen 3000');
});
