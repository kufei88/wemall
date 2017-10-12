<<template>
  <div style="padding-bottom: 50px">
    <x-header :left-options="{showBack: false}" >个人中心</x-header>
    <div class="main">
      <div class="header">
        <img :src="headImgUrl" class="headImg">
        <div class="nick"><span>微信帐号</span>{{nick}}</div>
      </div>
      <div class="numberform" v-if="username=='no'">
        <h1>绑定手机号</h1>
        <group >
          <x-input title="手机号码" name="mobile" placeholder="请输入手机号码"
          keyboard="number" is-type="china-mobile" v-model="number"></x-input>
          <x-input title="发送验证码" class="weui-vcode" v-model="code">
            <x-button slot="right" type="primary" mini @click.native="sendVirfyCode">发送验证码</x-button>
          </x-input>
        </group>
        <div style="padding:15px;">
        <x-button type="primary" @click.native="bindingUser">绑定</x-button>

        </div>
      </div>
      <div v-else>
        <group>
          <cell title="手机号" :value="username"></cell>
          <divider>商户二维码</divider>
          <qrcode :value="shopcode" size="160"></qrcode>

        </group>
      </div>

    </div>
  </div>
</template>
<<script>
import {XHeader,Divider,XInput, Group,XButton,Toast,Cell,Qrcode} from 'vux';
import HttpUtil from '../util/HttpUtil';
import MyUtil from '../util/MyUtil';
import { mapState } from 'vuex'
export default {
  data(){
    return {

      number:'',
      code:'',
      shopcode:''
    }
  },
  methods:{
    sendVirfyCode(){

      if (!MyUtil.validateMobile(this.number)){
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type:'warn'
          })
        return;
      }
      let _this = this;
      this.$httputil.get('user/generationCode',{number:this.number},function(data){
        if(data.result == 'success'){
          _this.$vux.toast.show({
            text: '发送成功'
          })
        }
        else if(data.result == 'exists'){
          _this.$vux.toast.show({
            text: '同一个手机号两分钟内不能重复发送',
            type:'warn'
          })
        }
        else if (data.result == 'due'){
          _this.$vux.toast.show({
            text: '登录已过期，请重新登录',
            type:'warn'
          })
        }
        else if (data.result == 'numberExists'){
          _this.$vux.toast.show({
            text: '该手机号已绑定其它用户',
            type:'warn'
          })
        }
      })
    },
    bindingUser(){
      let _this = this;
      this.$httputil.post('user/bindingUser',{number:this.number,code:this.code},function(data){
        if(data.result == 'codeerr'){
          _this.$vux.toast.show({
            text: '验证码错误',
            type:'warn'
          })
        }
        else if (data.result == 'due'){
          _this.$vux.toast.show({
            text: '登录已过期，请重新登录',
            type:'warn'
          })
        }
        else if (data.result == 'success'){
          _this.$vux.toast.show({
            text: '绑定成功'
          })

          _this.$store.commit('updateUsername',{username:_this.number});
        }

      })
    }
  },
  computed:{
    ...mapState({
      nick: state => state.vux.snsUserInfo.nickname,
      headImgUrl : state => state.vux.snsUserInfo.headImgUrl,
      username : state => state.vux.snsUserInfo.username,
    }),
  }
  ,
  mounted(){
   /* this.shopcode = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc8423586aa004b0a&redirect_uri=http%3a%2f%'+
    '2fwww.jishengsoft.com%2fredirect%2fredirectwemallindex.asp?username='+this.$store.state.vux.snsUserInfo.username+
    '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'; */
    this.shopcode = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc8423586aa004b0a&redirect_uri='+
    'http%3a%2f%2fwww.jishengsoft.com%2fredirect%2fredirectwemallindex.asp?username='+this.$store.state.vux.snsUserInfo.username+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

  },
  components:{
    XHeader,
    Divider,
    XInput,
    Group,
    XButton,
    Toast,
    Cell,
    Qrcode
  }
}
</script>
<style>
  .main{
    padding: 10px;

  }
  .header{
    height: 50px;
    padding-bottom: 10px;
    border-bottom: 1px solid #d3d3d3;
  }
  .headImg{
    width: 50px;
    height: 50px;
    float: left;
  }
  .nick{
    float: left;
    margin-left: 10px;
    height: 50px;
    line-height: 50px;

  }
  .nick span{
    color: #A1A1A1;
    margin-right: 5px;
  }
  .numberform h1{
    text-align: center;
    color: #A1A1A1;
  }
</style>
