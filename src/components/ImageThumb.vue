<template>
  <img :src="imgSrc" :class="classes" @error="imageError" @click="click" />
</template>
<script>
import grey from "/assets/images/Grey_Square.svg";

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
      default: grey,
    },
    classes: {
      type: String,
      default: "",
    },
  },
  data: function() {
    return {
      imgSrc: this.src,
      grey: grey,
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
