<template>
  <header :class="fixedTop">
    <div class="container-fluid">
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand to="/">
          <img
            :src="require('@/assets/logo.webp')"
            alt="Miniflix"
            height="28"
          />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Accueil</b-nav-item>
            <b-nav-item to="/movies">Films</b-nav-item>
            <b-nav-item to="/series">Séries</b-nav-item>
            <b-nav-item to="/news/movie">Nouveautés</b-nav-item>
            <b-nav-item to="/coming">Films à venir</b-nav-item>
            <b-nav-item to="/watchlist/movie">Ma liste</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                class="mr-sm-2 search-input"
                placeholder="Rechercher"
                v-model="searchQuery"
              ></b-form-input>
            </b-nav-form>

            <b-navbar-nav>
              <b-nav-item to="/login" v-if="!isLoggedIn">
                Se connecter
              </b-nav-item>
              <b-nav-item @click.prevent="logout()" v-if="isLoggedIn">
                Se déconnecter ({{ getUsername }})
              </b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
import Auth from "@/mixins/Authentication";
import ApiDB from "@/mixins/ApiDB";

export default {
  name: "Header",
  data: function () {
    return {
      fixedTop: "",
      searchQuery: "",
    };
  },
  mixins: [Auth, ApiDB],
  methods: {
    handleScroll(event) {
      this.fixedTop = window.scrollY > 0 ? "fixed-top" : "";
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.logged.iud != "";
    },
    getUsername() {
      return this.$store.getters.logged.username;
    },
    currentRoute() {
      return this.$router.currentRoute.path;
    },
  },
  watch: {
    searchQuery: function (value, oldValue) {
      this.$store.dispatch("setQuery", value);
      if (
        (this.$router.currentRoute.path == "/search" &&
          value != this.$router.currentRoute.query.q) ||
        this.$router.currentRoute.path != "/search"
      ) {
        this.$router.push({ name: "Search", query: { q: value } });
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    if (this.$router.currentRoute.path == "/search") {
      this.searchQuery = this.$router.currentRoute.query.q;
    }
  },
  updated() {},
};
</script>

<style lang="scss" scoped>
@import "./styles/Header";
</style>
