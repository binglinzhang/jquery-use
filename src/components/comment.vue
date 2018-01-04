<template>
    <div class="container comment">
        <h1>
            <a class="active">评论专区</a>
            |
            <a class="">打赏记录</a>
            <i>我要评论</i>
        </h1>
        <div class="comment-box" style="display: none;">
            <div class="comment-input">
            <textarea cols="25" rows="3" placeholder="请输入您要说的话..."></textarea>
            </div>
            <div class="comment-btn">
            <a>评论</a>
            </div>
        </div>
        <div class="comment-tab" keep-alive="">
            <div class="loading" style="margin: 0.5rem 0px;" v-show="loading">正在加载，请稍等...</div>
            <div class="content no-content" v-if="!comment.length">
                还没有评论哦，赶紧来抢沙发吧！
            </div>
            <div class="comment-list" v-for="item in comment">
                <div class="content comment-item">
                    <div class="user-head">
                        <img :src="item.avatar">
                    </div>
                    <div class="comment-info">
                        <h2>
                            <span>{{item.name}}</span>
                            <!---->
                            <img :src="item.levelImg">
                            <i style="background-color: rgb(228, 128, 44);">{{item.label}}</i>
                            <b class="top" v-if="item.top==0">置顶</b>
                            <b class="best" v-if="item.import==0">精</b>
                        </h2>
                        <div class="text">
                            <a href="https://m.yyread.com/commentinfo/473" class="">{{item.content}}</a>
                        </div>
                        <p>
                            2017-12-08 00:07:19 
                            <a href="https://m.yyread.com/commentinfo/473" class="" v-if="item.childCommentNum>2">· 查看{{item.childCommentNum}}条回复&gt;&gt;</a>
                            <a class="icon to-reply"></a>
                        </p>
                        <div class="comment-box reply-box">
                            <div class="reply-input">
                                <textarea cols="28" rows="3" placeholder="回复@I am here"></textarea>
                            </div>
                            <div class="comment-btn">
                                <a>回复</a>
                            </div>
                        </div>
                        <div class="top-reply" v-for="x in item.childComment">
                            <p><span>{{x.name}}</span>：{{x.content}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="more" style="display: none;">
            点击加载更多
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      loading:false,
      comment: [
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          id: "32562",
          top:0,
          import:0,
          label: "学渣",
          content:"这是一首简单的小情歌，唱着我们心中的百合",
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" },
          ],
          childCommentNum:3,
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          id: "32562",
          top:0,
          import:0,
          label: "学渣",
          content:"这是一首简单的小情歌，唱着我们心中的百合",
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum:3,
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          id: "32562",
          top:0,
          import:0,
          label: "学渣",
          content:"这是一首简单的小情歌，唱着我们心中的百合",
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum:3,
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          id: "32562",
          top:0,
          import:0,
          label: "学渣",
          content:"这是一首简单的小情歌，唱着我们心中的百合",
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum:3,
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          id: "32562",
          top:0,
          import:0,
          label: "学渣",
          content:"这是一首简单的小情歌，唱着我们心中的百合",
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum:3,
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          id: "32562",
          top:0,
          import:0,
          label: "学渣",
          content:"这是一首简单的小情歌，唱着我们心中的百合",
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum:3,
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.comment {
  margin-top: .4rem;
}
.comment h1 {
  height: .5rem;
  padding: 0 .2rem;
}
.comment h1 i {
  float: right;
  font-size: .26rem;
  color: #999;
}
.comment h1 .active {
  color: #ff6060;
}

.comment-info p a {
  color: #f39c12;
}
.comment-info .top-reply {
  padding: .1rem .2rem;
  background-color: #f7f7f7;
}
.comment-info .top-reply p {
  color: #333;
  line-height: .45rem;
}
.comment-info .top-reply p span {
  color: #32a1ff;
}
.comment-info .reply-box {
  margin-bottom: .2rem;
}

</style>
