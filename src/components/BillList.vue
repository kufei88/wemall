<template>
  <div>
    <div id="billlist">
    		<ul class="ubilllist" >
          <li class="bill" v-for="item in list">
            <div>
              <div class="title">
                <flexbox >
                  <flexbox-item><div class="flex-demo">订单日期:{{item.billdate}}</div></flexbox-item>
                  <flexbox-item><div class="flex-demo">微信号:{{item.nick}}</div></flexbox-item>
                </flexbox>
                <flexbox >
                  <flexbox-item><div class="flex-demo">真实姓名:{{item.name}}</div></flexbox-item>
                  <flexbox-item><div class="flex-demo">手机号:{{item.tel}}</div></flexbox-item>
                </flexbox>
                <flexbox >
                  <flexbox-item><div class="flex-demo">备注:{{item.remark}}</div></flexbox-item>

                </flexbox>


              </div>
              <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/3" v-for="item1 in item.goodslist"><div class="flex-demo">{{item1.goodsName}}:{{item1.number}}</div></flexbox-item>

              </flexbox>


            </div>
          </li>
    		</ul>
    </div>
  </div>
</template>

<script>
    import {XNumber,FlexboxItem,Flexbox,Divider} from 'vux';
    export default {
        name:'billList',
        components:{
          XNumber,
          FlexboxItem,Flexbox,
          Divider
        },

        props:{
          list: Array,
        },

        methods:{
          delBill (item) {
            this.$emit('on-del-item', item)

          },
          edtBill (src) {

            this.$emit('on-edt-item', src)

          },
          findbyindex(currentValue){
            return currentValue.index = this.index;
          }
        }
    }
</script>
<style scoped lang="less">

@import '~vux/src/styles/1px.less';

#billlist {
	background: #f0f2f5;
	padding-top: 5px;
}

.ubilllist {
	list-style: none;
	margin: 0;
	padding: 0;
  color:#5c5c5c;
}

.bill{
  background: #fff;
	margin-top: 10px;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
  position: relative;
  padding: 10px;
}

.title{
  border-bottom: 1px solid #ddd;
  color: #000;
}


</style>

