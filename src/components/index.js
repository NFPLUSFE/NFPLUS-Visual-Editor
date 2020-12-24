export default Vue => {
  Vue.component('containerComp', () => import('./container'))
  Vue.component('artList', () => import('./artList'))
}
