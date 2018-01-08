<template>
    <div class="library">
        <link-head><span>书库</span></link-head>
      <div class="conditions container">
        <h1>
          <span>筛选条件</span>
        </h1>
        <div class="items" style="max-height: 7rem;">
          <div class="item">
            <span>分类：</span>
            <p>
              <a :class="{active:activeFlag.label==-1}" @click="activeFlag.label=-1">全部</a>
              <a :class="{active:activeFlag.label=='热血青春'}" @click="activeFlag.label='热血青春'">热血青春</a>
              <a :class="{active:activeFlag.label=='现代都市'}" @click="activeFlag.label='现代都市'">现代都市</a>
              <a :class="{active:activeFlag.label=='悬疑灵异'}" @click="activeFlag.label='悬疑灵异'">悬疑灵异</a>
              <a :class="{active:activeFlag.label=='军事历史'}" @click="activeFlag.label='军事历史'">军事历史</a>
              <a :class="{active:activeFlag.label=='玄幻奇幻'}" @click="activeFlag.label='玄幻奇幻'">玄幻奇幻</a>
			  <a :class="{active:activeFlag.label=='武侠仙侠'}" @click="activeFlag.label='武侠仙侠'">武侠仙侠</a>
              <a :class="{active:activeFlag.label=='网游竞技'}" @click="activeFlag.label='网游竞技'">网游竞技</a>
			  <a :class="{active:activeFlag.label=='热血言情'}" @click="activeFlag.label='热血言情'">热血言情</a>
			  <a :class="{active:activeFlag.label=='古代情缘'}" @click="activeFlag.label='古代情缘'">古代情缘</a>
			  <a :class="{active:activeFlag.label=='现代爱情'}" @click="activeFlag.label='现代爱情'">现代爱情</a>
			  <a :class="{active:activeFlag.label=='幻想世界'}" @click="activeFlag.label='幻想世界'">幻想世界</a>
            </p>
            <!---->
          </div>
          <div class="item">
            <span>出版：</span>
            <p>
			  <a :class="{active:activeFlag.publish==-1}" @click="activeFlag.publish=-1">不限</a>
              <a :class="{active:activeFlag.publish==0}" @click="activeFlag.publish=0">已出版</a>
              <a :class="{active:activeFlag.publish==1}" @click="activeFlag.publish=1">未出版</a>
            </p>
          </div>
          <div class="item">
            <span>完结：</span>
            <p>
              <a :class="{active:activeFlag.status==-1}" @click="activeFlag.status=-1">不限</a>
              <a :class="{active:activeFlag.status==0}" @click="activeFlag.status=0">未完结</a>
              <a :class="{active:activeFlag.status==1}" @click="activeFlag.status=1">已完结</a>
            </p>
          </div>
          <div class="item">
            <span>免费：</span>
            <p>
              <a :class="{active:activeFlag.isVip==-1}" @click="activeFlag.isVip=-1">不限</a>
              <a :class="{active:activeFlag.isVip==1}" @click="activeFlag.isVip=1">免费作品</a>
              <a :class="{active:activeFlag.isVip==0}" @click="activeFlag.isVip=0">收费作品</a>
            </p>
          </div>
          <div class="item">
            <span>排序时间：</span>
            <p>
              <a :class="{active:sort=='updateTime'}" @click="sort='updateTime'">更新时间</a>
              <a :class="{active:sort=='clickNum'}" @click="sort='clickNum'">点击量</a>
              <a :class="{active:sort=='orderNum'}" @click="sort='orderNum'">收藏量</a>
			  <a :class="{active:sort=='wordNum'}" @click="sort='wordNum'">字数</a>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="no-notes" v-show="activeBooks.length<1">亲，没有相关书籍哦！— ^_^</div>
        <div class="content" v-for="item in activeBooks">
          <a href="https://m.yyread.com/book/790" class="">
            <div class="img">
              <img :src="item.img">
            </div>
            <div class="info">
              <h2>{{item.name}}</h2>
              <p>{{item.author}} | {{item.label}} | {{item.status | statusFilter}}</p>
              <p>
                <span class="span-girl">最新&nbsp;</span>{{item.newArticle}}&nbsp;
                <i v-show="item.isVip==0"></i>
              </p>
            </div>
          </a>
        </div>
        <div class="more">显示更多&gt;&gt;</div>
      </div>
      <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
export default {
  data() {
    return {
      activeFlag: {
        label: -1,
        publish: -1,
        status: -1,
        isVip: -1
      },
      sort: "updateTime",
      books: [
        {
          name: "爱情不走心1",
          img: "/static/book_id.jpg",
          author: "南风向晚",
          status: 0,  //更新状态
          label: "都市情缘",
          wordNum: 7508326,
          newArticle: "第639章 最美不过遇见你19",
          isVip: 0,
          publish: 0,   //出版状态
          updateTime: 1515037997832,
          clickNum: 123123,
          orderNum: 123123,
          wordNum: 123123,
          bookId: 123,
          isVip: 0
        },
        {
          name: "爱情不走心2",
          img: "/static/book_id.jpg",
          author: "南风向晚",
          status: 0,
          label: "都市情缘",
          wordNum: 7508326,
          newArticle: "第639章 最美不过遇见你19",
          isVip: 0,
          publish: 0,
          updateTime: 1515037997833,
          clickNum: 123123,
          orderNum: 123123,
          wordNum: 123123,
          bookId: 123,
          isVip: 0
        },
        {
          name: "爱情不走心4",
          img: "/static/book_id.jpg",
          author: "南风向晚",
          status: 0,
          label: "古代情缘",
          wordNum: 7508326,
          newArticle: "第639章 最美不过遇见你19",
          isVip: 0,
          publish: 0,
          updateTime: 1515037997999,
          clickNum: 123123,
          orderNum: 123123,
          wordNum: 123123,
          bookId: 123,
          isVip: 0
        },
        {
          name: "爱情不走心6",
          img: "/static/book_id.jpg",
          author: "南风向晚",
          status: 0,
          label: "都市情缘",
          wordNum: 7508326,
          newArticle: "第639章 最美不过遇见你19",
          isVip: 0,
          publish: 0,
          updateTime: 1515037997835,
          clickNum: 123123,
          orderNum: 123123,
          wordNum: 123123,
          bookId: 123,
          isVip: 0
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          author: "南风向晚",
          status: 0,
          label: "都市情缘",
          wordNum: 7508326,
          newArticle: "第639章 最美不过遇见你19",
          isVip: 0,
          publish: 0,
          updateTime: 1515037997836,
          clickNum: 123123,
          orderNum: 123123,
          wordNum: 123123,
          bookId: 123,
          isVip: 0
        },
        {
          name: "爱情不走心",
          img: "/static/book_id.jpg",
          author: "南风向晚",
          status: 0,
          label: "都市情缘",
          wordNum: 7508326,
          newArticle: "第639章 最美不过遇见你19",
          isVip: 0,
          publish: 0,
          updateTime: 1515037997837,
          clickNum: 123123,
          orderNum: 123123,
          wordNum: 123123,
          bookId: 123,
          isVip: 0
        }
      ]
    };
  },
  computed: {
    activeBooks() {
      let temp;
      temp = this.books.filter(item => {
        let isSuit = true;
        for (let i in this.activeFlag) {
          if (this.activeFlag[i] != -1 && this.activeFlag[i] != item[i]) {
            isSuit = false;
            break;
          }
        }
        return isSuit;
      });
      temp.sort((a, b) => {
        return a[this.sort] - b[this.sort];
      });
      return temp;
    }
  },
  components: {
    nFooter,
    linkHead
  }
};
</script>

<style lang="less" scoped>
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
  background-color: #ff6060;
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
  color: #ff6060;
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
  color: #ff6060;
  border-color: #ff6060;
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
</style>


