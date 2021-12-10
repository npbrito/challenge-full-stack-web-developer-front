<template>
  <div>
    <b-modal
      hide-footer
      id="modal-form"
      ref="modal-form"
      title="Cadastrar usuário"
      v-model="isOpen"
    >
      <b-container>
        <p class="mx-auto my-2">Tem certeza que deseja deletar este usuário?</p>
      </b-container>
      <b-row align-h="center">
        <b-button class="col-3 m-2" @click="closeModal()">Cancelar</b-button>
        <b-button
          type="submit"
          class="col-3 m-2"
          @click="deleteUser"
          variant="danger"
          >Deletar</b-button
        >
      </b-row>
    </b-modal>
    <Alert v-model="showAlert" :options="alertOptions" />
  </div>
</template>

<script>
import userApi from "../../util/usersApi";
import Alert from "../Alerts/Alert.vue";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "ConfirmDelete",
  components: {
    Alert,
  },
  props: {
    value: {
      required: true,
    },
    userId: {
      required: true,
    },
  },
  data() {
    return {
      alertOptions: {
        message: "",
        status: "",
      },
      showAlert: false,
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    deleteUser() {
        this.closeModal();
        userApi.deleteUser(this.userId).then((res) => {
          if (res.status == 200) {
            this.alert("Usuário deletado com sucesso", "success");
          } else {
            this.alert("Houve um erro ao deletar o usuário", "danger");
          }
          this.closeModal();
        });
    },
    closeModal() {
      this.$refs["modal-form"].hide();
    },
    alert(message, status) {
      this.alertOptions.message = message;
      this.alertOptions.status = status;
      this.showAlert = true;
    },
  },
  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>>