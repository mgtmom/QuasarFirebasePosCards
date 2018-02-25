<template>
  <q-modal ref="form_registro_card" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar>
        <q-toolbar-title>
          Registro de CARDSs
        </q-toolbar-title>

        <q-btn flat @click="save()">
          <q-icon name="save" />
        </q-btn>
        <q-btn flat @click="$refs.form_registro_card.close()">
          <q-icon name="close" />
        </q-btn>
      </q-toolbar>
      <div class="layout-padding">
        <q-card flat>
          <q-card-main>
            <q-input float-label="Nome" v-model="registro.nome" />
            <q-input float-label="Descricao" v-model="registro.descricao" />
            <q-input float-label="IMGURL" v-model="registro.imgurl" />
            <q-uploader :firebase-storage="$sr" v-model="registro.imgfile" url="http://localhost:8081/assets/teste" />
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
        nome: "",
        descricao: "",
        like: 0,
        dislike: 0,
        imgfile: null,
        imgurl: "http://img.taste.com.au/aCb2fmQW/w643-h428-cfill-q90/taste/2016/11/cinnamon-donuts-15520-1.jpeg"
      },
      registro_empty: {
        nome: "",
        descricao: "",
        like: 0,
        dislike: 0,
        imgfile: null,
        imgurl: "http://img.taste.com.au/aCb2fmQW/w643-h428-cfill-q90/taste/2016/11/cinnamon-donuts-15520-1.jpeg"
      }
    }
  },
  methods: {
    openForm () {
      this.registro = JSON.parse(JSON.stringify(this.registro_empty))
      console.log('in openForm')
      if (this.$refs.form_registro_card) {
        this.$refs.form_registro_card.open()
      }
    },
    close () {
      console.log('in close')
      if (this.$refs.form_registro_card) {
        this.$refs.form_registro_card.close()
      }
    },
    save () {
      Loading.show({
        spinner: QSpinnerPie,
        message: 'SALVANDO, por favor aguarde . . .',
        messageColor: 'black',
        size: 80, // in pixels
        color: 'green'
      })
      let objeto = this
      this.$db.ref("cards").push(this.registro)
          .then(function(result){
            alert("Cadastrado com suceso ");
            console.log("Cadastrado com suceso ")
            console.log(result)
            objeto.$refs.form_registro_card.close()
           // $("button").removeAttr("disabled");
            //$("#formcadastrar").trigger("reset");	
            //pageListar();
            Loading.hide()
          },objeto)
          .catch(function(error){
            alert("Erro ao cadastrar");
            console.log(error.message)
            //$("button").removeAttr("disabled");
            Loading.hide()
          });      
      /*this.$http({
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
        })*/
    }
  }
}
</script>

<style>
</style>