<template>
  <div class="coming no-banner">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <Title
            title="Films à venir"
            titleType="bigTitle"
            titleClass="title-h1 text-left"
          />
        </div>
      </div>
      <div class="list__list">
        <div class="row">
          <Item
            :movie="item"
            class="col-6 col-sm-6 col-md-4 col-lg-3 watch-item"
            v-for="item in myList.results"
            :key="item.id" mediaType="movie"
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
  name: "Coming",
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
    getUpcomingMovies(page) {
      this.queryUpcomingMovies(page).then((res) => {
        this.myList = res;
      });
    },
  },
  created() {
    this.getUpcomingMovies(this.currentPage);
  },
  watch: {
    currentPage(value) {
      this.getUpcomingMovies(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/All";

.coming {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>

<style lang="scss">
@import "./styles/Watchlist";
@import "./styles/Pagination";
</style>