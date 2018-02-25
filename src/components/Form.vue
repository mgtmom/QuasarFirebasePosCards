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
            <q-input float-label="TESTES - imgurl" v-model="registro.imgurl" />
            <q-input float-label="TESTES - imgname" v-model="registro.imgname" />
            <input type="file" id="fileField"/>
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
      rimgurl: "",
      registro: {
        nome: "",
        descricao: "",
        like: 0,
        dislike: 0,
        imgfile: null,
        imgurl: "",
        imgname: ""
      },
      registro_empty: {
        nome: "",
        descricao: "",
        like: 0,
        dislike: 0,
        imgfile: null,
        imgurl: "",
        imgname: ""
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

      const file = document.querySelector('#fileField').files[0];
      const name = file.name;
      const nname = (+new Date()) + '-' + file.name;
      const metadata = { contentType: file.type };
      this.registro.imgname = nname
      const task = this.$sr.child(nname).put(file, metadata);
      task.then((snapshot) => {
        const url = snapshot.downloadURL;
        let objeto2 = objeto
        objeto.rimgurl = url
        objeto.registro.imgurl = url
        console.log("UPLOAD EFETUADO !");
        console.log(url);
        console.log("UPLOAD EFETUADO imgurl !");
        console.log(this.imgurl);
        
        objeto.$db.ref("cards").push(this.registro)
            .then((result) => {
              console.log("Cadastrado com suceso ")
              console.log(result)
              Loading.hide()
            },objeto2)
            .catch(function(error){
              alert("Erro ao cadastrar");
              console.log(error.message)
              //$("button").removeAttr("disabled");
              Loading.hide()
            });

      },objeto).catch((error) => {
        console.log("ERRO NO UPLOAD !");
        console.error(error);
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
  },
  watch: {
    'rimgurl': function () {
      this.close()
    }
  }
}
</script>

<style>
</style>