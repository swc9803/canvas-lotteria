<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/test1">Test1</router-link>
    <router-link to="/test2">Test2</router-link>
  </nav>
  <router-view />
</template>

<script setup></script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
}
nav {
  position: absolute;
  z-index: 1;
  a {
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    margin: 0 20px;
    text-decoration: none;
    &.router-link-active {
      border-bottom: 2px solid yellow;
    }
  }
}
</style>
