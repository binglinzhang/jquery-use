<template>
    <div class="container fans-ranking">
        <h1>
          <span style="color: rgb(255, 96, 96);">粉丝榜</span>
        </h1>
        <div class="content" style="max-height: 3.28rem;" :class="{maxHeightAuto:maxHeightFlag}">
          <ul>
            <li :class="{top:index<3}"  v-for="(item,index) in funs">
              <span>{{index+1}}</span>
              <p>{{item.name}}</p>
              <transition name="fade">
                  <a class="" v-show="item.childFunsFlag">{{item.childFuns}}个粉丝值</a>
              </transition>
              <i style="background-color: rgb(225, 188, 36);" @click="childFunsToggle(item)">{{item.label}}</i>
            </li>
          </ul>
          <p v-if="!funs.length">暂无粉丝</p>
        </div>
        <div class="stretch" style="" @click="maxHeightFlag=!maxHeightFlag" v-text="maxHeightFlag?'收起':'展开'" v-show="funs.length>5"></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"funsRank",
    data(){
        return {
            maxHeightFlag:false,
            funs:[]
        }
    },
    methods:{
        childFunsToggle(obj){
            clearTimeout(obj.timer);
            obj.childFunsFlag = !obj.childFunsFlag;
            if(obj.childFunsFlag){
                obj.timer = setTimeout(()=>{
                    obj.childFunsFlag = false
                },1200)
            }
        }
    },
    created(){
        axios.get(`/apis/0.1/UserLevel/BookUserLevel.php?bookId=${this.$route.query.bookId}`).then(res=>{
            let arr = res.data.data;
            arr.forEach(item=>{
                Object.assign(item,{childFunsFlag:false,timer:0})
            });
            this.funs = arr;
        })
    }
}
</script>

<style lang="less" scoped>
@import url('../common/color.less');
.maxHeightAuto{
    max-height:7rem!important
}
.fans-ranking h1 a {
  float: right;
  color: #999;
}
.fans-ranking .content {
  overflow: hidden;
  -webkit-transition: max-height 250ms ease-in-out;
  transition: max-height 250ms ease-in-out;
}
.fans-ranking .content li {
  height: .5rem;
  padding: .1rem 0;
  line-height: .42rem;
}
.fans-ranking .content li span {
  float: left;
  width: .36rem;
  height: .36rem;
  color: #fff;
  background-color: #b3b3b3;
  text-align: center;
  border-radius: .2rem;
  margin-right: .1rem;
  line-height: .4rem;
  position: relative;
}
.fans-ranking .content li p {
  float: left;
  width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: .05rem;
}
.fans-ranking .content li a {
  color: #fff;
  position: absolute;
  font-size: .22rem;
  padding: 0 .05rem;
  background-color: #424240;
  right: 1.1rem;
  border-radius: .08rem;
}
.fans-ranking .content li .show {
  -webkit-animation: fade ease 2s;
          animation: fade ease 2s;
}
@-webkit-keyframes fade {
0% {
    opacity: 1;
}
70% {
    opacity: 1;
}
100% {
    opacity: 0;
}
}
@keyframes fade {
0% {
    opacity: 1;
}
70% {
    opacity: 1;
}
100% {
    opacity: 0;
}
}
.fans-ranking .content li i {
  float: right;
  width: .8rem;
  height: .4rem;
  line-height: .45rem;
  font-size: .26rem;
  text-align: right;
  text-align: center;
  color: #fff;
  border-radius: .05rem;
}
.fans-ranking .content .top span {
  background-color: #f39c12;
}
.fans-ranking .content .top p {
  color: #f39c12;
}
.fans-ranking .stretch {
  text-align: center;
  padding: .2rem 0;
}

</style>
