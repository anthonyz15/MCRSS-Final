<template>
  <v-hover v-slot:default="{ hover }" open-delay="25">
    <v-card class="mx-auto" max-width="400" :elevation="hover ? 16 : 2">
      <v-img class="white--text align-end" height="200px" :src="img">
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey"></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
      <v-card-title class="sport-span" hover="true">{{sport_name}}</v-card-title>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    sport_name: String,
    img: String
  }
};
</script>

<style>
.sport-span {
  background-color: rgb(67, 160, 71);
  color: white;
  font-weight: bold;
  margin-right: 0;
}
</style>