<template>
  <div class="tv">
    <BannerItem :movie="latestTV" />
    <div class="main-content minus">
      <List
        request-url="/tv/airing_today"
        category-title="En cours"
        mediaType="tv"
      />
      <List
        request-url="/tv/top_rated"
        category-title="Les mieux notées"
        mediaType="tv"
      />
      <List
        request-url="/tv/popular"
        category-title="Séries Populaires"
        mediaType="tv"
      />
      <List
        request-url="/tv/on_the_air"
        category-title="Episodes à venir"
        mediaType="tv"
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
import ApiSeries from "@/mixins/ApiSeries.js";

import getRandomIndex from "@/helpers/getRandomIndex";


import Title from "@/components/Title.vue";
import BannerItem from "@/components/BannerItem.vue";
import Item from "@/components/Item.vue";
import List from "@/components/List.vue";

export default {
  name: "Series",
  components: {
    Title,
    BannerItem,
    Item,
    List,
  },
  mixins: [ApiDB, Authentication, ApiSeries],
  data: function () {
    return {
      latestTV: {},
      currentPage: 1,
    };
  },
  created() {
    this.serieAiring().then((res) => {
      this.latestTV = res.results[getRandomIndex(5)];
      console.log(this.latestTV)
    });
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/All";
@import "./styles/Series";
</style>

<style lang="scss">
</style>