<template>
  <div class="spacing_top">
    <SearchInput @SearchInput::Submit="search" label="Search for Artwork" />
    <span v-if="query" ref="summary" class="summary"
      ><span v-if="matches.length > 0"
        >Showing {{ startIndex + 1 }} - {{ lastIndex }} of
      </span>
      {{ matches.length }} {{ resultText }} for '{{ query }}'</span
    >

    <ol ref="searchResults">
      <li v-for="match of currentResults" :key="match.webpage">
        <div
          class="search-item-container"
          :class="match.iiif_url == selected ? 'selected' : ''"
        >
          <ImageThumb
            :key="match.webpage"
            class="search-item-image"
            :src="match.iiif_url"
            @click="choose(match)"
          />
          <p class="f-body-1" @click="choose(match)">
            {{ match.full_name
            }}<span v-if="match.artist"> by {{ match.artist }}</span>
          </p>
          <a class="f-body-1 a-link" :href="match.webpage"
            ><span class="a-link__label"
              >view in collection <Icon :name="'outbound'" /></span
          ></a>
        </div>
      </li>
    </ol>
    <div v-if="query && matches.length > 0" class="paginate">
      <a
        class="f-body-1 a-link pagination-link"
        href="#"
        @click.prevent="prevPage"
        :class="currentSearchPage != 0 ? '' : 'disabled'"
      >
        <span
          class="a-link__label"
          :class="currentSearchPage != 0 ? '' : 'disabled'"
        >
          Previous
        </span>
      </a>
      <a
        class="f-body-1 a-link pagination-link"
        href="#"
        @click.prevent="nextPage"
        :class="onLastSearchPage == false ? '' : 'disabled'"
      >
        <span
          class="a-link__label"
          :class="onLastSearchPage == false ? '' : 'disabled'"
        >
          Next
        </span>
      </a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { extractData } from "../libs/ExtractData.js";
import { SearchInput, Icon } from "@thegetty/getty-ui";
import ImageThumb from "./ImageThumb.vue";
import "unorm";
if (typeof window !== "undefined") {
  let smoothscroll = require("smoothscroll-polyfill");
  smoothscroll.polyfill();
}

export default {
  name: "Search",
  components: { Icon, ImageThumb, SearchInput },
  data() {
    return {
      value: "",
      query: "",
      matches: [],
      maxSearch: 250,
      itemsPerPage: 8,
      imageData: undefined,
      selected: undefined,
      currentSearchPage: 0,
      isDataLoaded: false,
    };
  },
  computed: {
    resultText() {
      if (this.matches && this.matches.length == 1) {
        return "result";
      }
      return "results";
    },
    currentResults() {
      return this.matches.slice(this.startIndex, this.lastIndex);
    },
    startIndex() {
      return this.currentSearchPage * this.itemsPerPage;
    },
    lastIndex() {
      if (this.matches.length < this.itemsPerPage) {
        return this.startIndex + this.matches.length;
      }
      return this.startIndex + this.itemsPerPage;
    },
    onLastSearchPage() {
      return this.lastIndex >= this.matches.length;
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let self = this;
      axios
        .get("https://static.getty.edu/acart/NoC-US.txt")
        .then((response) => {
          self.imageData = response.data;
          self.isDataLoaded = true;
        });
    },
    choose(match) {
      this.selected = match.iiif_url;
      this.$emit("input", match);
    },
    prevPage() {
      if (this.currentSearchPage - 1 < 0) {
        return;
      }
      this.currentSearchPage = this.currentSearchPage - 1;
      this.scrollTo(this.$refs["searchInput"]);
    },
    nextPage() {
      if (this.onLastSearchPage) {
        return;
      }
      this.currentSearchPage = this.currentSearchPage + 1;
      this.scrollTo(this.$refs["searchInput"]);
    },
    scrollTo(el) {
      const scroll = el.offsetTop - 110;
      if (window.pageYOffset - 220 <= scroll) {
        return;
      }
      window.scrollTo({
        top: scroll,
        behavior: "smooth",
      });
    },
    search(e) {
      if (this.isDataLoaded == false) {
        console.log("file not loaded yet");
        return;
      }
      this.value = e.value;
      this.query = this.value;
      this.selected = undefined;
      this.matches = [];
      this.currentSearchPage = 0;
      if (this.value == "" || this.value == undefined) {
        return;
      }
      for (let _line of this.imageData.split("\n")) {
        let cols = _line.split("|");
        const _upper = cols[0]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toUpperCase();
        const _query = this.query
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toUpperCase();
        let _artist = "";
        if (cols.length > 3 && cols[3] != undefined) {
          _artist = cols[3]
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase();
        }
        if (_upper.indexOf(_query) > -1 || _artist.indexOf(_query) > -1) {
          this.matches.push(extractData(_line));
        }
      }
    },
  },
};
</script>
<style type="text/css">
h1#search-inputHeading {
  font-size: 0.4em !important;
  font-weight: 200;
}
</style>
<style type="text/css" scoped>
ol {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  min-height: 0px;
}
li {
  /*overflow: auto;*/
  flex: 1 0 22%;
  padding-bottom: 24px;
}

.a-btn--text:hover {
  background: transparent;
}
.spacing_top {
  margin-top: 1.2em;
}

.search-item-container {
  max-width: 90%;
  min-width: 50%;
}
.search-item-image {
  max-height: 15em;
}
@media (max-width: 767px) {
  .search-item-image {
    max-height: 10em;
  }
}
@media (max-width: 500px) {
  .search-item-image {
    max-height: 8em;
  }
}
.summary {
  display: block;
  padding-top: 1em;
  padding-bottom: 1em;
}
.a-link {
  padding: 4px 0;
}
.a-link:active,
.a-link:focus {
  outline: 0;
  border: none;
}
.pagination-link {
  padding: 12px 0;
}
.paginate {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  border-top: 1px solid #aeaeae;

  margin-top: 1em;
}

.paginate > .a-link + .a-link {
  padding-left: 2em;
}

.a-link.disabled,
.a-link.disabled:hover,
.a-link.disabled:active,
.a-link.disabled:focus,
.a-link__label.disabled,
.a-link__label.disabled:hover,
.a-link__label.disabled:active,
.a-link__label.disabled:focus {
  color: #717070;
  text-decoration: none !important;
  border: none !important;
  outline: 0 !important;
  transition: none;
  cursor: default;
}

.selected {
  border: 6px solid white;
  outline: 2px solid #675102;
}
</style>
