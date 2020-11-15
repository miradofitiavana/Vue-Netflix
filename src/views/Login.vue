<template>
  <section class="sign-in-page">
    <div class="container">
      <div
        class="row justify-content-center align-items-center height-self-center"
      >
        <div class="col-lg-5 col-md-12 align-self-center">
          <div class="sign-user_card">
            <div class="sign-in-page-data">
              <div class="sign-in-from w-100 m-auto">
                <Title
                  title="S'identifier"
                  titleType="sectionTitle"
                  titleClass="classic-title"
                  class="text-left"
                />
                <form class="mt-4" @submit.prevent="handleLogin">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control mb-0"
                      placeholder="Nom d'utilisateur"
                      autocomplete="off"
                      v-model="user.username"
                    />
                    <!-- v-validate="'required'" -->
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control mb-0"
                      placeholder="Mot de passe"
                      v-model="user.password"
                    />
                    <!-- v-validate="'required'" -->
                  </div>

                  <div class="sign-info text-center">
                    <Button
                      v-if="!loading"
                      title="Se connecter"
                      btnClass="play btn-moyen"
                      class="w-100"
                      :btnFunction="() => handleLogin()"
                    />
                    <b-icon
                      v-if="loading"
                      icon="arrow-clockwise"
                      animation="spin-pulse"
                      font-scale="3"
                      variant="light"
                    ></b-icon>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import User from "@/models/user";

import Auth from "@/mixins/Authentication";

import Title from "@/components/Title.vue";
import Button from "@/components/Button.vue";

export default {
  name: "Login",
  components: {
    Title,
    Button,
  },
  data: function () {
    return {
      user: new User("", ""),
      loading: false,
    };
  },
  mixins: [Auth],
  computed: {},
  created() {},
  methods: {
    handleLogin() {
      this.loading = true;
      let token = "";

      this.authenticate(this.user).then((res) => {
        if (res != null && res.success) {
          this.$router.push("/");
        }
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/Login.scss";
</style>