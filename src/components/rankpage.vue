<template>
    <div class="rank">
      <header>
        <div class="left">
          <i class="fa fa-angle-left"></i>
        </div>
        <div class="center">排行榜</div>
        <div class="right">
          <i class="fa fa-home"></i>
        </div>
      </header>
      <div class="container">
        <div class="tabs">
          <a :class="{active:activeFlag==0}" @click="activeFlag=0">点击榜</a>
          <a :class="{active:activeFlag==1}" @click="activeFlag=1">收藏榜</a>
          <a :class="{active:activeFlag==2}" @click="activeFlag=2">新书榜</a>
        </div>
        <h1>
          <span class="girl-span">排行榜</span>
          <div class="button">
            <a :class="{active:timeActiveFlag==0}" @click="timeActiveFlag=0">周</a>
            <a :class="{active:timeActiveFlag==1}" @click="timeActiveFlag=1">月</a>
            <a :class="{active:timeActiveFlag==2}" @click="timeActiveFlag=2">总</a>
          </div>
        </h1>
        <div class="content" v-for="(item,index) in activeRank[timeActiveRank]">
          <a href="https://m.yyread.com/book/779" class="">
            <div class="img">
              <img :src="item.img">
            </div>
            <div class="info">
              <h2>{{item.name}}</h2>
              <h3>
                作者: {{item.author}}&nbsp;{{item.status}}
              </h3>
              <h3>字数:{{item.wordNum}}</h3>
              <p>
                <span class="span-girl">最新</span>
                {{item.newArticle}}
              </p>
              <i :class="{top:index<3}">{{index+1}}</i>
            </div>
          </a>
        </div>     

      </div>

    </div>  
</template>

<script>
export default {
  data() {
    return {
      activeFlag:0,
      timeActiveFlag:0,
      clickRank: {
        week: [
          {name: "哈哈:爱情不走心", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ],
        month: [
            {name: "哈哈:爱情不走心2", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心2", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心2", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心2", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心2", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心2", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心2", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心2", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ],
        all: [
            {name: "哈哈:爱情不走心3", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心3", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心3", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心3", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心3", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心3", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心3", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心3", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ]
      },
      orderRank: {
        week: [
          {name: "哈哈:爱情不走心4", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心4", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心4", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心4", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心4", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心4", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心4", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心4", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ],
        month: [
            {name: "哈哈:爱情不走心5", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心5", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心5", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心5", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心5", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心5", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心5", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心5", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ],
        all: [
            {name: "哈哈:爱情不走心6", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心6", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心6", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心6", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心6", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心6", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心6", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心6", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ]
      },
      newRank: {
        week: [
          {name: "哈哈:爱情不走心7", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心7", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心7", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心7", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心7", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心7", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心7", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
          {name: "哈哈:爱情不走心7", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ],
        month: [
            {name: "哈哈:爱情不走心8", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心8", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心8", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心8", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心8", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心8", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心8", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心8", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ],
        all: [
            {name: "哈哈:爱情不走心9", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心9", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心9", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心9", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心9", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心9", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心9", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"},
            {name: "哈哈:爱情不走心9", img: "/static/book_id.jpg", author: "南风向晚", status: "连载中", wordNum: 7508326, newArticle: "第639章 最美不过遇见你19"}
        ]
      }
    };
  },
  computed:{
      activeRank(){
          return this.activeFlag == 0 ? this.clickRank : (this.activeFlag == 1 ? this.orderRank:this.newRank)
      },
      timeActiveRank(){
           return this.timeActiveFlag == 0 ? 'week' : (this.timeActiveFlag == 1 ? 'month':'all')
      }
  }
};

</script>

<style lang="less" scoped>
.rank .tabs {
      margin-bottom: .2rem;
    }

    .rank .tabs a {
      margin: 0 .4rem;
    }

    .rank .content {
      height: 2.4rem;
      padding: .2rem .25rem;
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
      margin-left: .3rem;
      position: relative;
    }

    .rank .content .info h2 {
      font-size: .3rem;
    }

    .rank .content .info h3 {
      font-size: .26rem;
      color: #999;
      margin-top: .26rem;
    }

    .rank .content .info p {
      color: #666;
      font-size: .26rem;
      margin-top: .4rem;
    }

    .rank .content .info p span {
      color: #ff6060;
    }

    .rank .content .info p .span-girl {
      color: #32a1ff;
    }

    .rank .content .info i {
      position: absolute;
      color: #fff;
      background: url(data:image/png;base64,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UmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjczRDg2MDA3QkVCMTExRTc4MTkxODFCNEUxOEYzMTQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjczRDg2MDA4QkVCMTExRTc4MTkxODFCNEUxOEYzMTQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzNEODYwMDVCRUIxMTFFNzgxOTE4MUI0RTE4RjMxNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzNEODYwMDZCRUIxMTFFNzgxOTE4MUI0RTE4RjMxNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7LLz0OAAABn0lEQVR42uyaTShEURiGz1BWzNoCC1sbs/K3EwvZWYqV1JSUhYU9FiORklJYsbFlaSM7mg0JCynlllkQKYzx8351pm63mRPuPfen3q+emvtz7nnu1zfnnDo35TjOvFJqGtSpZEQRLKYgXsKPWpWsKNaohIaI53T6kxIf5VJxn3wC6ZgKv4AGd8bdkY5xpuu9pZLYGqc4xSlOcYpTnOIUpzjFKU5xilOc4hSnOMUpTnGKU5ziFKd4aOKynbcMWkAzWFIWtiO924XfPp93CkbAmed8G9gG7X59bWR8C3RUkJY4B51gI06lIqUxAcbAm+G+dzAOskGUjl/xR9AP1v7QZh30gYeoxG9ADzj8R9sj0A2uwxbPgy5w4ePFr7T8SVjikuFecB/A/6Ogn3VgW3wPDIDnAEcj+SpiEOzaEt8BQ+DVwqQlo8ww2DTc82USL1RptApGQcniLP6ph8uVKtfvTOLHFRrIF0STAcyqvwnpY0r36Y19k3hOTxTlmAUzEayhpM851/EtWDCtVSRaQUZP05cRLwIbQZNeRrgTqn4EGABd2FMz7PPySQAAAABJRU5ErkJggg==) no-repeat center;
      background-size: .5rem;
      width: .8rem;
      height: 1.2rem;
      top: 0;
      right: 0;
      text-align: center;
      line-height: 1.1rem;
    }

    .rank .content .info .top {
      background: url(data:image/png;base64,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UmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFBRDBFRUE3QkVCMTExRTc4NkNCQUFGODk4QURDRkVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFBRDBFRUE4QkVCMTExRTc4NkNCQUFGODk4QURDRkVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUFEMEVFQTVCRUIxMTFFNzg2Q0JBQUY4OThBRENGRUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUFEMEVFQTZCRUIxMTFFNzg2Q0JBQUY4OThBRENGRUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ggnl0AAABkklEQVR42uyavUrDUBiGT1Sc4qaTd+AViI4FvQAFRd3UwcFJuyi4WRGKk4OC6FoEcXMTVLwHcVChoINWxZ9B+2N8D35DCEnUJE1z4H3hgUOakzw5+c5HobWcsclVpdQi6FRmpAqKFsTrGLQrs1JtU4ZGixfAh0HO2nVdl4r74BuwMyr8DrrcK+6OneGVtr2lYmyNU5ziFKc4xSlOcYpTnOIUpzjFKU5xilOc4hSnOMUpTnGKmyv+Khgj/gBmQQ/olvF91sUPQR/YUT8/XddkrI8dZFG8AfJgBFR8Pn8Eo2BeHigT4lp0GBSB88u5myCXROnEFb8E/eD4H3POZc5Fq8TPwAC4ijD3BgyCk7TF98EQeIrx4M9SYqW0xLfBBPhMYH/ojToFtpotvgbmpIsklYZcsxBH/CvgPEfa3dIfOkfULIOFkOvXwsRvA1ZkRtpds7MBpgPe6HWY+KmPtK7B3RS/P+3JPes+DSFQfAWUZfwCxqPu+pgpyb0rUjpH3jfu/WuTTgfoBXfeumpRLL+6/xZgACvmUzKIvPpEAAAAAElFTkSuQmCC) no-repeat center;
      background-size: .5rem;
      line-height: 1.1rem;
    }

    .container h1 span {
      font-size: .3rem;
    }

    .container h1 .girl-span {
      color: #ff6060;
      border-color: #ff6060;
    }

    .container h1 .button a {
      background-color: #f7f7f7;
      font-size: .26rem;
      color: #333;
    }

    .container h1 .button a.active {
      background-color: #ff6060;
      color: #fff;
    }
</style>


