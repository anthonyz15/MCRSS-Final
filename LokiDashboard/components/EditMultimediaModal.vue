<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card >
        <v-toolbar color="primary_dark" flat>
          <v-spacer/>
          <v-toolbar-title class="headline white--text">Multimedia</v-toolbar-title>
          <v-progress-linear
            :active="editing"
            indeterminate
            absolute
            bottom
            color = "white"
          ></v-progress-linear>	
          <v-spacer />
        </v-toolbar>

        <v-card-text v-if="this.type == 'text'">          
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row justify="start">
                <v-col md="4">
                  <h2>Publicación:</h2>
                </v-col>
              </v-row>

              <v-row justify="start">
                <v-col md="12">           
                  <v-text-field
                    v-model="title_"          
                    :counter="300"
                    label="Título*"              
                    :rules="[required('título'), maxLength('título', 300)]"
                  ></v-text-field> 
                </v-col>
              </v-row>

              <v-row justify="start">
                <v-col md="12">
                  <v-textarea
                    v-model="content_"                
                    :counter="63206"
                    label="Contenido"                    
                    :rules="[required('Contenido'), maxLength('Contenido', 63206)]"
                    solo
                  ></v-textarea> 
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-checkbox
                    v-model="terms"
                    label="He revisado mis cambios*."
                  ></v-checkbox>
                </v-col>
              </v-row> 
            </v-container>
            <small>*indica un campo requirido</small>
          </v-form>      
        </v-card-text>

        <v-card-text v-if="this.type == 'image'">
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row justify="start">
                <v-col md="4">
                  <h2>Publicación:</h2>
                </v-col>
              </v-row>
                
              <v-row justify="start">
                  <v-col md="12"> 

                  <v-text-field
                    v-model="title_"          
                    :counter="300"
                    label="Título*"              
                    :rules="[required('título'), maxLength('título', 300)]"
                  ></v-text-field> 

                  </v-col>
              </v-row>

              <v-row justify="start">
                <v-col md="12">
                  <v-text-field
                    v-model="content_"                
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
                    label="He revisado mis cambios*."
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <small>*indica un campo requirido.</small>
          </v-form>      
        </v-card-text>

        <v-card-text v-if="this.type == 'video'">
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row justify="start">
                <v-col md="4">
                  <h2>Publicación:</h2>
                </v-col>
              </v-row>
              
              <v-row justify="start">
                <v-col md="12"> 
                  <v-text-field
                    v-model="title_"          
                    :counter="300"
                    label="Título*"              
                    :rules="[required('título'), maxLength('título', 300)]"
                  ></v-text-field> 
                </v-col>
              </v-row>

              <v-row justify="start">
                <v-col md="12">
                  <v-text-field
                    v-model="content_"                
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
                    label="He revisado mis cambios*."
                  ></v-checkbox>
                </v-col>
              </v-row>

            </v-container>
            <small>*indica un campo requirido.</small>
          </v-form>      
        </v-card-text>

        <v-card-text v-if="this.type == 'livestream'">
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row justify="start">
                <v-col md="4">
                  <h2>Publicación:</h2>
                </v-col>
              </v-row>
                
              <v-row justify="start">
                <v-col md="12">  
                  <v-text-field
                    v-model="title_"          
                    :counter="300"
                    label="Título*"              
                    :rules="[required('título'), maxLength('título', 300)]"
                  ></v-text-field>  
                </v-col>
              </v-row>

              <v-row justify="start">
                <v-col md="12">
                  <v-text-field
                    v-model="content_"                
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
                    label="He revisado mis cambios*."
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <small>*indica un campo requirido.</small>
          </v-form>      
        </v-card-text>

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
              :loading="editing"
            >
              Guardar
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
    name:"EditMultimediaModal",
    props:{
      dialog:Boolean,
      mid:Number,
      title:String,
      content:String,
      type:String
    },

    data: () => ({
      terms: false,
      valid: false,
      editing: false,
      title_: '',
      content_: '',  
      type_: ''  
    }),
           
    methods: {
      ...rules,

      ...mapActions({
        editMultimedia:"multimedias/editMultimedia"
      }),

      /**
       * Function to be called after the user 
       * has entered valid information in the required
       * fields and has agreed to terms.
       */
      async submit () {
        this.editing = true
        const multimedia_attributes = {}
      
        multimedia_attributes['title'] = this.title_
        multimedia_attributes['content']  = this.content_
        
        const multimediaJSON ={'multimedia_id': this.mid, 'attributes': multimedia_attributes}
        
        const response =  await this.editMultimedia(multimediaJSON)
        
        this.editing = false        
       
        if(response !== 'error'){
          this.close()          
        }    
      },

      /**
       * Closes the EditMultimediaModal dialog.
       */
      close() {
        this.clear()
        this.$emit("update:dialog", false)
      },

      /**
       * Clears and resets all fields in the form.
       */
      clear() {
        this.$refs.form.resetValidation()
        this.terms = false
        this.title_ = ''
        this.content_ = ''
        this.type_ = ''
      }
    }
  }
</script>
