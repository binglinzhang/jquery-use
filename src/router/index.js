import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "index",
			component: () => import("../components/index.vue")
		},
		{
			path: "/rank",
			name: "rank",
			component: () => import("../components/rankpage.vue")
		},
		{
			path: "/user",
			name: "user",
			meta:{requireLogin:true},
			component: () => import("../components/user.vue")
		},
		{
			path: "/library",
			name: "library",
			component: () => import("../components/library.vue")
		},
		{
			path: "/book",
			name: "book",
			component: () => import("../components/book.vue")
		},
		{
			path: "/comment_page",
			name: "comment_page",
			component: () => import("../components/comment_page.vue")
		},
		{
			path: "/menu",
			name: "menu",
			component: () => import("../components/menu.vue")
		},
		{
			path: "/chapter",
			name: "chapter",
			component: () => import("../components/chapter.vue")
		},
		{
			path: "/bookshelf",
			name: "bookshelf",
			component: () => import("../components/bookshelf.vue"),
			redirect:'/recent_reading',
			meta:{requireLogin:true},
			children:[
				{
					path: "/recent_reading",
					name: "recent_reading",
					component: () => import("../components/recent_reading.vue"),
					meta:{requireLogin:true},
				},
				{
					path: "/book_save",
					name: "book_save",
					component: () => import("../components/book_save.vue"),
					meta:{requireLogin:true},
				},
			]
		},
		{
			path: "/search",
			name: "search",
			component: () => import("../components/search.vue")
		},
		{
			path: "/sign",
			name: "sign",
			meta:{requireLogin:true},
			component: () => import("../components/sign.vue")
		},
		{
			path: "/help",
			name: "help",
			component: () => import("../components/help.vue")
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../components/login.vue")
		},
		{
			path: "/sign_up",
			name: "sign_up",
			component: () => import("../components/sign_up.vue")
		},
		{
			path: "/money_record",
			name: "money_record",
			component: () => import("../components/money_record.vue"),
			redirect:'/recharge_record',
			children:[
				{
					path:'/recharge_record',
					name:'recharge_record',
					component:()=>import('../components/recharge_record.vue'),
					meta:{requireLogin:true},
				},
				{
					path:'/pay_record',
					name:'pay_record',
					component:()=>import('../components/pay_record.vue'),
					meta:{requireLogin:true},
				},
			]
		},
		{
			path: "/book_ticket",
			name: "book_ticket",
			component: () => import("../components/book_ticket.vue")
		},
		{
			path: "/members",
			name: "members",
			component: () => import("../components/members.vue")
		}
	]
});
