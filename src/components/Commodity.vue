<template>
  <div style="padding-bottom: 50px">
    <x-header :left-options="{showBack: false}" >商品管理<a @click="addCommondity"  slot="right" class="iconfont">&#xe617;</a></x-header>
    <tab v-model="index">
      <tab-item selected @on-item-click="handler">
        全部商品
      </tab-item>
      <tab-item @on-item-click="handler">
        已上架
      </tab-item>
      <tab-item @on-item-click="handler">
        未上架
      </tab-item>
    </tab>
    <div v-transfer-dom>
      <previewer :list="imglist" ref="previewer" ></previewer>
    </div>
    <group>
      <goods-list   :list="goodslist" @on-click-img="imgclick($event)"　@on-click-item="itemclick($event)" ></goods-list>


    </group>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell,XHeader,CellBox,Panel,AjaxPlugin, TransferDom,Previewer,Tab, TabItem } from 'vux'
import GoodsList from './GoodsList'
import HttpUtil from '../util/HttpUtil'
export default {
  directives: {
    TransferDom
  },
  data(){
    return{
      type:"5",
      goodslist:[],
      goodsAllList:[],
      imglist:[],
      index:0
    }


  },
  mounted(){
    let _this = this;

    if(!this.$store.state.vux.snsUserInfo.nickname){

        let code = _this.$geturlpara.getUrlKey('code');
        let state = _this.$geturlpara.getUrlKey('state');
        HttpUtil.get('wechat/login',{code:code,state:state},function(data){
            _this.$store.commit('updateSnsUserInfo',data);
            _this.getGoodsList();
        })

      /*
      HttpUtil.get('wechat/getWechatUser',{},function(data){

      })
      */
    }
    else{
      _this.getGoodsList();
    }

  },
  methods: {
    getGoodsList:function(){
      let _this = this;
      let templist = [];


      HttpUtil.get('goods/getAll',{username:this.$store.state.vux.snsUserInfo.username},function(data){
        data.forEach(function(item){
          if(item.src){
            item.src = "/getfile/"+item.src;
          }
          else{
            item.src = "http://iph.href.lu/100x100?text=济胜软件";
          }

          templist.push(item);
        })
        _this.goodslist = templist;
        _this.goodsAllList = templist;
      })

    },
    imgclick(e){
      console.log(e);
      this.imglist = [];
      this.imglist.push({
        src:e
      });
      var _this = this;
      setTimeout(function() {
        _this.$refs.previewer.show(0);
      }, 100);

    },
    itemclick(e){

      this.$router.push({path:'/AddCommondity',query:e});
    },
    addCommondity(){
      if(this.$store.state.vux.snsUserInfo.username == 'no'){
        this.$vux.toast.show({
                        text: '你还未绑定手机号，请先绑定手机号',
                        type: 'warn'
                    })
        this.$router.push({path:'/myInformation'});
      }
      else{
        this.$router.push({path:'/AddCommondity'});
      }

    },
    handler(){
      if (this.index == 0){
        this.goodslist = this.goodsAllList;
      }
      else if(this.index == 2){
        this.goodslist = this.goodsAllList.filter(function(item){
         return !item.putaway
        });
      }
      else if(this.index == 1){
        this.goodslist = this.goodsAllList.filter(function(item){
          return item.putaway
        });
      }
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    XHeader,
    CellBox,
    Panel,
    GoodsList,
    Previewer,
    Tab, TabItem
  }
}
</script>
<style lang="less">
  .info{
    margin-left: 10px;
  }
</style>
