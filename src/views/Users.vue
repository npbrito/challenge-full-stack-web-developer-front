<template>
  <div>
    <RegistrationForm
      v-model="displayRegistrationForm"
      :registrationType="registrationType"
      :userInfo="selectedUser"
    />
    <ConfirmDelete v-model="displayConfirmDelete" :userId="1" />
    <b-row class="justify-content-around">
      <h3 class="m-0 align-self-center">Usuários Cadastrados</h3>
      <div class="m-2 d-flex justify-content-end">
        <b-button @click="openRegistrationForm('new')">Cadastrar</b-button>
      </div>
    </b-row>

    <!-- Users list -->
    <b-table hover :items="users" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button @click="openRegistrationForm('edit', row.item)"
          >Editar</b-button
        >
        <b-button class="ml-2" variant="danger" @click="confirmDelete(row.item)"
          >Deletar</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
/* eslint-disable no-console */
import userApi from "../util/usersApi";
import RegistrationForm from "../components/Forms/RegistrationForm.vue";
import ConfirmDelete from "../components/Modals/ConfirmDelete.vue";

export default {
  name: "Users",
  components: {
    RegistrationForm,
    ConfirmDelete,
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
      users: [
        {
          isActive: true,
          id: "1",
          name: "Natalia",
          email: "natalia@exemplo.com",
        },
        {
          isActive: false,
          id: "2",
          name: "Maria",
          email: "maria@exemplo.com",
        },
      ],
      displayRegistrationForm: false,
      displayConfirmDelete: false,
      registrationType: "new",
      selectedUser: "",
      selectedUserId: "",
    };
  },

  created() {
    this.init();
  },

  methods: {
    save() {},
    init() {
      userApi.getAll().then((fetchedUsers) => this.users = fetchedUsers.filter((user) => user.isActive === true));
    },
    openRegistrationForm(type, item) {
      this.registrationType = type;
      if (type == "edit") {
        this.selectedUser = { id: item.id, name: item.name, email: item.email };
      } else this.selectedUser = { id: "", name: "", email: "" };
        this.displayRegistrationForm = true;
    },
    confirmDelete(item) {
      this.displayConfirmDelete = true;
      this.selectedUserId = item.id;
    }
  },
};
</script>
<style>
body {
  background: #eef1f4 !important;
}
</style>
