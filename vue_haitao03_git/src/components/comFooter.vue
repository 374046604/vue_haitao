<template>
    <div class="com-footer">
        <router-link to="/home" class="com-footer-index" :class="{'com-footer-index-active' : activeIndex }">首页</router-link>
        <router-link to="/class" class="com-footer-classify" :class="{'com-footer-classify-active' : activeClassify }">分类</router-link>
        <router-link to="/my" class="com-footer-my" :class="{'com-footer-my-active' : activeMy }">我的</router-link>
    </div>
</template>

<script>
export default {
  // 组件的pros相当于插件的参数,比如我们要配置这个swiper,那么就会传入一些参数，都写props里面，然后在使用该组件的时候用:attr来传入对应的参数
  props:['activeIndex','activeClassify','activeMy'],
  data() {
    return {
    };
  }
};
</script>

<style lang="scss">
.com-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 20;
  padding-top: 2px;
  width: 100%;
  height: 45px;
  display: flex;
  text-align: center;
  background: #fff;
  border-top: 1px solid #ebebeb;
  a {
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 25px;
    font-size: 11px;
  }
  .com-footer-index {
    background: url(../m-images/footer-index.png) no-repeat center top / 22px
      22px;
  }
  .com-footer-index-active {
    color: red;
    background: url(../m-images/footer-index-active.png) no-repeat center top /
      22px 22px;
  }
  .com-footer-classify {
    background: url(../m-images/footer-classify.png) no-repeat center top / 22px
      22px;
  }
  .com-footer-classify-active {
    color: red;
    background: url(../m-images/footer-classify-active.png) no-repeat center top /
      22px 22px;
  }
  .com-footer-my {
    background: url(../m-images/footer-my.png) no-repeat center top / 22px 22px;
  }
  .com-footer-my-active {
    color: red;
    background: url(../m-images/footer-my-active.png) no-repeat center top /
      22px 22px;
  }
}
</style>