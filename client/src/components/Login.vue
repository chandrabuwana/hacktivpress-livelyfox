<template>
<div class="cont_principal">
  <div class="cont_centrar">
  <div class="cont_login">
    <form action="">
    <div class="cont_tabs_login">
      <ul class='ul_tabs'>
        <li class="active"><router-link v-bind:to="'register'"><a href="#" onclick="sign_in()">REGISTER</a></router-link></li>
        <span class="linea_bajo_nom"></span>
        
        <!-- <li><router-link ><a href="#up" onclick="sign_up()">SIGN UP</a><span class="linea_bajo_nom"></span></router-link>
        </li> -->
      </ul>
      </div>
  <div class="cont_text_inputs">
      <input  type="text" class="input_form_sign " placeholder="NAME" name="name_us" />    
      <input type="text" class="input_form_sign " placeholder="NAME" name="name_us" />    
    <input v-model="login.username" type="text" class="input_form_sign d_block  active_inp" placeholder="Username" name="pass_us" />  
   <input v-model="login.password" type="text" class="input_form_sign d_block  active_inp" placeholder="PASSWORD" name="pass_us" />   
    <a href="#" class="link_forgot_pass d_block" >Forgot Password ?</a>    
<div class="terms_and_cons d_none">
    <p><input type="checkbox" name="terms_and_cons" /> <label for="terms_and_cons">Accept  Terms and Conditions.</label></p>
    </div>
      </div>
      <fb-signin-button :params="fbSignInParams"
        @success="onSignInSuccess" @error="onSignInError" class="fb-signin-button fb-signin-button--facebook">Login with Facebook
      </fb-signin-button><br><br>
  <div class="cont_btn">
     <button v-on:click.prevent="getLogin()"  class="btn_sign">SIGN IN</button>      
      
        </div>      
      </form>
    </div>    
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    getLogin (){
      var self= this
      axios.post('http://localhost:3002/login',{
        username : self.login.username,
        password : self.login.password
      })
      .then(response=>{
        console.log('ini token',response.data.token)
        localStorage.getItem('token',response.data.token)
        this.$router.push('/home')
      })
      .catch(err=>{
        console.log(err);
      })
    },onSignInSuccess (response) {
      var self = this
      // window.FB.api('/me', {fields: ['id', 'name', 'email', 'pictures']}, dude => {
        // console.log(response)
        // console.log(`Good to see you, ${dude.name}.`)
      console.log('ini response nya ', response)
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      axios({
        method: 'post',
        url: `http://localhost:3002/userfb`,
        headers: {
          fbaccesstoken: localStorage.getItem('fbaccesstoken')
        }
      })
      .then(loginResponse => {
        console.log('==========datanya', loginResponse.data)
        localStorage.setItem('token', loginResponse.data.token)
        localStorage.setItem('name', loginResponse.data.name)
        localStorage.setItem('id', loginResponse.data.id)
        this.checkLogin()
      })
      .catch(err => {
        console.log('ada error ', err)
        self.$router.push('/')
      })
      // })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    checkLogin () {
      console.log('check login')
      if (localStorage.fbaccesstoken) {
        this.$router.push('/todo')
      }
    }
  },
  created () {
    this.checkLogin()
  }
} 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
}
.fb-signin-button {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.fb-signin-button:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.fb-signin-button:focus {
  outline: none;
}
.fb-signin-button:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

.fb-signin-button--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.fb-signin-button--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.fb-signin-button--facebook:hover,
.fb-signin-button--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}
* {
  margin: 0px auto;
  padding: 0px;
  font-family: 'Open Sans', sans-serif;
}
.cont_principal {
  position: absolute;
  width: 100%;
  height: 100%;
/* Rectangle 3: */
background-image: linear-gradient(-87deg, #F2F5F6 0%, #DDE5E8 100%);
}

.cont_centrar {
  position: absolute;
  width: 320px;
  left:50%;
  top:50%;
  margin-left: -160px;
  margin-top: -160px;
}

.cont_centrar {
  position: relative;
  width: 320px;
  float: left;
  background-image: linear-gradient(-226deg, #FFFFFF 8%, #EEF3F5 100%);

  border-radius: 8px;
transition: all 0.5s;
}

.cent_active {
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.21);
}


.cont_tabs_login {
position: relative;
  float: left;
  width: 100%;
}

.ul_tabs > li { 
position: relative;
  float: left;
  width: 50%;
  list-style: none;
  text-align: center;

}

.ul_tabs > li > a  {  
text-decoration: none;
font-family: Helvetica;
font-size: 16px;
    color: #999;
line-height: 14px;
padding: 20px ;
display: block;
transition: all 0.5s;
}

  .ul_tabs > .active > a  {  
color: #FF8383;

}

.linea_bajo_nom {
  position: relative;
  width: 100%;
  float: left;
  background-color: #999;
  height: 2px;
}

.active .linea_bajo_nom {
  position: relative;
  width: 100%;
  float: left;
background-color: #FF8383;
height: 2px;
}

.cont_text_inputs {
position: relative;
  float: left;
  width: 100%;
  margin-top: 20px;
}

.input_form_sign {
  position: relative;
  float: left;
  width: 90%;
  border: none;
  border-bottom: 1px solid #B0BEC5 ;
  background-color: transparent;
  font-size: 14px;
  outline: none;
  transition: all 0.5s;
    height: 0px;
    margin: 0px;
    padding: 0px;  
opacity: 0;
display: none;
}

.active_inp {
  margin: 5% 5% ;  
  padding: 10px 0px;
  opacity: 1;
height: 5px;
}



.input_form_sign:focus {
  border-bottom: 1px solid #FF8383 ;}

.link_forgot_pass {
position: relative;
  margin-top: 0px;
  margin-left: 30%;
  text-decoration: none;
  color: #999;
  font-size: 13px;
  display: none;
  float: left;
  transition: all 0.5s;
}
.cont_btn {
  position: relative;
  float: left;
}

.btn_sign {
  background: rgba(255,64,88,0.74);
  box-shadow: 0px 2px 20px 2px rgba(255,114,132,0.50);
  border-radius: 8px;
  padding: 15px 30px;
  border: none;
  color: #fff;
  font-size: 14px;
  position: relative;  
  float: left;
  margin-left: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.terms_and_cons {
  width: 70%;  
  color: #999;
  font-size: 13px;
  transition: all 0.5s;
}

.d_none {
  display: none;
}

.d_block {
  display: block;
}

.cont_text_inputs > input:nth-child(1){
  transition-delay: 0.2s;
}

.cont_text_inputs > input:nth-child(2){
  transition-delay: 0.4s;
}
.cont_text_inputs > input:nth-child(3){
  transition-delay: 0.6s;
}
.cont_text_inputs > input:nth-child(4){
  transition-delay: 0.8s;
}
</style>
