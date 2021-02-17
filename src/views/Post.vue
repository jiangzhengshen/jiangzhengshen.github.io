<template>
  <div class="el-row">
    <div
      class="el-col el-col-24 el-col-xs-1 el-col-sm-4 el-col-md-6 el-col-lg-6 el-col-xl-6"
    ></div>
    <div
      class="markdown-body el-col el-col-24 el-col-xs-22 el-col-sm-16 el-col-md-12 el-col-lg-12 el-col-xl-12"
    >
      <transition name="post">
        <div v-if="showPost">
          <header class="article__title">
            <h1 class="title">
              {{ renderPost.title }} <br />
              <time class="info"> {{ prettyDate(renderPost.published) }} </time>
              <div class="post-tags">
                <span
                  class="post-tag"
                  v-for="tag in renderPost.tags"
                  v-bind:key="tag"
                  >{{ tag }}</span
                >
              </div>
            </h1>
          </header>
          <div v-html="renderPost.body"></div>
        </div>
      </transition>
    </div>
    <div
      class="el-col el-col-24 el-col-xs-1 el-col-sm-4 el-col-md-6 el-col-lg-6 el-col-xl-6"
    ></div>
  </div>
</template>

<script>
import Articles from "../../loaders/markdowndir-loader?includeBody!@/assets/blog.config.js";

export default {
  name: "BlogPost",

  props: {
    post: String
  },

  data() {
    return {
      showPost: false,
      renderPost: Object
    };
  },
  methods: {
    prettyDate(date) {
      if (!date) {
        return "";
      }
      let day = new Date(date);
      let weekday = ["日", "一", "二", "三", "四", "五", "六"];
      return (
        day.getFullYear() +
        "年" +
        (day.getMonth() + 1) +
        "月" +
        day.getDate() +
        "日 星期" +
        weekday[day.getDay()]
      );
    }
  },
  mounted() {
    this.renderPost = Articles.find(element => element["id"] === this.post);
    this.showPost = true;
  }
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css";

.markdown-body {
  text-align: left;
}

.post-enter-active {
  transition: all 0.5s;
}
.post-enter-from {
  opacity: 0;
  transform: translate3d(0, -2.5rem, 0);
}

.article__title {
  text-align: center;
}
.article__title .info {
  font-size: 0.8rem;
  font-weight: 500;
  font-family: monospace;
  color: #666666;
  display: inline-block;
}

.post-tags {
  margin-left: 0.5em;
  display: inline-block;
}
.post-tags .post-tag {
  color: rgba(0, 0, 0, 0.67);
  padding: 0.3em 0.5em;
  margin: 0;
  margin-top: 0.5em;
  margin-right: 0.5em;
  font-size: 40%;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
}
</style>
