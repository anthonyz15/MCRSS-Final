<template>
    <v-container>
        <v-row>
            <h1>Multimedios</h1>
        </v-row>

        <div v-if="formated() && ready && multimediaExists">
            <v-row>
                <v-col cols="12">
                    <MultimediaCard
                        :title="this.title"
                        :content="this.content"
                        :type="this.type"
                        :date_published="this.date_published"
                    />
                </v-col>
            </v-row>
        </div>
        <div v-if="!multimediaExists">
				<v-row justify="center">
					<v-col>
						<h1> No existe esta publicación. </h1>
					</v-col>
				</v-row>
		</div> 
    </v-container>
</template>

<script>
import { mapActions, mapGetters} from "vuex"
import MultimediaCard from "../../../components/MultimediaCard";

export default {
    components: {
        MultimediaCard
    },
    
    data: () => ({
        ready: false,
        multimediaExists: true,
        title: "",
        content: "",
        type: "",
        date_published: ""
    }),

    methods: {
        ...mapActions({
            getMultimediaByID: "multimedias/getMultimediaByID"
        }),

        /**
         * Returns true if the contents of
         * the multimedia view page have been formatted
         * false otherwise. If the contents are not
         * formatted it then proceeds to format the
         * contents. 
         */
        async formated() {
            if(this.ready) {
                return true
            } else {
                const response = await this.getMultimediaByID(this.$route.params.id)
                if(response == 'error'){
					this.multimediaExists = false
					this.ready = true
					return true
                }
                
                this.title = this.multimedia.title
                this.content = this.multimedia.content
                this.type = this.multimedia.type
                this.date_published = this.multimedia.date_published
                
                this.ready = true

                return true
            }
        }
    },

    computed: {
        ...mapGetters({
            multimedia: "multimedias/multimedia"
        })
    }
}
</script>
