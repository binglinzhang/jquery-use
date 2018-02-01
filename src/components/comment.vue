<template>
    <div class="container comment">
        <h1>
            <a :class="{active:tabFlag==0}" @click="tabFlag=0">评论专区</a>
            |
            <a :class="{active:tabFlag==1}" @click="tabFlag=1">打赏记录</a>
            <i @click="replayFlag=!replayFlag">我要评论</i>
        </h1>
        <div class="comment-box" v-show="replayFlag">
            <div class="comment-input">
                <textarea cols="25" rows="3" placeholder="请输入您要说的话..." v-model="commentContent"></textarea>
            </div>
            <div class="comment-btn">
                <a @click="postComment">评论</a>
            </div>
        </div>
        <comment-tab v-show="tabFlag==0" :bookId="bookId" :addComment="addComment"></comment-tab>
		<reward-tab v-if="tabFlag==1" :bookId="bookId"></reward-tab>
    </div>
</template>

<script>
import commentTab from "./comment_tab.vue";
import rewardTab from "./reward_tab.vue";
import axios from "axios";
import qs from "qs";
export default {
  name: "comment",
  data() {
    return {
      replayFlag: false,
      tabFlag: 0,
	  commentContent: "",
	  addComment:0
    };
  },
  props: {
    bookId: {
      type: String
    }
  },
  methods: {
    postComment() {
      let data = {
        uid: this.$uId,
        bookid: this.bookId,
        title: `${this.$userName}评论了`,
        content: this.commentContent,
		parentid: "",
		tname:""
      };
      axios
        .post(
          "/apis/0.1/Commit/AddCommit.php",
          qs.stringify(data)
        )
        .then(res => {
          if(res.data.code==200){
			  this.addComment++;
			  this.replayFlag = false;
			  this.commentContent = "";
		  }
        });
    }
  },
  components: {
    commentTab,
    rewardTab
  }
};
</script>

<style lang="less" scoped>
@import url('../common/mixin.less');
.comment {
  margin-top: 0.4rem;
}
.comment h1 {
  height: 0.5rem;
  padding: 0 0.2rem;
}
.comment h1 i {
  float: right;
  font-size: 0.26rem;
  color: #999;
}
.comment h1 .active {
  color: @mainColor;
}
</style>
