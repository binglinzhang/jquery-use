<template>
    <div class="bookshelf">
	  <link-head>
	    <div class="center">
          <div class="switch-tab">
            <router-link to="/recent_reading" active-class="active">
              <span>最近阅读</span>
            </router-link>
            <router-link to="/book_save" active-class="active">
              <span>我的书架</span>
            </router-link>
          </div>
        </div>
	  </link-head>
    <div class="container">
	  <keep-alive>
		<router-view></router-view>
	  </keep-alive>

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
@import url('../common/color.less');
</style>
