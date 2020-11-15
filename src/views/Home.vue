<template>
  <div class="">
    <Banner :movies="movieList" mediaType="movie" />
    <div class="main-content minus">
      <List
        request-url="/trending/all/week"
        category-title="Tendances actuelles"
        mediaType="dynamic"
      />
      <List
        request-url="/tv/airing_today"
        category-title="Les émissions à voir aujourd'hui"
        mediaType="tv"
      />
      <BannerPara :movie="latestMovie" mediaType="tv" />
      <List
        request-url="/tv/top_rated"
        category-title="Les séries à succès"
        mediaType="tv"
      />
      <List
        request-url="/movie/top_rated"
        category-title="Les films à succès"
        mediaType="movie"
      />
    </div>
  </div>
</template>

<script>
import ApiDB from "@/mixins/ApiDB.js";
import Authentication from "@/mixins/Authentication.js";
import List from "@/components/List.vue";
import Banner from "@/components/Banner.vue";
import BannerPara from "@/components/BannerPara.vue";

export default {
  name: "Home",
  data: function () {
    return {
      movieList: [],
      latestMovie: {},
    };
  },
  mixins: [ApiDB, Authentication],
  components: {
    List,
    Banner,
    BannerPara,
  },
  created() {
    this.getDiscover()
      .then((response) => (this.movieList = response.results))
      .catch((err) => console.log(err));
    this.getPopularTv()
      .then((response) => (this.latestMovie = response.results[0]))
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/Home";
</style>