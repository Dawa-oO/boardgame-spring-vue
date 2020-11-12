<template>
  <v-card height="200">
    <v-card-title class="headline">{{ item.label }}</v-card-title>

    <v-card-text>
      <div>{{ item.nbVictoires }}</div>
    </v-card-text>
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