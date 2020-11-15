<template>
  <div class="movies">
    <BannerItem :movie="latestMovie" />
    <div class="main-content">
      <List
        request-url="/movie/now_playing"
        category-title="En cours"
        mediaType="movie"
      />
      <List
        request-url="/movie/top_rated"
        category-title="Les mieux notés"
        mediaType="movie"
      />
      <List
        request-url="/movie/popular"
        category-title="Films Populaires"
        mediaType="movie"
      />
      <List
        request-url="/movie/upcoming"
        category-title="Films à venir"
        mediaType="movie"
      />
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12"></div>
      </div>
      <div class="list__list">
        <div class="row"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiDB from "@/mixins/ApiDB.js";
import Authentication from "@/mixins/Authentication.js";
import ApiMovies from "@/mixins/ApiMovies.js";

import Title from "@/components/Title.vue";
import BannerItem from "@/components/BannerItem.vue";
import Item from "@/components/Item.vue";
import List from "@/components/List.vue";

export default {
  name: "Movies",
  components: {
    Title,
    BannerItem,
    Item,
    List,
  },
  mixins: [ApiDB, Authentication, ApiMovies],
  data: function () {
    return {
      latestMovie: [],
      currentPage: 1,
    };
  },
  created() {
    this.movieGetLatest().then((res) => {
      this.latestMovie=(res);
    });
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/All";

.movies {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>

<style lang="scss">
</style>