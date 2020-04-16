<template>
  <img :src="imgSrc" :class="classes" @error="imageError" @click="click" />
</template>
<script>
export default {
  name: "ImageThumb",
  components: {},
  props: {
    src: {
      type: String,
      default: undefined,
    },
    errorSrc: {
      type: String,
      default: undefined,
    },
    classes: {
      type: String,
      default: "",
    },
  },
  data: function() {
    return {
      imgSrc: this.src,
    };
  },
  methods: {
    imageError() {
      this.imgSrc = this.errorSrc;
    },
    click() {
      this.$emit("click", "clicked");
    },
  },
};
</script>
<style></style>
