<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card width="800" class="elevation-12 mx-auto">
                <v-toolbar color="green darken-1" dark flat>
                    <v-toolbar-title>Editar Puntuacion Final</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>            
                
                    <v-form v-model="valid">
                        <v-container>  
                            <v-row>
                                <v-col>
                                    <v-row>      
                                        <div>                  
                                        <h2>
                                            Puntuación de UPRM:
                                        </h2>
                                        </div> 
                                    </v-row>
                                    <v-row 
                                    align ="center"
                                    justify = "center"
                                    >
                                        <v-col                   
                                        >
                                                <v-text-field
                                                    v-model="payload_final_score.attributes.uprm_score"                      
                                                    :rules="[numeric('Puntuación de UPRM'),scoreRequired('Puntuación de UPRM')]"
                                                    label="Puntuación de UPRM"
                                                    outlined
                                                    required
                                                ></v-text-field>
                                        </v-col>
                                    </v-row>    
                                </v-col>  
                                <v-col>
                                    <v-row>
                                        <h2>Puntuación del Oponente:</h2>
                                        </v-row>
                                        <v-row 
                                        align ="center"
                                        justify = "center"
                                        >
                                        <v-col>
                                            <v-text-field
                                                v-model="payload_final_score.attributes.opponent_score"                      
                                                :rules="[numeric('Puntuación del Oponente'),scoreRequired('Puntuación del Oponente')]"
                                                label="Puntuación del Oponente"
                                                outlined
                                                required
                                            ></v-text-field>    
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>    
                            <small>*todos los campos son requeridos.</small>  
                            <v-row>
                                <v-spacer/>
                                <v-spacer/>
                                <v-col>
                                    <v-btn color="grey darken-3" text @click="close()" :disabled="loadingQuery">cerrar</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn color="grey darken-3" text @click="clear()" :disabled="loadingQuery">borrar</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn color="primary darken-1" text @click="submit()" :loading="loadingQuery" :disabled="!valid">guardar</v-btn>
                                </v-col>
                            </v-row>    
                        </v-container>
                    </v-form>
          
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import rules from "@/utils/validations"  
    import {mapActions,mapGetters} from "vuex"

  export default {
      name:"UpdateFinalScoreModal",
      props:{
        dialog: Boolean,
        event_id: Number,
        sport_route:String,
        uprm_score:Number,
        opponent_score:Number
      },
    data: () => ({  
        valid: false,


        date: new Date().toISOString().substr(0,10),
        about_team:'',
        team_image_url:'',
        sport_id:'',
        payload_final_score:'',
        // TODO: (Herbert) Verificar como hacer que esto [sport and branch] sea dinamico, pasado por el sport previo
        


        //NEEDED. 
        // event_id:'', //get from route ?
    }),
           
      
      
    created(){
        this.initializeSportData()
        
    }, 

    methods: {
        ...rules,
        ...mapActions({
           setQueryLoading:"results/setQueryLoading",
           editFinalScore:"results/editFinalScore",
           getFinalScore:"results/getFinalScore"
        }),
        initializeSportData(){
        //console.log(this.season)
            this.payload_final_score = {
                "event_id":this.event_id,
                "attributes":{
                    "uprm_score":this.uprm_score,
                    "opponent_score":this.opponent_score
                }
            }
        },
        initializeSportDataEmpty(){
        //console.log(this.season)
            this.payload_final_score = {
                "event_id":this.event_id,
                "attributes":{
                    "uprm_score":'',
                    "opponent_score":''
                }
            }
        },


        async submit() {
            if (this.payload_final_score.event_id != ''){
                console.log(this.payload_final_score)
                const submit_arg = {
                    sport_route:this.sport_route,
                    statistics:this.payload_final_score
                }
                console.log("THE PASSED ARG ON SUBMIT",submit_arg)
                await this.setQueryLoading()
                await this.editFinalScore(submit_arg)
                // this.$router.go()
                const submit_arg_2 = {
                    event_id:this.event_id,
                    sport_route:this.sport_route
                }
                await this.getFinalScore(submit_arg_2)
                if(this.final_score){
                    this.$emit("update:uprm_score", this.final_score.Event_Final_Score.score.uprm_score);
                    this.$emit("update:opponent_score", this.final_score.Event_Final_Score.score.opponent_score);
                }
                this.$emit("update:dialog", false);
                //TODO: ADD ERROR CASE WHERE THE GET FAILS AND DOESN'T REFRESH? shouldnt happen tho...(just added)
                close()
            }
        },
        clear () {
            console.log(this.payload_final_score)
            this.initializeSportDataEmpty()
            // TODO: (Herbert) Check how this works
        },
        close() {
            console.log(this.payload_final_score)
            this.$emit("update:dialog", false);
        },

    },
    computed: {
	    ...mapGetters({
            loadingQuery:"results/loadingQuery",
            final_score:"results/final_score",
        })
    }
  }
 
</script>