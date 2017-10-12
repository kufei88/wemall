<template>
  <div id="app">
    <!-- main content -->

    <!-- drawer content -->


        <loading v-model="isLoading"></loading>
        <router-view class="router-view" ></router-view>

        <tabbar icon-class="vux-center" class="vux-demo-tabbar" slot="bottom" style="position:fixed">
          <tabbar-item selected link="/">
            <span slot="icon" class="iconfont" >&#xe614;</span>
            <span slot="label">商品管理</span>
          </tabbar-item>
          <tabbar-item link="/order">
          <span slot="icon" class="iconfont" >&#xe616;</span>
            <span slot="label">订单管理</span>
          </tabbar-item>

          <tabbar-item link="/myInformation">
          <span slot="icon" class="iconfont"  >&#xe61e;</span>
            <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>


  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell,Drawer,ViewBox,XHeader } from 'vux'

import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',

  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    ViewBox,
    Drawer,
    XHeader,
    Loading
  },
  data(){
    return {
      drawerVisibility: false,
      showModeValue: 'push',
      showPlacementValue: 'left'
    }
  },
  computed:{
    ...mapState({
      isLoading: state => state.vux.isLoading
    }),
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './styles/font.less';

body {
  background-color: #fbf9fe;
}
.router-view {
  width: 100%;
  top: 46px;
}
.weui-tabbar{
  position:fixed;
}
</style>
