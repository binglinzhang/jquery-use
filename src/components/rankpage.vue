<template>
    <div class="rank">
      <link-head><span>排行榜</span></link-head>
      <div class="container">
        <div class="tabs">
          <a :class="{active:activeFlag==0}" @click="activeFlag=0">推荐榜</a>
          <a :class="{active:activeFlag==1}" @click="activeFlag=1">订阅榜</a>
          <a :class="{active:activeFlag==2}" @click="activeFlag=2">点击榜</a>
        </div>
        <h1>
          <span class="girl-span">排行榜</span>
          <div class="button">
            <a :class="{active:timeActiveFlag==0}" @click="timeActiveFlag=0">日</a>
            <a :class="{active:timeActiveFlag==1}" @click="timeActiveFlag=1">周</a>
            <a :class="{active:timeActiveFlag==2}" @click="timeActiveFlag=2">月</a>
          </div>
        </h1>
        <div class="content" v-for="(item,index) in activeRank[timeActiveRank]">
          <router-link :to="{name:'book',query:{bookId:item.bookId}}">
            <div class="img">
              <img v-lazy="item.cover">
            </div>
            <div class="info">
              <h2>{{item.name}}</h2>
              <h3>
                作者: {{item.author}}&nbsp;{{item.status | statusFilter}}
              </h3>
              <h3>字数:{{item.word_count}}</h3>
              <p>
                <span class="span-girl">最近更新</span>
                {{item.update_time}}
              </p>
              <i :class="{top:index<3}">{{index+1}}</i>
            </div>
          </router-link>
        </div>

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
      activeFlag: 0,
      timeActiveFlag: 0,
      recommendRank: {
        day: [],
        week: [],
        month: []
      },
      orderRank: {
        day: [],
        week: [],
        month: []
      },
      clickRank: {
        day: [],
        week: [],
        month: []
      }
    };
  },
  computed: {
    activeRank() {
      return this.activeFlag == 0
        ? this.recommendRank
        : this.activeFlag == 1 ? this.orderRank : this.clickRank;
    },
    timeActiveRank() {
      return this.timeActiveFlag == 0
        ? "week"
        : this.timeActiveFlag == 1 ? "month" : "all";
    }
  },
  components: {
    nFooter,
    linkHead
  },
  created() {
    axios
      .get(
        "/apis/0.1/TopList.php?type=recommend_month"
      )
      .then(res => {
        this.recommendRank.month = res.data.data.bookinfo;
      });
    axios
      .get(
        "/apis/0.1/TopList.php?type=recommend_week"
      )
      .then(res => {
        this.recommendRank.week = res.data.data.bookinfo;
      });
    axios
      .get("/apis/0.1/TopList.php?type=recommend_day")
      .then(res => {
        this.recommendRank.day = res.data.data.bookinfo;
      });
    axios
      .get(
        "/apis/0.1/TopList.php?type=subscribe_month"
      )
      .then(res => {
        this.orderRank.month = res.data.data.bookinfo;
      });
    axios
      .get(
        "/apis/0.1/TopList.php?type=subscribe_week"
      )
      .then(res => {
        this.orderRank.week = res.data.data.bookinfo;
      });
    axios
      .get("/apis/0.1/TopList.php?type=subscribe_day")
      .then(res => {
        this.orderRank.day = res.data.data.bookinfo;
      });
    axios
      .get("/apis/0.1/TopList.php?type=click_month")
      .then(res => {
        this.clickRank.month = res.data.data.bookinfo;
      });
    axios
      .get("/apis/0.1/TopList.php?type=click_week")
      .then(res => {
        this.clickRank.week = res.data.data.bookinfo;
      });
    axios
      .get("/apis/0.1/TopList.php?type=click_day")
      .then(res => {
        this.clickRank.day = res.data.data.bookinfo;
      });
  }
};
</script>

<style lang="less" scoped>
@import url('../common/mixin.less');
.rank .container{
	min-height: 7rem;
}
.rank .tabs {
  margin-bottom: 0.2rem;
}

.rank .tabs a {
  margin: 0 0.4rem;
}

.rank .content {
  height: 2.4rem;
  padding: 0.2rem 0.25rem;
}

.rank .content a {
  display: block;
}

.rank .content .img {
  float: left;
  width: 1.8rem;
}

.rank .content .img img {
  width: 1.8rem;
  height: 2.4rem;
}

.rank .content .info {
  float: left;
  width: 4.9rem;
  margin-left: 0.3rem;
  position: relative;
}

.rank .content .info h2 {
  font-size: 0.3rem;
}

.rank .content .info h3 {
  font-size: 0.26rem;
  color: #999;
  margin-top: 0.26rem;
}

.rank .content .info p {
  color: #666;
  font-size: 0.26rem;
  margin-top: 0.4rem;
}

.rank .content .info p span {
  color: @mainColor;
}

.rank .content .info p .span-girl {
  color: #32a1ff;
}

.rank .content .info i {
  position: absolute;
  color: #fff;
  background: url(data:image/png;base64,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umvhzhlxywu8aaadiwluwhrytuw6y29tlmfkb2jllnhtcaaaaaaapd94cgfja2v0igjlz2lupslvu78iiglkpsjxnu0wtxbdzwhpshpyzvn6tlrjemtjowqipz4gphg6eg1wbwv0ysb4bwxuczp4psjhzg9iztpuczptzxrhlyigedp4bxb0az0iqwrvymugwe1qienvcmugns41lwmwmtqgnzkumtuxndgxlcaymdezlzazlzezlteyoja5oje1icagicagicaipia8cmrmoljerib4bwxuczpyzgy9imh0dha6ly93d3cudzmub3jnlze5otkvmdivmjitcmrmlxn5bnrhec1ucymipia8cmrmokrlc2nyaxb0aw9uihjkzjphym91dd0iiib4bwxuczp4bxa9imh0dha6ly9ucy5hzg9izs5jb20vegfwlzeumc8iihhtbg5zonhtce1npsjodhrwoi8vbnmuywrvymuuy29tl3hhcc8xljavbw0viib4bwxuczpzdfjlzj0iahr0cdovl25zlmfkb2jllmnvbs94yxavms4wl3nuexbll1jlc291cmnlumvmiyigeg1woknyzwf0b3jub29spsjbzg9izsbqag90b3nob3agq0mgkfdpbmrvd3mpiib4bxbnttpjbnn0yw5jzulepsj4bxauawlkojczrdg2mda3qkvcmtexrtc4mtkxodfcneuxoeyzmtqyiib4bxbnttpeb2n1bwvudelepsj4bxauzglkojczrdg2mda4qkvcmtexrtc4mtkxodfcneuxoeyzmtqyij4gphhtce1nokrlcml2zwrgcm9tihn0umvmomluc3rhbmnlsuq9inhtcc5pawq6nzneodywmdvcruixmtffnzgxote4mui0rte4rjmxndiiihn0umvmomrvy3vtzw50suq9inhtcc5kawq6nzneodywmdzcruixmtffnzgxote4mui0rte4rjmxndiilz4gpc9yzgy6rgvzy3jpchrpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7LLz0OAAABn0lEQVR42uyaTShEURiGz1BWzNoCC1sbs/K3EwvZWYqV1JSUhYU9FiORklJYsbFlaSM7mg0JCynlllkQKYzx8351pm63mRPuPfen3q+emvtz7nnu1zfnnDo35TjOvFJqGtSpZEQRLKYgXsKPWpWsKNaohIaI53T6kxIf5VJxn3wC6ZgKv4AGd8bdkY5xpuu9pZLYGqc4xSlOcYpTnOIUpzjFKU5xilOc4hSnOMUpTnGKU5ziFKd4aOKynbcMWkAzWFIWtiO924XfPp93CkbAmed8G9gG7X59bWR8C3RUkJY4B51gI06lIqUxAcbAm+G+dzAOskGUjl/xR9AP1v7QZh30gYeoxG9ADzj8R9sj0A2uwxbPgy5w4ePFr7T8SVjikuFecB/A/6Ogn3VgW3wPDIDnAEcj+SpiEOzaEt8BQ+DVwqQlo8ww2DTc82USL1RptApGQcniLP6ph8uVKtfvTOLHFRrIF0STAcyqvwnpY0r36Y19k3hOTxTlmAUzEayhpM851/EtWDCtVSRaQUZP05cRLwIbQZNeRrgTqn4EGABd2FMz7PPySQAAAABJRU5ErkJggg==)
    no-repeat center;
  background-size: 0.5rem;
  width: 0.8rem;
  height: 1.2rem;
  top: 0;
  right: 0;
  text-align: center;
  line-height: 1.1rem;
}

.rank .content .info .top {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAA4CAYAAACCNsqxAAAKQ2lDQ1BJQ0MgcHJvZmlsZQAAeNqdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwahgaqjmtwkod/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0jxos+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nd5lcuoswi4kwjoirspjqssjvlp+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjc4iwfl2qsfc4slpyuhhz8eaiv0w7fioluxd3ljfdurpkegnw0n3lamuylv1q4lhsvfjqedzyjlkd0qwlqyucvzsvqztjy26u9fq5yxvhlwrv72qx1vtwfyoxlv+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zhjy3xhny9xnqcdkd3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8ocyee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vpwpzy8av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmsj8qp5q89h6y8en0e/3pud8/vwv94Tz+4a5jreaaaazdevydfnvznr3yxjlaefkb2jlieltywdlumvhzhlxywu8aaadiwluwhrytuw6y29tlmfkb2jllnhtcaaaaaaapd94cgfja2v0igjlz2lupslvu78iiglkpsjxnu0wtxbdzwhpshpyzvn6tlrjemtjowqipz4gphg6eg1wbwv0ysb4bwxuczp4psjhzg9iztpuczptzxrhlyigedp4bxb0az0iqwrvymugwe1qienvcmugns41lwmwmtqgnzkumtuxndgxlcaymdezlzazlzezlteyoja5oje1icagicagicaipia8cmrmoljerib4bwxuczpyzgy9imh0dha6ly93d3cudzmub3jnlze5otkvmdivmjitcmrmlxn5bnrhec1ucymipia8cmrmokrlc2nyaxb0aw9uihjkzjphym91dd0iiib4bwxuczp4bxa9imh0dha6ly9ucy5hzg9izs5jb20vegfwlzeumc8iihhtbg5zonhtce1npsjodhrwoi8vbnmuywrvymuuy29tl3hhcc8xljavbw0viib4bwxuczpzdfjlzj0iahr0cdovl25zlmfkb2jllmnvbs94yxavms4wl3nuexbll1jlc291cmnlumvmiyigeg1woknyzwf0b3jub29spsjbzg9izsbqag90b3nob3agq0mgkfdpbmrvd3mpiib4bxbnttpjbnn0yw5jzulepsj4bxauawlkojfbrdbfrue3qkvcmtexrtc4nkncqufgodk4qurdrkvciib4bxbnttpeb2n1bwvudelepsj4bxauzglkojfbrdbfrue4qkvcmtexrtc4nkncqufgodk4qurdrkvcij4gphhtce1nokrlcml2zwrgcm9tihn0umvmomluc3rhbmnlsuq9inhtcc5pawq6mufemevfqtvcruixmtffnzg2q0jbquy4othbrengruiiihn0umvmomrvy3vtzw50suq9inhtcc5kawq6mufemevfqtzcruixmtffnzg2q0jbquy4othbrengruiilz4gpc9yzgy6rgvzy3jpchrpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ggnl0AAABkklEQVR42uyavUrDUBiGT1Sc4qaTd+AViI4FvQAFRd3UwcFJuyi4WRGKk4OC6FoEcXMTVLwHcVChoINWxZ9B+2n8d35dcenuje1z4h3hguoakzw5+c5HobWcsclVpdQi6FRmpAqKFsTrGLQrs1JtU4ZGixfAh0HO2nVdl4r74BuwMyr8DrrcK+6onegvtr2lymynu5zifkc4xslocyptnoiupzjfku5xiloc4hsnomuptngkmyv+Khgj/gBmQQ/olvF91sUPQR/YUT8/XddkrI8dZFG8AfJgBFR8Pn8Eo2BeHigT4lp0GBSB88u5myCXROnEFb8E/eD4H3POZc5Fq8TPwAC4ijD3BgyCk7TF98EQeIrx4M9SYqW0xLfBBPhMYH/ojToFtpotvgbmpIsklYZcsxBH/CvgPEfa3dIfOkfULIOFkOvXwsRvA1ZkRtpds7MBpgPe6HWY+KmPtK7B3RS/P+3jpes+DSFQfAWUZfwCxqPu+pgpyb0rUjpH3jfu/WuTTgfoBXfeumpRLL+6/xZgACvmUzKIvPpEAAAAAElFTkSuQmCC)
    no-repeat center;
  background-size: 0.5rem;
  line-height: 1.1rem;
}

.container h1 span {
  font-size: 0.3rem;
}

.container h1 .girl-span {
  color: @mainColor;
  border-color: @mainColor;
}

.container h1 .button a {
  background-color: #f7f7f7;
  font-size: 0.26rem;
  color: #333;
}

.container h1 .button a.active {
  background-color: @mainColor;
  color: #fff;
}
</style>


