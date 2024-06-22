<template>
  <header class="header-nav">
    <div class="header-content">
      <div class="logo-container">
        <img alt="Vue logo" src="../assets/matchmatelogo.png" class="logo">
      </div>
      <nav class="navbar">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/community" class="nav-link">Community </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About </router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>

          <li v-if="isLoggedIn" class="nav-item">
            <!-- Update this button to open the dialog instead -->
            <button @click="showSignOutDialog = true" class="nav-link">Sign Out</button>
          </li>

            <v-dialog v-model="showSignOutDialog" persistent max-width="300">
              <v-card>
                <v-card-title class="text-center">Sign Out</v-card-title>
                <v-card-text class="text-center">
                  Sign out confirm?
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn :style="{ backgroundColor: '#90EE90', fontWeight: 'bold' }" text @click="showSignOutDialog = false">No</v-btn>
                  <v-btn :style="{ backgroundColor: '#ff5b5f', fontWeight: 'bold' }" text @click="confirmSignOut">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { inject, ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';


export default {
  name: 'HeaderNav',
  setup() {
    const isLoggedIn = inject('isLoggedIn');
    const auth = getAuth();
    const router = useRouter();
    const showSignOutDialog = ref(false);


    const handleSignOut = () => {
      signOut(auth).then(() => {
        isLoggedIn.value = false;
        router.push("/");
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: {
            severity: 'success',
            summary: 'Success',
            detail: 'Logged Out! Thank you',
            life: 4000
          }
        }));
      }).catch((error) => {
        // Handle error if necessary
        console.error("Error signing out: ", error);
      });
    };

    const confirmSignOut = () => {
      showSignOutDialog.value = false;
      handleSignOut();
    };



    return {
      isLoggedIn,
      showSignOutDialog,
      confirmSignOut
    };
  }
};
</script>

<style scoped>
.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 2rem;
  background-color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.logo-container {
  position:absolute;
  top:0;
  left:0;
  padding-left: 18px;
}

.logo {
  height: 8rem;
  width: 8rem;
}

.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: -30px;
  margin-left: auto;
  padding: 0;
}

.nav-item {
  margin-left: 1rem;
  font-size: 1.2rem;
}

.nav-link {
  position: relative;
  font-family: nunito, sans-serif;
  color: black;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  overflow: hidden;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: black;
  bottom: 3px;
  left: 0;
  transition: width 0.3s ease;
}

.nav-item button {
  background: none;
  border: none;
  font-family: nunito, sans-serif;
  color: black;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
}

.nav-item button:hover::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: black;
  bottom: 3px;
  left: 0;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
