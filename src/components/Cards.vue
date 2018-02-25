<template>
  <div>
    <div class="layout-padding" style="width: 80vh">
      <q-list>
        <q-item v-for="(resultado, chave) in resultados" :key="chave">
            <q-card inline style="width: 80vh">
              <q-card-media>
                <img :src="resultado.imgurl">
              </q-card-media>
              <q-card-title>
                {{chave}} - {{resultado.nome}}
              </q-card-title>
              <q-card-main>
                <p>{{resultado.descricao}}</p>
                <p>{{resultado.imgurl}}</p>
                <p>{{resultado.imgname}}</p>
              </q-card-main>
              <q-card-separator />
              <q-card-actions>
                <q-btn flat @click="likeCard(chave)" color="green" icon="fa-thumbs-up" > ( {{resultado.like}} )</q-btn>
                <q-btn flat @click="dislikeCard(chave)" color="red" icon="fa-thumbs-down" > ( {{resultado.dislike}} )</q-btn>
                <q-btn flat @click="deletarCard(chave,resultado.imgname)" color="black" icon="fa-trash" />
              </q-card-actions>
            </q-card>   
        </q-item>
      </q-list>
    <q-btn
      round
      color="primary"
      @click="openAdd()"
      class="fixed"
      icon="fa-plus"
      style="right: 18px; bottom: 18px"
    />      
    </div>

    <formulario ref="formulario"> </formulario>
    
  </div>
</template>

<script>

  import {
    Loading,
    QSpinnerPie,
    QToolbar,
    QToolbarTitle,
    Toast,
    ActionSheet,
    QBtn,
    Dialog,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink,
    QCollapsible,
    QItemSeparator,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QCardMedia,
    QCardActions,
    QField,
    QInput,
    QCheckbox,
    QSelect,
    QChip,
    QPagination,
    QDataTable,
    QPopover
  } from "quasar";
  import formulario from "./Form.vue";

export default {
  components: {
    Loading,
    QSpinnerPie,
    formulario,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QCardMedia,
    QSideLink,
    QCollapsible,
    QItemSeparator,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QCardActions,
    QField,
    QInput,
    QCheckbox,
    QSelect,
    QChip,
    QPagination,
    QDataTable,
    QPopover
  },
  data () {
    return {
      resultados: [],
      registro: {
        nome: "",
        descricao: "",
        like: 0,
        dislike: 0,
        imgurl: "",
        imgname: ""
      }
    }
  },
  mounted() {
    this.listarCards()
  },
  methods: {
    openAdd() {
      console.log('EM OPENADD')
      if (this.$refs.formulario) {
        this.$refs.formulario.openForm();
      }
    },
    listarCards(){

      Loading.show({
        spinner: QSpinnerPie,
        message: 'Carregando CARDS . . ',
        messageColor: 'black',
        size: 80, // in pixels
        color: 'green'
      })
      this.$db.ref("cards")
        .on("value",function(snapshot) {
          this.resultados = JSON.parse(JSON.stringify(snapshot))
          Loading.hide()
      },this);      
    },
    deletarCard(key,imgref){
      let objeto = this
      
      let deletRef = objeto.$sr.child(imgref);
      this.$db.ref("cards/"+key).remove()
        .then((result) => {
          
          alert("Cadastrado apagado com sucesso ");
          console.log(result);
          // Delete the file
          deletRef.delete().then(function() {
            alert("arquivo apagado com sucesso ");
          }).catch(function(error) {
            alert("Erro ao apagar arquivo");
          });
        },deletRef)
        .catch(function(error){
          alert("Erro ao apagar cadastro");
          console.log(error.message);
        });      
    },
    likeCard(key){
      let dr = this.$db.ref("cards").child(key).child('like')
      dr.transaction(function(like) {
        if (like || (like == 0)) {
          like = like + 1;
        }
        return like;
      });
    },
    dislikeCard(key){
      let dr = this.$db.ref("cards").child(key).child('dislike')
      dr.transaction(function(dislike) {
        if (dislike || (dislike == 0)) {
          dislike = dislike + 1;
        }
        return dislike;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.hello
  margin-top 50px
  a
    color #35495E

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px
</style>
