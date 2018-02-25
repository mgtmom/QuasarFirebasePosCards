<template>
  <div class="layout-padding">
    <form @submit.prevent="submit">
      <q-input type="email" v-model="email" placeholder="e-Mail" />
      <q-input type="password" v-model="password" placeholder="Password" />
      <q-btn block @click="openEmailReg()" icon="fa-envelope">
        Registrar EMail
      </q-btn><br>
      <q-btn block icon="fa-envelope">
        Entrar com email
      </q-btn><br>
      <q-btn color="blue" @click="logarComFacebook()" block icon="fa-facebook-square">
        Logar com FACEBOOK
      </q-btn><br>
      <q-btn color="secondary" @click="logarComGithub()" block icon="fa-github-square">
        Logar com GITHUB
      </q-btn><br>
      <q-btn color="blue" @click="logarComTwitter()" block icon="fa-twitter">
        Logar com TWITTER
      </q-btn>
    </form>
    <formularioregemail ref="formularioregemail"> </formularioregemail>

  </div>   
 
</template>

<script>
import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QInput
} from 'quasar'
  import formularioregemail from "./../RegForm.vue";

export default {
    name: 'auth',
    components: {
        formularioregemail,
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QInput
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submit() {
            const { email, password } = this
            if (email !== '' && password !== '') {
                this.$auth.signInWithEmailAndPassword(
                    email, password
                )
            }
        },
        logarComFacebook() {
          //let provedor = new (this.$auth.FacebookAuthProvider())
          this.logarComProvedor( this.$face )
        },
        logarComGithub() {
          //let provedor = new (this.$auth.FacebookAuthProvider())
          this.logarComProvedor( this.$github )
        },
        logarComTwitter() {
          //let provedor = new (this.$auth.FacebookAuthProvider())
          this.logarComProvedor( this.$twitter )
        },
        logarComProvedor( provedor ) {
          this.$auth.signInWithPopup(provedor).then(function(result) {
            console.log("PROVEDOR: ");
            console.log(provedor);		
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            // ...

            console.log("TOKEN: ");
            console.log(token);		
            console.log("USER: ");
            console.log(user);			  
            pageListar();
          }).catch(function(error) {

            console.log("ERROR: ");
            console.log(error.message);				
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...


            console.log("errorCode: ");
            console.log(errorCode);		

            console.log("errorMessage: ");
            console.log(errorMessage);		

            console.log("email: ");
            console.log(email);		

            console.log("credential: ");
            console.log(credential);			  
          });	
        },
        openEmailReg(){
            console.log('EM openEmailReg')
            if (this.$refs.formularioregemail) {
                this.$refs.formularioregemail.openForm();
            }
        }
    },
    mounted() {
        this.$auth.onAuthStateChanged(user => {
            if (user) {
                this.$router.push({ path: '/' })
            }
        })
    }
}
</script>

<style>
</style>
