<template>
    <div class="index">
		<n-header></n-header>

        <n-nav></n-nav>

        <div class="container picture-recommend">
            <h1>
                <span> 热门推荐</span>
            </h1>
            <div class="content">
                <div class="img" v-for="(item,index) in hotRecommend" :key="index">
                    <router-link :to='{name:"book",query:{bookId:item.book_id}}'>
                        <img v-lazy="item.cover"> {{item.short_name}}
                    </router-link>
                </div>
            </div>
        </div>


        <div class="container new-book-recommend">
            <h1>
                <span>神书直播</span>
            </h1>
            <div class="content items">
                <div class="item-list">
                    <ul>
                        <li>
                            <router-link :to='{name:"book", query:{bookId:newBookRecommend[0].book_id} }'>
                                <div class="top-item">
                                    <div class="item-img">
                                        <img v-lazy="newBookRecommend[0].cover">
                                    </div>
                                    <h2>{{newBookRecommend[0].short_name}}</h2>
                                    <div class="item-info">
                                        <p>{{newBookRecommend[0].intro}}</p>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                        <li v-for="(item,index) in newBookRecommend.slice(1)" :key="index">
                            <router-link :to='{name:"book", query:{bookId:newBookRecommend[0].book_id} }' :class="{hot:item.color==1}">
                                <span>[{{item.cate_name}}]</span> {{item.title||item.short_name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="container picture-recommend">
            <h1>
                <span> 短言情</span>
            </h1>
            <div class="content">
                <div class="img" v-for="(item,index) in shortLove" :class="{hot:item.color==1}" :key="index">
                    <router-link :to='{name:"book", query:{bookId:item.book_id} }'>
                        <img :src="item.cover"> {{item.short_name}}
                    </router-link>
                </div>
            </div>
        </div>
        <div class="container new-book-recommend">
            <h1>
                <span>新书推荐</span>
            </h1>
            <div class="content items">
                <div class="item-list">
                    <ul>
                        <li>
                            <router-link :to='{name:"book", query:{bookId:newBookRecommend[0].book_id} }' >
                                <div class="top-item">
                                    <div class="item-img">
                                        <img v-lazy="newBookRecommend[0].cover">
                                    </div>
                                    <h2>{{newBookRecommend[0].short_name}}</h2>
                                    <div class="item-info">
                                        <p>{{newBookRecommend[0].intro}}</p>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                        <li v-for="(item,index) in newBookRecommend.slice(1)" :key="index">
                            <router-link :to='{name:"book", query:{bookId:newBookRecommend[0].book_id} }' :class="{hot:item.color==1}">
                                <span>[{{item.cate_name}}]</span> {{item.title||item.short_name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <lazy-component>
            <rank-list></rank-list>
        </lazy-component>

        <n-footer></n-footer>
    </div>
</template>

<script>
import nHeader from "./nheader.vue"
import nNav from "./nav.vue"
import rankList from './rankingList.vue'
import nFooter from './nfooter.vue'
import axios from 'axios'
export default {
  name: "index",
  data() {
    return {
      hotRecommend: [],
      godBook: [],
      shortLove: [],
	  newBookRecommend: [""],
    };
  },
  components: {
    nHeader,
    nNav,
    rankList,
    nFooter
  },
  created(){
      axios.get('/apis/0.1/hotRecommend.php').then(res=>{
          this.hotRecommend = res.data.data;
      });
      axios.get('/apis/0.1/new-book-recommend.php').then(res=>{
          this.godBook = res.data.data;
      });
      axios.get('/apis/0.1/picture-recommend.php').then(res=>{
          this.shortLove = res.data.data;
      });
      axios.get('/apis/0.1/updata-recommend.php').then(res=>{
          this.newBookRecommend = res.data.data;
	  });
  }
};
</script>
