<template>
  <img :src="image" @click="pattClick" />
</template>

<script>
import generateACNLQR from "/libs/ACNLQRGenerator";

export default {
  name: "ACNLQRGenerator",
  props: ["pattern"],
  data: function() {
    return { image: "" };
  },
  watch: {
    //Whenever pattern changes, draw it!
    pattern(newData, oldData) {
      this.generate(newData);
    },
  },
  mounted: function() {
    this.generate(this.pattern);
  },
  methods: {
    pattClick() {
      this.$emit("pattclick", this.pattern);
    },
    getLogo() {
      let logo = document.getElementById("gettylogo");
      if (document.getElementById("otherlogo")) {
        logo = document.getElementById("otherlogo");
      }
      return logo;
    },
    generate(data) {
      let self = this;
      generateACNLQR(data, this.getLogo())
        .then((d) => {
          self.image = d;
        })
        .catch(function(e) {
          console.error(e);
          generateACNLQR(data).then((d) => {
            self.image = d;
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  margin-bottom: 8px;
}
</style>
