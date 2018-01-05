<template>
    <div class="chapter">
        <section class="read-content" :class="[{onNight:nightFlag},activeSkin]">
            <div class="read-action-mid">
            </div>
			<transition name="slideTopToBottom">
				<div class="read-content-header" v-show="menuSetFlag">
					<i class="iconfont icon-i-left" style="color:white;font-size:18px;" @click="$router.go(-1)"></i>
				</div>
			</transition>
			<transition name="slideRightToLeft">
				<div class="read-join-shelf" v-show="menuSetFlag" @click="collectIt">
					<span>已在书架</span>
				</div>
			</transition>

            <div class="read-content-content" @click="menuSetFlag=!menuSetFlag" :style="{fontSize:fontSize+'px'}">
                <h4 class="skin-default">{{chapter.bookname}}</h4>
                <div class="content-list">
                    <h3>{{chapter.title}}</h3>
                    <div v-html="chapter.cpContent">
                    </div>
                </div>
                <button class="nextChapter">加载下一章</button>
            </div>
            <div class="read-content-set" v-show="contentSetFlag">
                <ul class="read-set-bg-list">
                    <li class="read-set-bg-item"><span class="skin-default" :class="{active:activeSkin=='skin-default'}" @click="activeSkin='skin-default'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
                    <li class="read-set-bg-item"><span class="skin-blue" :class="{active:activeSkin=='skin-blue'}" @click="activeSkin='skin-blue'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
                    <li class="read-set-bg-item"><span class="skin-green" :class="{active:activeSkin=='skin-green'}" @click="activeSkin='skin-green'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
                    <li class="read-set-bg-item"><span class="skin-pink" :class="{active:activeSkin=='skin-pink'}" @click="activeSkin='skin-pink'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
                    <li class="read-set-bg-item"><span class="skin-dark" :class="{active:activeSkin=='skin-dark'}" @click="activeSkin='skin-dark'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
                    <li class="read-set-bg-item"><span class="skin-light" :class="{active:activeSkin=='skin-light'}" @click="activeSkin='skin-light'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
                </ul>
                <div class="read-set-switch">
                    <div class="read-set-switch-item" @click="fontSize==12?'':fontSize--">
                        <i class="iconfont icon-zitijianxiao01" style="font-size:20px"></i>
                    </div>
                    <div class="read-set-switch-item" @click="fontSize++">
                    	<i class="iconfont icon-zitijiada01" style="font-size:20px"></i>
                    </div>
                </div>
            </div>
			<transition name="slideBottomToTop">
				<div class="read-content-footer" v-show="menuSetFlag">
					<ul class="footer-tab">
						<li class="footer-tab-item" @click="$router.push('/menu')">
							<div class="footer-tab-icon">
								<i class="iconfont icon-Service-catalog" style="font-size:18px"></i>
							</div>
							<p class="footer-tab-label">
								目录
							</p>
						</li>
						<li class="footer-tab-item" @click="nightFlag=!nightFlag">
							<div class="footer-tab-icon">
								<i class="iconfont icon-yueliang" style="font-size:18px"></i> 
							</div>
							<p class="footer-tab-label">
								夜间模式
							</p>
						</li>
						<li class="footer-tab-item" @click="contentSetFlag=!contentSetFlag">
							<div class="footer-tab-icon">
								<i class="iconfont icon-icon-yxj-font" style="font-size:18px"></i>
							</div>
							<p class="footer-tab-label">
								设置
							</p>
						</li>
					</ul>
				</div>
			</transition>

        </section>
    </div>
</template>

<script>
export default {
  name: "chapter",
  data() {
    return {
      menuSetFlag: false,
      contentSetFlag: false,
      nightFlag: false,
	  activeSkin: "skin-default",
	  fontSize:14,
	  iscollected:false,
      chapter: {
        bookname: "天字号保镖",
        id: "212",
        title: "第一章:捣蛋鬼",
        cpContent:
          "<p>嗡嗡嗡……\r</p><p></p><p>今晚的风真大，住在木屋的风蝶，又要遭罪了。\r</p><p></p><p>风蝶站在窗口，水汪汪的眼睛正目不转睛地盯着窗外被风吹得摇摇晃晃的木棉树，木棉树上红色的花朵，正随着风一朵朵的坠落，就像红色的血液，一滴滴地跌落在地。\r</p><p></p><p>风蝶不停地嘀咕着：“妈的，今晚的风咋来的这么猛烈，幸好，我没有听信南明的话，和他出去遛弯子，不然我的小s型身材就要变成8字型了。”\r</p><p></p><p>风肆意妄为的在大街小港横行霸道，这声音，这架势，连秦风送来的电子猫都吓的直打哆嗦，上窜下跳的喵喵嗷叫。\r</p><p></p><p>狂风声伴着猫叫声让本来心情就有点遭的风蝶，更火冒三丈。\r</p><p></p><p>她瞪着那只猫，威胁道：“丑猫，你在乱叫，信不信明天我把你送孤儿院去。”\r</p><p></p><p>那只猫不知是真懂还是装懂，听了风蝶的话，它竟然安静了。小心翼翼地走到了它的床上，闭着眼静静地躺着。\r</p><p></p><p>风，没有丝毫要停的迹象，还越吹越放肆。那嗡嗡嗡作响的声音，一直循环在风蝶的耳旁，她受不了，便向窗在吼着：“啊……要不要这么过分，还有完没完，该死的老天。总是针对我，从小到大，姐就缺少温暖，如今好不容易有一座与自己依依相伴的木屋，你却要这样来糟蹋折磨它。你是不是存心与我过不去，难道我上辈子欠你的钱了。”\r</p><p></p><p>“唉！骂也白骂，还不如留点口水养牙齿。”\r</p><p></p><p>“啊……烦死了……”\r</p><p></p><p>时间一分一秒过去了。风仍然在它的岗位执勤。\r</p><p></p><p>风蝶站的太久了，脚感觉有点麻了。便坐在自己自创的藤椅上悠哉游哉的看着满屋子的菊花，闻着它们散发出的清香味，心里的火慢慢的熄灭了不少，她闭着眼，身临其境，自己就像那花中的精灵一样，在花里施展着魔法。她非常喜欢花。她和花好像有一种说不清楚的渊源。\r</p><p></p><p>嘟嘟嘟……\r</p><p></p><p>电话响了，响声打碎了风蝶陶醉的心，她很生气，站起身，接起电话就大声吼着：“是哪个找死的家伙，竟然在我神游花海时来打扰我，是不是存心找茬。”\r</p><p></p><p>“哈哈哈……，风蝶，我就知道，老天只要一刮风，你的疯病就要发作，你可不要出去乱咬人哟，别伤及无辜。”\r</p><p></p><p>话筒那边传来的是那种带有男性特有魅力的雌音，风蝶便猜出是谁了，张大嘴就开始骂道：“秦峰，混蛋，你个男白骨精，敢骂你姑奶奶是疯狗，好啊！七小时不见，跑去偷看了唐僧几眼，兽性又发作了，你有种再奚落我，明天见面，让你尝尝姐的‘黑齿锋利獠牙的历害。”\r</p><p></p><p>秦峰不甘示弱，挑逗着着说“哎哟，风蝶儿，你小人不记大人过，饶过我吧！我好害怕哟，我现在全身都在打哆嗦，但我最害怕的还是你那‘黑齿锋利獠牙’一去不复返，让你变成缺牙黑老大，哈哈哈……”\r</p><p></p><p>秦峰那得意的笑声，气的风蝶小脸通红，连说话都结巴了：“你……你个疯癫子，你还奚落我，信不信，我花精灵变魔术，从话筒里钻过去，抽你的白骨筋。”\r</p><p></p><p>秦峰了解风蝶，等下人没钻过去，话筒却被卡坏了，发不着，便转移了话题。\r</p><p></p><p>“风蝶，我今天打电话给你，主要是想提醒你，今晚风很大，你要好好照顾我送给你的那只电子猫，你被风吹跑不要紧，可如果它有什么三长两短，我一定会拿出我家祖传的‘杀猪刀’宰了你，belive it or not。”\r</p><p></p><p>风蝶被秦峰的话气的蹬脚了，她咬牙切齿的正想反驳几句，谁知对方挂机了。\r</p><p></p><p>风蝶用力放下了电话，心里恨不得把秦峰千刀万剐，她在心里狠狠的说：该死的秦峰，等着瞧，明天，我一定要让你尝尝我新配制的万能胶水，我要让你在全班同学面前，出尽洋相。\r</p><p></p><p>宁愿得罪小人，也不愿得罪女人，女人永远比小人难对付。",
        order: "1"
      }
    };
  },
  watch:{
	  menuSetFlag(newOne,oldOne){
		  if(!newOne){
			  this.contentSetFlag = false
		  }
	  }
  },
  methods:{
	  collectIt(){
		  if(iscollected){
			  return
		  }

	  }
  }
};
</script>

<style lang="less" scoped>
.skin-default {
  background-color: #c4b395;
}
.skin-blue {
  background-color: #c3d4e6;
}
.skin-green {
  background-color: #c8e8c8;
}
.skin-pink {
  background-color: #f8c9c9;
}
.skin-dark {
  background-color: #3e4349;
}
.skin-light {
  background-color: #f6f7f9;
}
.read-content {
  position: relative;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.85);
  min-height: 100%;
}
.read-content .read-content-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  overflow: hidden;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 99;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.read-join-shelf {
  position: fixed;
  top: 50px;
  right: 0;
  height: 30px;
  width: 70px;
  line-height: 30px;
  text-align: center;
  border-radius: 15px 0 0 15px;
  overflow: hidden;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 99;
}
.read-content-content {
  position: relative;
  overflow: hidden;
  padding: 10px 15px 80px;
  font-size: 14px;
}
.read-content-content h4 {
  font-size: 12px;
  color: #666;
  font-weight: 400;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 30px;
  padding-left: 15px;
  z-index: 9;
}
.read-content.onNight .read-content-content h4 {
  color: hsla(0, 0%, 100%, 0.5);
  background-color: #1a1a1a;
}
.read-content-content button.nextChapter {
  position: absolute;
  bottom: 20px;
  left: 10%;
  display: block;
  width: 80%;
  font-size: 16px;
  line-height: 36px;
  border: none;
  border-radius: 100px;
  color: #fff;
  background-color: #ed424b;
  z-index: 9999;
  outline: none;
}
.read-content .read-content-set {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  font-size: 14px;
  overflow: hidden;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
}
.read-content-set .read-set-bg-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 0;
  overflow: hidden;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
}
.read-set-bg-list .read-set-bg-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}
.read-set-bg-item span.active {
  border-color: #ed424b;
}
.read-set-bg-item span {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.read-set-bg-item span i{
	display: none;
}
.read-set-bg-item span.active i{
	display: inherit;
}
.read-content-set .read-set-switch {
  padding: 10px;
  display: flex;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  justify-content: space-around;
}
.read-set-switch .read-set-switch-item {
  text-align: center;
  width: 40%;
  border: 1px solid white;
  border-radius: 20px;
  height: 38px;
  line-height: 38px;
}

.read-set-switch-item span {
  display: inline-block;
  width: 80%;
  margin: 0 10%;
  border: 1px solid #fff;
  border-radius: 100px;
  line-height: 36px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}

.read-content-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  overflow: hidden;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
}
.read-content-footer .footer-tab {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 7px 0;
}
.read-content-footer .footer-tab-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}
</style>
<style lang="less">
.read-content.onNight {
  color: hsla(0, 0%, 100%, 0.5);
  background-color: #1a1a1a;
}
.read-content-content .content-list h3 {
  margin: 30px 0 20px;
  font-size: 20px;
  font-weight: bold;
}
.read-content-content .content-list p {
  text-indent: 2em;
  margin: 0.5em 0;
  letter-spacing: 0;
  line-height: 1.8;
}
</style>





























