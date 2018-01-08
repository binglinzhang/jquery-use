<template>
    <div class="recent-reading">
        <div class="loading" v-show="isLoading">正在加载，请稍等...</div>
        <div class="toolbar" style="">
            <div class="left">共{{readList.length}}本</div>
            <div class="right" @click="manageFlag=!manageFlag">
                <a>{{manageFlag?'完成':'管理'}}</a>
            </div>
        </div>
        <div class="no-notes" v-if="!readList.length">亲，你还没有阅读记录哦！— ^_^</div>
        <div class="content" v-for="item in readList">
            <router-link to="/chapter" class="clearfix">
                <div class="img">
                    <img :src="item.img">
                </div>
                <div class="info">
                    <h2>{{item.name}}</h2>
                    <p>更新至 {{item.updateCord}}</p>
                    <p>
                        已阅读至 {{item.readCord}}
                    </p>
                </div>
            </router-link>
            <span v-show="manageFlag">
                <i class="fa fa-trash-o"></i>
                <br>删除
            </span>
        </div>
        <div class="more">点击加载更多</div>
    </div>
</template>

<script>
export default {
  name: "recent_reading",
  data() {
    return {
      isLoading:false,
      manageFlag:false,
      readList: [
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          readCord:"第一章 一首简单的小情歌",
          updateCord:"第八章",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          readCord:"第一章 一首简单的小情歌",
          updateCord:"第八章",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          readCord:"第一章 一首简单的小情歌",
          updateCord:"第八章",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          readCord:"第一章 一首简单的小情歌",
          updateCord:"第八章",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          readCord:"第一章 一首简单的小情歌",
          updateCord:"第八章",
          bookId: 123
        }        
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.container .content{
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
  color: #ff6060;
  border: solid 0.02rem #ff6060;
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

.recent-reading .content span {
  position: absolute;
  width: 0.8rem;
  right: 0.2rem;
  top: 0.4rem;
  text-align: center;
  font-size: 0.24rem;
  color: #ff6060;
}

.recent-reading .content span i {
  font-size: 0.32rem;
}
</style>
