<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <h1 class="text-lg-center">{{ uprm_team }}</h1>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-card class="ma-3 pa-6" outlined tile>
              <h1 class="text-lg-center">{{ current_uprm_score[0]+current_uprm_score[1]+current_uprm_score[2]+current_uprm_score[3] }}</h1>
            </v-card>
          </v-col>
          </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <h2 class="text-md-center">PARCIAL</h2>
        </v-row>
        <v-row justify="center">
          <v-card class="ma-3 pa-6" outlined tile>
            <h1 class="text-md-center">{{ current_set }}</h1>
          </v-card>
          </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <h1 class="text-lg-center">{{ opp_team }}</h1>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-card class="ma-3 pa-6" outlined tile>
              <h1 class="text-lg-center">{{ current_opp_score[0]+current_opp_score[1]+current_opp_score[2]+current_opp_score[3] }}</h1>
            </v-card>
          </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    uprm_team: String,
    opp_team: String,
    uprm_score: Number,
    opp_score: Number,
    current_set: Number,
    current_uprm_score: Number, // Score of the current set for UPRM team.
    current_opp_score: Number, // Score of the current set for opponent team.
    event_id: String
  },
  data: () => ({
    uprm: "uprm",
    opp: "opponent"
  }),
  methods: {
    ...mapActions({
      sendSetAdjustAction: "soccerPBP/sendSetAdjust",
      sendScoreAdjust: "soccerPBP/sendGameAction"
    }),
    sendAdjust(team_name, adjust_no) {
      let payload = {
        data: {
          team: team_name,
          action_type: "ScoreAdjust",
          difference: adjust_no
        },
        event_id: this.event_id
      };
      this.sendScoreAdjust(payload);
    },
    sendSetAdjust(adjust_no) {
      let payload = {
        adjust: adjust_no,
        event_id: this.event_id
      };
      this.sendSetAdjustAction(payload);
    }
  }
};
</script>