<template>
  <div class="item">
    <!-- <router-link :to="{ name: 'Details', params: { id: movie.id } }"> -->
    <div class="block-images position-relative">
      <div class="img-box">
        <img :src="imageUrl()" class="img-fluid" alt="" />
      </div>
      <div class="block-details">
        <p>{{ movie.overview | truncate }}</p>
        <div>
          <p>{{ dateSortie().type }} - {{ dateSortie().date | yearOnly }}</p>
          <p>
            Note : <span>{{ movie.vote_average }}</span>
          </p>
        </div>
      </div>
      <div class="block-description">
        <h6>
          {{ titleValue() }}
        </h6>
      </div>
      <div class="block-social-info">
        <ul class="list-inline p-0 m-0 music-play-lists">
          <li>
            <Button title="Lire" btnClass="btn-play" :showText="false" />
          </li>
          <li>
            <Button
              title="Détails"
              btnClass="btn-more"
              :showText="false"
              :btnFunction="() => goTo()"
            />
          </li>
          <li v-if="isLoggedIn">
            <Button
              v-if="!isAdded"
              title="Ajouter à ma Liste"
              btnClass="btn-add"
              :showText="false"
              :btnFunction="() => addToList()"
            />
            <Button
              v-else
              title="Enlever de ma Liste"
              btnClass="btn-check"
              :showText="false"
              :btnFunction="() => removeFromList()"
            />
          </li>
        </ul>
      </div>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
import ApiDB from "@/mixins/ApiDB.js";
import Authentication from "@/mixins/Authentication.js";
import getImageUrl from "@/helpers/getImageUrl";
import Button from "@/components/Button";

export default {
  name: "Item",
  data: function () {
    return {
      isAdded: false,
    };
  },
  props: {
    movie: Object,
    displayPoster: {
      type: Boolean,
      default: false, // si true : afficher backdrop
      required: false,
    },
    mediaType: String, // peut être movie, tv ou dynamic (on peut prendre directement depuis l'api)
  },
  components: {
    Button,
  },
  mixins: [ApiDB, Authentication],
  computed: {
    isLoggedIn() {
      return this.$store.getters.logged.iud != "";
    },
  },
  methods: {
    getMediaType() {
      let type = this.mediaType;
      if (this.movie.media_type) {
        type = this.movie.media_type;
      }
      return type;
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
    imageUrl() {
      if (this.displayPoster) {
        if (this.movie.poster_path == null) {
          return require("@/assets/poster-coming-soon.png");
        } else {
          return getImageUrl(this.movie.poster_path, 3, "poster");
        }
      } else {
        if (this.movie.backdrop_path == null) {
          return require("@/assets/backdrop-coming-soon.png");
        } else {
          return getImageUrl(this.movie.backdrop_path, 1, "backdrop");
        }
      }
    },
    titleValue() {
      return this.movie.original_title == undefined
        ? this.movie.original_name
        : this.movie.original_title;
    },
    dateSortie() {
      let type = this.mediaType;
      let retour = { date: "", type: "" };
      if (this.movie.media_type) {
        type = this.movie.media_type;
      }
      if (type == "tv") {
        retour = { date: this.movie.first_air_date, type: "Série" };
      } else {
        retour = { date: this.movie.release_date, type: "Film" };
      }
      return retour;
    },
    goTo() {
      this.$router.push({
        name: "Details",
        params: { media: this.getMediaType(), id: this.movie.id },
      });
    },
  },
  mounted() {
    let type = this.mediaType;
    if (this.movie.media_type) {
      type = this.movie.media_type;
    }
    this.isInWatchList(this.movie.id, type).then((res) => {
      this.isAdded = res.watchlist;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/Item";
a {
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}
.block-details {
  padding: 10px 15px;
  color: #a5a5a5;
  background-color: #141414;
  p {
    font-size: 13px;
    text-align: left;
    color: inherit;
    span {
      color: inherit;
      font-weight: 600;
    }
  }
  > div {
    display: table;
    width: 100%;
    p {
      display: table-cell;
      vertical-align: middle;
      width: 50%;
      color: inherit;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
}
</style>
