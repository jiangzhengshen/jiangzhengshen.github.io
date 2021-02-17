<template>
  <div class="el-row">
    <div
      class="el-col el-col-24 el-col-xs-1 el-col-sm-4 el-col-md-6 el-col-lg-6 el-col-xl-6"
    ></div>
    <transition-group
      name="post-preview"
      tag="div"
      class="posts-list el-col el-col-24 el-col-xs-22 el-col-sm-16 el-col-md-12 el-col-lg-12 el-col-xl-12"
    >
      <router-link
        class="post-preview"
        v-for="post in renderPosts"
        :to="`/read/${post.id}`"
        :key="post.id"
      >
        <div class="metadata">
          <div class="publishedDate">{{ prettyDate(post.published) }}</div>
          <div class="tags">
            <span class="tag" v-for="tag in post.tags" :key="tag">{{
              tag
            }}</span>
          </div>
        </div>
        <div class="thumbnail"><img :src="post.image" /></div>
        <div class="description">
          <h2>{{ post.title }}</h2>
          <p v-html="post.description" class="markdown-body"></p>
        </div>
      </router-link>
    </transition-group>
    <div
      class="el-col el-col-24 el-col-xs-1 el-col-sm-4 el-col-md-6 el-col-lg-6 el-col-xl-6"
    ></div>
  </div>
</template>

<script>
import Articles from "../../loaders/markdowndir-loader!@/assets/blog.config.js";
import keysort from "../utils.js";

export default {
  name: "BlogFeed",

  data() {
    return {
      renderPosts: []
    };
  },

  methods: {
    prettyDate(date) {
      let day = new Date(date);
      return (
        day.getFullYear() + "/" + (day.getMonth() + 1) + "/" + day.getDate()
      );
    },
    stackPosts(posts) {
      if (!posts) {
        console.log(`posts seems to be null: ${posts}`);
        return;
      }

      let interval;
      const stack = () => {
        this.renderPosts.push(posts.shift());

        if (!posts.length) {
          clearInterval(interval);
        }
      };

      interval = setInterval(stack, 125);
    }
  },

  mounted() {
    var filteredList = Articles.filter(
      element => element["title"] !== "About"
    ).sort(keysort("published"));
    this.stackPosts(filteredList);
  }
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css";

.posts-list {
  margin-top: 24px;
  margin-bottom: 24px;
}

.posts-list .post-preview {
  text-decoration: none;
  overflow: hidden;
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px 0;
}
.posts-list .post-preview:last-of-type {
  border-bottom: none;
}

/* added by jensonjiang */
.posts-list a {
  color: #000000;
}
.posts-list a:hover {
  color: #007bff;
}
.posts-list .post-preview-enter-active {
  transition: all 275ms;
}
.posts-list .post-preview-enter-from {
  opacity: 0;
  transform: translate3d(0, -2.5rem, 0);
}
/************************/

.posts-list .post-preview h2 {
  margin: 0 0 6px 0;
  line-height: 1.2em;
  font-style: normal;
  font-size: 24px;
}

.posts-list .post-preview p {
  margin: 0 0 12px 0;
  line-height: 1.4em;
  font-size: 16px;
}

.posts-list .post-preview .thumbnail {
  box-sizing: border-box;
  margin-bottom: 24px;
  position: relative;
  max-width: 500px;

  /* added by jensonjiang */
  max-height: 250px;
  overflow: hidden;
}

.posts-list .post-preview.editorial .thumbnail {
  display: none;
}

.posts-list .post-preview img {
  width: 100%;
  display: block;
}

.posts-list .metadata {
  font-size: 12px;
  line-height: 1.4em;
  margin-bottom: 18px;
}

.metadata > * {
  display: inline-block;
}

.metadata .publishedDate {
  margin-right: 1em;
  display: block;
}

.metadata .tags {
  margin-top: 1em;
  margin-right: 1em;
}

.tags .tag {
  color: rgba(0, 0, 0, 0.67);
  padding: 0.3em 0.5em;
  margin: 0;
  margin-top: 0.5em;
  margin-right: 0.5em;
  font-size: 80%;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
}

@media (min-width: 768px) {
  .posts-list .post-preview h2 {
    font-size: 26px;
  }
  .posts-list {
    margin-top: 60px;
  }
  .posts-list .post-preview .thumbnail {
    float: right;
    width: 35%;
    margin-bottom: 0;
  }
  .posts-list .post-preview .description {
    text-align: left;
    float: left;
    width: 40%;
  }
  .posts-list .post-preview .metadata {
    float: left;
    width: 15%;
    margin-top: 8px;
  }
  .posts-list .post-preview p {
    margin: 0 0 12px 0;
    line-height: 1.5em;
    font-size: 16px;
  }
}
</style>
