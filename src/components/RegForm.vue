<template>
  <q-modal ref="form_registro_email" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar>
        <q-toolbar-title>
          Registro Usuario
        </q-toolbar-title>

        <q-btn flat @click="registrarUsuarioEmail()">
          <q-icon name="save" /> Cadastrar
        </q-btn>
        <q-btn flat @click="$refs.form_registro_email.close()">
          <q-icon name="close" />
        </q-btn>
      </q-toolbar>
      <div class="layout-padding">
        <q-card flat>
          <q-card-main>
            <q-input type="email" float-label="EMail" v-model="registro.email" />
            <q-input type="password" float-label="Senha" v-model="registro.senha" />
            <q-input type="password" float-label="Confirmação de Senha" v-model="registro.csenha" />
          </q-card-main>
        </q-card>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import {
  Loading,
  QSpinnerPie,
  Toast,
  QModal,
  QModalLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QCard,
  QCardMain,
  QInput,
  QSelect,
  QUploader
} from 'quasar'

export default {
  components: {
    Loading,
    QSpinnerPie,
    Toast,
    QModal,
    QModalLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QCard,
    QCardMain,
    QInput,
    QSelect,
    QUploader
  },
  data () {
    return {
      url: '',
      registro: {
        email: null,
        senha: null,
        csenha: null
      }
    }
  },
  methods: {
    openForm () {
      console.log('in openForm')
      if (this.$refs.form_registro_email) {
        this.$refs.form_registro_email.open()
      }
    },
    close () {
      if (this.$refs.form_registro_email) {
        this.$refs.form_registro_email.close()
      }
    }/*,
    save () {
      Loading.show({
        spinner: QSpinnerPie,
        message: 'SALVANDO, por favor aguarde . . .',
        messageColor: 'black',
        size: 80, // in pixels
        color: 'green'
      })
      this.$http({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/propriedades',
        data: this.registro,
        params: {
          force: true
        }
      })
        .then((response) => {
          console.log(response)
          Loading.hide()
          this.$emit('change', response.data)
          this.close()
        })
        .catch(function (error) {
          console.log(error)
          Loading.hide()
          Toast.create.negative({
            html: 'Um erro aconteceu, tente novamente !',
            icon: 'alarm_add',
            timeout: 2500,
            color: '#f8c1c1',
            bgColor: 'white'
          })
        })
    }*/,
    registrarUsuarioEmail(){
      let email = this.registro.email
      let senha = this.registro.senha

      this.$auth.createUserWithEmailAndPassword(email,senha)
        .then(function(user){
          alert("Usuario cadastrado.FaÃ§a o login");
          $("#formlogin").trigger("reset");
          console.log(user)
        })
        .catch(function(error){
          alert("Erro ao cadastrar usuario. Tente outro email");
          console.log(error.message);
        });            
    }
  }
}
</script>

<style>
</style>