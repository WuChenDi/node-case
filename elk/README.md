# ELK

使用 docker、express 和 typescript 的 nodejs 日志的 Elk 演示。

## 项目运行

> 修改 `elastic` 地址
>
> 代码路径: `index.ts` 中 `log4js.configure 方法 host`

```bash
$ npm install
$ npm run build (build:watch)
$ npm start // another bash
```

## ELK install

```bash
$ git clone https://github.com/deviantony/docker-elk.git
$ docker-compose up -d
```
