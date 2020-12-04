<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
            <v-toolbar color="primary_dark" flat>
                <v-spacer/>
                <v-toolbar-title class="headline white--text">Multimedia</v-toolbar-title>
                <v-spacer/>
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col
                        cols="1"
                        class="ml-5"
                    >
                        <v-avatar
                            size="36px"
                        >
                            <img
                                src="https://scontent.fsig3-1.fna.fbcdn.net/v/t1.0-9/15032148_1168852516536914_8884572002414323563_n.jpg?_nc_cat=108&ccb=2&_nc_sid=85a577&_nc_ohc=vIb421K_uFAAX_FTP3v&_nc_ht=scontent.fsig3-1.fna&oh=34f0a31329c46d5fa1e98055a0d32d62&oe=5FE71829"
        
                            />
                        </v-avatar>
                    </v-col>
                    <v-col>
                        <strong> Huella Deportiva </br></strong>
                        <small style="color:gray">{{formatDate()}}</small>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col align-self="center">
                        <v-card-title class="pa-4">{{title}}</v-card-title>
                        
                        <div v-if="type == 'text'">
                            <div v-if="truncated & content.length > 477">
                                <v-card-text style="white-space: pre-line;">{{truncate(content)}} <a @click="truncated = false">Leer más</a></v-card-text>
                            </div>
                            <div v-else>
                                <v-card-text style="white-space: pre-line;" v-if="type == 'text'">{{content}}</v-card-text>
                            </div>
                        </div>
                        <v-img v-if="type == 'image'" :src="content" contain :aspect-ratio="16/9"></v-img>
                        <p align="center"><iframe v-if="type == 'video' & dialog" width="560" height="315" :src="content" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
                        <p align="center"><iframe v-if="type == 'livestream' & dialog" :src="content" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe></p>               
                    </v-col>
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
    name:"ViewMultimediaModal",
    props:{
      dialog:Boolean,
      mid:Number,
      title:String,
      content:String,
      type:String,
      date_published:String
    },

    data: () => ({
        truncated: true
    }),

    methods: {

        /**
        *Formats the date and time for the card.
        */
        formatDate() {
            let mDate = new Date(Date.parse(this.date_published));
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let date = mDate.toLocaleDateString('es', options);
            return date
        },

        /**
        *Truncates the content text when larger than 477 characters.
        */
        truncate(value) {
            return value.substring(0, 477) + '...';
        },
        
        /**
        * Closes the ViewMultimediaModal dialog.
        */
        close() {
            this.truncated = true
            this.$emit("update:dialog", false)
      },
    }
  }
</script>
