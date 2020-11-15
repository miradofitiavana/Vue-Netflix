<template>
  <section class="list">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 overflow-hidden">
          <div
            class="main-header d-flex align-items-center justify-content-between"
          >
            <Title
              :title="categoryTitle"
              titleType="sectionTitle"
              titleClass="classic-title"
            />
          </div>
          <VueSlickCarousel
            class="list-slider list-inline"
            v-bind="settingsItem"
            v-if="movieList.length > 1"
          >
            <Item
              v-for="item in movieList"
              :key="item.id"
              :movie="item"
              :displayPoster="displayPoster"
              :mediaType="mediaType"
            />
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ApiDB from "@/mixins/ApiDB.js";
import Conf from "@/mixins/Configurations.js";
import apiConfigs from "@/configs/api.configs";
import Item from "@/components/Item.vue";
import Title from "@/components/Title.vue";

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  name: "List",
  props: {
    categoryTitle: String,
    requestUrl: String,
    displayPoster: {
      type: Boolean,
      default: false, // si true : afficher poster
      required: false,
    },
    mediaType: String, // peut être movie, tv ou dynamic (on peut prendre directement depuis l'api)
  },
  components: {
    Item,
    Title,
    VueSlickCarousel,
  },
  mixins: [ApiDB, Conf],
  computed: {},
  methods: {},
  created() {
    this.getList(this.requestUrl)
      .then((response) => (this.movieList = response.results))
      .catch((err) => console.log(err));
  },
  data() {
    return {
      movieList: [],
    };
  },
};
</script>

<style lang="scss">
@import "./styles/List";

.list-slider {
  .slick-arrow {
    top: -35px;
    left: unset;
    &.slick-prev {
      right: 70px;
    }
    &.slick-next {
      right: 30px;
    }
  }
}
</style>

<style lang="scss" scoped>
.list {
  overflow: hidden;
  padding-top: 40px;

  .main-header {
    padding: 0 15px;
    @media (max-width: 991px) {
      padding: 10px 0;
    }
  }

  .main-more {
    color: #e50914 !important;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    &:hover {
      color: #bf000a !important;
      text-decoration: none;
    }
  }
}
</style>