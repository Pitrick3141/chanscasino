<template>
    <vue3-seamless-scroll :list="scroll_contents" class="scroll" :hover="true" :isWatch="true" :step="0.2">
        <div class="item" v-for="(text, index) in scroll_contents" :key="index">
            <el-text class="mx-1" type="primary" size="large">{{ text }}</el-text>
        </div>
    </vue3-seamless-scroll>
</template>

<script>
import {defineComponent, inject} from "@vue/runtime-core";
import {Vue3SeamlessScroll} from "vue3-seamless-scroll";
import {ref} from "vue";
export default defineComponent({
    components: {
        Vue3SeamlessScroll
    },
    setup() {
        const translations = inject("translation");
        const scroll_contents = ref(translations["announcements"][0]);

        const SwitchLanguage = (lang) => {
            scroll_contents.value = translations["announcements"][lang];
        }

        return { scroll_contents, SwitchLanguage};
    },
    props:{
        lang: Number
    }
});
</script>

<style lang='scss' scoped>
.scroll {
    height: 20px;
    width: 400px;
    margin: 25px auto;
    overflow: hidden;
}

.scroll .item {
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
    display: block;
}
</style>