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
                                <v-col md="4">
                                    <h2>Descripción:</h2>
                                </v-col>
                            </v-row>

                            <v-row justify="start">
                                <v-col md="12">           
                                    <v-textarea
                                        v-model="title_"          
                                        label="Descripción*"              
                                        :rules="[required('descripción'), maxLength('descripción', 20000)]"
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
        name: "EditAboutUsDescriptionModal",
        props:{
            dialog:Boolean,
            title:String,
        },

        data: () => ({
            terms: false,
            valid: false,
            editing: false,
            title_: ''
        }),

        methods: {
            ...rules,

            ...mapActions({
                editAboutUsDescription:"aboutus/editAboutUs"
            }),

            /**
             * Function to be called after the user 
             * has entered valid information in the required
             * field and has agreed to terms.
             */
            async submit () {
                this.editing = true
                const aboutus_attributes = {}
            
                aboutus_attributes['hdmember'] = 'description'
                aboutus_attributes['title'] = this.title_
                aboutus_attributes['major']  = 'description'
                aboutus_attributes['picture'] = 'decription'
                
                const aboutusJSON ={'aboutus_id': 9, 'attributes': aboutus_attributes}
                
                const response =  await this.editAboutUsDescription(aboutusJSON)
                
                this.editing = false        
            
                if(response !== 'error'){
                    this.close()          
                }    
            },

            /**
             * Closes the EditAboutUsDescriptionModal dialog.
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
            }
        }
    }
</script>
