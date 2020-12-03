<template>
  <v-container>
    <v-hover v-slot:default="{ hover }" open-delay="25">
      <v-card v-if="action_type === notification" width="550px" :elevation="hover ? 16 : 2">
        <v-toolbar :color="in_color" dark flat>
          <v-row justify="center" align="center">
            <v-card-title>{{ map_action(action_type) }}</v-card-title>
          </v-row>
        </v-toolbar>
        <v-row align="center">
          <v-col :cols="4" justify="center">
            <v-avatar size="100" class="mx-10">
              <v-icon x-large :color="in_color" v-if="!athlete_img" height="100px">mdi-bell-outline</v-icon>
            </v-avatar>
          </v-col>
          <v-col justify="center">
            <v-row allign="center">
              <v-col>
                <v-card-title class="text-center" style="word-break: normal;">{{ message }}</v-card-title>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-else width="550px" :elevation="hover ? 16 : 2">
        <v-toolbar :color="in_color" dark flat>
          <v-row>
            <v-card-title align='left' class="mr-12 ml-12">{{time}}</v-card-title>
            <v-card-title justify='center' align='center' class="ml-12">{{map_action(action_type) }}</v-card-title>
          </v-row>
        </v-toolbar>
        <v-row>
          <v-col :cols="3">
            <v-avatar size="100" class="mx-10">
              <v-icon x-large :color="in_color" v-if="!athlete_img" height="100px">mdi-account</v-icon>
              <v-img v-else :src="athlete_img" alt="ATHLETE" height="100px">
                <template v-slot:placeholder>
                  <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate :color="in_color"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-avatar>
          </v-col>
          <v-col allign="center">
            <v-row class="mx-10" justify="center">
              <v-card-title
                class="text-center"
                style="word-break: normal;"
              >#{{athlete_number}}. {{athlete_name}}</v-card-title>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    action_type: String, // After this, the following props are optional depending on the action_type.
    message: String,
    athlete_name: String,
    athlete_number: Number,
    athlete_img: String,
    in_color: String,
    time: String,

  },
  data: () => ({
    // Notification keyword.
    notification: "Notification", 
  }),
  methods: {
    map_action(action_name) {
      switch (action_name) {
        case "Notification":
          return "Notificación";

        case "Freethrow":
          return "Tiro Libre";

        case "2Points":
          return "Tiro de Campo";

        case "3Points":
          return "Tiro de Tres";

        case "Assist":
          return "Asistencia";

        case "Blocks":
          return "tapón";

        case "Steals":
          return "Robo";

        case "Rebound":
          return "Rebote";

        case "Turnover":
          return "Perdida de Balón";

        case "Foul":
          return "Falta";

        default:
          return "Acción Desconocida";
      }
    }
  }
};
</script>