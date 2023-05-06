<template>
    <div>
        <ul class="flex justify-end">
            <li class="mr-6" v-if="!user">
                <router-link to="/login">
                    <a class="text-blue-500 hover:text-blue-800 cursor-pointer">{{ translations['nav_bar_login'][language] }}</a>
                </router-link>
            </li>
            <li class="mr-6" v-if="!user">
                <router-link to="/signup">
                    <a class="text-blue-500 hover:text-blue-800 cursor-pointer">{{ translations['nav_bar_signup'][language] }}</a>
                </router-link>
            </li>
            <li class="mr-6" v-if="user">
                <div class="font-semibold text-black-500">{{ translations['nav_bar_welcome'][language] }}, {{ user.username }}!</div>
            </li>
            <li class="mr-6" v-if="user">
                <div class="text-blue-500 hover:text-blue-800 cursor-pointer" @click="logout">{{ translations['nav_bar_logout'][language] }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters, useStore} from 'vuex';
import {computed} from "@vue/runtime-core";

export default {
    name: "NavigationBar",
    methods: {
        async logout(){
            await this.$store.dispatch("auth/logout");
            this.$router.push("/");
        },
    },
    computed:{
        ...mapGetters({
            user: "auth/user",
        }),
    },
    props:{
        lang: Number,
    },
    setup() {
        const translations = computed(() => useStore().state.appGlobal.translations);
        const language = computed(() => useStore().state.appGlobal.language);
        return{
            language,
            translations
        };
    }
}
</script>

<style scoped>

</style>