<template>
  <v-container>
    <v-row v-if="events.length>0">

      <v-card  class="mx-auto my-4" min-width=40%
      v-for="value in events.slice(-2)" 
        :key="value"
        v-bind:id="events"
      >
      <v-card-text>
        <h3 class="mb-5" >Evento </h3>
        <h1 class="mb-5" > UPRM vs {{value.opponent_name}}</h1>
        <h3 class="mb-5">{{value.sport_name}} {{value.branch}}</h3>
        <h5>Fecha: {{ value.event_date }} </h5>
        
      </v-card-text>
       <v-card-actions>
        <v-btn
          text
          color="teal accent-4"
          @click="evento(value.id)"
          aling='end'
        > Ir al evento
        </v-btn>
       </v-card-actions>
      </v-card>
      
      
    </v-row>
    <LoadingScreen v-else name-of-data="Eventos" />
    <v-row v-if="images.length>0&&txt.length>0">
      
      <v-col>
      <v-carousel >
      <v-carousel-item
        v-for="imgs in images.slice(-5)" 
        :key="imgs.mid"
        :src="imgs.content"
        reverse-transition="fade-transition"
        transition="fade-transition"
        max-width=837
        >
      </v-carousel-item>

       </v-carousel>
      </v-col>


      <v-card class="mx-auto"
      max-width="300"
      tile>
       <v-list shaped>
        <h2 align="center">Noticias</h2>
        <v-list-item-group
          color="grey"
        >

        <v-list-item-content >
              <v-list-item   v-for="t in txt.slice(-8)"  :to="'/multimedios/'+t.mid"
        :key="t.mid"> {{t.title}}</v-list-item>
        </v-list-item-content>
        </v-list-item-group>
        </v-list>
      
      </v-card>


    </v-row>
    <LoadingScreen v-else name-of-data="Feed" />

   
    <v-row v-for="t in livestream.slice(-1)"  :key="t.mid" class="mt-12">
      <v-col>
      <iframe 
        :src="t.content"
        width="800" height="720" 
        style="border:none;overflow:hidden" 
        scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"
      >       </iframe>
      </v-col>
      <v-col >
        <v-card
      class="mx-auto my-4" min-height=400 width='250'>
      <v-card-text >
      <!-- <h1 align="left" justify="center" class="mt-3"> EN VIVO  <v-icon
        color="red"
        large
      >mdi-access-point</v-icon>
      </h1> -->
      <h3 align="left" justify="center" class="mt-2" > {{t.title}} </h3>
      
      </v-card-text>
      </v-card>
      
      </v-col>
    </v-row>
    <v-row v-if="livestream.length==0" class="pa-md-2 mt-10">
      <v-col>
        
      <iframe 
        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FDeportivaHuella%2Fvideos%2F3341638612515000%2F&show_text=false&width=560"
        width="1150" height="900" 
        style="border:none;overflow:hidden" 
        scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"
      >       </iframe>
      </v-col>
    </v-row>
 

    <v-layout column class="mt-n12">
      <v-flex xs12 sm8 md6>
        <div class="text-center">
          <v-row>
            <client-only>
              <v-col>
                <h1 v-if="smAndDown" class="header display-2 my-12">
                  ¡Bienvenido a Huella Deportiva
                  <span class="highlight">Web</span>!
                </h1>
                <h1 v-else-if="mdAndUp" class="header display-3 my-12">
                  ¡Bienvenido a Huella Deportiva
                  <span class="highlight">Web</span>!
                </h1>
                <Logo :width="mdAndUp ? '' : '350px'" />
                <h2 class="my-6 headline">¡Orgullo Colegial!</h2>
              </v-col>
            </client-only>
          </v-row>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Logo from "~/components/Logo.vue";
import LoadingScreen from "../components/general/LoadingScreen";
export default {
  components: {
    Logo
  },
  data() {
    return {
      smAndDown: this.$vuetify.breakpoint.smAndDown,
      mdAndUp: this.$vuetify.breakpoint.mdAndUp,
      image:'image',
      live: false,
     
    };
  },
  methods: {
  ...mapActions({
      getEvents: "home/getEvents",
      getAllSports: "home/getImages",
      getimages: "multimedias/getMultimediasByType",
      gettext: "multimedias/getMultimediasText",
      getlive: "multimedias/getMultimediasLive"
      
    
  }),
  evento(eventid){
    this.$router.push(`/eventos/`+eventid);
  },
  },
  computed: {
    ...mapGetters({
      events: "home/events",
      images: "multimedias/multimedias",
      txt: "multimedias/text",
      livestream: "multimedias/live",
      sports: "home/img"

    })
  },
  
  mounted() {
    this.getAllSports()
    this.getEvents()
    this.getimages(this.image)
    this.gettext('text')
    this.getlive('livestream')

    
  }
  
};

</script>

<style lang="scss" scoped>
.header {
  margin-top: 6rem;
  font-size: 3rem;
  .highlight {
    color: #168f09;
  }
}
</style>