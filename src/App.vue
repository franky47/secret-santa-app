<template>
  <div id="app" class='ui container'>
    <user-session></user-session>
    <register></register>
    <sign-in></sign-in>
  </div>
</template>

<script>
import Register from './components/Register'
import SignIn from './components/SignIn'
import UserSession from './components/UserSession'

export default {
    components: {
        Register,
        SignIn,
        UserSession
    }
}
</script>

<style>
    /*
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}*/
</style>
