<template>
    <header>
        <div class="logo">
            <img src="../assets/logo.png">
        </div>
        <div class="search" @click="$router.push('/search')">
            <div class="sear-btn" style="width: 3.5rem;">输入书名</div>
        </div>
        <div class="sign">
            <router-link class="to-sign" to="/sign">
            	<i class="fa fa-edit"></i> {{sign.isSigned==1?'已签':'签到'}}
			</router-link>
        </div>
    </header>
</template>

<script>
import axios from 'axios'
export default {
  name: "nheader",
  data() {
    return {
		sign:{}
	};
  },
  created(){
	  axios.get('/apis/0.1/User/sign_record.php').then(res=>{
		  this.sign = res.data.data || {};
	  })
  }
};
</script>

<style lang="less" scoped>
@import url('../common/mixin.less');
header .logo {
  float: left;
  width: 1.6rem;
  margin-top: 0.12rem;
  margin-left: 0.2rem;
}
header .logo img {
  width: 1.6rem;
}
header .search {
  float: left;
  margin-top: 0.15rem;
  margin-left: 0.3rem;
}
header .search .sear-btn {
  display: table-cell;
  height: 0.6rem;
  background-color: #f7f7f7;
  font-size: 0.24rem;
  color: #999;
  border-radius: 0.3rem;
  vertical-align: middle;
  padding-left: 0.6rem;
  background-image: url(data:image/png;base64,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umvhzhlxywu8aaadiwluwhrytuw6y29tlmfkb2jllnhtcaaaaaaapd94cgfja2v0igjlz2lupslvu78iiglkpsjxnu0wtxbdzwhpshpyzvn6tlrjemtjowqipz4gphg6eg1wbwv0ysb4bwxuczp4psjhzg9iztpuczptzxrhlyigedp4bxb0az0iqwrvymugwe1qienvcmugns41lwmwmtqgnzkumtuxndgxlcaymdezlzazlzezlteyoja5oje1icagicagicaipia8cmrmoljerib4bwxuczpyzgy9imh0dha6ly93d3cudzmub3jnlze5otkvmdivmjitcmrmlxn5bnrhec1ucymipia8cmrmokrlc2nyaxb0aw9uihjkzjphym91dd0iiib4bwxuczp4bxa9imh0dha6ly9ucy5hzg9izs5jb20vegfwlzeumc8iihhtbg5zonhtce1npsjodhrwoi8vbnmuywrvymuuy29tl3hhcc8xljavbw0viib4bwxuczpzdfjlzj0iahr0cdovl25zlmfkb2jllmnvbs94yxavms4wl3nuexbll1jlc291cmnlumvmiyigeg1woknyzwf0b3jub29spsjbzg9izsbqag90b3nob3agq0mgkfdpbmrvd3mpiib4bxbnttpjbnn0yw5jzulepsj4bxauawlkoki5otaxote3qkvbotexrtc4rjcyodi1rujcrey5odmyiib4bxbnttpeb2n1bwvudelepsj4bxauzglkoki5otaxote4qkvbotexrtc4rjcyodi1rujcrey5odmyij4gphhtce1nokrlcml2zwrgcm9tihn0umvmomluc3rhbmnlsuq9inhtcc5pawq6qjk5mde5mtvcrue5mtffnzhgnzi4mjvfqkjerjk4mziiihn0umvmomrvy3vtzw50suq9inhtcc5kawq6qjk5mde5mtzcrue5mtffnzhgnzi4mjvfqkjerjk4mziilz4gpc9yzgy6rgvzy3jpchrpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7WWk5fAAADcUlEQVR42sSYaUhUURiGr0tRVmTRQvtGtqdB2QISlUERrYSQW/tYSUH9sf600B8V+hHRMhNFphUUYQWtQkFFZET7IkX5w7QiESMqE8fp/eK9cbvN3HvuzFzmg4dzvPc6953vfOec90yc1+vVFKIrWAQyQSoYApLBL9AMasBdcAVUaw7C4/H883eizfODQBFYDZKC3E8i/cFssBO8BKWgArRrDiM+xPU4sA28AoV86TWwCUwGvUEHZm4gmAP2gQdgHChjpsY7FRQsQ13AGbCQf0u/BDwN8mwb+A7qwU1eW0+mUJRk92y4GZJM3KCYD2AZyA4iJgXkgVmgo+neUZDOLCXxC60LJ0MyTKfADApYCmpNz88Ee8E0FrRkZlKIz14FWkABOALqwHUnGdoKloCPzIxRTCd+6c2qad6bjvcnlw0vg4apjiby0fdvkmympexleb83pnot9vhaliqwszz6uicbm3fi/53nrchrfbsdm0bgu9juu7k2tadpogs2kogwrxfbqbtrdok6cbwlik3394op4bfywdumnjahpsb3fdojwsxmxaxptaw8lv0c0kbffgfzzlmsf39uzlj/0xrvn/CDQ9waIo3H/MJS2BOsBKWyb9yDxoCh4LZdih2GPgITrQQNZr/OcD2Z9/pp0Q199g6zWhi7s//VlN76MGaTXfw0zN6QglpBZ24BbbzewhXbrQhYDVkT+z0096MP2y9WgmoMhex2pLB9YyXoHvvzXBaTwMVVTNt9K0GX2c9wWVAOWzFxjVaCqukM0534ljAil+1xlc21vpfclokrbzmx20+FiiB56CHtxIkoixFrs4v9HYa1yFKQn973B1gJDkdJTC9QBQaASzRpyo7xBYcsQKfnjVCMnEbu0P808wsHnAjS6KnXMGMi7hwYHmbNyGwazS1J9sYDnPqOz2VSQ/O5mi6nuRJfnKawzuRyiHzcmC+AEXSicno5aScq1Mm1ihahhC/Rz1rPaWVrDcUp/mYkFz09GljA5RymPF7PZpvPUVAWJPGJBV7ME2sWjVUoc9XONa2MGE8jflVRiQr18BpsBlsoJo3mTbcQn8FbbgeNFp+jJCpO8dePaO9pMpQrwGkR5fF4/HY/NrgZeqb+FrrP50uIpSBLUYla7OK/moKo/FgKCiaqNT7GgjQWdB4Lvfm3AAMAspXMV/h2SqgAAAAASUVORK5CYII=);
  background-repeat: no-repeat;
  background-size: 0.3rem;
  background-position: 0.2rem 0.15rem;
}
header .sign {
  float: right;
  margin-right: 0.2rem;
  line-height: 0.9rem;
  font-size: 0.26rem;
}
header .sign .to-sign {
  color: @mainColor;
}
</style>


