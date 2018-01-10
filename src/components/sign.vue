<template>
   <div class="sign-page">
	  <link-head><span>签到</span></link-head>
      <div class="sign-container">
        <div class="sign-record">
          <div class="sign-btn" @click="signIn" :class="{hasSigned:sign.isSigned}">
            {{sign.isSigned?'已签到':'点击签到'}}
          </div>
          <p>{{sign.thisMonth}} | 累计签到
            <span>{{sign.hasSigned.length}}</span>天</p>
          <div class="sign-date">
            <a class="prev">
              <i class="fa fa-angle-left"></i>
            </a>
            <div class="date">
              <span :class="{signed:sign.hasSigned.includes(item)}" v-for="item in 31">{{item}}</span>
            </div>
            <a class="next">
              <i class="fa fa-angle-right" style="display: none;"></i>
            </a>
          </div>
        </div>
        <div class="strategy">
          <fieldset>
            <legend>签到攻略</legend>
            <p>1. 签到一天获得五个歪果实, 一个歪果实=1个歪币</p>
            <p>2. 每月累计签到10天，即可获得一张月票，全勤三张
              <a href="https://m.yyread.com/level" class="">《月票使用细则》</a>
            </p>
            <p>3. 签到当月有效，次月清零，签到次数越多，奖励越丰厚</p>
          </fieldset>
        </div>
      </div>
	  <div class="mask" v-show="signDialogFlag" @click="signDialogFlag=false"></div>
	  <transition name="fade">
		<div class="sign-hint" v-show="signDialogFlag">
			<h1>恭喜你，签到成功！</h1>
			<h2>获得
				<b>5</b>个歪果实
			</h2>
			<p>
				<a @click="signDialogFlag=false">我知道啦</a>
			</p>
		</div>
	  </transition>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
export default {
  name: "sign",
  data() {
    return {
	  signDialogFlag:false,
      sign: {
        dayNum: 31,
		isSigned: 1,  //已签1，未签0
		hasSigned:[2,6,28],
		thisMonth:'2018-01',
      }
    };
  },
  components: {
    linkHead
  },
  methods:{
	  signIn(){
		  if(this.isSigned){
			  return
		  }
		  this.signDialogFlag = true
	  }
  }
};
</script>

<style lang="less" scoped>
@import url('../common/color.less');
.sign-page .sign-container {
  padding: 0.2rem;
}
.sign-success {
  width: 1.7rem;
  height: 1.2rem;
  margin: 0.5rem auto;
  background-color: #b3b3b3;
  color: #fff;
  padding-top: 0.5rem;
  border-radius: 1rem;
  font-size: 0.22rem;
  text-align: center;
  -webkit-box-shadow: 0 0 0.3rem 0 #b3b3b3;
  box-shadow: 0 0 0.3rem 0 #b3b3b3;
}
.sign-success span {
  font-size: 0.34rem;
  line-height: 0.5rem;
}
.sign-btn {
  width: 1.7rem;
  height: 1.7rem;
  line-height: 1.7rem;
  margin: 0.5rem auto;
  background-color: @mainColor;
  border-radius: 1rem;
  text-align: center;
  -webkit-box-shadow: 0 0 0.3rem 0 @mainColor;
  box-shadow: 0 0 0.3rem 0 @mainColor;
  color: #fff;
  font-size: 0.32rem;
}
.sign-record p {
  text-align: center;
  margin-top: -0.2rem;
}
.sign-record p span {
  color: #32a1ff;
  font-weight: bold;
  font-size: 0.36rem;
}
.sign-page .strategy {
  font-size: 0.28rem;
}
.sign-page fieldset {
  border-bottom: none;
  border-left: none;
  border-right: none;
  text-align: center;
  margin-top: 0.3rem;
}
.sign-page fieldset p {
  text-align: left;
  margin-top: 0.1rem;
}
.sign-page fieldset p a {
  color: @mainColor;
}
.sign-date {
  overflow: hidden;
  margin-top: 0.2rem;
}
.sign-date .date {
  float: left;
  width: 6rem;
}
.sign-date span {
  float: left;
  width: 0.7rem;
  height: 0.7rem;
  background-color: #f7f7f7;
  color: #999;
  margin: 0.15rem;
  text-align: center;
  line-height: 0.75rem;
  border-radius: 0.1rem;
}
.sign-date .signed {
  background-color: @mainColor;
  color: #fff;
  -webkit-box-shadow: 0 0 0.1rem 0 @mainColor;
  box-shadow: 0 0 0.1rem 0 @mainColor;
}
.sign-date a {
  float: left;
  width: 0.55rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  margin-top: 2rem;
  font-size: 0.6rem;
  color: #999;
}
.sign-date .next {
  text-align: right;
}
.sign-page .sign-hint {
  position: absolute;
  width: 4.5rem;
  height: 5rem;
  background-color: #fef7f8;
  top: 2.5rem;
  left: 1.5rem;
  -webkit-box-shadow: 0 0 0.2rem 0 #b3b3b3;
  box-shadow: 0 0 0.2rem 0 #b3b3b3;
  border-radius: 0.1rem;
  z-index: 100;
}
.sign-page .sign-hint h1 {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.4rem;
  color: @mainColor;
}
.sign-page .sign-hint h2 {
  text-align: center;
  margin-top: 0.5rem;
}
.sign-page .sign-hint h2 b {
  font-size: 0.45rem;
  font-style: italic;
  color: @mainColor;
}
.sign-page .sign-hint p {
  text-align: center;
  margin-top: 1rem;
}
.sign-page .sign-hint p a {
  display: inline-block;
  background-color: @mainColor;
  color: #fff;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
  font-style: 0.28rem;
}
.sign-page .hasSigned{
	background: #67C23A;
	box-shadow: 0 0 0.3rem 0 #67C23A;
}
</style>
