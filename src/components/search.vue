<template>
    <div class="search-page">
	  <link-head><span>搜索</span></link-head>

      <div class="search-box">
        <div class="search">
          <input placeholder="请输入书名，书号或作者名" type="search" autofocus v-model="inputWords">
        </div>
        <a class="a-girl" @click="search">搜索</a>
      </div>

      <div class="search-result">
        <div class="no-notes" v-show="hasSearched&&searchResult.length<1">亲，没有搜索到相关内容哦！— ^_^</div>
      </div>

      <div class="container recommend-label-container" v-show="!searchResult.length">
        <h1><span>搜索热词</span></h1>
        <ul class="label-list">
			<router-link class="label-item" v-for="item in recommendList" :to="{name:'book',query:{bookId:item.book_id}}" tag="li">{{item.short_name}}</router-link>
        </ul>
      </div>

      <div class="search-result" v-show="searchResult.length">
        <div class="search-item" v-for="item in searchResult">
          <router-link :to="{name:'book',query:{bookId:item.book_id}}">
            <div class="img">
              <img v-lazy="item.cover">
            </div>
            <div class="info">
              <h1>{{item.short_name}}</h1>
              <h2>作者：{{item.author_name}}
                <span>{{item.status | statusFilter}}</span>
              </h2>
              <h2>字数：{{item.word_count}}</h2>
              <p>
                <span>最新更新</span> {{item.update_time}} </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import axios from "axios";
export default {
	name: "search",
	data() {
		return {
			hasSearched: false,
			inputWords: "",
			recommendList: [],
			searchResult: []
		};
	},
	components: {
		linkHead
	},
	methods: {
		search() {
			axios
				.get(`/apis/0.1/Search.php?keyword=${this.inputWords}`)
				.then(res => {
					this.searchResult = res.data.data.books;
				});
		}
	},
	created() {
		axios.get("/apis/0.1/search-recommend.php").then(res => {
			this.recommendList = res.data.data;
		});
	}
};
</script>

<style lang="less">
@import url("../common/color.less");
.search-page .search-box {
	height: 0.6rem;
	margin-top: 0.3rem;
	margin-left: 0.24rem;
}
.search-page .search-box .search {
	float: left;
	width: 4.8rem;
	height: 0.6rem;
	border: solid 0.02rem #b3b3b3;
	border-radius: 0.08rem;
	padding-left: 0.7rem;
	background: url('../assets/search.png') no-repeat 0.2rem center;
	background-size: 0.35rem;
}
.search-page .search-box .search input {
	width: 4.5rem;
	line-height: 0.6rem;
	background: none;
}

.search-page .search-box a {
	float: left;
	width: 1.35rem;
	height: 0.64rem;
	line-height: 0.64rem;
	text-align: center;
	color: #fff;
	background-color: #32a1ff;
	border-radius: 0.08rem;
	margin-left: 0.2rem;
	font-size: 0.28rem;
}

.search-page .search-box .a-girl {
	float: left;
	width: 1.35rem;
	height: 0.64rem;
	line-height: 0.64rem;
	text-align: center;
	color: #fff;
	background-color: @mainColor;
	border-radius: 0.08rem;
	margin-left: 0.2rem;
	font-size: 0.28rem;
}
.search-page .search-result {
	padding: 0.2rem 0.25rem;
}
.search-page .search-result .search-item {
	height: 2rem;
	margin-top: 0.4rem;
}
.search-page .search-result .search-item a {
	display: block;
}
.search-page .search-result .img {
	float: left;
	width: 1.5rem;
	height: 2rem;
}
.search-page .search-result .img img {
	width: 1.5rem;
	height: 2rem;
}
.search-page .search-result .info {
	float: left;
	width: 5.2rem;
	margin-left: 0.3rem;
}
.search-page .search-result .info h1 {
	font-size: 0.32rem;
}
.search-page .search-result .info h2 {
	font-size: 0.26rem;
	color: #999;
	margin-top: 0.1rem;
}
.search-page .search-result .info h2 span {
	display: inline-block;
	margin-left: 0.3rem;
}
.search-page .search-result .info p {
	font-size: 0.26rem;
	color: #666;
	margin-top: 0.3rem;
}
.search-page .search-result .info p span {
	color: @mainColor;
}
.recommend-label-container {
}
.label-list {
	display: flex;
	flex-wrap: wrap;
	padding: 14px 12px;
	justify-content: flex-start;
	margin-left: -14px;
	.label-item {
		line-height: 1em;
		padding: 8px 13px;
		border-radius: 16px;
		border: 1px solid #c7c7c7;
		margin-left: 14px;
		margin-bottom: 14px;
		color: #898989;
		&:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3){
			color: @mainColor;
			border-color: @mainColor;
		}
	}

}
</style>
