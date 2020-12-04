<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">            
      <v-card>
        <v-toolbar flat color="primary_dark">
          <v-toolbar-title class="headline white--text">
            Borrar Publicación
          </v-toolbar-title>
        </v-toolbar>
        <v-card-title>
          <p style="word-break: normal;">¿Seguro/a que quieres borrar la publicación con id: {{id}}?</p>
        </v-card-title>
        <v-card-text>
          Esta acción es <strong> irreversible.</strong>
          <v-checkbox
            v-model="terms"
            label="Acepto las consecuencias."
          >
          </v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey darken-3" @click="close()">Cancelar</v-btn>
          <v-btn 
            color="primary darken-1" 
            :disabled="!terms" 
            text
            :loading="deleting" 
            @click="deleteMultimedia()">Borrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>   
  </v-row>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name:"DeleteMultimediaModal",
  props:{
    dialog:Boolean,
    id:Number,   
  },

  data:() =>({
    terms: false,
    deleting: false,
  }),

  methods:{
    ...mapActions({
      removeMultimedia: "multimedias/removeMultimedia"
    }),

    /**
     * Function to be called  after 
     * the user has agreed to the terms and has 
     * pressed the remove button.
     */
    async deleteMultimedia(){
      if(this.id > 0 && this.terms) { 
        this.deleting = true 
        const response = await this.removeMultimedia(this.id)
        this.deleting = false
        if(response !== 'error'){
          this.close()
        }
      } 
    },

    /**
     * Closes the DeleteMultimediaModal dialog.
     */
    close() {      
      this.terms = false
      this.$emit("update:dialog",false);
    }
  }
}
</script>
