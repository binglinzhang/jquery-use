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
			children:[
				{
					path: "/recent_reading",
					name: "recent_reading",
					component: () => import("../components/recent_reading.vue"),

				},
				{
					path: "/book_save",
					name: "book_save",
					component: () => import("../components/book_save.vue")
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
		}
	]
});
