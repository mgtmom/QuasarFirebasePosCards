import Firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyAVEom_g9ZXsQyvRhMNQzRIGlx8pEKY0Ko',
  authDomain: 'posunifacs-fabdc.firebaseapp.com',
  databaseURL: 'https://posunifacs-fabdc.firebaseio.com',
  projectId: 'posunifacs-fabdc',
  storageBucket: 'posunifacs-fabdc.appspot.com',
  messagingSenderId: '233777399129'
}

const connection = Firebase.initializeApp(config)

const DB = connection.database()
const AUTH = connection.auth()
//const STR = connection.storage()


const FACEBOOK = new Firebase.auth.FacebookAuthProvider()
const GITHUB = new Firebase.auth.GithubAuthProvider()
const TWITTER = new Firebase.auth.TwitterAuthProvider()
const storageRef = Firebase.storage().ref('quasar-uploader-test')
export default function install (Vue, { router }) {
  AUTH.onAuthStateChanged(user => {
    if (!user) {
      router.push({ path: 'auth' })
    }
  })
  Object.defineProperties(Vue.prototype, {
    $db: {
      get () {
        return DB
      }
    },
    $auth: {
      get () {
        return AUTH
      }
    },
    $face: {
      get () {
        return FACEBOOK
      }
    },
    $github: {
      get () {
        return GITHUB
      }
    },
    $twitter: {
      get () {
        return TWITTER
      }
    },
    $sr: {
      get () {
        return storageRef
      }
    }
  })
}
