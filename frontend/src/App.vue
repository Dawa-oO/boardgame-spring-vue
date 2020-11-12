<template>
  <v-app>
    <!------------------>
    <!------ Menu ------>
    <!------------------>
    <Menu />
    <!------------------>
    <!------ Body ------>
    <!------------------>
    <v-main>
      <v-container class="px-4 py-0 fill-height" fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade" mode="out-in" appear>
              <router-view transition="slide-x-transition" />
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "@/components/Menu";

export default {
  name: "App",
  components: {
    Menu,
  },
};
</script>

<style lang="scss">
</style>
