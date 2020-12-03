<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="400">
            <v-card class="ma-auto">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                        <v-row>
                            <v-avatar size="200" class="mx-auto my-4" justify="center">
                                <img :src="picture" alt="Developer" height="200px" />
                            </v-avatar>
                        </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-card-text>
                        <h1 class="text-center ma-8" style="word-break: normal;">{{member}}</h1>
                        <div class="ma-4" style="word-break: normal;">Cargo: {{ title }}</div>
                        <div class="ma-4" style="word-break: normal;">Programa de Estudio: {{ major }}</div>
                        </v-card-text>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        text
                        color="grey darken-3"
                        @click="close()"
                    >Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>  
</template>

<script>
export default {
    name: "ViewMemberModal.vue",
    props: {
        dialog:Boolean,
        name: String,
        member:String,
        title:String,
        major: String,
        picture: String
    },

    methods: {
        close() {
            this.$emit("update:dialog", false)
        }
    }
};
</script>

<style>
</style>