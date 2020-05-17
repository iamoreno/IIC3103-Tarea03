<template>
    <div class="fixed-top">
    <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand">Tarea 3 Taller de Integración</a>
        <button class="btn btn-success my-2 my-sm-0" @click="conectar()">{{conectado}}</button>
    </nav>
    </div>

</template>
<script>
import {mapMutations, mapState} from 'vuex';

export default {
    name: 'Navbar',
    computed: {
      ...mapState(['conectado', 'dataEx'])
    },
    methods: {
      ...mapMutations(['conectar']),
    }
}
</script>