<template>
    <header>
        <div class="left">
          <i class="fa fa-angle-left" onclick="window.history.go(-1)"></i>
        </div>
        <div class="center"><slot>hello</slot></div>
        <div class="right">
          <router-link to="/"><i class="fa fa-home"></i></router-link>
        </div>
    </header>
</template>

<script>
export default {
    name:"link-header",
    data(){
        return {

        }
    }
}
</script>

