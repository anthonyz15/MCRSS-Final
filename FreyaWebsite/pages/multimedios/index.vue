<template>
    <v-container>
        <v-row>
            <h1>Multimedios</h1>
        </v-row>

        <div v-if="multimedias.length>0">
            <v-row class="text-right">
                <v-col align="end">
                    <v-menu
                        v-model="menu"
                        bottom
                        origin="center center"
                        transition="slide-x-transition"
                        :close-on-content-click="false"
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn color="green darken-1" dark v-on="on">
                                <v-icon left>mdi-filter-variant</v-icon>Filtros
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item>
                                <v-autocomplete v-model="type" :items="types" label="Categoría"></v-autocomplete>
                            </v-list-item>
                     
                            <v-list-item>
                                <v-spacer />
                                    <v-btn text color="accent" @click="clearFilters">Borrar</v-btn>
                                    <v-btn text color="primary" @click="createFilteredList">Filtrar</v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>

            <v-row v-if="filteredMultimedias">
                <v-col v-for="(value, key) in filteredMultimedias" :key="key" cols="12">
                    <MultimediaCard
                        :mid="value.mid"
                        :title="value.title"
                        :content="value.content"
                        :type="value.type"
                        :date_published="value.date_published"
                    />
                </v-col>
            </v-row>

            <v-row v-else>
                <v-col v-for="(value, key) in multimedias" :key="key" cols="12">
                    <MultimediaCard
                        :mid="value.mid"
                        :title="value.title"
                        :content="value.content"
                        :type="value.type"
                        :date_published="value.date_published"
                    />
                </v-col>
            </v-row>
        </div>
        <LoadingScreen v-else name-of-data="Multimedios" />
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MultimediaCard from "../../components/MultimediaCard";
import LoadingScreen from "../../components/general/LoadingScreen";

export default {
    components: {
        MultimediaCard,
        LoadingScreen
    },

    data: () => ({
        menu: false,
        type: "",
        types: [
            "text",
            "image",
            "video",
            "livestream"
        ],
        filteredMultimedias: ""
    }),

    methods: {
        ...mapActions({
            getMultimedias: "multimedias/getMultimedias"
        }),

        /**
        * Clears the filter fields
        * and resets the filtered list
        * if filters have been applied.
        */
        clearFilters() {
            this.type = "";
            this.menu = false;

            if (this.filteredMultimedias.length != this.multimedias.length) {
                this.filteredMultimedias = [];
                for (let i = 0; i < this.multimedias.length; i++) {
                    this.filteredMultimedias.push(this.multimedias[i]);
                    continue;
                }
            }
        },

        /**
         * Creates a the filtered list, after
         * the user has clicked to filte button,
         * using the the filters selected.
         */
        createFilteredList() {
            this.filteredMultimedias = [];

            for (let i = 0; i < this.multimedias.length; i++) {
                if (this.type != "") {
                    if (this.type.localeCompare(this.multimedias[i]["type"]) == 0) {
                        this.filteredMultimedias.push(this.multimedias[i]);
                   }
                }
            }
            this.menu = false;
        }
    },

    computed: {
        ...mapGetters({
            multimedias: "multimedias/multimedias"
        })
    },

    mounted() {
        this.getMultimedias();
    }
}
</script>