<template>
  <h1>Вход</h1>
  <div class="container">
    <form class="form" @submit.prevent="loginUser">
      <input
        class="form__input"
        id="username"
        name="username"
        type="text"
        v-model="username"
        placeholder="admin@gmail.com"
      />
      <div class="password-wrapper">
        <Icon class="eye" icon="fa:eye" />
        <input
          class="form__input form__input--password"
          id="password"
          name="password"
          type="password"
          v-model="password"
          placeholder="gdhenjdjwk"
        />
      </div>
      <input type="submit" />
    </form>
  </div>
</template>

<script>

import { Icon } from '@iconify/vue';

export default {
  name: "Singin",
  components: {
    Icon,
  },
  data() {
    return {
      username: "",
      password: "",
      wrongCred: false, // activates appropriate message if set to true
    };
  },
  methods: {
    loginUser() {
      this.$store
        .dispatch("loginUser", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.wrongCred = false;
          this.$router.push({ name: "Adverts" });
        })
        .catch((err) => {
          console.log(err);
          this.wrongCred = true; // if the credentials were wrong set wrongCred to true
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 580px;
  margin: 100px auto 0;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.form__input {
  width: 90%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 35px;
  min-height: 25px;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form__input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
}

.password-wrapper {
  /*width: 100%;*/
  position: relative;
}

.eye {
  position: absolute;
  top: 12px;
  right: 48px;
}
</style>
