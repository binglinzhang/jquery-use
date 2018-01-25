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

<style lang="less">
@import url('../common/color.less');
.container .content {
  position: relative;
}
.recent-reading .toolbar {
  height: 0.44rem;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
}

.recent-reading .toolbar .left {
  float: left;
  width: 2rem;
  line-height: 0.44rem;
}

.recent-reading .toolbar .right {
  float: right;
}

.recent-reading .toolbar .right a {
  display: table-cell;
  width: 0.8rem;
  height: 0.4rem;
  text-align: center;
  vertical-align: middle;
  font-size: 0.26rem;
  color: @mainColor;
  border: solid 0.02rem @mainColor;
  border-radius: 0.05rem;
}

.recent-reading .content a {
  display: block;
}

.recent-reading .content .img {
  float: left;
  width: 1.2rem;
}

.recent-reading .content .img img {
  width: 1.2rem;
  height: 1.6rem;
}

.recent-reading .content .info {
  float: left;
  width: 5.7rem;
  margin-left: 0.2rem;
}

.recent-reading .content .info h2 {
  font-size: 0.3rem;
}

.recent-reading .content .info p {
  margin-top: 0.2rem;
  color: #999;
}

.recent-reading .content span.deleteBox {
    position: absolute;
    width: 0.8rem;
    right: 0.2rem;
    top: 50%;
    text-align: center;
    font-size: 0.24rem;
    transform: translateY(-50%);
    color: @mainColor;
}

.recent-reading .content span i {
  font-size: 0.32rem;
}
</style>
