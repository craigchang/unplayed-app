<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/

* {
  margin: 0;
  padding: 0;
  border: none;
}

body
{
  font: 13px/18px sans-serif;
  color: #333;
  background-color: #fff;
  padding: 16px;
}

a
{
  text-decoration: none;
  color: inherit;
}

#footer
{
  margin: 16px 16px 0;
  padding: 16px 0 0;
  border-top: 1px solid #333;
  float: none;
  clear: both;
  width: auto;
}

</style>
