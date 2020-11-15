<template>
  <div class="coming">
    <BannerPara :movie="movie" :isDetails="true" />
    <div
      class="container-fluid details-casting"
      v-if="$route.params.media == 'tv'"
    >
      <div class="row">
        <div class="col-12 details-title">
          <Title
            title="Saisons"
            titleType="sectionTitle"
            titleClass="classic-title"
          />
        </div>
        <div class="col-12 row">
          <Season
            class="col-6 col-md-4 col-lg-2"
            v-for="item in movie.seasons"
            :key="item.id"
            :season="item"
          />
        </div>
      </div>
    </div>
    <div class="container-fluid details-casting">
      <div class="row">
        <div class="col-12 details-title">
          <Title
            title="Casting"
            titleType="sectionTitle"
            titleClass="classic-title"
          />
        </div>
        <div class="col-12 row">
          <Cast
            class="col-6 col-md-4 col-lg-2"
            v-for="item in movie.credits.cast"
            :key="item.id"
            :cast="item"
          />
        </div>
      </div>
    </div>
    <div class="container-fluid details-details">
      <div class="row details-title">
        <div class="col-12">
          <Title
            title="Companie de production"
            titleType="sectionTitle"
            titleClass="classic-title"
          />
        </div>
      </div>
      <div class="col-12 row">
        <div
          class="details-prod col-6 col-md-4 col-lg-2"
          v-for="item in movie.production_companies"
          :key="item.id"
        >
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="details-similar">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 details-title">
            <Title
              title="Titres similaires"
              titleType="sectionTitle"
              titleClass="classic-title"
            />
          </div>
          <Item
            :movie="item"
            class="col-6 col-sm-6 col-md-4 col-lg-3 similar-item"
            v-for="item in getSimilar()"
            :key="item.id"
            :mediaType="$route.params.media"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getImageUrl from "@/helpers/getImageUrl";

import ApiDB from "@/mixins/ApiDB.js";
import Authentication from "@/mixins/Authentication.js";

import Title from "@/components/Title.vue";
import BannerPara from "@/components/BannerPara.vue";
import Item from "@/components/Item.vue";
import Cast from "@/components/Cast.vue";
import Season from "@/components/Season.vue";

import vPagination from "vue-plain-pagination";

export default {
  name: "Details",
  components: {
    Title,
    BannerPara,
    Item,
    Cast,
    Season,
    vPagination,
  },
  mixins: [ApiDB, Authentication],
  data: function () {
    return {
      movie: {
        credits: {
          cast: [],
        },
        similar: {
          total_results: 0,
          results: [],
        },
        production_companies: [],
        seasons: [],
      },
    };
  },
  methods: {
    getSimilar() {
      return this.movie.similar != {} && this.movie.similar.total_results > 0
        ? this.movie.similar.results.slice(0, 8)
        : [];
    },
    logoUrl(item) {
      if (item == null) {
        return require("@/assets/backdrop-coming-soon.png");
      } else {
        return getImageUrl(item, 3, "logo");
      }
    },
    getDetails() {
      if (this.$route.params.media == "movie") {
        this.getMovieDetails(this.$route.params.id).then((res) => {
          this.movie = res;
        });
      } else {
        this.getTVDetails(this.$route.params.id).then((res) => {
          this.movie = res;
        });
      }
    },
  },
  created() {
    this.getDetails();
  },
  updated() {},
  computed: {
    currentID() {
      return this.$route.params.id;
    },
  },
  watch: {
    currentID() {
      this.getDetails();
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/All";

.details {
  padding-left: 1rem;
  padding-right: 1rem;

  &-details {
    border-image-source: linear-gradient(
      to left,
      rgba(209, 208, 207, 0),
      rgba(209, 208, 207, 0.6),
      rgba(209, 208, 207, 0)
    );
  }

  &-similar {
    margin-bottom: 40px;
  }

  &-title {
    margin-top: 40px;
    margin-bottom: 40px;
    text-align: left;
  }

  &-prod {
    height: 100px;
    border: 1px solid #3e3e3e;
    display: table;
    p {
      display: table-cell;
      vertical-align: middle;
      font-weight: 600;
      font-size: 18px;
    }
  }
}
</style>

<style lang="scss">
@import "./styles/Details";
</style>