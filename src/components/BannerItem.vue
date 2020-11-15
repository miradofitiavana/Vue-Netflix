<template>
  <div
    class="slide slick-bg"
    :style="`background-image:url(${imageUrl(movie.backdrop_path, 2)})`"
  >
    <div class="container-fluid position-relative h-100">
      <div class="slider-inner h-100">
        <div class="row align-items-center h-100">
          <div class="col-xl-6 col-lg-12 col-md-12">
            <a href="javascript:void(0);">
              <div class="channel-logo">
                <img
                  :src="require('@/assets/logo.webp')"
                  class="c-logo"
                  alt="miniflix"
                />
              </div>
            </a>
            <Title
              titleType="bigTitle"
              :title="titleValue()"
              titleClass="big-title title text-uppercase"
            />
            <div class="d-flex align-items-center">
              <span class="badge badge-secondary p-2 vote"
                >{{ movie.vote_average }}<span>&nbsp;/&nbsp;10</span></span
              >
            </div>
            <p>{{ movie.overview }}</p>
            <div class="d-flex align-items-center r-mb-23">
              <Button title="Lire" btnClass="btn-play" />
              <Button
                title="Détails"
                btnClass="btn-more"
                :btnFunction="() => goTo()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getImageUrl from "@/helpers/getImageUrl";
import Title from "@/components/Title";
import Button from "@/components/Button";

export default {
  name: "BannerItem",
  components: {
    Title,
    Button,
  },
  props: {
    movie: Object,
    mediaType: String,
  },
  methods: {
    imageUrl(url, size) {
      return getImageUrl(url, size, "backdrop");
    },
    titleValue() {
      return this.movie.title == undefined
        ? this.movie.original_title == undefined
          ? this.movie.original_name
          : this.movie.original_title
        : this.movie.title;
    },
    getMediaType() {
      let type = this.mediaType;
      if (this.movie.media_type) {
        type = this.movie.media_type;
      }
      return type;
    },
    goTo() {
      this.$router.push({
        name: "Details",
        params: { media: this.getMediaType(), id: this.movie.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/BannerItem";
</style>