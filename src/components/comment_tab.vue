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
						<i class="iconfont icon-VIP icon_vip" :class="{icon_isVip:item.overtime==1}" v-if="$config.hasMembers"></i>
					</h2>
					<div class="text">
						<router-link :to="{name:'comment_page',query:{bookId:bookId,cId:item.id}}">{{item.content}}</router-link>
					</div>
					<p>
						{{item.time}}
						<router-link :to="{name:'comment_page',query:{bookId:bookId,cId:item.id}}" v-if="item.count>2">· 查看{{item.count}}条回复&gt;&gt;</router-link>
						<a class="icon to-reply" @click="item.reflyFlag = !item.reflyFlag"></a>
					</p>
					<div class="comment-box reply-box" v-show="item.reflyFlag">
						<div class="reply-input">
							<textarea cols="28" rows="3" :placeholder="'回复@'+item.name" v-model="item.reflyContent"></textarea>
						</div>
						<div class="comment-btn">
							<a @click="commentReplay(item)">回复</a>
						</div>
					</div>
					<div class="top-reply" v-for="x in item.childComment.slice(0,2)">
						<p><span>{{x.name}}</span>：{{x.content}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="more" v-if="page<pageCount" @click="loadMore">
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
      comment: []
    };
  },
  props: {
    bookId: {
      type: String
	},
	addComment:{
		type:Number
	}
  },
  watch:{
	  addComment(newOne,oldOne){
		this.init()
	  }
  },
  created() {
	  this.init();
  },
  methods: {
    resDataHanddle(res) {
      let arr = res.data.data.data;
      this.page = res.data.data.page;
      this.pageCount = res.data.data.pageCount;
      arr.forEach(item => {
        Object.assign(item, { reflyFlag: false,reflyContent:"" });
      });
      return arr
	},
	init(){
		axios
		.get(
			`/apis/0.1/Commit/CommitList.php?bookId=${this.$route.query.bookId}`
		)
		.then(res => {
			this.comment = this.resDataHanddle(res)
		});
	},
    loadMore() {
      axios
        .get(
          `/apis/0.1/Commit/CommitList.php?bookId=${this.$route.query.bookId}&page=${++this.page}`
        )
        .then(res => {
          this.comment.push(...this.resDataHanddle(res));
        });
	},
	commentReplay(item){
		if(!item.reflyContent){ return }
		let data = {
			uid:this.$uId,
			bookid:this.$route.query.bookId,
			title:`${this.$userName}评论了`,
			content :item.reflyContent,
			parentid:item.id,
			tname:item.name
		}
		axios.post('/apis/0.1/Commit/AddCommit.php',qs.stringify(data)).then(res=>{
			if(res.data.code==200){
				item.childComment.push({content: item.reflyContent, name: this.$userName});
				item.count++;
				item.reflyFlag = false;
				item.reflyContent = "";
			}
		})
	}
  }
};
</script>

<style scoped>
@import url("../common/mixin.less");
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

