import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: ()=>import('../components/index.vue')
    },
    {
      path:'/rank',
      name:'rank',
      component:()=>import('../components/rankpage.vue')
    },
    {
      path:"/user",
      name:"user",
      component:()=>import('../components/user.vue')
    },
    {
      path:'/library',
      name:"library",
      component:()=>import('../components/library.vue')
    },
    {
      path:'/book',
      name:"book",
      component:()=>import('../components/book.vue')
    },
    {
      path:'/comment_page',
      name:'comment_page',
      component:()=>import('../components/comment_page.vue')
    },
    {
      path:'/menu',
      name:'menu',
      component:()=>import('../components/menu.vue')
    },
    {
      path:'/chapter',
      name:'chapter',
      component:()=>import('../components/chapter.vue')
    },
    {
      path:'/bookshelf',
      name:'bookshelf',
      component:()=>import('../components/bookshelf.vue')
    }
  ]
})
