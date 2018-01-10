<template>
    <div class="reward-tab" keep-alive="">
        <div class="content no-content" v-if="!rewardList.length">
        没有打赏记录
        </div>
        <div class="comment-list">
			<div class="content comment-item" v-for="item in rewardList">
				<div class="user-head">
					<img :src="item.avatar">
				</div>
				<div class="comment-info">
					<h2>
						<span>{{item.name}}</span>
						<i class="iconfont icon-VIP icon_vip" :class="{icon_isVip:item.overtime==1}"></i>
						<!-- <i style="background-color: rgb(228, 128, 44);">{{item.label}}</i> -->
					</h2>
					<div class="text">打赏了{{item.rewordNum}}歪币！
						<span>{{item.time}}</span>
					</div>
				</div>
			</div>
        </div>
        <div class="more">显示更多&gt;&gt;</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "reward_tab",
  data() {
    return {
      rewardList: [
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          label: "学渣",
          time: "2017-12-08 00:07:19",
          rewordNum: 200
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          label: "学渣",
          time: "2017-12-08 00:07:19",
          rewordNum: 200
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          label: "学渣",
          time: "2017-12-08 00:07:19",
          rewordNum: 200
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          label: "学渣",
          time: "2017-12-08 00:07:19",
          rewordNum: 200
        },
        {
          name: "朕知道了",
          id: 123,
          avatar: "/static/avatar.jpg",
          levelImg: "/static/vip_level.png",
          label: "学渣",
          time: "2017-12-08 00:07:19",
          rewordNum: 200
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
        "http://m.shengshixiwen.com/apis/0.1/UserLevel/BonusList.php?bookId=229"
      )
      .then(res => {
        console.log(res);
      });
  }
};
</script>
