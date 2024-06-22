<template>
  <h1 class="heading"> MatchMate </h1>
  <v-container class="sign-in-container">

    <v-text-field class="text-field-login" variant="outlined" label="Email" v-model="emailSignIn" :error="isEmailError"
                  :error-messages="emailErrorMessages"></v-text-field>
    <v-text-field class="text-field-login" variant="outlined" label="Password" v-model="passWordSignIn" type="password" :error="isPasswordError"
                  :error-messages="passwordErrorMessages" />
    <v-btn class="buttons-login-page"  @click="registerSignIn">Log In</v-btn>
    <v-row>
      <v-col class="text-center">
        OR
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn class="buttons-login-page" @click="signInWithGoogle">Sign In W Google</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn class="buttons-login-page" @click="dialog=true">Create Account</v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Create a MatchMate account</v-card-title>
        <v-card-text>
          <v-text-field class="global-text-field" variant="outlined" label="Email"  v-model="emailCreate" :error="isEmailCreateError" :error-messages="createEmailErrorMessages" />
          <v-text-field class="global-text-field" style="margin-top: 10px;" variant="outlined" label="Password" v-model="passwordCreate" type="password" :error="isPasswordCreateError" :error-messages="createPasswordErrorMessages" />
        </v-card-text>
        <v-card-actions class="button-container">
          <v-row>
            <v-col cols="6">
              <v-btn block text @click="dialog = false" :style="{ backgroundColor: '#ff5b5f', fontWeight: 'bold' }">
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block text @click="registerCreate" :style="{ backgroundColor: '#90EE90', fontWeight: 'bold' }">
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import {ref, inject, computed} from "vue";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router';

const emailCreate = ref("");
const passwordCreate = ref("");
const emailSignIn = ref("");
const errMsg = ref();
const passWordSignIn = ref("");
const isLoggedIn = inject('isLoggedIn')
const dialog = ref(false)
const isEmailError = computed(() => !!emailErrorMessages.value);
const isPasswordError = computed(() => !!passwordErrorMessages.value);
const isEmailCreateError = computed(() => !!createEmailErrorMessages.value);
const isPasswordCreateError = computed(() => !!createPasswordErrorMessages.value);
const router = useRouter();
const createErrMsg = ref('');


function registerCreate() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, emailCreate.value, passwordCreate.value)
      .then((data) => {
        console.log(data)
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: {
            severity: 'success',
            summary: 'Success',
            detail: 'User created! Thank you.',
            life: 4000
          }
        }));
        signOut(auth).then(() => {
          dialog.value = false;
          resetCreateFields();
          router.push('/login');
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            createErrMsg.value = "This Email is already in use";
            break;
          case "auth/invalid-email":
            createErrMsg.value = "Invalid Email format";
            break;
          case "auth/weak-password":
            createErrMsg.value = "Password should be at least 6 characters";
            break;
          default:
            createErrMsg.value = "An error occurred during account creation";
            break;
        }
      });
}

function registerSignIn(){
  const auth = getAuth();
  signInWithEmailAndPassword(auth, emailSignIn.value, passWordSignIn.value)
      .then((data) => {
        console.log(data)
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: {
            severity: 'success',
            summary: 'Success',
            detail: 'Signed in! Thank you',
            life: 4000
          }
        }));
        isLoggedIn.value = true;
        resetSignInFields();
        router.push('/community');
      })
      .catch((error) => {
        switch (error.code){
          case "auth/invalid-email":
            errMsg.value = "Invalid Email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No Account with that Email was found";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect Password";
            break;
          default:
            errMsg.value = "Email or Password incorrect";
            break;
        }
      });
}

const emailErrorMessages = computed(() => {
  if (errMsg.value && errMsg.value.includes('Email')) {
    return errMsg.value;
  }
  return '';
});

const passwordErrorMessages = computed(() => {
  if (errMsg.value && errMsg.value.includes('Password')) {
    return errMsg.value;
  }
  return '';
});

const createEmailErrorMessages = computed(() => {
  if (createErrMsg.value && createErrMsg.value.includes('Email')) {
    return createErrMsg.value;
  }
  return '';
});

const createPasswordErrorMessages = computed(() => {
  if (createErrMsg.value && createErrMsg.value.includes('Password')) {
    return createErrMsg.value;
  }
  return '';
});

function resetCreateFields() {
  emailCreate.value = '';
  passwordCreate.value = '';
  errMsg.value = '';
}


function resetSignInFields() {
  emailSignIn.value = '';
  passWordSignIn.value = '';
  errMsg.value = '';
}

function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
        router.push('/community');
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: {
            severity: 'success',
            summary: 'Success',
            detail: 'Signed in with Google Account! Thank you',
            life: 4000
          }
        }));
      })

}
</script>

<style scoped>

.heading {
  margin-top: 50px;
  color: black;
  text-align: center;
}

.headline{
  text-align: center;
  margin-top: 10px;
  font-size: 25px;
}

.sign-in-container {
  max-width: 400px;
}

.text-center{
  margin-top: 20px;
  color: black;
}

.buttons-login-page{
  border: 1px solid black;
  margin-top: 11px;
}

.text-field-login{
  margin-top: 5px;
}
</style>