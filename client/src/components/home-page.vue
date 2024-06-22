<template>


  <div class="headline-container">
    <div class="text-container">
      <h1 class="heading">join your sport community today.</h1>
      <p class="description-header">
         matchmate
      </p>
        <p class="description">
          a vibrant and supportive community for sports enthusiasts
        </p>
        <p class="description">
          a platform to connect with fellow sports lovers.
        </p>
        <p class="description">
          an inclusive space where members can find partners for various sports, join local games, and even organize community events and scrimmages.
        </p>
    </div>
    <div class="pic-container">
      <img alt="Playing Sports" src="../assets/homepagedesign.png" class="description-pic">
    </div>
  </div>

  <div class="description-section">


  </div>

</template>

<script>




export default {
  name: 'HomePage',
};
</script>


<style>

.headline-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: -70px;
}

.text-container {
  width: 40%;
  text-align: left;
  margin-left: 50px;
}

.pic-container{
  width: 60%;
}

.description-pic {
  width: 80%;
  height: auto;
  object-fit: cover;
  margin-top: 100px;
}

.description-header{
  font-size: 30px;
  color: black;
  font-style: italic;
}

.description{
  margin-top: 10px;
}

</style>