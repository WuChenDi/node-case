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
 *    responses:
 *      200:
 *        description: 成功返回 world
 */
router.get('/hello', (req, res) => {
  res.send('world');
});

module.exports = router;
