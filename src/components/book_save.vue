<template>
    <div class="book-save">
        <div class="loading" style="display: none;">正在加载，请稍等...</div>
        <div class="toolbar" style="">
            <div class="left">共{{saveList.length}}本</div>
            <div class="right" @click="manageFlag=!manageFlag">
                <a>{{manageFlag?'完成':'管理'}}</a>
            </div>
        </div>
        <div class="no-notes" v-if="!saveList.length">亲，你还没有收藏记录哦！— ^_^</div>
        <div class="book-box">
            <div class="img" v-for="item in saveList">
                <router-link to="/book">
                    <img :src="item.img">
                    <span>{{item.name}}</span>
                </router-link>
                <i class="fa fa-trash-o" v-show="manageFlag"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "bookshelf",
  data() {
    return {
      isLoading: false,
      manageFlag: false,
      saveList: [
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.book-save .toolbar {
  height: 0.44rem;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
}

.book-save .toolbar .left {
  float: left;
  width: 2rem;
  line-height: 0.44rem;
}

.book-save .toolbar .right {
  float: right;
}

.book-save .toolbar .right a {
  display: table-cell;
  width: 0.8rem;
  height: 0.4rem;
  text-align: center;
  vertical-align: middle;
  font-size: 0.26rem;
  color: #ff6060;
  border: solid 0.02rem #ff6060;
  border-radius: 0.05rem;
}

.book-save .book-box {
  overflow: hidden;
  margin-top: 0.2rem;
}

.book-save .book-box .img {
  float: left;
  width: 2rem;
  margin: 0 0.25rem;
  margin-top: 0.2rem;
  text-align: center;
  position: relative;
}

.book-save .book-box .img img {
  width: 2rem;
  height: 2.67rem;
}

.book-save .book-box .img span {
  display: block;
  margin-top: 0.1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.book-save .book-box .img i {
  position: absolute;
  width: 0.45rem;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  right: -0.15rem;
  top: -0.15rem;
  background-color: #ff6060;
  color: #fff;
  border-radius: 0.3rem;
}
</style>
