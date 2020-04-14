<template>
  <div>
    <input
      name="search"
      ref="input"
      v-model="value"
      @keyup.enter="search"
      placeholder="Search the Getty's Open Content Images "
    />
    <button ref="search" name="search" @click="search">
      Search
    </button>

    <span v-if="query" ref="summary"
      >Showing {{ startAt + 1 }} - {{ size }} of {{ totalResults }}
      {{ resultText }} for '{{ query }}'</span
    >

    <b @click="next(query)">next</b><b @click="prev(query)">prev</b>
    <ol>
      <li v-for="match of matches" @click="choose(match)" :key="match.webpage">
        {{ match.full_name }}
        <a :href="match.webpage">view in collection</a>
        <img :key="match.webpage" :src="match.iiif_url" />
      </li>
    </ol>
  </div>
</template>
<script>
import NoC_US from "../data/NoC-US.txt";
import { extractData } from "../libs/ExtractData.js";

export default {
  name: "Search",

  data() {
    return {
      value: "",
      startAt: 0,
      query: "",
      matches: [],
      totalResults: 0,
      maxSearch: 250,
      pageSize: 10,
      imageData: NoC_US
    };
  },
  computed: {
    resultText() {
      if (this.matches && this.matches.length == 1) {
        return "result";
      }
      return "results";
    },
    size() {
      if (this.pageSize <= this.matches.length) {
        return this.pageSize + this.startAt;
      }
      return this.matches.length;
    }
  },
  methods: {
    choose(match) {
      this.$emit("input", match);
    },
    next() {
      this.startAt += this.pageSize;
      this.search();
    },
    prev() {
      this.startAt -= this.pageSize;
      this.search();
    },
    search() {
      if (this.value != this.query) {
        this.startAt = 0;
      }
      this.query = this.value;
      this.matches = [];
      console.log("searching imageData...", this.query);
      this.totalResults = 0;
      for (let _line of this.imageData.split("\n")) {
        const _upper = _line.split("|")[0].toUpperCase();
        const _query = this.query.toUpperCase();
        if (_upper.indexOf(_query) > -1) {
          this.totalResults++;
          if (this.totalResults >= this.startAt) {
            if (this.matches.length < this.pageSize) {
              this.matches.push(extractData(_line));
            }
          }
        }
      }
    }
  }
};
</script>
<style type="text/css" scoped>
ol {
  max-height: 40em;
  overflow-y: scroll;
  list-style: decimal;
}
li {
  margin-left: 3em;
}

input {
  width: 100%;
  font-size: 120%;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.25em;
}
</style>
