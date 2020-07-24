import Vue from 'vue'
import VueRouter from 'vue-router'
const Admin = () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/Dashboard.vue')
const Media = () => import(/* webpackChunkName: "media" */ '@/views/admin/Media.vue')
const Video = () => import(/* webpackChunkName: "video" */ '@/views/admin/Video.vue')
const Category = () => import(/* webpackChunkName: "category" */ '@/views/admin/Category.vue')
const Series = () => import(/* webpackChunkName: "series" */ '@/views/admin/Series.vue')
const Setting = () => import(/* webpackChunkName: "setting" */ '@/views/admin/Setting.vue')
const Download = () => import(/* webpackChunkName: "download" */ '@/views/admin/Download.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/admin/About.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Admin,
      children: [
        { path: '', name: 'dashboard', component: Dashboard },
        { path: '/media', name: 'media', component: Media },
        { path: '/media/add', name: 'mediaAdd', component: () => import(/* webpackChunkName: "media" */ '@/views/admin/media/Add.vue') },
        { path: '/media/view/:id', name: 'mediaView', component: () => import(/* webpackChunkName: "media" */ '@/views/admin/media/View.vue') },
        { path: '/media/update/:id', name: 'mediaUpdate', component: () => import(/* webpackChunkName: "media" */ '@/views/admin/media/Update.vue') },
        { path: '/video', name: 'video', component: Video },
        { path: '/video/add', name: 'videoAdd', component: () => import(/* webpackChunkName: "video" */ '@/views/admin/video/Add.vue') },
        { path: '/video/view/:id', name: 'videoView', component: () => import(/* webpackChunkName: "video" */ '@/views/admin/video/View.vue') },
        { path: '/video/update/:id', name: 'videoUpdate', component: () => import(/* webpackChunkName: "video" */ '@/views/admin/video/Update.vue') },
        { path: '/video/update', name: 'videoUpdateBatch', component: () => import(/* webpackChunkName: "video" */ '@/components/video/update/UpdateBatch.vue') },
        { path: '/category', name: 'category', component: Category },
        { path: '/category/add', name: 'categoryAdd', component: () => import(/* webpackChunkName: "category" */ '@/views/admin/category/Add.vue') },
        { path: '/category/view/:id', name: 'categoryView', component: () => import(/* webpackChunkName: "category" */ '@/views/admin/category/View.vue') },
        { path: '/category/update/:id', name: 'categoryUpdate', component: () => import(/* webpackChunkName: "category" */ '@/views/admin/category/Update.vue') },
        { path: '/series', name: 'series', component: Series },
        { path: '/series/add', name: 'seriesAdd', component: () => import(/* webpackChunkName: "series" */ '@/views/admin/series/Add.vue') },
        { path: '/series/view/:id', name: 'seriesView', component: () => import(/* webpackChunkName: "series" */ '@/views/admin/series/View.vue') },
        { path: '/series/update/:id', name: 'seriesUpdate', component: () => import(/* webpackChunkName: "series" */ '@/views/admin/series/Update.vue') },
        { path: '/setting', name: 'setting', component: Setting },
        { path: '/download', name: 'download', component: Download },
        { path: '/about', name: 'about', component: About }
      ]
    }
  ]
})

export default router
