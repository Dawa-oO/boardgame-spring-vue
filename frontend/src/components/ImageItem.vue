<template>
  <v-card height="200">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ item.label }}</v-card-title>
      </div>

      <v-avatar class="ma-3" size="125" tile>
        <v-img :src="item.image_url"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ImageItem",
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>