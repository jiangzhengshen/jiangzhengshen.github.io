<template>
  <main class="blog">
    <blog-header/>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
import BlogHeader from "./BlogHeader.vue";
import BlogFeed from "./BlogFeed.vue";
import BlogPost from "./BlogPost.vue";

export default {
  name: "blog",
  data() {
    return {
      msg: ""
    };
  },
  components: {
    BlogHeader,
    BlogFeed,
    BlogPost
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
