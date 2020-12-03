<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600">
            <v-card>
                <v-toolbar color="primary_dark" flat>
                    <v-spacer/>
                    <v-toolbar-title class="headline white--text">Sobre Nosotros</v-toolbar-title>
                    <v-progress-linear
                        :active="editing"
                        indeterminate
                        absolute
                        bottom
                        color = "white"
                    ></v-progress-linear>	
                    <v-spacer />
                </v-toolbar>

                <v-card-text>       
                    <v-form v-model="valid" ref="form">
                        <v-container>

                            <v-row justify="start">
                                <v-col md="3">

                                    <h2>Miembro:</h2>
                        
                                </v-col>
                            </v-row>

                            <v-row justify="start">
                                <v-col md="12">           
                                    <v-text-field
                                        v-model="member_"          
                                        label="Nombre*"              
                                        :rules="[required('nombre'), maxLength('nombre', 30)]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="start">
                                <v-col md="12">           
                                    <v-text-field
                                        v-model="title_"          
                                        label="Título*"              
                                        :rules="[required('título'), maxLength('título', 20000)]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="start">
                                <v-col md="12">           
                                    <v-text-field
                                        v-model="major_"          
                                        label="Programa de Estudio*"              
                                        :rules="[required('programa de estudio'), maxLength('programa de estudio', 50)]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="start">
                                <v-col md="12">           
                                    <v-text-field
                                        v-model="picture_"          
                                        label="Imagen de Perfil*"              
                                        :rules="[required('imagen'), maxLength('imagen', 1000)]"
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
                        <small>*indica un campo requirido</small>
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
                            @click="submit()"
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
import { mapActions } from "vuex"

export default {
    name: "EditMemberModal",
    props:{
        dialog:Boolean,
        hdid:Number,
        member:String,
        title:String,
        major:String,
        picture:String
    },

    data: () => ({
        terms: false,
        valid: false,
        editing: false,
        member_: '',
        title_: '',
        major_: '',
        picture_: ''

    }),

    methods: {
        ...rules,

        ...mapActions({
            editMember:"aboutus/editAboutUs"
        }),

        /**
         * Function to be called after the user 
         * has entered valid information in the required
         * field.
         */
        async submit () {
            this.editing = true
            const aboutus_attributes = {}
        
            aboutus_attributes['hdmember'] = this.member_
            aboutus_attributes['title'] = this.title_
            aboutus_attributes['major']  = this.major_
            aboutus_attributes['picture'] = this.picture_
            
            const aboutusJSON ={'aboutus_id': this.hdid, 'attributes': aboutus_attributes}
            
            const response =  await this.editMember(aboutusJSON)
            
            this.editing = false        
        
            if(response !== 'error'){
                this.close()          
            }    
        },

        /**
         * Closes the EditMultimediaModal
         */
        close() {
            this.clear()
            this.$emit("update:dialog", false)
        },

        clear() {
            this.$refs.form.resetValidation()
            this.terms = false
            this.member_ = ''
            this.title_ = ''
            this.major_ = ''
            this.picture_ = ''
        }
    }
}
</script>