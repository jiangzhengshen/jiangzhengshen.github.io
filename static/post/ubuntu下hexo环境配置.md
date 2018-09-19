---
title: ubuntu或mint下的hexo环境配置
author: Jenson
published: 2015/07/05
description: 记录Ubuntu或Mint上安装Hexo的过程。
image: /static/photos/hexo.jpg
category: 日常软件
tags: ubuntu, mint, nodejs, markdown
---

mint 是基于 ubuntu 的，安装的过程一样。

hexo 依赖于：
* node.js
* npm

linux下安装 node.js 比windows下麻烦一些。许多人是从源代码build的，但也有一些方便的方法，例如使用nvm。

## 1. nvm 的安装
参考[nvm 的 github 网站](https://github.com/creationix/nvm)

bash下运行下面代码：
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
```

可能需要额外运行下面命令：
```bash
. ~/.nvm/nvm.sh
```

## 2. node.js 的安装
安装完 nvm 以后，运行下面命令安装node.js：
```bash
nvm install 0.12
```

## 3. npm 的安装
参考[npm 的网站](https://www.npmjs.com/package/npm)

```bash
curl -L https://npmjs.org/install.sh | sh
```

## 4. hexo 的安装
[hexo 网址](https://hexo.io/docs/index.html)

```bash
npm install -g hexo-cli
```

即安装完毕。

## 5. 测试
```bash
hexo init blog
cd blog
npm install
```
如果生成了一个blog文件夹，且不为空，则安装成功。

