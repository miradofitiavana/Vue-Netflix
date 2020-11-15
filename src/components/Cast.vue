<template>
  <div>
    <div class="cast">
      <img :src="imageUrl()" alt="" class="img-fluid" />
      <p>{{ cast.original_name }}</p>
    </div>
  </div>
</template>

<script>
import getImageUrl from "@/helpers/getImageUrl";

export default {
  name: "Cast",
  props: {
    cast: Object,
  },
  methods: {
    imageUrl() {
      if (this.cast.profile_path == null) {
        return require("@/assets/poster-coming-soon.png");
      } else {
        return getImageUrl(this.cast.profile_path, 3, "poster");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cast {
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