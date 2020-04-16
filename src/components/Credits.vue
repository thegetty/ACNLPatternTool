<template>
  <div>
    <h1>Credits</h1>
    <hr />
    <div class="credits-container l-thirds">
      <div class="l-thirds__two-thirds">
        <RichText :content="credits" contentType="markdown" />
      </div>
    </div>
  </div>
</template>

<script>
import { RichText } from "@thegetty/getty-ui";
import credits from "../data/credits.md";

export default {
  name: "Credits",
  components: {
    RichText
  },
  data() {
    return {
      credits
    };
  }
};
</script>

<style lang="scss">
.credits-container {
  margin-top: 60px;
}
</style>
