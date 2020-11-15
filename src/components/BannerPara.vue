<template>
  <section
    id="parallex"
    class="parallax-window"
    :style="`background-image:url('${imageUrl(
      movie.backdrop_path,
      2,
      'backdrop'
    )}')`"
  >
    <div class="container-fluid h-100">
      <div
        class="row align-items-center justify-content-center h-100 parallaxt-details"
      >
        <div class="col-12 col-lg-7 r-mb-23">
          <div class="text-left">
            <Title
              titleType="paraTitle"
              :title="titleValue()"
              titleClass="para-title title text-uppercase"
            />
            <ul class="para-genres" v-if="isDetails">
              <li v-for="genre in movie.genres" :key="genre.id">
                {{ genre.name }}
              </li>
            </ul>
            <div class="d-flex align-items-center mt-4 mb-4">
              <span class="badge badge-secondary p-2 vote"
                >{{ movie.vote_average }}<span>&nbsp;/&nbsp;10</span></span
              >
            </div>
            <p>{{ movie.overview }}</p>
            <div class="parallax-buttons mt-4">
              <Button
                title="Lire"
                btnClass="btn-play btn-moyen"
                v-if="!isDetails"
              />
              <Button
                title="Détails"
                btnClass="btn-more btn-moyen"
                :btnFunction="() => goTo()"
                v-if="!isDetails"
              />
              <Button
                v-if="!isAdded && isLoggedIn && isDetails"
                title="Ajouter à ma Liste"
                btnClass="btn-add"
                :showText="true"
                :btnFunction="() => addToList()"
              />
              <Button
                v-if="isAdded && isLoggedIn && isDetails"
                title="Enlever de ma Liste"
                btnClass="btn-check"
                :showText="true"
                :btnFunction="() => removeFromList()"
              />
            </div>
          </div>
        </div>
        <div class="d-none d-lg-block col-12 col-lg-5">
          <div class="parallax-img">
            <img
              :src="imageUrl(movie.poster_path, 3, 'poster')"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ApiDB from "@/mixins/ApiDB.js";
import Authentication from "@/mixins/Authentication.js";

import getImageUrl from "@/helpers/getImageUrl";
import Title from "@/components/Title";
import Button from "@/components/Button";

export default {
  name: "BannerPara",
  components: {
    Title,
    Button,
  },
  data: function () {
    return {
      isAdded: false,
    };
  },
  props: {
    movie: Object,
    isDetails: {
      type: Boolean,
      default: false,
      required: false,
    },
    mediaType: String,
  },
  mixins: [ApiDB, Authentication],
  methods: {
    imageUrl(url, size, backdrop) {
      return getImageUrl(url, size, backdrop);
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
    addToList() {
      this.toggleWatchList(this.movie.id, this.getMediaType(), true).then(
        (res) => {
          this.isAdded = res.success;
        }
      );
    },
    removeFromList() {
      this.toggleWatchList(this.movie.id, this.getMediaType(), false).then(
        (res) => {
          this.isAdded = !res.success;
        }
      );
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.logged.iud != "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/BannerPara";
</style>