<template>
    <div>
        <x-header  >{{title}}<a slot="right" class="iconfont" @click="save">&#xe6dc;</a></x-header>
        <uploader
        :upload-url="uploadUrl"
        title = "商品图片"
        :images="images"



        ></uploader>


        <group title="商品信息">
            <x-input title="商品编码" placeholder="请输入产品编码"  placeholder-align="right" v-model="goodscode"></x-input>
            <x-input title="商品名称" placeholder="请输入商品名称"  placeholder-align="right" v-model="goodsname"></x-input>
            <x-input title="商品规格" placeholder="请输入商品规格"  placeholder-align="right" v-model="spec"></x-input>
            <x-input title="计量单位" placeholder="请输入计量单位"  placeholder-align="right" v-model="unit"></x-input>
            <x-input title="商品售价" type="number" placeholder="请输入商品售价"  placeholder-align="right" v-model="price"></x-input>
            <x-switch title="上架" v-model="putaway"></x-switch>
        </group>
    </div>
</template>

<script>
    import { XHeader,Group,XInput,Loading,Toast,XSwitch} from 'vux'
    import Uploader from 'vux-uploader'
    import HttpUtil from '../util/HttpUtil'
    export default{
        name:'addCommondity',
        components:{
            XHeader,Group,XInput,Uploader,Loading,Toast,XSwitch
        },
        data(){
            return{
                uploadUrl:'/testUploadFile',
                images:[],
                goodscode:'',
                goodsname:'',
                spec:'',
                price:0.00,
                filename:'',
                show1: false,
                text1: 'Processing',
                unit:'只',
                title:'新增商品',
                id:0,
                putaway:false
            }
        },
        mounted(){
            console.log(this.$route);
            if(this.$route.query.id){
                this.title = '修改商品';
                this.goodscode = this.$route.query.goodscode;
                this.goodsname = this.$route.query.goodsname;
                this.spec = this.$route.query.spec;
                this.price = this.$route.query.price;
                this.unit = this.$route.query.unit;
                this.images.push({url:this.$route.query.src});
                this.id = this.$route.query.id;
                this.putaway = this.$route.query.putaway;
            }
        },
        methods:{
            showLoading(){
                this.$vux.loading.show({
                    text: '正在保存'
                })
            },
            hideLoading(){
                this.$vux.loading.hide();
            },
            save(){


                if(!this.goodscode){
                    this.$vux.toast.show({
                        text: '商品编码不能为空',
                        type: 'warn'
                    })

                    return;
                }
                if(!this.goodsname){
                    this.$vux.toast.show({
                        text: '商品名称不能为空',
                        type: 'warn'
                    })

                    return;
                }

                var src = '';
                if(this.images.length > 0){
                    let index = this.images[0].url.lastIndexOf('\/');
                    src=this.images[0].url.substring(index+1);
                }
                this.showLoading();
                var _this = this;
                var url = 'goods/saveGoods';
                if(this.$route.query.id){
                    url = 'goods/updateGoods';
                }

                console.log(this.$store.state.vux.snsUserInfo.username);
                HttpUtil.post(url,
                {
                    goodscode:this.goodscode,
                    goodsname:this.goodsname,
                    spec:this.spec,
                    price:this.price,
                    src:src,
                    unit:this.unit,
                    id:this.id,
                    username:this.$store.state.vux.snsUserInfo.username,
                    putaway:this.putaway
                },function(data){
                    if(data.result =="success"){
                        _this.$vux.toast.show({
                        text: '保存成功',
                        type: 'success'
                    })
                    _this.$router.push({path:'/'});
                    }
                    else if (data.result == "exists"){
                      _this.$vux.toast.show({
                        text: '该物品编码已存在',
                        type: 'warn'
                    })
                    }
                    _this.hideLoading();
                })

            },

        }
    }
</script>

<style lang="less">
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';
</style>
