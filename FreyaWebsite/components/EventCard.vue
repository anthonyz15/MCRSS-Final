<template>
  <v-card height="100%" width="100%">
    <v-img
      v-if="img != ''"
      class="black--text"      
      height="300px"
      :src="img"
    >
    </v-img>
    <v-card-title>
      <v-row class="my-n3">
        <v-col>
          <span>Deporte: </span>
          <span class="text--secondary ml-1">
            {{ sportName }}
          </span>
        </v-col>
      </v-row>
      <v-row class="my-n3">
        <v-col>
          <span>Fecha: </span>
          <span class="text--secondary ml-1"> {{ formatDate() }}</span>
        </v-col>
      </v-row>
      <v-row v-if="!!opponentName" class="my-n3">
        <v-col>
          <span>Equipos: </span>
          <span class="text--secondary"> UPRM vs {{ opponentName }} </span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="#263238" v-if="hasPBP == true" @click="goToPBPSequence"
        >Ver Play-by-Play</v-btn
      >
      <v-btn text color="green darken-1" dark @click="goToEvent"
        >Ver Detalles</v-btn
      >
      <v-spacer />
      <ShareNetwork
          class="ml-5 mr-5 mb-5"
          network="twitter"
          :url= this.url+this.eventID
          :title= this.eventSummary 
          :medua= this.img
        >
        <i></i>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#00acee" fab small dark target="_blank" v-on="on">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </template>
          <span>Compartelo en Twitter</span>
        </v-tooltip>
        
      </ShareNetwork>
      <ShareNetwork
          class="ml-5 mr-5 mb-5"
          network="facebook"
          :url= this.url+this.eventID
          :title= this.eventSummary 
          :medua= this.img
        >
        <i ></i>
         <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#3b5998" fab small dark  target="_blank" v-on="on">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </template>
          <span>Compartelo en Facebook</span>
        </v-tooltip>
      </ShareNetwork>
     

    </v-card-actions >
  </v-card>
</template>

<script>
export default {
  props: {
    eventID: Number,
    sportName: String,
    eventDate: String,
    opponentName: String,
    eventSummary: String,
    img: String,
    localScore: Number,
    opponentScore: Number,
    hasPBP: Boolean
  },
   data: () => ({
    url: "https://huella-deportiva-web.ue.r.appspot.com/eventos/"
  }),
  
  methods: {
    /**
     * Routes user to event viewer page for
     * the event with id given as prop.
     */
    goToEvent() {
      this.$router.push("/eventos/" + this.eventID);
    },
    /**
     * Routes user to PBP sequence viewer page
     * for the event with the sport and id given as
     * props
     */
    goToPBPSequence() {
      if(this.sportName=='Softbol'){
          this.$router.push(`/eventos/${this.eventID}/jugadas-beisbol`)
		}
        else{
			this.$router.push(`/eventos/${this.eventID}/jugadas-${this.sportName.toLowerCase()}/`)
		}
    },
    /**
     * Formats the date and time for the card.
     */
    formatDate() {
      let eDate = new Date(Date.parse(this.eventDate));
      let date = eDate.toISOString().substr(0, 10);
      let hours = eDate.getUTCHours();
      let minutes = eDate.getUTCMinutes();

      let amPM = null;
      if (hours > 12) {
        amPM = "PM";
        hours -= 12;
      } else if (hours < 12) amPM = "AM";

      let time = null;
      if (minutes < 10) time = hours + ":0" + minutes + amPM;
      else if (minutes >= 10) time = hours + ":" + minutes + amPM;
      return date + " @" + time;
    }
  }
};
</script>