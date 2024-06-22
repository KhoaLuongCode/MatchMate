<template>
  <v-container>
    <v-row justify="center">
      <div class="add-post-container">
        <p class="add-post-note">Looking for sports partners?</p>
          <v-btn @click="openDialog" class="add-post-btn">
            Add Post
          </v-btn>
      </div>
      <add-dialog
          :showDialog="isAddDialogOpen"
          @update:showDialog="isAddDialogOpen = $event"
          @post-added="fetchPosts">
      </add-dialog>
    </v-row>
  </v-container>

  <v-toolbar-title :style="{ fontSize: '2.1rem', color: 'black', marginTop: '60px' }">Latest Posts In Your Sport Community</v-toolbar-title>
  <div v-if="isLoading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <v-container >
    <v-row justify="center" >
      <v-col cols="12" sm="8" v-if="posts.length === 0">
        <div class="no-posts-message">
          Little quiet in here, add your first post?
        </div>
      </v-col>
      <v-col cols="12" sm="8" v-for="(post) in posts" :key="post._id">
        <v-card class="mb-3 post-card custom-rounded-card">
          <v-card-title>
            <div class="d-flex flex-column">
              <span class="post-title">{{ post.title }}</span>
              <span class="post-subtitle">Posted: {{ formatDate(post.createdAt) }}</span>
            </div>
          </v-card-title>
          <v-card-text>
            <p class="text">Name: {{ post.name }}</p>
            <p class="text">Age: {{ post.age }}</p>
            <p class="text">Gender: {{ post.gender }}</p>
            <p class="text">Contact: {{ post.contact }}</p>
            <p class="text">Sport: {{ post.sport }}</p>
            <p class="text">Skill Level Preferred: {{ post.skillLevel }}</p>
            <p class="text">Activity Type: {{ post.activityType }}</p>
            <p class="text">Location: {{ post.location }}</p>
            <p class="text">Travel Distance: {{ post.travelDistance }}</p>
            <p class="text">Description: {{ post.description }}</p>
            <p class="text">Preferred Date: {{ formatDate(post.date) }}</p>
          </v-card-text>

          <v-row no-gutters>
            <v-col cols="6" class="pa-2">
              <v-btn
                  class="add-delete-button"
                  block
                  text
                  :disabled="isLoading"
                  @click="deletePosts(post._id)"
                  :style="{ backgroundColor: '#ff5b5f', fontWeight: 'bold' }">
                Delete
              </v-btn>
            </v-col>

            <v-col cols="6" class="pa-2">
              <v-btn
                  class="add-delete-button"
                  block
                  text
                  @click="openUpdateDialog(post._id)"
                  :style="{ backgroundColor: '#90EE90', fontWeight: 'bold' }">
                Update
              </v-btn>
            </v-col>
          </v-row>

          <update-dialog
              :showDialog="isUpdateDialogOpen"
              :postId="selectedPostId"
              @update:showDialog="isUpdateDialogOpen = $event"
              @post-updated="fetchPosts">
          </update-dialog>
          <div v-if="isLoading" class="loading-overlay">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import PostService from '../PostService';
import AddDialog from './add-dialog.vue';
import UpdateDialog from './update-dialog.vue';

const posts = ref([]);
const error = ref('');
const isLoading = ref(false);
const isAddDialogOpen = ref(false);
const isUpdateDialogOpen = ref(false);
const selectedPostId = ref(null);
const isLoggedIn = inject('isLoggedIn');

const openDialog = () => {
  if (!isLoggedIn.value) {
    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: {
        severity: 'error',
        summary: 'Error',
        detail: 'You must log in before posting',
        life: 4000
      }
    }));
    return;
  }
  isAddDialogOpen.value = true;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

onMounted(async () => {
  try {
    posts.value = await PostService.getPosts();
  } catch (err) {
    error.value = err.message;
  }
});

const fetchPosts = async () => {
  isLoading.value = true;
  try {
    posts.value = await PostService.getPosts();
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};


const deletePosts = async (id) => {
  if (!isLoggedIn.value) {
    showLoginRequiredToast();
    return;
  }

  isLoading.value = true;


  try {
    await PostService.deletePost(id);
    posts.value = await PostService.getPosts();
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
  window.dispatchEvent(new CustomEvent('show-toast', {
    detail: {
      severity: 'success',
      summary: 'Success',
      detail: 'Event has been deleted successfully',
      life: 4000
    }
  }));
}

const openUpdateDialog = (postId) => {
  if (!isLoggedIn.value) {
    showLoginRequiredToast();
    return;
  }
  selectedPostId.value = postId;
  isUpdateDialogOpen.value = true;
};

const showLoginRequiredToast = () => {
  window.dispatchEvent(new CustomEvent('show-toast', {
    detail: {
      severity: 'error',
      summary: 'Error',
      detail: 'You must log in to update or delete posts',
      life: 4000
    }
  }));
};

</script>

<style scoped>


p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.v-application .v-card * {
  font-family: 'nunito', sans-serif;
}

.custom-rounded-card{
  border-radius: 10px;
}

.add-delete-button{
  border-radius: 10px;
}

.add-post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-post-btn {
  background-color: black;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  text-transform: none;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.2s;
  width: 500px;
}

.add-post-btn:hover {
  background-color: #095086;
}

.add-post-note {
  margin-top: 8px;
  color: black;
  font-size: 0.9em;
  text-align: center;
}

.post-card {
  border: 1px solid black;
}

.post-title {
  font-weight: bold;
  font-size: 1.4em;
}

.post-subtitle {
  color: black;
  font-size: 0.9em;
}

.text {
  margin-bottom: 5px;
  color: #333;
  text-align: left;
  margin-top: 5px;
}

.no-posts-message {
  text-align: center;
  margin-top: 100px;
  font-size: 1.2em;
  color: black;
}
</style>

