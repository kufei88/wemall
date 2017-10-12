<template>
  <div>
    <div class="weui-media-box weui-media-box_text" v-for="item in list" >
          <div class="weui-media-box_appmsg">
            <div class="weui-media-box__hd" v-if="item.src">
              <img class="weui-media-box__thumb" :src="item.src" alt="" @click.prevent="onImgClick(item.src)">
            </div>
            <div class="weui-media-box__bd" @click.prevent="onItemClick(item)">
              <h4 class="weui-media-box__title" v-html="item.goodsname"></h4>
              <p class="weui-media-box__desc" style="color:red;margin-bottom: 3px">￥{{item.price}}</p>
              <p class="weui-media-box__desc" v-html="item.spec"></p>
            </div>
          </div>
          
        </div>
    </div>
</template>

<script>
    export default {
        name:'goodsList',
        props:{
          list: Array,
        },
        methods:{
          onItemClick (item) {
            this.$emit('on-click-item', item)
            
          },
          onImgClick (src) {
            
            this.$emit('on-click-img', src)
            
          }
        }
    }
</script>