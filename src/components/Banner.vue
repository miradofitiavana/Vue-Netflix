<template>
  <section id="home" class="main-slider p-0">
    <VueSlickCarousel
      class="home-slider slider m-0 p-0"
      v-bind="settings"
      v-if="movies.length > 1"
    >
      <BannerItem
        v-for="movie in movies"
        :key="movie.index"
        :movie="movie"
        :mediaType="mediaType"
      />
    </VueSlickCarousel>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import BannerItem from "@/components/BannerItem";

export default {
  components: {
    BannerItem,
    VueSlickCarousel,
  },
  props: {
    movies: Array,
    mediaType: String,
  },
  data: function () {
    return {
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 5000,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/Banner";
</style>

<style lang="scss">
.home-slider {
  .slick-arrow {
    width: 60px;
    height: 60px;

    &:before {
      font-size: 60px;
      opacity: 0.1;
    }

    &:hover {
      &:before {
        opacity: 0.8;
      }
    }
  }
  .slick-next {
    right: 30px !important;
  }

  .slick-prev {
    left: 30px !important;
    z-index: 99;
  }
}
</style>