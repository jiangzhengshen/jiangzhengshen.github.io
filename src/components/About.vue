<template>
  <div class="col-lg-6 col-lg-offset-3 container markdown-body">
    <transition name="about">
      <div v-if="showPost">
        <header class="about__title">
          <h1 class="title">
            关于作者 <br>
          </h1>
        </header>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "about",

  data() {
    return {
      showPost: false
    };
  },
  mounted() {
    this.showPost = true;
  }
};
</script>

<style>
.about-enter-active {
  transition: all 0.5s;
}
.about-enter {
  opacity: 0;
  transform: translate3d(0, -2.5rem, 0);
}

.about__title {
  text-align: center;
}
</style>
