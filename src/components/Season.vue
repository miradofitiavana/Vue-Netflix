<template>
  <div>
    <div class="season">
      <img :src="imageUrl()" alt="" class="img-fluid" />
      <p>{{ season.name }}</p>
    </div>
  </div>
</template>

<script>
import getImageUrl from "@/helpers/getImageUrl";

export default {
  name: "Season",
  props: {
    season: Object,
  },
  methods: {
    imageUrl() {
      if (this.season.poster_path == null) {
        return require("@/assets/poster-coming-soon.png");
      } else {
        return getImageUrl(this.season.poster_path, 3, "poster");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.season {
  padding: 10px;
  p {
    padding: 10px;
    font-weight: 600;
    border-bottom: 1px solid #3e3e3e;
    border-left: 1px solid #3e3e3e;
    border-right: 1px solid #3e3e3e;
  }
}
</style>