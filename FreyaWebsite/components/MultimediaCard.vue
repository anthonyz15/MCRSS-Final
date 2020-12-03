<template>
    <v-card class="mx-auto" max-width="600" >
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
                <v-col
                class="ml-1">
                    <strong>Huella Deportiva</br></strong>
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
                    <p align="center"><iframe v-if="type == 'video'" width="560" height="315" :src="content" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
                    <p align="center"><iframe v-if="type == 'livestream'" :src="content" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe></p>               
                </v-col>
            </v-row>
        <v-card-actions>
            <v-spacer />
            <ShareNetwork 
                class="ml-5 mr-5 mb-5"
                network="twitter"
                :url="this.url+this.mid"
                :title="this.title" 
            >
            <i></i>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                         <v-btn color="#00acee" fab small dark target="_blank" v-on="on">
                            <v-icon>mdi-twitter</v-icon>
                        </v-btn>
                    </template>
                    <span>Compártelo en Twitter</span>
                </v-tooltip>
            </ShareNetwork>
            <ShareNetwork
                class="ml-5 mr-5 mb-5"
                network="facebook"
                :url="this.url+this.mid"
                :title="this.title" 
            >
            <i></i>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn color="#3b5998" fab small dark  target="_blank" v-on="on">
                            <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                    </template>
                    <span>Compártelo en Facebook</span>
                </v-tooltip>
            </ShareNetwork>
        </v-card-actions >
    </v-card>   
</template>

<script>
  export default {
    name:"MultimediaCard",
    props:{
      mid: Number,
      title:String,
      content:String,
      type:String,
      date_published:String
    },

    data: () => ({
        truncated: true,
        url: "https://huella-deportiva-web.ue.r.appspot.com/multimedios/"
    }),

    methods: {
        formatDate() {
            let mDate = new Date(Date.parse(this.date_published));
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let date = mDate.toLocaleDateString('es', options);
            return date
        },

        truncate(value) {
            return value.substring(0, 477) + '...';
        }
    }
  }
</script>