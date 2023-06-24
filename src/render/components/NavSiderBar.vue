<template>
  <div class="container">
    <nav>

      <div class="brand">
          <img src="@/assets/v2.jpg" alt="...">
          <p>
              你好，
              <el-icon><ArrowLeftBold /></el-icon>
              <span>测试用户</span>
              <el-icon :size="20" color="#409EFC" class="no-inherit">
                <i-ep-Share />
              </el-icon>
              <el-icon><i-ep-circle-check-filled /></el-icon>
              <Edit style="width: 1em; height: 1em; margin-right: 8px" />
          </p>
      </div>

      <div class="list">
          <div class="bar-item active">
              <i class="fa-solid fa-home"></i>
              <span>Dashboard</span>
          </div>
          <div v-for="item in  navList" 
            class="bar-item"
            :key="item.value">
              <i class="fa-solid fa-user"></i>
              <span>{{ item.label }}</span>
          </div>
          <!-- <li>
              <i class="fa-solid fa-box"></i>
              <span>Orders</span>
          </li>
          <li>
              <i class="fa-solid fa-chart-simple"></i>
              <span>Charts</span>
          </li>
          <li>
              <i class="fa-solid fa-phone"></i>
              <span>Support</span>
          </li> -->

        </div>

    </nav>

  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import { Edit,Share, ArrowLeftBold } from "@element-plus/icons-vue";

const navList = ref([
  { label: 'Dashboard', value: 'Dashboard' },
  { label: 'Accounts', value: 'Accounts' },
  { label: 'Orders', value: 'Orders' },
  { label: 'Support', value: 'Support' },
])
</script>

<style lang="scss">
.nav {
  padding: 10px;
  border-right: 1px solid #e3e3e3;
}
nav:hover {
    width: 320px;
}

nav .brand {
    width: 100%;
    display: flex;
    align-items: center;
}

nav .brand img {
    width: 65px;
    border-radius: 50%;
    border: 4px solid rgba(230, 235, 240, .8);
}

nav .brand p {
    color: $font-color-red;
    font-weight: 500;
    font-style: italic;
    text-align: left;
    line-height: 22px;
    margin: 0 0 0 12px;
}

nav .brand p span {
    color: #3c3e43;
    display: block;
    font-size: 26px;
    font-style: normal;
}

nav .list .bar-item {
    display: flex;
    margin: 12px 0;
    padding: 20px;
    cursor: pointer;
    border-radius: 8px;
    transition: .4s ease-in-out;
}

nav .list .bar-item:hover {
    background: rgba(230, 235, 240, .4);
}

nav .list .bar-item.active {
    background: #3681f6;
}

nav .list .bar-item.active span {
    color: #fff;
}

nav .list span {
    color: #505257;
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 0 12px;
}

nav .brand p,
nav .list span {
    opacity: 0;
    pointer-events: none;
    transform: translateX(20px);
}

@keyframes fadeIn {
    to {
        opacity: 1;
        pointer-events: unset;
        transform: translateX(0);
    }
}

nav:hover .brand p {
    animation: fadeIn .4s ease-out forwards;
    animation-delay: .4s;
}

nav:hover .list span {
    animation: fadeIn .4s ease-out forwards;
}

nav:hover .list .bar-item:nth-child(1) span {
    animation-delay: .5s;
}

nav:hover .list .bar-item:nth-child(2) span {
    animation-delay: .6s;
}

nav:hover .list .bar-item:nth-child(3) span {
    animation-delay: .7s;
}

nav:hover .list .bar-item:nth-child(4) span {
    animation-delay: .8s;
}

nav:hover .list .bar-item:nth-child(5) span {
    animation-delay: .9s;
}

nav:hover .list .bar-item:nth-child(7) span {
    animation-delay: 1s;
}
</style>