<template>
  <div id="app">
    <Navbar></Navbar>
    <Head></Head>
    <Exchange></Exchange>
    <Stock></Stock>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import Head from './components/Head.vue'
import Navbar from './components/Navbar.vue'
import Exchange from './components/Exchange.vue'
import Stock from './components/Stock.vue'

export default {
  name: 'App',
  components: {
    Head,
    Navbar,
    Exchange,
    Stock
  },
  computed: {
      ...mapState(['conectado', 'dataEx']),
      
    },
  methods: {
    ...mapMutations(['desconectar', 'getExchanges', 'getStocks', 'getBuys', 'getSells', 'getUpdates']),
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
