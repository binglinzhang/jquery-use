<template>
      <div>
        <div class="container reward">
          <h1 class="h1_up">
            <span class="nv_span">打赏作者</span>
          </h1>
          <div class="award">
            <ul>
              <li :class="{active:activeFlag==0}" @click="activeFlag=0">
                <span>书币</span>
              </li>
              <li :class="{active:activeFlag==1}" @click="activeFlag=1">
                <span>咖啡</span>
              </li>
              <li :class="{active:activeFlag==2}" @click="activeFlag=2">
                <span>鲜花</span>
              </li>
              <li :class="{active:activeFlag==3}" @click="activeFlag=3">
                <span>美酒</span>
              </li>
              <li :class="{active:activeFlag==4}" @click="activeFlag=4">
                <span>钻石</span>
              </li>
              <li :class="{active:activeFlag==5}" @click="activeFlag=5">
                <span>皇冠</span>
              </li>
              <li :class="{active:activeFlag==6}" @click="activeFlag=6">
                <span>跑车</span>
              </li>
              <li :class="{active:activeFlag==7}" @click="activeFlag=7">
                <span>别墅</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="self_up">
          <span class="round"></span>
          <span>这本书太棒了，小书币犒劳一下。</span>
          <div class="cnt_btn">
            <button class="btn">打赏作者：{{rewardNum[activeFlag]}}书币</button>
          </div>
        </div>
      </div>  
</template>

<script>
export default {
    name:"reword",
    data(){
        return {
            activeFlag:0,
            rewardNum:[100,500,1000,5000,10000,50000,100000,1000000]
        }
    }
}
</script>

<style lang="less" scoped>
    .reward {
      overflow: hidden;
      margin-bottom: .4rem;
    }

    /*   .reward .btn{ float: left; width: 2rem; text-align: center; margin-top: 1rem; }
.reward .btn span{ display: block; width: 1.2rem; height: 1.2rem; border-radius: .6rem; background-color: #ed6460; color: #fff; font-size: .55rem; text-align: center; line-height: 1.3rem; margin: 0 auto; }
.reward .btn a{ display: inline-block; padding: .05rem .1rem; border-radius: .1rem; background-color: #ed6460; color: #fff; margin-top: .2rem; font-size: .3rem; } */

    .reward .h1_up {
      padding-bottom: .1rem;
    }

    .reward .award {
      float: left;
      width: 7rem;
      margin-right: .1rem;
      padding-left: 0.3rem;
      margin-bottom: .3rem;
      margin-top: .1rem;
    }

    .reward .award li {
      float: left;
      width: 1.6rem;
      height: 1.6rem;
      text-align: center;
      border-radius: .1rem;
      font-size: .24rem;
      color: #333;
      border: solid .05rem #fff;
      position: relative;
      margin-bottom: .45rem;
    }

    .reward .award li:nth-child(1) {
      background: url(../assets/1.3b19225.png) no-repeat center bottom 0.1rem #fff;
      background-size: 1.2rem;
    }

    .reward .award li:nth-child(2) {
      background: url(../assets/cafei.png) no-repeat center bottom 0.1rem #fff;
      background-size: 1.2rem;
    }

    .reward .award li:nth-child(3) {
      background: url(../assets/10.5982841.png) no-repeat center bottom 0.1rem #fff;
      background-size: 1.2rem;
    }

    .reward .award li:nth-child(4) {
      background: url(../assets/50.dcc00ae.png) no-repeat center bottom 0.1rem #fff;
      background-size: 1.2rem;
    }

    .reward .award li:nth-child(5) {
      background: url(../assets/100.d824d60.png) no-repeat center bottom 0.1rem #fff;
      background-size: 1.2rem;
    }

    .reward .award li:nth-child(6) {
      background: url(../assets/500.91ff9bd.png) no-repeat center bottom 0.1rem #fff;
      background-size: 1.2rem;
    }

    .reward .award li:nth-child(7) {
      background: url(../assets/1000.b3a01b8.png) no-repeat center bottom 0.1rem #fff;
      background-size: 1.2rem;
    }

    .reward .award li:nth-child(8) {
      background: url(../assets/10000.89e1471.png) no-repeat center bottom 0.1rem #fff;
      background-size: 1.2rem;
    }

    .reward .award li.active {
      background-color: #e4f2ff;
    }

    .reward .award li span {
      position: absolute;
      left: 50%;
      margin-left: -.8rem;
      width: 1.6rem;
      bottom: -.5rem;
      font-size: .26rem;
    }

    .self_up {
      width: 7.1rem;
      color: #ff575a;
      margin-left: 0.24rem;
      vertical-align: bottom;
      position: relative;
    }

    .self_up .round {
      display: inline-block;
      width: .10rem;
      height: .10rem;
      border-radius: 50%;
      background-color: #ff575a;
    }

    .self_up span:nth-child(2) {
      font-size: .26rem;
      color: #ff6060;
    }

    .cnt_btn {
      margin-top: .3rem;
      text-align: center;
    }

    .cnt_btn .btn {
      width: 6.1rem;
      height: .84rem;
      border: none;
      border-radius: .08rem;
      font-size: .28rem;
      background-color: #ff575c;
      color: #fff;
      -webkit-box-shadow: 0 0.12rem 0.4rem rgba(255, 87, 91, 0.31);
      box-shadow: 0 0.12rem 0.4rem rgba(255, 87, 91, 0.31);
    }

    .container.reward .nv_span {
      border-left: solid .06rem #ff6060;
      color: #ff6060;
    }
</style>
