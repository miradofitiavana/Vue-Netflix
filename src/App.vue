<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Auth from "@/mixins/Authentication.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  mixins: [Auth],
  created() {
    this.$store.dispatch("setConfiguration");
    this.$store.dispatch("setLogged", this.getCurrentSession());
  },
};
</script>

<style lang="scss">
@import "./assets/styles/All";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
