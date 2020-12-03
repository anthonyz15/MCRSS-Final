<template>
  <v-container class="wrapper">
    <h1 class="primary_dark--text pl-3">Sobre Nosotros</h1>
    
    <div class="content-area pa-4 pt-12">
        <v-card>
            <v-card-title>Descripción
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon
                        medium
                        class="mr-2 table-actions"
                        v-on="on"
                        @click="editDescription()"
                        :disabled="!$store.state.userAuth.userPermissions[20]['33']"
                    >mdi-pencil</v-icon>
                </template>
                <span>Editar Descripción</span>
            </v-tooltip>
            </v-card-title>
            <v-card-text>{{getDescription()}}</v-card-text>
        </v-card>
    </div>

    <div class="content-area pa-4 pt-12">
    <v-card>

        <v-card-title>Capitán</v-card-title>
            <v-data-table
            :headers="headers"
            :items="getCaptain()"
            :search="search"
            :loading="loadingAboutUs()"
            class="elevation-1" 
            no-data-text="No hay información Sobre Nosotros."
            loading-text="Buscando información Sobre Nosotros."
            no-results-text="No se encontró ninguna información Sobre Nosotros."
            >
                <template v-slot:item="{ item }">
                    <tr>
                        <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.hdid}}</td>
                        <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.hdmember}}</td>
                        <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.title}}</td>
                        <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.major}}</td>
                        <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.picture}}</td>
                        <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                medium
                                class="mr-2 table-actions"
                                v-on="on"
                                @click="viewMember(item)"
                                >mdi-eye-plus</v-icon>
                            </template>
                            <span>Ver Capitán</span>
                            </v-tooltip>

                            <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                medium
                                class="mr-2 table-actions"
                                v-on="on"
                                @click="editMember(item)"
                                :disabled="!$store.state.userAuth.userPermissions[20]['33']"
                                >mdi-pencil</v-icon>
                            </template>
                            <span>Editar Capitán</span>
                            </v-tooltip>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>

    <div class="content-area pa-4 pt-12">
    <v-card>

        <v-card-title>Miembros</v-card-title>
        <v-card-title>
          <v-row>
            <v-col>

              <v-btn
                color="primary_light"
                class="white--text"
                @click="addMember()" 
                :disabled="!$store.state.userAuth.userPermissions[18]['31']"
              >
                <v-icon left>mdi-plus</v-icon>Añadir Miembro
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
          :items="getMembers()"
          :search="search"
          :loading="loadingAboutUs()"
          class="elevation-1" 
          no-data-text="No hay información Sobre Nosotros."
          loading-text="Buscando información Sobre Nosotros."
          no-results-text="No se encontró ninguna información Sobre Nosotros."
        >
            <template v-slot:item="{ item }">
                <tr>
                    <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.hdid}}</td>
                    <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.hdmember}}</td>
                    <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.title}}</td>
                    <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.major}}</td>
                    <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.picture}}</td>
                    <td style="max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                            medium
                            class="mr-2 table-actions"
                            v-on="on"
                            @click="viewMember(item)"
                            >mdi-eye-plus</v-icon>
                        </template>
                        <span>Ver Miembro</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                            medium
                            class="mr-2 table-actions"
                            v-on="on"
                            @click="editMember(item)"
                            :disabled="!$store.state.userAuth.userPermissions[20]['33']"
                            >mdi-pencil</v-icon>
                        </template>
                        <span>Editar Miembro</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                medium
                                class="mr-2 table-actions"
                                v-on="on"
                                @click="deleteMember(item.hdid)"
                                :disabled="!$store.state.userAuth.userPermissions[19]['32']"
                                >mdi-delete</v-icon>
                        </template>
                        <span>Borrar Miembro</span>
                        </v-tooltip>
                    </td>
                </tr>
            </template>
        </v-data-table>

        <AddMemberModal 
            :dialog.sync="dialogAddMember" 
        />

        <ViewMemberModal
            :dialog.sync="dialogViewMember"
            :member="selectedMember.member"
            :title="selectedMember.title"
            :major="selectedMember.major"
            :picture="selectedMember.picture"
        />

        <EditAboutUsDescriptionModal
            :dialog.sync="dialogEditDescription"
        />

        <EditMemberModal
            :dialog.sync="dialogEditMember"
            :hdid="editedMember.hdid"
            :member="editedMember.member"
            :title="editedMember.title"
            :major="editedMember.major"
            :picture="editedMember.picture"
        />

        <DeleteMemberModal :dialog.sync="dialogDeleteMember" :id="hdid" />
    
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddMemberModal from "@/components/AddMemberModal";
import ViewMemberModal from "@/components/ViewMemberModal";
import EditMemberModal from "@/components/EditMemberModal";
import DeleteMemberModal from "@/components/DeleteMemberModal";
import EditAboutUsDescriptionModal from "@/components/EditAboutUsDescriptionModal";


export default {
  components: {
    AddMemberModal,
    ViewMemberModal,
    EditMemberModal,
    DeleteMemberModal,
    EditAboutUsDescriptionModal
  },

  data() {
    return {
        search: "",
        hdid: 0,
        dialogAddMember: false,
        dialogViewMember: false,
        dialogEditMember: false,
        dialogDeleteMember: false,
        dialogEditDescription: false,
        
        terms: false,
        ready: false,

        headers: [
            {
            text: "ID",
            align: "start",
            value: "hdid"
            },
            { text: "Nombre", value: "hdmember"},
            { text: "Título", value: "title"},
            { text: "Programa de Estudio", value: "major"},
            { text: "Imagen de Perfil", value: "picture"},
            { text: "Acciones", value: "actions", sortable: false}
        ],

        editedMember: {
            hdid: 0,
            member: "",
            title: "",
            major: "",
            picture: ""
        },

        selectedMember: {
            member: "",
            title: "",
            major: "",
            picture: ""
        }
    };
  },

  methods: {
    ...mapActions({
      getAboutUs: "aboutus/getAboutUs"
    }),

    /**
     * Return false if multimedia posts have been loaded,
     * false otherwise.
     */
    loadingAboutUs(){
      if(this.aboutuss.length > 0){
        return false
      }else{
        return true
      }
    },

    addMember() {
        this.dialogAddMember = true
    },

    viewMember(member){
      this.selectedMember = Object.assign({}, member)
      this.dialogViewMember = true
    },

    /**
     * Activates the EditMultimediaModal and prepares
     * the multimedia post to edit using the multimedia object given 
     * as parameter
     * @param member Object containing the information of the multimedia post to edit.
     */
    editMember(member){
      this.editedMember = Object.assign({}, member)
      this.dialogEditMember = true
    },  

    editDescription(){
      this.dialogEditDescription = true
    }, 

    /**
     * Activates the DeleteMultimediaModal using 
     * the id of the multimedia given as parameter.
     * @param memberID id of the multimedia to remove.
     */
    deleteMember(memberID){
      this.hdid = memberID
      this.dialogDeleteMember = true
    },

    getDescription() {
        let description = this.aboutuss.find(aboutus => aboutus.type === 'description')
        if(description != null) {
            return description.title
        }
    },

    getCaptain() {
        let captains = []
        let captain = this.aboutuss.find(aboutus => aboutus.type === 'captain')
        if (captain != null) {
            captains.push(captain)
            return captains
        }
    },

    getMembers() {
        let members = []
        for(let i = 0; i < this.aboutuss.length; i++) {
            if(this.aboutuss[i].type == 'member') {
                members.push(this.aboutuss[i])
            }
        }
        return members
    }

  },

  computed: {
    ...mapGetters({
      aboutuss: "aboutus/aboutuss"
    })
  },

  mounted() {
    this.getAboutUs();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/tableStyle.scss";
</style>