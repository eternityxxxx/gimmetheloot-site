<template>
  <h1>Регистрация</h1>

  <form @submit-pr.prevent="submitForm">
    <label for="username">Логин</label>
    <input type="text" id="username" name="username" v-model="username" />
    <label for="password">Пароль</label>
    <input type="text" id="password" name="password" v-model="password" />
    <input type="submit" />
  </form>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      const requestBody = {
        username: this.username,
        password: this.password,
      };

      fetch(`${this.$store.getters.getServerUrl}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    },
  },
};
</script>
