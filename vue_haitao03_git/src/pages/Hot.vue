<template>
  <div class="hot">
    <div class="home_header">
      <h1>热门推荐</h1>
      <a href="javascript:history.go(-1)"  class="home_select_logo"></a>
      <router-link to="/shopCar" class="home_showCar">
        <span v-html="$store.state.carCount"></span>
      </router-link>
    </div>
    <div class="hot_main">
        <div class="clear" style="height:3.5rem;"></div>
        <div class="banner">
            <img v-bind:src="bannerImgUrl.adImgUrl" />
        </div>
        <goods-list :queryParams="queryParams" :queryApi="queryApi" ></goods-list>

    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Swiper, SwiperItem } from "vux";
import axios from "axios";
import API from "../js/api.js";
import common from "../js/common";
import goodsList from "../components/goodsList";
import comEnd from "../components/comEnd";
import comFooter from "../components/comFooter";

let imgList1 = require("../m-images/index-top.png");
let imgList2 = require("../m-images/index-new.png");
let imgList3 = require("../m-images/index-support.png");
let imgList4 = require("../m-images/index-top.png");

export default {
  name: "hot",
  data() {
    return {
      bannerImgUrl: [],
      queryParams: {
        pageNum: 1,
        themeId: parseInt(this.$route.query.themeId)
      },
      queryApi: API.theme
    };
  },
  components: {
    Swiper,
    SwiperItem,
    goodsList,
    comEnd,
    comFooter
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    getBanner: function() {
      var oThis = this;
      $.ajax({
        type: "post",
        url: API.themeBanner,
        dataType: "json",
        data: {
          themeId: this.$route.query.themeId
        },
        success: function(data) {
          console.log(data);
          if (data.message) {
            oThis.bannerImgUrl = data.bannerList[0];
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hot {
  .home_header {
    z-index: 20;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    padding: 0.75rem 0;
    text-align: center;
    line-height: 2rem;
    border-bottom: 1px solid #ede;
    .home_select_logo {
      position: absolute;
      left: 1rem;
      top: 0.9rem;
      width: 1.667rem;
      height: 1.667rem;
      background: url(../m-images/header-back.png) no-repeat;
      background-size: 1.4rem 1.4rem;
    }
    .home_showCar {
      position: absolute;
      right: 1.5rem;
      top: 0.9rem;
      width: 1.667rem;
      height: 1.667rem;
      font-size: 0.6rem;
      line-height: 1.667rem;
      text-align: center;
      background: url(../m-images/header-shopping.png) no-repeat;
      background-size: 1.667rem 1.667rem;
    }
  }
}
</style>
