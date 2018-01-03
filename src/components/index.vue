<template>
    <div class="index">
		<n-header></n-header>

        <n-nav></n-nav>

        <div class="container picture-recommend">
            <h1>
                <span> 热门推荐</span>
            </h1>
            <div class="content">
                <div class="img" v-for="item in hotRecommend">
                    <a href="https://m.yyread.com/bookinfo/779" class="">
                        <img :src="item.img"> {{item.name}}
                    </a>
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
                            <a href="https://m.yyread.com/bookinfo/740" class="">
                                <div class="top-item">
                                    <div class="item-img">
                                        <img :src="godBook.first.img">
                                    </div>
                                    <h2>{{godBook.first.name}}</h2>
                                    <div class="item-info">
                                        <p>{{godBook.first.shortDetail}}</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li v-for="item in godBook.others">
                            <a href="https://m.yyread.com/bookinfo/761"  :class="{hot:item.hot}">
                                <span>[{{item.label}}]</span> {{item.shortDetail}}
                            </a>
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
                <div class="img" v-for="item in shortLove">
                    <a href="https://m.yyread.com/bookinfo/938" class="">
                        <img :src="item.img"> {{item.name}}
                    </a>
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
                            <a href="https://m.yyread.com/bookinfo/817" class="">
                                <div class="top-item">
                                    <div class="item-img">
                                        <img :src="newBookRecommend.first.img">
                                    </div>
                                    <h2>{{newBookRecommend.first.name}}</h2>
                                    <div class="item-info">
                                        <p>{{newBookRecommend.first.shortDetail}}</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li v-for="item in newBookRecommend.others">
                            <a href="https://m.yyread.com/bookinfo/907" :class="{hot:item.hot}">
                                <span>[{{item.label}}]</span> {{item.shortDetail}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <rank-list></rank-list>

        <n-footer></n-footer>
    </div>
</template>

<script>
import nHeader from "./nheader.vue"
import nNav from "./nav.vue"
import rankList from './rankingList.vue'
import nFooter from './nfooter.vue'
export default {
  name: "index",
  data() {
    return {
      hotRecommend: [
        { img: "/static/book_id.jpg", name: "爱情不走心", bookId: 123 },
        { img: "/static/book_id.jpg", name: "爱情不走心", bookId: 123 },
        { img: "/static/book_id.jpg", name: "爱情不走心", bookId: 123 },
        { img: "/static/book_id.jpg", name: "爱情不走心", bookId: 123 },
        { img: "/static/book_id.jpg", name: "爱情不走心", bookId: 123 },
        { img: "/static/book_id.jpg", name: "爱情不走心", bookId: 123 }
      ],
      godBook: {
        first: {
          img: "/static/book_id.jpg",
          name: "爱情不走心",
          shortDetail:
            "19岁那年我剪断了养父的命根子，因为飞哥，我逃过了牢狱之灾，开始坐台……在那里，遇到了一个后来让我交付了一生的人！",
          bookId: 123
        },
        others: [
          {
            label: "都市情缘",
            shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……",
            bookId: 123
          },
          {
            label: "都市情缘",
            shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……",
            bookId: 123
          },
          {
            label: "都市情缘",
            shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……",
            bookId: 123
          },
          {
            label: "都市情缘",
            shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……",
            bookId: 123
          },
          { label: "都市情缘", shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……", bookId: 123 }
        ]
      },
      shortLove: [
        { name: "爱情不走心", img: "/static/book_id.jpg", bookId: 123 },
        { name: "爱情不走心", img: "/static/book_id.jpg", bookId: 123 },
        { name: "爱情不走心", img: "/static/book_id.jpg", bookId: 123 },
        { name: "爱情不走心", img: "/static/book_id.jpg", bookId: 123 },
        { name: "爱情不走心", img: "/static/book_id.jpg", bookId: 123 },
        { name: "爱情不走心", img: "/static/book_id.jpg", bookId: 123 }
      ],
      newBookRecommend: {
        first: {
          img: "/static/book_id.jpg",
          name: "爱情不走心",
          shortDetail:
            "19岁那年我剪断了养父的命根子，因为飞哥，我逃过了牢狱之灾，开始坐台……在那里，遇到了一个后来让我交付了一生的人！",
          bookId: 123
        },
        others: [
          {
            label: "都市情缘",
            shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……",
            bookId: 123
          },
          {
            label: "都市情缘",
            shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……",
            bookId: 123
          },
          {
            label: "都市情缘",
            shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……",
            hot: true,
            bookId: 123
          },
          {
            label: "都市情缘",
            shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……",
            bookId: 123
          },
          { label: "都市情缘", shortDetail: " 这是一首简单的小情歌，唱歌我们心中的百合……", bookId: 123 }
        ]
      }
    };
  },
  components: {
    nHeader,
    nNav,
    rankList,
    nFooter
  }
};
</script>
