<template>
  <div>
    <RegistrationForm v-model="displayRegistrationForm" :registrationType="'new'"/>
    <div class="m-2 d-flex justify-content-end">
      <b-button @click="openRegistrationForm('new')">Cadastrar</b-button>
    </div>

    <!-- Users list -->
    <b-table hover :items="users" :fields="fields">
      <!-- <template v-slot:cell(actions)="data" >
      <b-button>Editar</b-button>
      <b-button class="ml-2" variant="danger">Deletar</b-button>
     </template> -->
    </b-table>
  </div>
</template>

<script>
/* eslint-disable no-console */
import userApi from "../util/usersApi";
import RegistrationForm from "../components/Forms/RegistrationForm.vue";

export default {
  name: "Users",
  components: {
    RegistrationForm
  },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Nome",
          sortable: true,
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
        },
        {
          key: "actions",
          label: "Ações",
          sortable: false,
          class: "col-md-3",
        },
      ],
      users: [],
      displayRegistrationForm: false,
      registrationType: "new"
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      userApi.getAll().then((users) => console.log(users));
    },
    save() {},
    openRegistrationForm(type) {
      this.displayRegistrationForm = true;
      this.registrationType = type
    },
    confirmDelete() {},
  },
};
</script>
<style>
body {
  background: #eef1f4 !important;
}
</style>
