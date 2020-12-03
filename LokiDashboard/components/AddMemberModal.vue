<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600">
            <v-card>
                <v-toolbar color="primary_dark" flat>
                    <v-spacer/>
                    <v-toolbar-title class="headline white--text">Sobre Nosotros</v-toolbar-title>
                    <v-progress-linear
                        :active="adding"
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
                                        v-model="member"          
                                        label="Nombre*"              
                                        :rules="[required('nombre'), maxLength('nombre', 30)]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="start">
                                <v-col md="12">           
                                    <v-text-field
                                        v-model="title"          
                                        label="Título*"              
                                        :rules="[required('título'), maxLength('título', 20000)]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="start">
                                <v-col md="12">           
                                    <v-text-field
                                        v-model="major"          
                                        label="Programa de Estudio*"              
                                        :rules="[required('programa de estudio'), maxLength('programa de estudio', 50)]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="start">
                                <v-col md="12">           
                                    <v-text-field
                                        v-model="picture"          
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
    name: "AddMemberModal",
    props: {
        dialog:Boolean
    },

    data: () => ({
        terms: false,
        valid: false,
        adding: false,
        member: '',
        title: '',
        major: '',
        picture:'',
        type:''
    }),

    methods: {
        ...rules,

        ...mapActions({
            addMember: "aboutus/addAboutUs"
        }),

        async submit () {
            this.adding = true
            const aboutus_attributes = {}
            aboutus_attributes['hdmember'] = this.member
            aboutus_attributes['title']  = this.title
            aboutus_attributes['major'] = this.major
            aboutus_attributes['picture'] = this.picture
            aboutus_attributes['type'] = 'member'
            
            const aboutusJSON ={'attributes':aboutus_attributes}
            
            const response =  await this.addMember(aboutusJSON)
            
            this.adding = false        
        
            if(response !== 'error'){
                this.close()          
            }    
        },

        /** 
         * Closes the AddMultimediaModal
         */
        close() {
            this.clear()
            this.$emit("update:dialog", false)
        },

        clear() {
            this.terms = false
            this.member = ''
            this.title = ''
            this.major = ''
            this.picture = ''
            this.type = ''
            this.$refs.form.resetValidation()
        }
    }
}
</script>