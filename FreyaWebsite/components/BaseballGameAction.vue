<template>
  <v-container>
    <v-hover v-slot:default="{ hover }" open-delay="25">
      <v-card v-if="action_type === notification" width="550px" :elevation="hover ? 16 : 2">
        <v-toolbar :color="in_color" dark flat>
          <v-row justify="center" align="center">
            <v-card-title>{{ game_actions_map[action_type] }}</v-card-title>
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
          <v-row justify="center" align="center">
            <v-card-title>{{ game_actions_map[action_type] }}</v-card-title>
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
    athlete_id: Number,
    athlete_img: String,
    in_color: String,
    id: String,
    event_id: Number,
    uprmAthletes: [],
    oppAthletes: [],
    team: String
  },
  data: () => ({
    // Notification keyword.
    notification: "Notification",

    // Dialog flags.
    notification_dialog: false,
    delete_dialog: false,
    edit_play_dialog: false,

    valid: false,
    button_loading: false,

    // Content to be displayed in the Edit Game Action dialog.
    teams: ["Oponente", "UPRM"],

    team_map: {
      Oponente: "opponent",
      UPRM: "uprm"
    },

    plays: [
      "Hit",
      "At Bat",
      "Homerun",
      "Strike",
      "Bola",
      "Out",
      "Carrera",
      "Carrera Empujada",
      "Ponche",
      "Base Por Bola",
      "Dejado En Base"
    ],

    current_team: null,
    current_play: "",
    current_athlete: null,

    game_actions_map: {
      Notification: "Notificación",
      Notificación: "Notification",
      Hit: "Hit",
      AtBat: "Al Bate",
      "Al Bate": "AtBat",
      Homerun: "Cuadrangular",
      "Cuadrangular": "Homerun",
      Out: "Out",
      Run: "Carrera",
      Carrera: "Run",
      RunBattedIn: "Carrera Empujada",
      "Carrera Empujada": "RunBattedIn",
      StrikeOut: "Ponche",
      Ponche: "StrikeOut",
      BaseOnBall: "Base Por Bola",
      "Base Por Bola": "BaseOnBall",
      LeftOnBase: "Dejado En Base",
      "Dejado En Base": "LeftOnBase"
    },

    // Rules and placeholders.
    newMessage: "",
    notification_rules: [
      v =>
        (v.length > 0 && v.length <= 100) ||
        "Las notificaciones deben tener entre 1 y 100 caracteres."
    ]
  }),
  methods: {
    ...mapActions({
      updateGameAction: "baseballPBP/updateGameAction",
      removeGameAction: "baseballPBP/removeGameAction"
    }),

    // Setup v-models for editting a notification.
    startEditNotification() {
      this.current_team = this.team;
      this.newMessage = this.message;
      this.notification_dialog = true;
    },

    // Edit a notification game action.
    async editNotification() {
      // Create payload with new message and notification info.
      if (this.newMessage.length >= 1 && this.newMessage.length <= 100) {
        const payload = {
          event_id: this.event_id,
          action_id: this.id,
          data: {
            action_type: this.notification,
            message: this.newMessage
          }
        };
        // Update notification.
        this.button_loading = true;
        if (await this.updateGameAction(payload)) {
          this.notification_dialog = false;
        }
        this.button_loading = false;
      }
    },

    async deleteGameAction() {
      const payload = {
        event_id: this.event_id,
        action_id: this.id
      };

      this.button_loading = true;
      if (await this.removeGameAction(payload)) {
        this.delete_dialog = false;
      }
      this.button_loading = false;
    },

    startEditPlay() {
      this.edit_play_dialog = true;
      this.current_team = this.team;
      this.current_play = this.game_actions_map[this.action_type];

      // Find current UPRM athlete.
      if (this.current_team === "UPRM") {
        let index = -1;
        for (let i = 0; i < this.uprmAthletes.length; i++) {
          if (this.uprmAthletes[i].athlete_id === this.athlete_id) {
            index = i;
            break;
          }
        }

        if (index === -1) {
          this.current_athlete = null;
        } else {
          this.current_athlete = this.uprmAthletes[index].athlete_id;
        }
      }

      // Find current opponent athlete.
      else {
        let index = -1;
        for (let i = 0; i < this.oppAthletes.length; i++) {
          if (this.oppAthletes[i].number === this.athlete_id) {
            index = i;
            break;
          }
        }

        if (index === -1) {
          this.current_athlete = null;
        } else {
          this.current_athlete = this.oppAthletes[index].number;
        }
      }
    },

    async editPlay() {
      // Verify the content in the form is valid.
      if (!this.$refs.edit_form.validate()) {
        return;
      }

      // Make sure an athlete was selected.
      if (this.current_athlete == null) {
        return;
      }

      // Determine if the athlete was selected.
      let index = -1;
      if (this.current_team === "UPRM") {
        for (let i = 0; i < this.uprmAthletes.length; i++) {
          if (this.uprmAthletes[i].athlete_id == this.current_athlete) {
            index = i;
            break;
          }
        }
      } else {
        for (let i = 0; i < this.oppAthletes.length; i++) {
          if (this.oppAthletes[i].number == this.current_athlete) {
            index = i;
            break;
          }
        }
      }

      if (index === -1) {
        this.current_athlete = null;
        !this.$refs.edit_form.validate();
        return;
      }

      const payload = {
        event_id: this.event_id,
        action_id: this.id,
        data: {
          action_type: this.game_actions_map[this.current_play],
          athlete_id: this.current_athlete,
          team: this.team_map[this.current_team]
        }
      };
      // Close edit play dialog if request is successful.
      this.button_loading = true;
      if (await this.updateGameAction(payload)) {
        this.edit_play_dialog = false;
      }
      this.button_loading = false;
    },

    map_action(action_name) {
      switch (action_name) {
        case "Notification":
          return "Notificación";

        case "KillPoint":
          return "Punto de Ataque";

        case "Ace":
          return "Servicio Directo";

        case "BlockPoint":
          return "Punto de Bloqueo";

        case "Assist":
          return "Asistencia";

        case "Block":
          return "Bloqueo";

        case "Dig":
          return "Recepción";

        case "AttackError":
          return "Error de Ataque";

        case "ServiceError":
          return "Error de Servicio";

        case "BlockingError":
          return "Error de Bloqueo";

        case "ReceptionError":
          return "Error de Recepción";

        default:
          return "Acción Desconocida";
      }
    },

    // Given an item (UPRM ATHLETE), return its name.
    get_uprm_item_text(item) {
      let index = -1;

      for (let i = 0; i < this.uprmAthletes.length; i++) {
        if (item.athlete_id === this.uprmAthletes[i].athlete_id) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        return null;
      }

      const athlete = this.uprmAthletes[index];

      if (item.middle_name === "") {
        return (
          "#" + athlete.number + " " + item.first_name + " " + item.last_names
        );
      }
      return (
        "#" +
        athlete.number +
        " " +
        item.first_name +
        " " +
        item.middle_name +
        " " +
        item.last_names
      );
    },
    get_opp_item_text(item) {
      let index = -1;

      for (let i = 0; i < this.oppAthletes.length; i++) {
        if (item.number === this.oppAthletes[i].number) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        return null;
      }

      const athlete = this.oppAthletes[index];

      return "#" + athlete.number + " " + item.name;
    }
  },
  computed: {
    getRoster: function() {
      // UPRM selected.
      if (this.current_team === "UPRM") {
        console.log(this.uprmAthletes);
        return this.uprmAthletes;
      }
      // Opponent selected.
      if (this.current_team === "Oponente") {
        return this.oppAthletes;
      }

      // Otherwise, send an empty list.
      return [];
    }
  }
};
</script>