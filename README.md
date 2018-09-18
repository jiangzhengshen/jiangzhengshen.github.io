# myblog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

参考：http://vuejs.github.io/vue-loader

## vue环境搭建
``` bash
npm install webpack -g
npm install vue-cli -g

# 打开要创建的项目路径目录，创建项目
vue init webpack-simple <项目名>
cd <项目名>

# 安装依赖
npm install

# 安装vue-router 
npm install vue-router --save
npm run dev
```

参考：https://www.jianshu.com/p/3fd8f088e824

## git
```sh
git push origin source:source

git checkout master
git checkout source index.html
git commit -m 'index'
git push origin master

git subtree push --prefix dist origin master
```

参考：https://gist.github.com/cobyism/4730490

## 注意事项
1. 封面图最好是2:1的

## Road Map
- 浏览器端：两个页面
  - 自动遍历&路由md文件：predev: node traverse.js
  - 标签可链接
  - 冻结header，不可滚动
- tag功能
- 添加about、联系方式、投稿
- 代码片段页面
- 按时间归档
- 移动端适配
- 添加footer
- 引入sass
- 动画切换效果
- eslint
- 载入进度条（骨架界面）
- 搜索功能
- 阅读量统计、国别统计、discuz
- cookie保存、推荐系统
- rss
- 标签云
- 分页、下拉自动加载
- 回到顶端
