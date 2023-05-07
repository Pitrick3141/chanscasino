<script>
import {mapActions} from "vuex";

export default {
    mounted() {
        this.authAction();
    },
    methods: {
        ...mapActions("auth", ["authAction"]),
    }
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped>

</style>
