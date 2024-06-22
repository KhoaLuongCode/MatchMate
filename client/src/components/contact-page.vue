<template>
  <div class="about-section">
    <h1 class="heading">contact me</h1>
    <p class="description">
      email: <a href="mailto:khoa.luong@case.edu">khoa.luong@case.edu</a>
    </p>
    <p class="description">
      phone: <a href="tel:+12162887504">216-288-7504</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ContactPage'
};
</script>

<style>
.about-section {
text-align: left;
padding-left: 20px;
  margin-top: 60px;
}

.heading, .description {
font-family: 'nunito', sans-serif;
color: black;
}

.heading {
color: black;
margin-bottom: 0.5rem;
}

.description {
color: black;
line-height: 1.6;
}
</style>