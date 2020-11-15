<template>
  <div class="watchlist no-banner">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <Title
            title="Ma Liste"
            titleType="bigTitle"
            titleClass="title-h1 text-left"
          />
        </div>
        <div class="col-12">
          <ul class="sous-menu">
            <li
              :class="
                $route.params.media_type == 'movie' ? 'sous-menu__actif' : ''
              "
            >
              <router-link to="/watchlist/movie">Films</router-link>
            </li>
            <li
              :class="
                $route.params.media_type == 'tv' ? 'sous-menu__actif' : ''
              "
            >
              <router-link to="/watchlist/tv">Séries</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="list__list">
        <div class="row">
          <Item
            :movie="item"
            class="col-6 col-sm-6 col-md-4 col-lg-3 watch-item"
            v-for="item in myList.results"
            :key="item.id"
            :mediaType="$route.params.media_type"
          />
          <div class="col-12">
            <v-pagination
              v-model="currentPage"
              :page-count="myList.total_pages"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiDB from "@/mixins/ApiDB.js";
import Authentication from "@/mixins/Authentication.js";

import Title from "@/components/Title.vue";
import Item from "@/components/Item.vue";

import vPagination from "vue-plain-pagination";

export default {
  name: "Watchlist",
  components: {
    Title,
    Item,
    vPagination,
  },
  mixins: [ApiDB, Authentication],
  data: function () {
    return {
      myList: {
        results: [],
        total_pages: 1,
      },
      currentPage: 1,
    };
  },
  methods: {
    getWatchlist(current) {
      if (this.$route.params.media_type == "movie") {
        this.getMovieWatchList(current).then((res) => {
          this.myList = res;
        });
      } else {
        this.getTvWatchList(current).then((res) => {
          this.myList = res;
        });
      }
    },
  },
  created() {
    this.getWatchlist(this.currentPage);
  },
  updated() {},
  computed: {
    currentMedia() {
      return this.$route.params.media_type;
    },
  },
  watch: {
    currentPage(value) {
      this.getWatchlist(value);
    },
    currentMedia() {
      this.currentPage = 1;
      this.getWatchlist(this.currentPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.watchlist {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>

<style lang="scss">
@import "@/assets/styles/All";
@import "./styles/Watchlist";
@import "./styles/Pagination";
</style>