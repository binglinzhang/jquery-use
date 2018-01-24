<template>
    <div class="search-page">
	  <link-head><span>搜索</span></link-head>

      <div class="search-box">
        <div class="search">
          <input placeholder="请输入书名，书号或作者名" autofocus v-model="inputWords">
        </div>
        <a class="a-girl" @click="search">搜索</a>
      </div>

      <div class="search-result">
        <div class="no-notes" v-show="hasSearched&&searchResult.length<1">亲，没有搜索到相关内容哦！— ^_^</div>
      </div>

      <div class="container book-recommend" v-show="!searchResult.length">
        <h1><span>作品推荐</span></h1>
        <div class="content">
          <div class="img" v-for="item in recommendList">
            <router-link :to="{name:'book',query:{bookId:item.bookId}}">
              <img :src="item.img"> {{item.name}}
            </router-link>
          </div>
        </div>
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
	  hasSearched:false,
	  inputWords:"",
      recommendList: [
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          bookId: 123
        }
      ],
      searchResult: []
    };
  },
  components: {
    linkHead
  },
  methods:{
	  search(){
		  axios.get(`/apis/0.1/Search.php?keyword=${this.inputWords}`).then(res=>{
			  this.searchResult = res.data.data.books;
		  })
	  }
  }
};
</script>

<style lang="less">
@import url('../common/color.less');
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
  background: url(data:image/png;base64,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UmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI5OTAxOTE3QkVBOTExRTc4RjcyODI1RUJCREY5ODMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI5OTAxOTE4QkVBOTExRTc4RjcyODI1RUJCREY5ODMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Qjk5MDE5MTVCRUE5MTFFNzhGNzI4MjVFQkJERjk4MzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qjk5MDE5MTZCRUE5MTFFNzhGNzI4MjVFQkJERjk4MzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7WWk5fAAADcUlEQVR42sSYaUhUURiGr0tRVmTRQvtGtqdB2QISlUERrYSQW/tYSUH9sf600B8V+hHRMhNFphUUYQWtQkFFZET7IkX5w7QiESMqE8fp/eK9cbvN3HvuzFzmg4dzvPc6953vfOec90yc1+vVFKIrWAQyQSoYApLBL9AMasBdcAVUaw7C4/H883eizfODQBFYDZKC3E8i/cFssBO8BKWgArRrDiM+xPU4sA28AoV86TWwCUwGvUEHZm4gmAP2gQdgHChjpsY7FRQsQ13AGbCQf0u/BDwN8mwb+A7qwU1eW0+mUJRk92y4GZJM3KCYD2AZyA4iJgXkgVmgo+neUZDOLCXxC60LJ0MyTKfADApYCmpNz88Ee8E0FrRkZlKIz14FWkABOALqwHUnGdoKloCPzIxRTCd+6C2QAd6BJvCNLw0VG4APJIBy0FdVkMymPexLEb83PNOT9VHALIqwsZz6UicBm3fI/53nRChRFbSdM0bGu9JUU7K2TAdPOGs2KogwRxFbqbtRdoK6cbwlik3394Op4BFYwDUmnJAhPsb3FdoJWsxMXAXPTAW8lv0c0KBFFgfZZlmsf39uZLJ/0XRvN/CDQ9waIo3H/MJS2BOsBKWyb9yDxoCh4LZdih2GPgITrQQNZr/OcD2Z9/pp0Q199g6zWhi7s//VlN76MGaTXfw0zN6QglpBZ24BbbzewhXbrQhYDVkT+z0096MP2y9WgmoMhex2pLB9YyXoHvvzXBaTwMVVTNt9K0GX2c9wWVAOWzFxjVaCqukM0534ljAil+1xlc21VPfcLokRBzmX20+FiiB56CHtxIkoixFrs4v9HYa1yFKQn973B1gJDkdJTC9QBQaASzRpyo7xBYcsQKfnjVCMnEbu0P808wsHnAjS6KnXMGMi7hwYHmbNyGwazS1J9sYDnPqOz2VSQ/O5mi6nuRJfnKawzuRyiHzcmC+AEXSicno5aScq1Mm1ihahhC/Rz1rPaWVrDcUp/mYkFz09GljA5RymPF7PZpvPUVAWJPGJBV7ME2sWjVUoc9XONa2MGE8jflVRiQr18BpsBlsoJo3mTbcQn8FbbgeNFp+jJCpO8dePaO9pMpQrwGkR5fF4/HY/NrgZeqb+FrrP50uIpSBLUYla7OK/moKo/FgKCiaqNT7GgjQWdB4Lvfm3AAMAspXMV/h2SqgAAAAASUVORK5CYII=) no-repeat 0.2rem center;
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
</style>

