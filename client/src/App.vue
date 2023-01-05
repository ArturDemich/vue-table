<script>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<template>
  <v-app>
    <Navbar />

    <RouterView />
  </v-app>
</template>

<style >
.v-application__wrap {
  background-color: ghostwhite !important;
}
</style>
