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
@import url('../common/mixin.less');
.bookshelf .container .content {
  position: relative;
  display: flex;
  align-items: center;
}
.bookshelf .toolbar {
  height: 0.44rem;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
}

.bookshelf .toolbar .left {
  float: left;
  width: 2rem;
  line-height: 0.44rem;
}

.bookshelf .toolbar .right {
  float: right;
}

.bookshelf .toolbar .right a {
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

.bookshelf .content a {
  display: block;
  width: 6.4rem;
  flex-shrink: 0;
  overflow-x: hidden
}

.bookshelf .content .img {
  float: left;
  width: 1.2rem;
}

.bookshelf .content .img img {
  width: 1.2rem;
  height: 1.6rem;
}

.bookshelf .content .info {
  float: left;
  width: 5.0rem;
  margin-left: 0.2rem;
}

.bookshelf .content .info h2 {
  font-size: 0.3rem;
}

.bookshelf .content .info p {
  margin-top: 0.2rem;
  color: #999;
}

.bookshelf .content span.deleteBox {
    width: 0.8rem;
    text-align: center;
    font-size: 0.24rem;
    color: @mainColor;
}

.bookshelf .content span i {
  font-size: 0.32rem;
}
</style>
