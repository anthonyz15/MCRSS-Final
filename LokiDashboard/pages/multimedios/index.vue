<template>
  <v-container class="wrapper">
    <h1 class="primary_dark--text pl-3">Multimedia</h1>
    <div class="content-area pa-4 pt-12">
      <v-card>
        <v-card-title>
          
          <v-row>
            <v-col>

              <v-btn
                color="primary_light"
                class="white--text"
                @click="addMultimedia" 
                :disabled="!$store.state.userAuth.userPermissions[15]['28']"
              >
                <v-icon left>mdi-plus</v-icon>Añadir Publicación
              </v-btn>
              <v-spacer />

            </v-col>
            <v-col cols="4">

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                rounded
                dense
                outlined
                single-line
                hide-details
              />

            </v-col>
          </v-row>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="multimedias"
          :search="search"
          :loading="loadingMultimedias()"
          class="elevation-1"
          no-data-text="No hay publicaciones multimedia."
          loading-text="Buscando publicaciones multimedia."
          no-results-text="No se encontró ninguna publicación multimedia."
        >
          <template v-slot:item="{ item }">
            <tr>
              <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.mid}}</td>
              <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.title}}</td>
              <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.content}}</td>
              <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.type}}</td>
              <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{formatDate(item.date_published)}}</td>
              <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      class="mr-2 table-actions"
                      v-on="on"
                      @click="viewMultimedia(item)"
                      >mdi-eye-plus</v-icon>
                  </template>
                  <span>Ver Publicación</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      class="mr-2 table-actions"
                      v-on="on"
                      @click="editMultimedia(item)"
                      :disabled="!$store.state.userAuth.userPermissions[17]['30']"
                      >mdi-pencil</v-icon>
                  </template>
                  <span>Editar Publicación</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      class="mr-2 table-actions"
                      v-on="on"
                      @click="deleteMultimedia(item.mid)"
                      :disabled="!$store.state.userAuth.userPermissions[16]['29']"
                      >mdi-delete</v-icon>
                  </template>
                  <span>Borrar Publicación</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>

        <AddMultimediaModal 
          :dialog.sync="dialogAdd" 
          :duid="duid"
        />

        <ViewMultimediaModal
          :dialog.sync="dialogView"
          :mid="selectedItem.mid"
          :title="selectedItem.title"
          :content="selectedItem.content"
          :type="selectedItem.type" 
          :date_published="selectedItem.date_published" 
        />
        
        <EditMultimediaModal
          :dialog.sync="dialogEdit"
          :mid="editedItem.mid"
          :title="editedItem.title"
          :content="editedItem.content"
          :type="editedItem.type"  
        />

        <DeleteMultimediaModal :dialog.sync="dialogDelete" :id="mid" />

      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddMultimediaModal from "@/components/AddMultimediaModal";
import ViewMultimediaModal from "@/components/ViewMultimediaModal";
import EditMultimediaModal from "@/components/EditMultimediaModal";
import DeleteMultimediaModal from "@/components/DeleteMultimediaModal";

export default {
  components: {
    AddMultimediaModal,
    ViewMultimediaModal,
    EditMultimediaModal,
    DeleteMultimediaModal
  },

  data() {
    return {
      search: "",
      mid: 0,
      dialogDelete: false,
      dialogAdd: false,
      dialogEdit: false,
      dialogView: false,
      terms: false,
      ready: false,
      duid: 0,

      headers: [
        {
          text: "ID",
          align: "start",
          value: "mid"
        },
        { text: "Título", value: "title" },
        { text: "Contenido", value: "content" },
        { text: "Categoría", value: "type" },
        { text: "Fecha de la Publicación", value: "date_published" },
        { text: "Acciones", value: "actions", sortable: false }
      ],

      selectedItem: {
        mid: 0,
        title: "",
        content: "",
        type: "",
        date_published: ""
      },

      editedItem: {
        mid: 0,
        title: "",
        content: "",
        type: ""
      }
    };
  },

  methods: {
    ...mapActions({
      getMultimedias: "multimedias/getMultimedias",
      setUser: "userAuth/setUser"
    }),

    formatDate(date) {
      let mDate = new Date(Date.parse(date));
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return mDate.toLocaleDateString('es', options);
    },

    /**
     * Activates the AddMultimediaModal dialog.
     */
    addMultimedia(){
      this.duid = this.user.id 
      this.dialogAdd = true
    },

    /**
     * Return false if multimedia posts have been loaded,
     * false otherwise.
     */
    loadingMultimedias(){
      if(this.multimedias.length > 0){
        return false
      }else{
        return true
      }
    },

    /**
     * Routes user to the multimedia view page
     * using the id given as parameter
     * @param multimedia id of the multimedia post to view
     */
    viewMultimedia(multimedia){
      this.selectedItem = Object.assign({}, multimedia)
      this.dialogView = true
    },

    /**
     * Activates the EditMultimediaModal and prepares
     * the multimedia post to edit using the multimedia object given 
     * as parameter
     * @param multimedia Object containing the information of the multimedia post to edit.
     */
    editMultimedia(multimedia){
      this.editedItem = Object.assign({}, multimedia)
      this.dialogEdit = true
    },    
    /**
     * Activates the DeleteMultimediaModal using 
     * the id of the multimedia given as parameter.
     * @param multimediaID id of the multimedia to remove.
     */
    deleteMultimedia(multimediaID){
      this.mid = multimediaID
      this.dialogDelete = true
    },
  
  },

  computed: {
    ...mapGetters({
      multimedias: "multimedias/multimedias",
      user: "userAuth/user"
    })
  },

  mounted() {
    this.getMultimedias();
    this.setUser();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/tableStyle.scss";
</style>