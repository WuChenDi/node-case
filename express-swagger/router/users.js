const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users/hello:
 *  get:
 *    tags:
 *    - 接口分类
 *    summary: hello
 *    description: 接口描述
 *    parameters:
 *      - name: name
 *        description: 用户名称
 *        in: query
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: 成功返回 world
 */
router.get('/hello', (req, res) => {
  const { name } = req.query;
  res.send(`world ${name}`);
});

module.exports = router;
