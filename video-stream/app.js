const http = require('http');
const fs = require('fs');
const { stat } = require('fs').promises;
const videoPath = './1-1 课程导学.mp4';

http
  .createServer(async (req, res) => {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<video src="/video" width="500" controls="controls"></video>`);
    } else if (req.url === '/video') {
      let range = req.headers['range'];
      if (range) {
        let stats = await stat(videoPath);
        let r = range.match(/=(\d+)-(\d+)?/);
        let start = parseInt(r[1], 10);
        let end = r[2] ? parseInt(r[2], 10) : start + 1024 * 1024;
        if (end > stats.size - 1) {
          end = stats.size - 1;
        }

        let head = {
          'Content-Type': 'video/mp4,',
          'Content-Range': `bytes ${start}-${end}/${stats.size}`,
          'Content-Length': end - start + 1,
          'Accept-Ranges': 'bytes'
        };
        res.writeHead(206, head);
        fs.createReadStream(videoPath, { start, end }).pipe(res);
      }
    } else {
      fs.createReadStream(videoPath).pipe(res);
    }
  })
  .listen(3000, () => {
    console.log('listen 3000');
  });
