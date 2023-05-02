<template>
  <div class="tutorial">
      <el-card class="box-card" v-if="props.section==1" shadow="hover">
          <div slot="header" class="clearfix">
              <span style="float: left">
              {{ translations['tutorials_classic_game_title'][props.lang] }}
              </span>
              <el-link style="float: right; padding: 3px 0;" type="primary" @click="StartBasicGameLink">{{ translations['tutorials_classic_game_link'][props.lang] }}</el-link>
          </div>
          <el-divider></el-divider>
          <div slot="body" class="text item">
              {{ translations['tutorials_classic_game_content'][props.lang] }}
          </div>
      </el-card>
      <el-card class="box-card" v-if="props.section==2" shadow="hover">
          <div slot="header" class="clearfix">
              <span style="float: left">
              {{ translations['tutorials_extra_game_title'][props.lang] }}
              </span>
              <el-link style="float: right; padding: 3px 0;" type="primary" @click="StartExtraGameLink">{{ translations['tutorials_extra_game_link'][props.lang] }}</el-link>
          </div>
          <el-divider></el-divider>
          <div slot="body" class="text item">
              {{ translations['tutorials_extra_game_content'][props.lang] }}
          </div>
      </el-card>
      <el-card class="box-card" v-if="props.section==3" shadow="hover">
          <div slot="header" class="clearfix">
              <span style="float: left">
              {{ translations['tutorials_view_statistics_title'][props.lang] }}
              </span>
              <el-link style="float: right; padding: 3px 0;" type="primary" @click="ViewStatisticsLink">{{ translations['tutorials_view_statistics_link'][props.lang] }}</el-link>
          </div>
          <el-divider></el-divider>
          <div slot="body" class="text item">
              {{ translations['tutorials_view_statistics_content'][props.lang] }}
          </div>
      </el-card>
  </div>
</template>

<script setup lang="ts">
import {inject} from "@vue/runtime-core";

const translations = inject("translation") as Record<string, Array<string>>;

const props = defineProps({
    section: Number,
    lang: Number
});

const emit = defineEmits([
    "startBasicGame"
]);

const StartBasicGameLink = () =>{
    emit("startBasicGame");
}

const StartExtraGameLink = () =>{
    ElMessage({
        message: translations["under_construction"][props.lang!=null?props.lang:0],
        type: 'info',
    });
}

const ViewStatisticsLink = () =>{
    ElMessage({
        message: translations["under_construction"][props.lang!=null?props.lang:0],
        type: 'info',
    });
}

</script>

<style scoped>

.text {
    font-size: 14px;
    text-align-last: left;
}

.item {
    margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: auto;
}
</style>