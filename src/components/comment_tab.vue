<template>
	<div class="comment-tab">
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
						{{item.time}} 
						<!-- <a href="https://m.yyread.com/commentinfo/473" class="" ></a> -->
						<router-link to="/comment_page" v-if="item.childCommentNum>2">· 查看{{item.childCommentNum}}条回复&gt;&gt;</router-link>
						<a class="icon to-reply" @click="item.reflyFlag = !item.reflyFlag"></a>
					</p>
					<div class="comment-box reply-box" v-show="item.reflyFlag">
						<div class="reply-input">
							<textarea cols="28" rows="3" :placeholder="'回复@'+item.name"></textarea>
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
</template>

<script>
export default {
  name: "comment_tab",
  data() {
    return {
	  loading: false,
      comment: [
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          commentId: "32562",
          top: 0,
          import: 0,
          label: "学渣",
          content: "这是一首简单的小情歌，唱着我们心中的百合",
          time: "2017-12-08 00:07:19",
          reflyFlag: false,
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum: 3
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          commentId: "32562",
          top: 0,
          import: 0,
          label: "学渣",
          content: "这是一首简单的小情歌，唱着我们心中的百合",
          time: "2017-12-08 00:07:19",
          reflyFlag: false,
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum: 3
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          commentId: "32562",
          top: 0,
          import: 0,
          label: "学渣",
          content: "这是一首简单的小情歌，唱着我们心中的百合",
          time: "2017-12-08 00:07:19",
          reflyFlag: false,
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum: 3
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          commentId: "32562",
          top: 0,
          import: 0,
          label: "学渣",
          content: "这是一首简单的小情歌，唱着我们心中的百合",
          time: "2017-12-08 00:07:19",
          reflyFlag: false,
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum: 3
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          commentId: "32562",
          top: 0,
          import: 0,
          label: "学渣",
          content: "这是一首简单的小情歌，唱着我们心中的百合",
          time: "2017-12-08 00:07:19",
          reflyFlag: false,
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum: 3
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          commentId: "32562",
          top: 0,
          import: 0,
          label: "学渣",
          content: "这是一首简单的小情歌，唱着我们心中的百合",
          time: "2017-12-08 00:07:19",
          reflyFlag: false,
          childComment: [
            { name: "haha", content: "hello world 123" },
            { name: "haha", content: "hello world 123" }
          ],
          childCommentNum: 3
        }
      ]
    };
  }
};
</script>

<style scoped>
.comment-info p a {
  color: #f39c12;
}
.comment-info .top-reply {
  padding: 0.1rem 0.2rem;
  background-color: #f7f7f7;
}
.comment-info .top-reply p {
  color: #333;
  line-height: 0.45rem;
}
.comment-info .top-reply p span {
  color: #32a1ff;
}
.comment-info .reply-box {
  margin-bottom: 0.2rem;
}
</style>

