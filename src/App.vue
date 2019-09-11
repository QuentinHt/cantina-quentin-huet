<template>
  <div id="app">
    <Navbar/>
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
import List from './components/List.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    Header,
    List
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0
}
</style>
