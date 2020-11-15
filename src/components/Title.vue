<template>
  <div>
    <h1 v-if="titleType == 'bigTitle'" :class="titleClass">{{ title }}</h1>
    <h2 v-if="titleType == 'sectionTitle'">{{ title }}</h2>
    <h3 v-if="titleType == 'paraTitle'" :class="titleClass">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: String,
    titleType: String,
    titleClass: String,
  },
};
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
  margin: 0px;
  line-height: 1.2;
  color: #fff;
}

.big-title {
  background: url("../assets/texture.jpg");
  background-repeat: repeat-x;
  background-position: 100% 100%;
  color: transparent;
  -webkit-font-smoothing: antialiased;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 70px;
  margin: 15px 0;
  font-weight: 600;
  text-align: left;

  @media (min-width: 1499px) {
    margin: 30px 0;
  }
  @media (max-width: 991px) {
    font-size: 35px;
  }
  @media (max-width: 767px) {
    line-height: 62px;
    margin: 0px;
  }
}

.para-title {
  background: url("../assets/texture.jpg");
  background-repeat: repeat-x;
  background-position: 100% 100%;
  color: transparent;
  -webkit-font-smoothing: antialiased;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
  font-style: italic;

  @media (max-width: 991px) {
    font-size: 40px;
  }
}

.classic-title {
  font-weight: 500;
  margin: 0px;
  line-height: 1.2;
  color: #ffffff;

  @media (max-width: 767px) {
    font-size: 1em;
  }
}

.title-h1 {
  margin-bottom: 3rem;
}
</style>