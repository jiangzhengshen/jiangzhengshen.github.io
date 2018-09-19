import * as matter from "gray-matter";

// install $resource as a Vue plugin
export default {
  install(Vue, { endpoint = '' }) {
    Vue.prototype.$getMarkdown = function (id) {
      // get fetch path and response resolver/mapper
      let path = `/post/${id}.json`
      let uri = endpoint + path

      // fetch, parse and cache resource then pass to resolver
      return fetch(uri)
        .then(res => res.json())
        .then(data => {
          let dataJson = matter(data.content);
          this.$set(this.$data, 'content', dataJson.content);
          this.$set(this.$data, 'title', dataJson.data.title);
          this.$set(this.$data, 'author', dataJson.data.author);
          this.$set(this.$data, 'published', dataJson.data.published);
          this.$set(this.$data, 'description', dataJson.data.description);
          this.$set(this.$data, 'image', dataJson.data.image);
          this.$set(this.$data, 'category', dataJson.data.category);
          this.$set(this.$data, 'tags', dataJson.data.tags.split(/[,;\s]+/));
        });
    }
  }
}
