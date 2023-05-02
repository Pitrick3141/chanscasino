<template>
    <el-image style="width: 40px; height: 60px" :src=imageDir fit="fill" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
    name: "PokerImage",
    props: {
        pokerType: String,
        pokerValue: String
    },
    setup(){
        const imageDir = ref("");

        return{
            imageDir
        };
    },
    mounted() {
        this.imageDir = '/img/pokers/' + this.pokerType +'s/' + this.pokerValue + '_of_' + this.pokerType + 's.png';
    }
})
</script>

<style scoped>

</style>