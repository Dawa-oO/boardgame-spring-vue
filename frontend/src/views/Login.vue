<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1>Login</h1>
    <v-text-field
      v-model="login"
      :rules="[rules.required]"
      label="Pseudo"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Mot de passe"
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="connect">
      Se connecter
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    login: "",
    password: "",
    show1: false,
    error: "",
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),

  methods: {
    connect() {
      /* Forme validation */
      this.$refs.form.validate();

      const url = this.$backUrl + "/players/player/" + this.password;

      this.axios
        .get(url)
        .then((res) => {
          if (res.data.length > 0) {
            this.$store.dispatch("updateUser", res.data[0].firstName);
            this.$router.push({ name: "Home" });
          } else {
            this.error = "Mauvais login ou mot de passe";
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Une erreur s'est produite lors de la connexion");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>