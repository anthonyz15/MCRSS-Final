<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-toolbar flat color="primary_dark">
          <v-toolbar-title class="headline white--text">
            Remover Equipo
          </v-toolbar-title>
        </v-toolbar>
        <v-card-title
          >¿Está seguro quiere remover el equipo?</v-card-title
        >
        <v-card-text>
          <v-checkbox
            v-model="terms"
            :label="`Confirmar`"
          ></v-checkbox>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-3" text @click="close()"> Cancelar </v-btn>
          <v-btn
            color="green darken-1"
            :disabled="!terms"
            :loading="isLoading"
            text
            @click="removeTeamLocal()"
          >
            Remover
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteTeamModal",
  props: {
    dialog: Boolean,
    sport_id: Number,
    season_year: Number
  },
  data() {
    return {
      terms: false,
      isLoading: false
    };
  },
  methods: {
    ...mapActions({
      removeTeam: "teams/removeTeam",
      setQueryLoading: "teams/setQueryLoading",
      setNullTeam:"teams/setNullTeam",
      setNullTeamMembers:"teams/setNullTeamMembers",
      getTeamByYear:"teams/getTeamByYear"
    }),
    
    close() {
      this.terms = false;
      this.$emit("update:dialog", false);
    },
    getSeasonDataPost(){
      this.setQueryLoading()
      this.setNullTeam()
      this.setNullTeamMembers()
      const team_params = {
        sport_id: String(this.sport_id),
        season_year: String(this.season_year)
      }
      //console.log("At the index level inside the getSeasonData, request params look like",team_params)
      this.getTeamByYear(team_params)   			
    },
    async removeTeamLocal() {
      this.isLoading = true;
      const payload = {
        sport_id: Number(this.sport_id),
        season_year: Number(this.season_year)
      };
      // console.log("HEY WE GONNA REMOVE!",payload)
      await this.setQueryLoading();
      await this.removeTeam(payload);
      await this.getSeasonDataPost()
      this.terms = false;
      this.$emit("update:dialog", false);
      this.isLoading = false;
    }
  }
};
</script>

<style>
</style>