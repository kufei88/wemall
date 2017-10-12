<template>
  <div class="order" style="padding-bottom: 50px">
    <x-header :left-options="{showBack: false}">订单管理</x-header>
    <tab v-model="index">
      <tab-item selected @on-item-click="handler">
        订单信息
      </tab-item>
      <tab-item @on-item-click="handler">
        汇总信息
      </tab-item>
    </tab>
    <bill-list v-show="index==0"  :list="billlist" 　@on-del-item="delBill($event)" @on-edt-item="edtBill($event)" ></bill-list>
    <div v-show="index==1">
      <cell title="合计" :value="sum"></cell>
      <cell-form-preview :list="groupList"></cell-form-preview>
    </div>


  </div>
</template>

<script>
import {XHeader,Group,Confirm,Cell,CellFormPreview,Tab, TabItem,Swiper,SwiperItem} from 'vux'
import BillList from './BillList.vue'
import HttpUtil from '../util/HttpUtil'
export default {

  name: 'order',
  components:{
    XHeader,
    BillList,
    Group,
    Confirm,
    Cell,
    CellFormPreview,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
  },
  data () {
    return {
      billlist:[],
      groupList:[],
      sum:'',
      index:0
    }
  },
  mounted(){
    this.getBillList();
    this.getGroupList();
  },
  methods:{
    handler(){
      console.log(this.index);
    },
    getBillList(){
      let _this = this;
      let templist = [];
      let billcode = '';
      let goodlist = [];
      let billdate = '';
      let nick = '';
      let name = '';
      let tel = '';
      let remark = '';
      HttpUtil.get('billInfo/getBillByTenant',{tenant:this.$store.state.vux.snsUserInfo.username},function(data){
        data.forEach(function(item){
          if ((billcode !='') && (billcode != item.billcode)) {
            templist.push({billdate:billdate,billcode:billcode,nick:nick,goodslist:goodlist,name:name,tel:tel,remark:remark});
            goodlist = [];
          }
          billdate = item.billdate;
          billcode = item.billcode;
          nick = item.nick;
          name = item.name;
          tel = item.tel;
          remark = item.remark;

          goodlist.push({goodsName:item.goodsName,number:item.number});
        })
        templist.push({billdate:billdate,billcode:billcode,nick:nick,goodslist:goodlist,name:name,tel:tel,remark:remark});
        _this.billlist = templist;
      })
    },
    getGroupList(){
      let tempGroupList = [];
      let sum = 0;
      let _this = this;
      HttpUtil.get('billInfo/getBillGroupByTenant',{tenant:this.$store.state.vux.snsUserInfo.username},function(data){
        data.forEach(item => {
          tempGroupList.push({label:item.goodsName,value:item.number});
          sum += item.number;
        })
        _this.groupList = tempGroupList;
        _this.sum = sum;
      })
    },
    delBill(e){

      let _this = this;
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确认删除该订单',


        onConfirm () {
          HttpUtil.del('billInfo/delBillInfo',{billcode:e},function(data){

            _this.getBillList();
          })
        }
      })

    },
    edtBill(e){
      this.$router.push({path:'/',query:{billcode:e}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
