<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header>
    <q-toolbar class="toolbar">
      <q-toolbar-title>
        <ul class="breadcrumb">
          <li>
            <a>
              <q-icon name="gps fixed" />Cards
            </a>
          </li>
        </ul>
      </q-toolbar-title>
      <q-btn color="blue" @click="logout()" block icon="fa-exit">
       SAIR
      </q-btn>      
    </q-toolbar>      
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
/*
 * Root component
 */
import {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon
} from 'quasar'
export default {
  components: {
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon
  },
  methods : {
    logout() {
      this.$auth
	      .signOut()
	      .then(function() {
		      alert("LOGOUT EFETUADO , ATE A PROXIMA !")
		      //pageLogin();
	      }).catch(function(error) {
	  	    alert("UM ERRO ACONTECEU, TENTE NOVAMENTE MAIS TARDE !")
	      });
    } 
  }
}
</script>

<style lang="stylus">
@import '~variables'

main
  text-align center
  margin-top 40px

header
  margin 0
  height 10px
  background-color $primary
</style>
