<template>
  <div class="col-lg-6 col-lg-offset-3 container markdown-body">
    <transition name="post">
      <div v-if="showPost">
        <header class="article__title">
          <h1 class="title">
            {{ title }} <br>
            <time class="info"> {{ prettyDate(published) }} </time>
            <div class="post-tags"><span class="post-tag" v-for="tag in tags" v-bind:key="tag">{{ tag }}</span></div>
          </h1>
        </header>
        <vue-markdown :source="content" :linkify="false"></vue-markdown>
      </div>
    </transition>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  name: "blog-post",
  resource: "BlogPost",
  props: {
    post: String
  },

  data() {
    return {
      title: "",
      author: "",
      published: "",
      description: "",
      image: "",
      category: "",
      tags: [],
      content: "",
      showPost: false
    };
  },
  components: {
    VueMarkdown
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
    this.$getMarkdown(this.post);
    this.showPost = true;
  }
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css";

.post-enter-active {
  transition: all 0.5s;
}
.post-enter {
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
