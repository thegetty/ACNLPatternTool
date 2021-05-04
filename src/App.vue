<template>
  <div id="app">
    <GettyPage
      application-base-url="http://experiments.getty.edu/ac-art-generator"
    >
      <Hero name="Content" :data="heroData" />
      <div
        :style="{ backgroundImage: `url('${heroImg}')` }"
        class="heroImage"
      ></div>

      <section>
        <div class="gui-container">
          <router-view></router-view>
        </div>
      </section>
    </GettyPage>
  </div>
</template>

<script>
import "@thegetty/getty-ui/dist/getty-ui.css";
import { Hero, GettyPage } from "@thegetty/getty-ui";
import heroImg from "/assets/images/IMG_7794_edit.jpg";
export default {
  name: "App",
  components: {
    GettyPage,
    Hero,
  },
  data: function () {
    return {
      heroImg,
      heroData: {
        title: "Animal Crossing Art Generator",
        backgroundColor: "white",
      },
    };
  },
};
</script>

<style lang="scss">
.gui-container {
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 36px;
}
@media (max-width: 767px) {
  .gui-container {
    padding: 0 16px;
  }
}
body {
  font-size: 15px;
  color: #1a1a1a;
}
p {
  font-size: 15px;
  margin-top: 12px !important;
}
li {
  font-size: 15px;
}
h1 {
  font-size: 1.867em;
  font-weight: 600;
  margin-top: 12px;
}
h2 {
  font-size: 1.4em;
  font-weight: 500px;
  marin-top: 24px;
}

h3 {
  font-size: 1.2 em;
  font-weight: 400;
  margin-top: 40px;
}
a {
  color: #1a47b8;
  cursor: pointer;
}
.heroImage {
  background-position: center;
  background-size: cover;
  height: 380px;
  width: 100%;
}
.o-hero--content .o-hero__inner {
  padding-top: inherit !important;
  height: inherit !important;
}

.g-header__inner a {
  color: black;
}
</style>
