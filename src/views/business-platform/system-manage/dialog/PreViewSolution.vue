<template>
  <div class="business-content-container pre-view-article-container">
    <div v-html="content" class="pre-view-article"></div>
  </div>
</template>

<script>
export default {
  name: "PreViewSolution",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    setContent(e) {
      this.content = e;
    },
  },
};
</script>
<style  scoped>
.pre-view-article-container {
    width: 100%;
    height: 500px;
    background-color: #fff;
    margin-top: -30px;
    border-top: 1px solid #eee;
    overflow: hidden;
}
.pre-view-article {
    width: 100%;
    height: 480px;
    overflow-y: auto;
    padding: 0 12px;
    color: #333;

    /* background-color: red; */
}
img {
    width: 60% !important;
    height: auto;
}
</style>
