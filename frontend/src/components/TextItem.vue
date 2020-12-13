<template>
  <v-card height="200">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ item.label }}</v-card-title>
      </div>
      <div class="ml-auto">
        <v-card-text>
          <h1>{{ item.nbVictoires }}</h1>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TextItem",
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>