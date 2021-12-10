<template>
  <div>
    <b-modal
      hide-footer
      id="modal-form"
      ref="modal-form"
      :title="title"
      v-model="isOpen"
    >
      <b-container>
        <b-form-group
          label-for="name"
          label="Nome"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="name"
            type="text"
            placeholder="John Doe"
            class="form__input"
            v-model.trim="$v.user.name.$model"
          />
          <div
            class="error"
            v-if="!$v.user.name.required && $v.user.name.$dirty"
          >
            Campo não pode ser vazio.
          </div>
          <div
            class="error"
            v-if="!$v.user.name.minLength && $v.user.name.$dirty"
          >
            Campo deve ter no mínimo
            {{ $v.user.name.$params.minLength.min }} letras.
          </div>
        </b-form-group>
        <b-form-group
          label-for="email"
          label="E-mail"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="email"
            type="text"
            placeholder="johndoe@sample.com"
            class="form__input"
            v-model.trim="$v.user.email.$model"
          />
          <div
            class="error"
            v-if="!$v.user.email.required && $v.user.email.$dirty"
          >
            Campo não pode ser vazio.
          </div>
          <div
            class="error"
            v-if="!$v.user.email.email && $v.user.email.$dirty"
          >
            Insira um e-mail válido.
          </div>
          <div class="error" v-if="emailExists">
            O email inserido já está cadastrado.
          </div>
        </b-form-group>
      </b-container>
      <b-row align-h="center">
        <b-button class="col-3 m-2" @click="closeModal()">Cancelar</b-button>
        <b-button
          type="submit"
          class="col-3 m-2"
          @click="save"
          variant="primary"
          >Salvar</b-button
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
  name: "RegistrationForm",
  components: {
    Alert,
  },
  props: {
    value: {
      required: true,
    },
    registrationType: {
      required: true,
    },
    userInfo: {
      id: "",
      name: "",
      email: "",
    },
  },
  data() {
    return {
      alertOptions: {
        message: "",
        status: "",
      },
      showAlert: false,
      emailExists: false,
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
    save(event) {
      event.preventDefault();
      if (this.registrationType == "new") {
        this.closeModal();
        userApi.postUser(this.user).then((res) => {
          if (res.status == 200) {
            this.alert("Usuário salvo com sucesso", "success");
          } else {
            this.alert("Houve um erro ao salvar o usuário", "danger");
          }
        });
        this.closeModal();
      } else if (this.registrationType == "edit") {
        // Verify email first
        userApi.verifyEmail(this.user.emmail).then((res) => {
          // Res will be true if email exists
          this.emailExists = res;
        });

        if (!this.emailExists) {
          // Then can send
          userApi.putUser(this.user).then((res) => {
            if (res.status == 200) {
              this.alert("Usuário salvo com sucesso", "success");
            } else {
              this.alert("Houve um erro ao salvar o usuário", "danger");
            }
          });
          this.closeModal();
        }
      }
    },
    closeModal() {
      this.$refs["modal-form"].hide();
      // Clear the form
      this.user.name = "";
      this.user.email = "";
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
    user: {
      get() {
        return this.userInfo;
      },
    },
    title: {
      get() {
        return this.registrationType == "new"
          ? "Novo usuário"
          : "Editar usuário";
      },
    },
  },
};
</script>>

<style>
.form__input {
  border-color: #f79483;
}

.error {
  display: block;
  color: #f57f6c;
  font-size: 0.65rem;
  line-height: 1;
  margin-left: 0.1rem;
  margin-top: 0.5rem;
}
</style>