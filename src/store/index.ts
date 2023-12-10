import { defineStore } from 'pinia'
interface States {
  isLogin: boolean,
  isAdmain: boolean
}
export const useStore = defineStore('main', {
  state: (): States => ({
    isLogin: false,
    isAdmain: false
  }),
  getters: {

  },
  actions: {

  }
})

