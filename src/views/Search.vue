<template>
  <div class="search no-banner">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <Title
            title="Les résultats de votre recherche"
            titleType="bigTitle"
            titleClass="title-h1 text-left"
          />
        </div>
      </div>
      <div class="list__list">
        <div class="row">
          <Item
            :movie="item"
            class="col-6 col-sm-6 col-md-4 col-lg-3 search-item"
            v-for="item in searchResult"
            :key="item.id"
            :displayPoster="true"
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
  name: "Search",
  data: function () {
    return {
      myList: {
        results: [],
        total_pages: 1,
      },
      currentPage: 1,
    };
  },
  components: {
    Title,
    Item,
    vPagination,
  },
  mixins: [ApiDB, Authentication],
  methods: {
    setSearchResult() {
      this.executeQuery(this.query, this.currentPage).then((res) => {
        this.myList = res;
      });
    },
  },
  computed: {
    searchResult() {
      return this.myList.results.filter((i) => i.media_type != "person");
    },
    query() {
      return this.$store.getters.query;
    },
  },
  watch: {
    query() {
      if (this.$store.getters.query == "") {
        this.$router.push("/");
      } else {
        this.currentPage = 1;
        this.setSearchResult();
      }
    },
    currentPage() {
      this.setSearchResult();
    },
  },
  beforeCreate() {
    if (this.$router.currentRoute.query == {}) {
      this.$router.push("/");
    } else {
      this.$store.dispatch("setQuery", this.$router.currentRoute.query.q);
    }
  },
  created() {
    this.setSearchResult();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/All";

.search {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>

<style lang="scss">
@import "./styles/Pagination";
@import "./styles/Search";
</style>