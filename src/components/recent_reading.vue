<template>
    <div class="recent-reading">
        <div class="loading" v-show="isLoading">正在加载，请稍等...</div>
        <div class="toolbar" style="">
            <div class="left">共{{readList.length}}本</div>
            <div class="right" @click="manageFlag=!manageFlag" v-if="readList.length">
                <a @click="deleteBooks">{{manageFlag?'删除':'管理'}}</a>
            </div>
        </div>
        <div class="no-notes" v-if="!readList.length">亲，你还没有阅读记录哦！— ^_^</div>
        <div class="content" v-for="item in readList" v-if="readList.length">
            <router-link :to="{name:'chapter',query:{chapterId:item.last_chapter_id}}" class="clearfix">
                <div class="img">
                    <img v-lazy="item.cover">
                </div>
                <div class="info">
                    <h2>{{item.bookname}} <i class="iconfont icon-xin mainColor" style="font-size:16px" v-if="item.hasnew"></i></h2>
                    <p>{{item.intro}}...</p>
                    <p>
                        <span class="mainColor">{{item.text}}</span> 读过
                    </p>
                </div>
            </router-link>
            <span v-show="manageFlag" class="deleteBox">
				<el-checkbox v-model="item.selectFlag"></el-checkbox>
            </span>
        </div>
        <div class="more" v-show="page<pageCount" @click="loadMore">点击加载更多</div>
    </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
	name: "recent_reading",
	data() {
		return {
			isLoading: false,
			manageFlag: false,
			page: 0,
			pageCount: 0,
			readList: []
		};
	},
	methods: {
		init() {
			axios.get("/apis/0.1/User/UserRead.php").then(res => {
				this.readList = res.data.data.data.map(item => {
					return Object.assign({}, item, { selectFlag: false });
				});
				this.page = res.data.data.page;
				this.pageCount = res.data.data.pageCount;
			});
		},
		loadMore() {
			axios
				.get(`/apis/0.1/User/UserRead.php?page=${++this.page}`)
				.then(res => {
					let list = res.data.data.data.map(item => {
						return Object.assign({}, item, { selectFlag: false });
					});
					this.readList.push(...list)
				});
		},
		deleteBooks(){
			if(!this.manageFlag) return false;
			let deleteBookIdList  = [];
			let newReadList = this.readList.filter(item=>{
				if(item.selectFlag){
					deleteBookIdList.push(item.bookid);
					return false
				}
				return true
			});
			if(!deleteBookIdList.length) return false;
			const data = {
				bookIds:deleteBookIdList.join(',')
			}
			axios.post('/apis/0.1/User/DelMyRead.php',qs.stringify(data)).then(res=>{
				this.readList = newReadList
			})
		}
	},
	created() {
		this.init();
	}
};
</script>
<style lang="less" scoped>
@import url("../common/color.less");
</style>
