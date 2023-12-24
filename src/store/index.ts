import { defineStore } from 'pinia'
interface States {
  isLogin: boolean,
  isAdmain: boolean,
  userData: any,
}
export const useStore = defineStore('main', {
  state: (): States => ({
    isLogin: false,
    isAdmain: false,
    userData: {},
  }),
  getters: {

  },
  actions: {

  }
})

