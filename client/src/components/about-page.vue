<template>

  <div class="container">

    <div class="image-container">
      <div class="about-image-section">
        <img src="https://images.unsplash.com/photo-1617696618050-b0fef0c666af?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhZG1pbnRvbnxlbnwwfHwwfHx8MA%3D%3D" alt="Sports Community">
      </div>

      <div class="about-image-section">
        <img src="https://wallpapercave.com/wp/wp5134804.jpg" alt="Basketball Community">
      </div>

      <div class="about-image-section">
        <img src="https://wallpapercave.com/wp/wp11819620.jpg" alt="Basketball Community">
      </div>
    </div>
  </div>

  <div class="about-section">
    <h1 class="heading-about-website">about the website</h1>
    <p class="description">
      welcome to matchmate, a community-driven platform designed to connect individuals
      who share a passion for sports. whether you're looking to find partners for
      badminton, football, soccer, or any other sport, our mission is to help you
      organize scrimmages and enjoy the games you love. join us and be part of an
      active and engaging sports community!
    </p>
    <h1 class="heading-about-creator">about the creator</h1>
    <p class="description">
      khoa luong, sophomore computer science major. i play sports a lot, so finding other badminton players is cool.
      email: <a href="mailto:khoa.luong@case.edu">khoa.luong@case.edu</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
};
</script>

<style>
.about-section {
  text-align: left;
  padding-left: 20px;
  margin-top: -100px;
}

.description {
  font-family: 'nunito', sans-serif;
  color: black;
}

.heading-about-website {
  color: black;
  margin-bottom: 0.5rem;
  margin-top: -100px;
}

.heading-about-creator {
  color: black;
  margin-bottom: 0.5rem;
  margin-top: 20px;
}


.description {
  color: black;
  line-height: 1.6;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
}

.image-container {
  display: flex;
  width: 100%;
  height: 400px;
  margin-bottom: 50px;
}

.about-image-section {
  flex: 1;
  overflow: hidden;
}


.about-image-section img {
  width: 95%;
  height: 80%;
  object-fit: cover;
}
</style>