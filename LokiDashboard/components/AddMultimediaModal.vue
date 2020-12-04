<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card >
        <v-toolbar color="primary_dark" flat>
          <v-spacer/>
          <v-toolbar-title class="headline white--text">Multimedia</v-toolbar-title>
          <v-progress-linear
            :active="adding"
            indeterminate
            absolute
            bottom
            color = "white"
          ></v-progress-linear>	
          <v-spacer />
        </v-toolbar>

        <v-tabs fixed-tabs>         
          <v-tab v-model="type" v-on:change="clear(); type = 'text'">Texto</v-tab>
            <v-tab-item>
              <v-card-text>          
                <v-form v-model="valid" ref="form">
                  <v-container>
                    <v-row justify="start">
                      <v-col md="3">
                        <h2>Publicación:</h2>
                      </v-col>
                    </v-row>

                    <v-row justify="start">
                      <v-col md="12">        
                        <v-text-field
                          v-model="title"          
                          :counter="300"
                          label="Título*"              
                          :rules="[required('título'), maxLength('título', 300)]"
                        ></v-text-field> 
                      </v-col>
                    </v-row>

                    <v-row justify="start">
                      <v-col md="12">
                        <v-textarea
                          v-model="content"                
                          :counter="63206"
                          label="Contenido*"                    
                          :rules="[required('Contenido'), maxLength('Contenido', 63206)]"
                          solo
                        ></v-textarea> 
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-checkbox
                          v-model="terms"
                          label="Estoy de acuerdo con la información provista*."
                        ></v-checkbox>
                      </v-col>
                    </v-row> 
                  </v-container>
                  <small>*indica un campo requirido</small>
                </v-form>      
              </v-card-text>
            </v-tab-item>

          <v-tab v-model="type" v-on:change="clear(); type = 'image'">Imagen</v-tab>
            <v-tab-item> 
                <v-card-text>
                  <v-form v-model="valid" ref="form">
                    <v-container>
                      <v-row justify="start">
                        <v-col md="3">
                          <h2>Publicación:</h2>
                        </v-col>
                      </v-row>
                    
                      <v-row justify="start">
                        <v-col md="12"> 
                          <v-text-field
                            v-model="title"          
                            :counter="300"
                            label="Título*"              
                            :rules="[required('título'), maxLength('título', 300)]"
                          ></v-text-field> 
                        </v-col>
                      </v-row>

                      <v-row justify="start">
                        <v-col md="12">
                          <v-text-field
                            v-model="content"                
                            label="URL"                    
                            :rules="[required('URL'), maxLength('URL', 63206)]"
                            solo
                          ></v-text-field>  
                        </v-col>
                      </v-row>   

                      <v-row>
                        <v-col>
                          <v-checkbox
                            v-model="terms"
                            label="Estoy de acuerdo con la información provista*."
                          ></v-checkbox>
                        </v-col>
                      </v-row>

                    </v-container>
                    <small>*indica un campo requirido.</small>
                  </v-form>      
                </v-card-text>
            </v-tab-item> 

          <v-tab v-model="type" v-on:change="clear(); type = 'video'">Video</v-tab>
            <v-tab-item>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-container>
                    <v-row justify="start">
                      <v-col md="3">
                        <h2>Publicación:</h2>
                      </v-col>
                    </v-row>
                  
                    <v-row justify="start">
                      <v-col md="12"> 
                        <v-text-field
                          v-model="title"          
                          :counter="300"
                          label="Título*"              
                          :rules="[required('título'), maxLength('título', 300)]"
                        ></v-text-field> 
                      </v-col>
                    </v-row>

                    <v-row justify="start">
                      <v-col md="12">
                        <v-text-field
                          v-model="content"                
                          label="URL"                    
                          :rules="[required('URL'), maxLength('URL', 63206)]"
                          solo
                        ></v-text-field>  
                      </v-col>
                    </v-row>   

                    <v-row>
                      <v-col>
                        <v-checkbox
                          v-model="terms"
                          label="Estoy de acuerdo con la información provista*."
                        ></v-checkbox>
                      </v-col>
                    </v-row>

                  </v-container>
                  <small>*indica un campo requirido.</small>
                </v-form>      
              </v-card-text>
            </v-tab-item> 

          <v-tab v-model="type" v-on:change="clear(); type = 'livestream'">Livestream</v-tab>
            <v-tab-item>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-container>
                    <v-row justify="start">
                      <v-col md="3">
                        <h2>Publicación:</h2>
                      </v-col>
                    </v-row>
                  
                    <v-row justify="start">
                      <v-col md="12">  
                        <v-text-field
                          v-model="title"          
                          :counter="300"
                          label="Título*"              
                          :rules="[required('título'), maxLength('título', 300)]"
                        ></v-text-field>  
                      </v-col>
                    </v-row>

                    <v-row justify="start">
                      <v-col md="12">
                        <v-text-field
                          v-model="content"                
                          label="URL"                    
                          :rules="[required('URL'), maxLength('URL', 63206)]"
                          solo
                        ></v-text-field> 
                      </v-col>
                    </v-row>   

                    <v-row>
                      <v-col>
                        <v-checkbox
                          v-model="terms"
                          label="Estoy de acuerdo con la información provista*."
                        ></v-checkbox>
                      </v-col>
                    </v-row>

                  </v-container>
                  <small>*indica un campo requirido.</small>
                </v-form>      
              </v-card-text>
            </v-tab-item> 
        </v-tabs>

        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn 
              text 
              color="grey darken-3" 
              @click="close()"
            >
              Cancelar
            </v-btn>
            <v-btn 
              color="primary darken-1" 
              text      
              :disabled="!(valid & terms)"
              @click="submit"
              :loading="adding"
            >
              Publicar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>    
</template>

<script>
  import rules from "@/utils/validations"  
  import {mapActions} from "vuex"

  export default {
    name:"AddMultimediaModal",
    props:{
      dialog:Boolean,
      duid:Number
    },
    data: () => ({
      terms: false,
      valid: false,
      adding: false,
      title: '',
      content: '',  
      type: 'text'  
    }),
           
    methods: {
      ...rules,

      ...mapActions({
        addMultimedia:"multimedias/addMultimedia"
      }),

      /**
       * Function to be called after the user has
       * entered valid information in the required
       * fields and has agreed to terms.
       */
      async submit () {
        this.adding = true
        const multimedia_attributes = {}
        multimedia_attributes['title'] = this.title
        multimedia_attributes['content']  = this.content
        multimedia_attributes['type'] = this.type
        multimedia_attributes['duid'] = this.duid
        
        const multimediaJSON ={'attributes':multimedia_attributes}
        
        const response =  await this.addMultimedia(multimediaJSON)
        
        this.adding = false        
       
        if(response !== 'error'){
          this.close()          
        }    
      },

      /** 
       * Closes the AddMultimediaModal dialog.
       */
      close() {
        this.clear()
        this.$emit("update:dialog", false)
      },

      /**
       * Clears and resets all fields in the form.
       */
      clear() {
        this.terms = false
        this.title = ''
        this.content = ''
        this.$refs.form.resetValidation()
      }
    }
  }
</script>
