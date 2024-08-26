import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import uploadView from '../views/handleFile/upload.vue'
import downloadView from '../views/handleFile/download.vue'


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
      redirect: {name: 'upload'},
			component: HomeView,
      children: [
        {
          path: 'upload',
          name: 'upload',
          component: uploadView
        },
        {
          path: 'download',
          name: 'download',
          component: downloadView
        },
      ]
		}
		// {
		//   path: '/about',
		//   name: 'about',
		//   // route level code-splitting
		//   // this generates a separate chunk (About.[hash].js) for this route
		//   // which is lazy-loaded when the route is visited.
		//   component: () => import('../views/AboutView.vue')
		// }
	]
})

export default router
