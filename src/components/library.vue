<template>
    <div class="library">
        <link-head><span>书库</span></link-head>
      <div class="conditions container" :class="{showAll:isShowAll}">
        <h1>
          <span>筛选条件</span>
        </h1>
        <div class="items" style="max-height: 7.4rem;">
          <div class="item" v-for="(item,index) in configArr">
            <span>{{item.title}}：</span>
            <p>
              <a :class="{active:activeFlag[index]==_index}" @click="labelSelect(index,_index)" v-for="(_item,_index) in item.list">{{_item}}</a>
            </p>
            <!---->
          </div>
        </div>
      </div>
      <div class="contractBar" @click="showToggle">
        <i class="iconfont" :class="[isShowAll?'icon-xiangshangjiantou':'icon-xiangxiajiantou']"></i>
      </div>
      <div class="container">
        <div class="no-notes" v-show="books.length<1">亲，没有相关书籍哦！— ^_^</div>
        <div class="content" v-for="item in books">
          <router-link :to="{name:'book',query:{bookId:item.bookId}}">
            <div class="img">
              <img v-lazy="item.img">
            </div>
            <div class="info">
              <h2>{{item.name}}</h2>
              <p>{{item.author}} | {{item.label}} | {{item.status | statusFilter}}</p>
              <p>
                <span class="span-girl">最近更新&nbsp;</span>{{item.update_time}}&nbsp;
                <i v-show="item.isVip==0"></i>
              </p>
            </div>
          </router-link>
        </div>
        <div class="more" v-show="page<pageCount" @click="loadMore">加载更多&gt;&gt;</div>
      </div>
      <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import axios from "axios";
export default {
  data() {
    return {
      isShowAll:false,
      configArr: [
        {
          title: "分类",
          list: [
            "全部",
            "热血青春",
            "现代都市",
            "悬疑灵异",
            "军事历史",
            "玄幻奇幻",
            "武侠仙侠",
            "网游竞技",
            "热血言情",
            "古代情缘",
            "现代爱情",
            "幻想世界"
          ]
        },
        {
          title: "完结",
          list: ["不限", "未完结", "已完结"]
        },
        {
          title: "免费",
          list: ["不限", "免费作品", "收费作品"]
        },
        {
          title: "字数",
          list: ["不限", "30万以下", "30-50万", "50-100万", "100万以上"]
        },
        {
          title: "更新",
          list: ["不限", "三日内", "七日内", "半月内", "1一月内"]
        }
      ],
      page: 0,
      pageCount: 0,
      activeFlag: [0, 0, 0, 0, 0, 0],
      selectObj: {
        label: [0, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1013, 1014, 1015],
        status: [0, 1, 2],
        isVip: [0, 2, 1],
        wordNum: [0, 1, 2, 3, 4],
        update: [0, 1, 2, 3, 4]
      },
      books: []
    };
  },
  computed: {},
  methods: {
    getRequestUrl() {
      let dataObj = {
        cate: this.selectObj.label[this.activeFlag[0]],
        status: this.selectObj.status[this.activeFlag[1]],
        vip: this.selectObj.isVip[this.activeFlag[2]],
        update: this.selectObj.update[this.activeFlag[3]],
        words: this.selectObj.wordNum[this.activeFlag[4]]
      };
      let urlArgArr = [];
      Object.keys(dataObj).forEach(item => {
        urlArgArr.push(`${item}=${dataObj[item]}`);
      });
      return urlArgArr.join("&");
    },
    labelSelect(index, childIndex) {
	  if(this.activeFlag[index] == childIndex) return
	  this.activeFlag[index] = childIndex;
	  this.books = [];
      axios
        .get(
          `/apis/0.1/Library.php?${this.getRequestUrl()}`
        )
        .then(res => {
          this.books = res.data.data.books;
          this.page = res.data.data.page;
          this.pageCount = res.data.data.pageCount;
        });
    },
    showToggle(){
      this.isShowAll = !this.isShowAll
    },
    loadMore() {
      axios
        .get(
          `/apis/0.1/Library.php?${this.getRequestUrl()}&page=${++this.page}`
        )
        .then(res => {
          this.books.push(...res.data.data.books);
        });
    }
  },
  components: {
    nFooter,
    linkHead
  },
  created() {
    axios.get("/apis/0.1/Library.php").then(res => {
      this.books = res.data.data.books;
      this.page = res.data.data.page;
      this.pageCount = res.data.data.pageCount;
    });
  }
};
</script>

<style lang="less" scoped>
@import url("../common/color.less");
.library .search-box {
  height: 0.64rem;
  margin-top: 0.3rem;
  margin-left: 0.24rem;
}

.library .search-box .search {
  float: left;
  width: 4.8rem;
  height: 0.6rem;
  border: solid 0.02rem #b3b3b3;
  border-radius: 0.08rem;
  padding-left: 0.7rem;
  background: url(data:image/png;base64,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umvhzhlxywu8aaadiwluwhrytuw6y29tlmfkb2jllnhtcaaaaaaapd94cgfja2v0igjlz2lupslvu78iiglkpsjxnu0wtxbdzwhpshpyzvn6tlrjemtjowqipz4gphg6eg1wbwv0ysb4bwxuczp4psjhzg9iztpuczptzxrhlyigedp4bxb0az0iqwrvymugwe1qienvcmugns41lwmwmtqgnzkumtuxndgxlcaymdezlzazlzezlteyoja5oje1icagicagicaipia8cmrmoljerib4bwxuczpyzgy9imh0dha6ly93d3cudzmub3jnlze5otkvmdivmjitcmrmlxn5bnrhec1ucymipia8cmrmokrlc2nyaxb0aw9uihjkzjphym91dd0iiib4bwxuczp4bxa9imh0dha6ly9ucy5hzg9izs5jb20vegfwlzeumc8iihhtbg5zonhtce1npsjodhrwoi8vbnmuywrvymuuy29tl3hhcc8xljavbw0viib4bwxuczpzdfjlzj0iahr0cdovl25zlmfkb2jllmnvbs94yxavms4wl3nuexbll1jlc291cmnlumvmiyigeg1woknyzwf0b3jub29spsjbzg9izsbqag90b3nob3agq0mgkfdpbmrvd3mpiib4bxbnttpjbnn0yw5jzulepsj4bxauawlkoki5otaxote3qkvbotexrtc4rjcyodi1rujcrey5odmyiib4bxbnttpeb2n1bwvudelepsj4bxauzglkoki5otaxote4qkvbotexrtc4rjcyodi1rujcrey5odmyij4gphhtce1nokrlcml2zwrgcm9tihn0umvmomluc3rhbmnlsuq9inhtcc5pawq6qjk5mde5mtvcrue5mtffnzhgnzi4mjvfqkjerjk4mziiihn0umvmomrvy3vtzw50suq9inhtcc5kawq6qjk5mde5mtzcrue5mtffnzhgnzi4mjvfqkjerjk4mziilz4gpc9yzgy6rgvzy3jpchrpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7WWk5fAAADcUlEQVR42sSYaUhUURiGr0tRVmTRQvtGtqdB2QISlUERrYSQW/tYSUH9sf600B8V+hHRMhNFphUUYQWtQkFFZET7IkX5w7QiESMqE8fp/eK9cbvN3HvuzFzmg4dzvPc6953vfOec90yc1+vVFKIrWAQyQSoYApLBL9AMasBdcAVUaw7C4/H883eizfODQBFYDZKC3E8i/cFssBO8BKWgArRrDiM+xPU4sA28AoV86TWwCUwGvUEHZm4gmAP2gQdgHChjpsY7FRQsQ13AGbCQf0u/BDwN8mwb+A7qwU1eW0+mUJRk92y4GZJM3KCYD2AZyA4iJgXkgVmgo+neUZDOLCXxC60LJ0MyTKfADApYCmpNz88Ee8E0FrRkZlKIz14FWkABOALqwHUnGdoKloCPzIxRTCd+6c2qad6bjvcnlw0vg4apjiby0fdvkmympexleb83pnot9vhaliqwszz6uicbm3fi/53nrchrfbsdm0bgu9juu7k2tadpogs2kogwrxfbqbtrdok6cbwlik3394op4bfywdumnjahpsb3fdojwsxmxaxptaw8lv0c0kbffgfzzlmsf39uzlj/0xrvn/CDQ9waIo3H/MJS2BOsBKWyb9yDxoCh4LZdih2GPgITrQQNZr/OcD2Z9/pp0Q199g6zWhi7s//VlN76MGaTXfw0zN6QglpBZ24BbbzewhXbrQhYDVkT+z0096MP2y9WgmoMhex2pLB9YyXoHvvzXBaTwMVVTNt9K0GX2c9wWVAOWzFxjVaCqukM0534ljAil+1xlc21vpfclokrbzmx20+FiiB56CHtxIkoixFrs4v9HYa1yFKQn973B1gJDkdJTC9QBQaASzRpyo7xBYcsQKfnjVCMnEbu0P808wsHnAjS6KnXMGMi7hwYHmbNyGwazS1J9sYDnPqOz2VSQ/O5mi6nuRJfnKawzuRyiHzcmC+AEXSicno5aScq1Mm1ihahhC/Rz1rPaWVrDcUp/mYkFz09GljA5RymPF7PZpvPUVAWJPGJBV7ME2sWjVUoc9XONa2MGE8jflVRiQr18BpsBlsoJo3mTbcQn8FbbgeNFp+jJCpO8dePaO9pMpQrwGkR5fF4/HY/NrgZeqb+FrrP50uIpSBLUYla7OK/moKo/FgKCiaqNT7GgjQWdB4Lvfm3AAMAspXMV/h2SqgAAAAASUVORK5CYII=)
    no-repeat 0.2rem center;
  background-size: 0.35rem;
}

.library .search-box .search input {
  width: 4.5rem;
  line-height: 0.6rem;
  background: none;
  font-size: 0.24rem;
}

.library .search-box a {
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

.library .search-box .btn-girl {
  background-color: @mainColor;
}

.library .conditions h1 {
  margin-top: -0.2rem;
}

.library .conditions .spread {
  text-align: center;
  color: #999;
  font-size: 0.24rem;
  margin-top: 0.1rem;
  -webkit-box-shadow: 0 0.1rem 0.2rem 0 #f7f7f7;
  box-shadow: 0 0.1rem 0.2rem 0 #f7f7f7;
  padding: 0.2rem 0;
}

.library .conditions .spread ::after {
  content: "";
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  border-left: solid 0.01rem #999;
  border-bottom: solid 0.01rem #999;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  margin-left: 0.15rem;
  margin-top: 0.08rem;
}

.library .container {
  margin-top: 0.2rem;
}

.library .container .content {
  padding: 0.25rem;
  height: 2.4rem;
}

.library .container .content a {
  display: block;
}

.library .container .content .img {
  float: left;
  width: 1.8rem;
  height: 2.4rem;
}

.library .container .content .img img {
  width: 1.8rem;
  height: 2.4rem;
}

.library .container .content .info {
  float: left;
  width: 5rem;
  margin-left: 0.2rem;
  position: relative;
}

.library .container .content .info h3 {
  font-size: 0.26rem;
  color: #999;
  margin-top: 0.15rem;
}

.library .container .content .info h3 span {
  display: inline-block;
  margin-left: 0.2rem;
}

.library .container .content .info p {
  font-size: 0.26rem;
  color: #666;
  margin-top: 0.35rem;
}

.library .container .content .info p span {
  color: @mainColor;
}

.library .container .content .info p .span-girl {
  color: #32a1ff;
}

.library .container .content .info p i {
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  background: url(data:image/png;base64,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umvhzhlxywu8aaadiwluwhrytuw6y29tlmfkb2jllnhtcaaaaaaapd94cgfja2v0igjlz2lupslvu78iiglkpsjxnu0wtxbdzwhpshpyzvn6tlrjemtjowqipz4gphg6eg1wbwv0ysb4bwxuczp4psjhzg9iztpuczptzxrhlyigedp4bxb0az0iqwrvymugwe1qienvcmugns41lwmwmtqgnzkumtuxndgxlcaymdezlzazlzezlteyoja5oje1icagicagicaipia8cmrmoljerib4bwxuczpyzgy9imh0dha6ly93d3cudzmub3jnlze5otkvmdivmjitcmrmlxn5bnrhec1ucymipia8cmrmokrlc2nyaxb0aw9uihjkzjphym91dd0iiib4bwxuczp4bxa9imh0dha6ly9ucy5hzg9izs5jb20vegfwlzeumc8iihhtbg5zonhtce1npsjodhrwoi8vbnmuywrvymuuy29tl3hhcc8xljavbw0viib4bwxuczpzdfjlzj0iahr0cdovl25zlmfkb2jllmnvbs94yxavms4wl3nuexbll1jlc291cmnlumvmiyigeg1woknyzwf0b3jub29spsjbzg9izsbqag90b3nob3agq0mgkfdpbmrvd3mpiib4bxbnttpjbnn0yw5jzulepsj4bxauawlkojg5mdrgqtm3qkvbrjexrtc4ourbquzdnzuxoeizqtk2iib4bxbnttpeb2n1bwvudelepsj4bxauzglkojg5mdrgqtm4qkvbrjexrtc4ourbquzdnzuxoeizqtk2ij4gphhtce1nokrlcml2zwrgcm9tihn0umvmomluc3rhbmnlsuq9inhtcc5pawq6odkwnezbmzvcrufgmtffnzg5refbrkm3nte4qjnbotyiihn0umvmomrvy3vtzw50suq9inhtcc5kawq6odkwnezbmzzcrufgmtffnzg5refbrkm3nte4qjnbotyilz4gpc9yzgy6rgvzy3jpchrpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6IPEATAAAClklEQVR42sSWS2gTYRSFT9JXLFLooiu7qBvro1jtS0FBXGoVEZFiRUGotUUXbkQRwY0LVy4UbaJF1KIB8YGo6EYEUdqkNWrf1YUVU7DShbaJJvYRz2Um1PjPTKYxJhcOmZz8M1/+x713HLGGvdAjn2qh9lAV1GKkJ0JUP+Wl3NQvMXP1H5dQj6g1SH/IBNbrOkBto8ac+kz/F/TvEMZjqkDAhzIEjUcl1SzgRmQ+GgVclQXw2vgeZzoKchXr7BmgrCz5rTMzPKMHgenpeW/jBuBIq0FCMaOaWhIsFfyqU/s0gw+PAF0+YPxrIlRidBTwtHMheX7qanXvE3DnnvIYBwtITHFdLuD8OaCoSAUfOwF8DlqvRnEx0HZBG3fqNBCNKkOchjdGIkCnzyQZViffhibWiRjnc73DEGoOlvB3G/s11dbQzZuAaibKs+cslAOmw8zBQ8PA5KTqly8z3gKJkhJg/z7gyzjQcdPy/5mD5+aA7h7Vdzg46ypjv7WZicLsvOQ2XeLkYIkuv7FfW6N69VuAlSuABw+B9x+SHgNr8OAQMBVS/YpVwCLX/PfSUqBhN/CR6XT3vq0KYg2enQV6Xqt+Xh7bSqV2nZMDHNaLw0W3Vlj+GWx1uuPLvWsnsJTFxnsbCAZt18zk4D6+PIR/GHRWznh5ObBjOzAwCDx5uqBi7bRVkwMB1S8sBE4e105v22WtYKQVbHW685k6124AExMLbk/2wL19wM+I6vu4/y9eptQX7YGlCwXeJHrfvgPtV1NuyE7bI/1/LLfsp+cKc3wqZbC0xWgW3kJCMuNAFl59+gV8Kwtgr4CZhHiXQWgv5RGw7HE99TYDUJngVmHGT/UYtY46SkkTDqcRFtafKc+u01n4LcAACsuu2/FVAAgAAAAASUVORK5CYII=);
  background-size: 0.3rem;
}
.library .conditions{
  max-height: 2.6rem;
  overflow: hidden;
  transition: max-height .4s;
}
.library .conditions.showAll{
  max-height: 8rem;
}
.library .conditions .items {
  overflow: hidden;
  -webkit-transition: max-height 200ms ease;
  transition: max-height 200ms ease;
}

.library .conditions .item {
  overflow: hidden;
  padding: 0.05rem 0.2rem;
}

.library .conditions .item span {
  float: left;
  width: 1.2rem;
  font-size: 0.24rem;
  line-height: 0.5rem;
  margin-top: 0.2rem;
}

.library .conditions .item p {
  float: left;
  width: 5.9rem;
}

.library .conditions .item p a {
  float: left;
  width: 1.2rem;
  margin-right: 0.23rem;
  color: #999;
  line-height: 0.5rem;
  font-size: 0.24rem;
  border: solid 0.01rem #999;
  border-radius: 0.3rem;
  margin-top: 0.2rem;
  text-align: center;
}

.library .conditions .item p .active {
  color: @mainColor;
  border-color: @mainColor;
}

.library .conditions .item .third-category {
  width: 6.7rem;
  background-color: #f2f2f2;
  padding: 0.2rem;
  padding-top: 0;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
}

.library .no-notes {
  background-color: #fff;
  padding: 0.2rem 0;
  text-align: center;
}
.contractBar{
  text-align: center;
  background: rgba(238, 237, 237,.6);
  margin: 10px 0;
  .iconfont{
      font-size: 20px;
  }
}
</style>


