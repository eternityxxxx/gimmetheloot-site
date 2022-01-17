<template>
  <Header></Header>
  <router-view />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<script>
import Header from "./components/Header";
// import axios from "axios";
export default {
  components: { Header },
  // beforeCreate() {
  //   this.$store.commit("initializeStore");
  //
  //   const access = this.$store.state.access;
  //
  //   if (access) {
  //     axios.defaults.headers.common["Authorization"] = "JWT " + access;
  //   } else {
  //     axios.defaults.headers.common["Authorization"] = "";
  //   }
  // },
};
</script>
