<script setup lang='ts'>
import { ref } from 'vue'
import { useDark, useToggle } from "@vueuse/core";
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'

const count = ref(0)
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
const isDark = useDark();
const toggleDark = useToggle(isDark);
// const toggleDark = () => {
//   console.log('submit!')
//   const isDark = useDark();
//   console.log('isDark', isDark)
//   useToggle(isDark)
//   toggleDark = useToggle(isDark);
// }


</script>

<template>
  <div>
    <el-container>
      <el-header class="line-bottom">
        <div class="color_hd">Header</div>
      </el-header>
      <el-container>
        <el-aside class="line-right" width="200px">Aside</el-aside>
        <el-main>
          <el-row class="mb-4">
            <el-button @click="toggleDark()">切换主题</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
            <el-button type="primary" :icon="Search">Search</el-button>
          </el-row>
          <el-form :model="form" label-width="120px">
            <el-form-item label="Activity name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Activity zone">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker
                  v-model="form.date1"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-time-picker
                  v-model="form.date2"
                  placeholder="Pick a time"
                  style="width: 100%"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="Activity type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Online activities" name="type" />
                <el-checkbox label="Promotion activities" name="type" />
                <el-checkbox label="Offline activities" name="type" />
                <el-checkbox label="Simple brand exposure" name="type" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor" />
                <el-radio label="Venue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>

<style lang="scss" scoped>
.line-top {
  border-top: 1px solid var(--ep-border-color);
}
.line-bottom {
  border-bottom: 1px solid var(--ep-border-color);
}
.line-left {
  border-left: 1px solid var(--ep-border-color);
}
.line-right {
  border-right: 1px solid var(--ep-border-color);
}
.color_hd {
  // color: $font-color-red;
}

</style>
