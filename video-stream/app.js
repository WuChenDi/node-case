const http = require('http');
const fs = require('fs');
const { stat } = require('fs').promises;
const videoPath = './1-1 课程导学.mp4';

http
  .createServer(async (req, res) => {
    // 定义主页路由
    if (req.url === '/') {
      // 定义返回类型
      res.writeHead(200, { 'Content-Type': 'text/html' });
      // 返回 video 标签
      res.end(`<video src="/video" width="500" controls="controls"></video>`);
    } else if (req.url === '/video') {
      // range 表示发送范围请求，获取资源部分数据
      const range = req.headers['range'];
      if (range) {
        const stats = await stat(videoPath);
        const r = range.match(/=(\d+)-(\d+)?/);
        // 视频开始位置
        let start = parseInt(r[1], 10);
        // 视频结束位置，如果不存在取默认位置一兆数据
        let end = r[2] ? parseInt(r[2], 10) : start + 1024 * 1024;
        if (end > stats.size - 1) {
          end = stats.size - 1;
        }

        // 设置响应头信息
        const head = {
          // 类型
          'Content-Type': 'video/mp4,',
          // 区块范围以及视频长度
          'Content-Range': `bytes ${start}-${end}/${stats.size}`,
          // 区块长度
          'Content-Length': end - start + 1,
          // 定义范围的单位
          'Accept-Ranges': 'bytes'
        };
        // 206表示 range 响应信息
        res.writeHead(206, head);
        // 读取文件输出到客户端
        fs.createReadStream(videoPath, { start, end }).pipe(res);
      } else {
        // 读取文件输出到客户端
        fs.createReadStream(videoPath).pipe(res);
      }
    }
  })
  .listen(3000, () => {
    console.log('listen 3000');
  });
