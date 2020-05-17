<template>
    <div>
        <h1 class="display-4 bg">YourTradingSite</h1>
    </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex';

export default {
    name: 'Head',
    computed: {
      ...mapState(['conectado', 'dataEx']),
    },
    methods: {
      ...mapMutations(['conectar']),
    }
}

</script>