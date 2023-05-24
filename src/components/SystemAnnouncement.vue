<template>
    <vue3-seamless-scroll :list="scroll_contents[language]" class="scroll" :hover="true" :isWatch="true" :step="0.2">
        <div class="item" v-for="(text, index) in scroll_contents[language]" :key="index">
            <el-text class="mx-1" type="primary" size="large">{{ text }}</el-text>
        </div>
    </vue3-seamless-scroll>
</template>

<script>
import {computed, defineComponent} from "@vue/runtime-core";
import {Vue3SeamlessScroll} from "vue3-seamless-scroll";
import {useStore} from "vuex";
export default defineComponent({
    components: {
        Vue3SeamlessScroll
    },
    setup() {
        const language = computed(() => useStore().state.appGlobal.language);
        const translations = computed(() => useStore().state.appGlobal.translations);
        const scroll_contents = translations.value["announcements"];
        return { scroll_contents, language};
    }
});
</script>

<style lang='scss' scoped>
.scroll {
    height: 20px;
    width: 500px;
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