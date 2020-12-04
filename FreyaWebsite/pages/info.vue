<template>
  <v-container>
   <!-- get the description -->
    <v-row >
      <v-col v-for="(des, idx) in description" :key="idx">
        <h1 class="display-1">Sobre Nosotros</h1>
        <p style="word-break: normal;">{{des.title}}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(cap, idx) in captain" :key="idx">
        <!-- Card of the captain -->
        <ProfileCard
          :name="cap.hdmember"
          :img="cap.picture"
          :major="cap.major"
          :position="cap.title"
        />
      </v-col>
      <v-col v-for="(member, idx) in members" :key="idx">
        <!-- Card of the members -->
        <ProfileCard
          :name="member.hdmember"
          :img="member.picture"
          :major="member.major"
          :position="member.title"
        />
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-col align="center">
        <h1 class="my-4 display-1">Síguenos en nuestras redes sociales</h1>
      </v-col>
    </v-row>
    <v-row class="my-4">
      <v-col align="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#3b5998" fab x-large dark href="https://www.facebook.com/DeportivaHuella/" target="_blank" v-on="on">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </template>
          <span>Síguenos en Facebook</span>
        </v-tooltip>
      </v-col>
      <v-col align="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#00acee" fab x-large dark href="https://twitter.com/deportivahuella" target="_blank" v-on="on">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </template>
          <span>Síguenos en Twitter</span>
        </v-tooltip>
      </v-col>
      <v-col align="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#C13584" fab x-large dark href="https://www.instagram.com/deportivahuella/" target="_blank" v-on="on">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </template>
          <span>Síguenos en Instagram</span>
        </v-tooltip>
      </v-col>
      <v-col align="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#C4302B " fab x-large dark href="https://www.youtube.com/c/HuellaDeportiva" target="_blank" v-on="on">
              <v-icon>mdi-youtube</v-icon>
            </v-btn>
          </template>
          <span>Síguenos en YouTube</span>
        </v-tooltip>
      </v-col>
      <v-col align="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#2867B2" fab x-large dark href="https://www.linkedin.com/company/deportivahuella/" target="_blank" v-on="on">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </template>
          <span>Síguenos en LinkedIn</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileCard from "../components/ProfileCard";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ProfileCard
  },
  data() {
    return {
      
    };
  },
  // actions
  methods: {
  ...mapActions({
      getdescription: "aboutus/getAboutUsByTypeDescription",
      getcaptain: "aboutus/getAboutUsByTypeCaptain",
      getmembers: "aboutus/getAboutUsByTypeMembers"
      
    
  }),
  },
  // getters
  computed: {
    ...mapGetters({
      captain: "aboutus/captain",
      description:"aboutus/description",
      members: "aboutus/members"
    })
  },
  // init funtions
  mounted() {
    this.getdescription()
    this.getcaptain()
    this.getmembers()
  }
  

};
</script>