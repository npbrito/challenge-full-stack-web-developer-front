<template>
  <div>
    <div class=" m-2 d-flex justify-content-end">
    <div class="col-md-3">
      <b-button>Cadastrar</b-button>
    </div>
    </div>

    <b-table hover :items="users" :fields="fields">
     <template v-slot:cell(actions)="data" >
      <b-button>Editar</b-button>
      <b-button class="ml-2" variant="danger">Deletar</b-button>
     </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Users",
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
          class:"col-md-3"
        },
      ],
      users: [
        { id: 0, name: "Loren Ipsun", email: "loren@ipsun.com" },
        { id: 1, name: "Dolor sit Amet", email: "dolor@amet.com" },
      ],
    };
  },
};
</script>
<style>
body {
  background: #eef1f4 !important;
}
</style>
