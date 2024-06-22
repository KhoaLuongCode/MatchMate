<template>

  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="mt-2 d-flex align-center justify-start">
        <img alt="MatchMate logo" src="../assets/matchmatelogo.png" class="logo-form mr-2">
        <span class="headline-form">Update an event</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <!-- Personal Details Section -->
          <span class="headline">Title</span>
          <v-row>
            <v-col cols="12" class="mt-2">
              <v-text-field
                  class="global-text-field"
                  label="Title"
                  v-model="state.title"
                  :error-messages="v$.title.$errors.map(e => e.$message)"
                  :class="{ 'error--text': v$.title.$error }"
                  required
                  variant="underlined"
                  placeholder="Badminton @ Veale, who is up?"
              ></v-text-field>
            </v-col>
          </v-row>

          <span class="headline">Personal Details</span>
          <v-row>
            <v-col cols="12" md="6" class="mt-2">
              <v-text-field class="global-text-field" label="Name" v-model="state.name" required :error-messages="v$.name.$errors.map(e => e.$message)"
                            :class="{ 'error--text': v$.name.$error }"
                            variant="underlined" ></v-text-field>

            </v-col>


            <v-col cols="12" md="6" class="mt-2">
              <v-text-field class="global-text-field" label="Age" v-model="state.age" type="number" required :error-messages="v$.age.$errors.map(e => e.$message)"
                            :class="{ 'error--text': v$.age.$error }" variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="mt-0">
              <v-select
                  class="global-text-field"
                  label="Gender"
                  :items="['Male', 'Female', 'Other', 'Prefer not to say']"
                  v-model="state.gender"
                  :error-messages="v$.gender.$errors.map(e => e.$message)"
                  :class="{ 'error--text': v$.gender.$error }"
                  variant="underlined"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6" class="mt-0">
              <v-text-field class="global-text-field" label="Contact" v-model="state.contact" type="text" :error-messages="v$.contact.$errors.map(e => e.$message)"
                            :class="{ 'error--text': v$.contact.$error }" required variant="underlined"></v-text-field>
            </v-col>
          </v-row>

          <!-- Sport Details Section -->
          <span class="headline">Sport Details</span>
          <v-row>
            <v-col cols="12" md="6" class="mt-2">
              <v-select
                  class="v-select-custom global-text-field"
                  label="Sports"
                  :items="['Basketball', 'Badminton', 'Pickleball', 'Soccer', 'Football']"
                  v-model="state.sport"
                  :error-messages="v$.sport.$errors.map(e => e.$message)"
                  :class="{ 'error--text': v$.sport.$error }"
                  required
                  variant="underlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" class="mt-2">
              <v-select
                  class="global-text-field"
                  label="Skill Level"
                  :items="['Beginner', 'Intermediate', 'Advanced']"
                  v-model="state.skillLevel"
                  :error-messages="v$.skillLevel.$errors.map(e => e.$message)"
                  :class="{ 'error--text': v$.skillLevel.$error }"
                  required
                  variant="underlined"
              ></v-select>

            </v-col>
          </v-row>

          <!-- Date Details Section -->
          <span class="headline">Date Details</span>
          <v-row>
            <v-col cols="12">
              <v-date-picker
                  v-model="state.date"
                  color="black"
                  header-color="secondary"
                  class="date-picker global-text-field"
              ></v-date-picker>
            </v-col>
          </v-row>

          <span class="headline">Level Details</span>
          <v-row>
            <v-col cols="12" class="mt-2">
              <v-select
                  label="Type of Activity"
                  :items="['Casual Play', 'Competitive Match', 'Scrimmage', 'Practice Session']"
                  v-model="state.activityType"
                  :error-messages="v$.activityType.$errors.map(e => e.$message)"
                  :class="{ 'error--text': v$.activityType.$error }"
                  required
                  variant="underlined"
                  class="global-text-field"
              ></v-select>
            </v-col>
          </v-row>
          <!-- Location Details Section -->
          <span class="headline">Location Details</span>
          <v-row>
            <v-col cols="12" md="6" class="mt-2">
              <v-text-field
                  label="Preferred Location"
                  v-model="state.location"
                  :error-messages="v$.location.$errors.map(e => e.$message)"
                  :class="{ 'error--text': v$.location.$error }"
                  required
                  variant="underlined"
                  class="global-text-field"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="mt-2">
              <v-text-field
                  label="Distance Willing to Travel"
                  v-model="state.travelDistance"
                  :error-messages="v$.travelDistance.$errors.map(e => e.$message)"
                  :class="{ 'error--text': v$.travelDistance.$error }"
                  suffix="km"
                  type="number"
                  required
                  variant="underlined"
                  class="global-text-field"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Additional Notes Section -->
          <span class="headline">Description</span>
          <v-row>
            <v-col cols="12">
              <v-textarea
                  class="global-text-field"
                  label="Description"
                  v-model="state.description"
                  :error-messages="v$.description.$errors.map(e => e.$message)"
                  :class="{ 'error--text': v$.description.$error }"
                  hint="Be specific!"
                  persistent-hint
                  variant="underlined"
                  placeholder="Friendly pickleball game this Saturday at 10 AM. Intermediate level preferred. Bring your own racket."
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="button-container">
        <v-row>
          <v-col cols="6">
            <v-btn class="global-text-field" block text @click="closeDialog" :style="{ backgroundColor: '#ff5b5f', fontWeight: 'bold' }">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn class="global-text-field" block text @click="submitForm" :style="{ backgroundColor: '#90EE90', fontWeight: 'bold' }">
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>

import {ref, reactive, onMounted, defineEmits, defineProps, watch} from 'vue';
import PostService from '../PostService';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';


const props = defineProps({
  showDialog: Boolean,
  postId: String,
  posts: {
    type: Array,
    default: () => []
  }
});

// Shared reactive state
const dialog = ref(props.showDialog);
const state = reactive({
  title: "",
  name: "",
  age: "",
  gender: '',
  contact: '',
  sport: '',
  skillLevel: '',
  activityType: '',
  location: '',
  travelDistance: '',
  description: '',
  date: new Date(),
});

const validateUsername = helpers.withMessage(
    'Username must be 3-15 characters long.',
    value => typeof value === 'string' && value.length >= 3 && value.length <= 15
);

const v$ = useVuelidate({
  title: {required},
  name: { required, validateUsername },
  age: { required },
  gender: { required },
  contact: { required },
  sport: { required },
  skillLevel: { required },
  activityType: { required },
  location: { required },
  travelDistance: { required },
  description: { required },
}, state);

const posts = ref([]);
const error = ref('');
const emit = defineEmits(['update:showDialog']);


watch(() => props.showDialog, (newVal) => {
  dialog.value = newVal;
});



onMounted(async () => {
  try {
    posts.value = await PostService.getPosts();
  } catch (err) {
    error.value = err.message;
  }
});

const resetForm = () => {
  state.title = "";
  state.name = "";
  state.age = "";
  state.gender = '';
  state.contact = '';
  state.sport = '';
  state.skillLevel = '';
  state.activityType = '';
  state.location = '';
  state.travelDistance = '';
  state.description = '';
  state.date = new Date();
  v$.value.$reset();
};

const submitForm = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: {
        severity: 'success',
        summary: 'Success',
        detail: 'Event has been updated successfully',
        life: 4000
      }
    }));
    dialog.value = false;

    try {
      await PostService.updatePost(
          props.postId,
          state.title,
          state.name,
          state.age,
          state.gender,
          state.contact,
          state.sport,
          state.skillLevel,
          state.activityType,
          state.location,
          state.travelDistance,
          state.description,
          state.date
      );
      emit('post-updated');
      emit('update:showDialog', false);
      resetForm();
    } catch (err) {
      error.value = err.message;
    }

  } else {
    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: {
        severity: 'error',
        summary: 'Error',
        detail: 'Please follow the requirements',
        life: 4000
      }
    }));

  }
};
const closeDialog = () => {
  dialog.value = false;
  emit('update:showDialog', false);
  resetForm();
};

watch(() => props.postId, (newId) => {
  if (newId) {
    loadPostData(newId);
  } else {
    resetForm();
  }
});

const loadPostData = (postId) => {
  const postToUpdate = props.posts.find(post => post._id === postId);
  if (postToUpdate) {
    // Populate the state object with post data
    state.title = postToUpdate.title;
    state.name = postToUpdate.name;
    state.age = postToUpdate.age;
    state.gender = postToUpdate.gender;
    state.contact = postToUpdate.contact;
    state.sport = postToUpdate.sport;
    state.skillLevel = postToUpdate.skillLevel;
    state.activityType = postToUpdate.activityType;
    state.location = postToUpdate.location;
    state.travelDistance = postToUpdate.travelDistance;
    state.description = postToUpdate.description;
    state.date = new Date(postToUpdate.date);
  }
};

</script>

<style scoped>

.v-application .v-card * {
  font-family: 'nunito', sans-serif;
}


.date-picker{
  width: 100% !important;
  height: 100%;
}

.error--text {
  border-color: red !important;
  --v-field-outline-color: red !important;
}

.button-container {
  justify-content: center;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

.error--text {
  border-color: red !important;
  --v-field-outline-color: red !important;
}

.button-container {
  justify-content: center;
}

.headline-form {
  font-size: 30px;
  margin-left: 8px;
  color: black;
  font-family: 'nunito', sans-serif;
}

.headline{
  color:black;
  left:0;
  font-family: 'nunito', sans-serif;
  font-size: 25px;
}

.logo-form {
  max-width: 150px;
  max-height: 60px;
  height: auto;
}

.mt-2.d-flex.align-center.justify-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}


</style>