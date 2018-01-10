<template>
	<div class="comment-tab">
		<div class="loading" style="margin: 0.5rem 0px;" v-show="loading">正在加载，请稍等...</div>
		<div class="content no-content" v-if="!comment.length">
			还没有评论哦，赶紧来抢沙发吧！
		</div>
		<div class="comment-list" v-for="item in comment">
			<div class="content comment-item">
				<div class="user-head">
					<img v-lazy="item.avatar">
				</div>
				<div class="comment-info">
					<h2>
						<span>{{item.name}}</span>

						<i class="iconfont icon-VIP icon_vip" :class="{icon_isVip:item.overtime==1}"></i>
						<!-- <i style="background-color: rgb(228, 128, 44);">{{item.label}}</i> -->
					</h2>
					<div class="text">
						<router-link :to="{name:'comment_page',query:{cId:item.id}}">{{item.content}}</router-link>
					</div>
					<p>
						{{item.time}}
						<router-link :to="{name:'comment_page',query:{bookId:bookId,cId:item.id}}" v-if="item.childCommentNum>2">· 查看{{item.childCommentNum}}条回复&gt;&gt;</router-link>
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
		<div class="more" v-if="page<pageCount">
		    点击加载更多
		</div>
	</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "comment_tab",
  data() {
    return {
      loading: false,
      page: 0,
      pageCount: 0,
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
  },
  props: {
    bookId: {
      type: String
    }
  },
  created() {
    axios
      .get(
        "http://m.shengshixiwen.com/apis/0.1/Commit/CommitList.php?bookId=229"
      )
      .then(res => {
        let arr = res.data.data.data;
        this.page = res.data.data.page;
        this.pageCount = res.data.data.pageCount;
        arr.forEach(item => {
          Object.assign(item, { reflyFlag: false });
        });
        this.comment = arr;
        console.log(res);
      });
  }
};
</script>

<style scoped>
@import url('../common/color.less');
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

