<template>
    <div class="bookshelf">
	  <link-head>
	    <div class="center">
          <div class="switch-tab">
            <a :class="{active:activeFlag==0}" @click="activeFlag=0">
              <span>最近阅读</span>
            </a>
            <a :class="{active:activeFlag==1}" @click="activeFlag=1">
              <span>我的书架</span>
            </a>
          </div>
        </div>
	  </link-head>
    <div class="container">
      <recent-read v-show="activeFlag==0"></recent-read>
      <book-save v-show="activeFlag==1"></book-save>
    </div>
	  <n-footer></n-footer>
    </div>  
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter";
import recentRead from "./recent_reading.vue";
import bookSave from "./book_save.vue";
export default {
  name: "bookshelf",
  data() {
    return {
      activeFlag: 0
    };
  },
  components: {
    linkHead,
    nFooter,
    recentRead,
    bookSave
  }
};
</script>

<style lang="less" scoped>

</style>
