<template>
  <div class="home">
    <div class="home_header">
      <h1>何大大海淘</h1>
      <router-link to="/search" class="home_select_logo"></router-link>
      <router-link to="/shopCar" class="home_showCar">
        <span v-html="$store.state.carCount"></span>
      </router-link>
    </div>
    <div class="clear" style="height:3.4rem;"></div>
    <div class="home_main">
      <swiper  loop auto dots-position="center" height="12rem">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in indexData.bannerList" :key="index">
          <img style="width:100%" :src="item.adImgUrl">
        </swiper-item>
      </swiper>
      <div class="home_nav clearfix">
        <a class="nav_list" v-for="(item,index) in navList" :key="index">
          <img :src="item.url"/>
          <p>{{item.title}}</p>
        </a>
      </div>
      <div class="clear" style="height:1rem;"></div>
      <div class="home_hot">
        <h3 class="hot_title">热门推荐</h3>
        <ul class="clearfix">
          <li v-for="(item,index) in indexData.subject" :key="item.id">
          <router-link :to="'/hot?themeId=' + item.id">
            <img :src="item.url" />
          </router-link>
          </li>
        </ul>
      </div>
      <div class="home_good">
        <h3 class="hot_title">全球精品好货</h3>
        <goods-list :oneList="indexData.goodsType"></goods-list>
      </div>
      <com-end :end="!isLoading"></com-end>
    </div>
    <com-footer :activeIndex='true'></com-footer>
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
  name: "home",
  data() {
    return {
      indexData: {},
      //导航列表
      navList: [
        { url: imgList1, title: "top榜" },
        { url: imgList2, title: "每周上新" },
        { url: imgList3, title: "维尼保障" },
        { url: imgList4, title: "邀请有礼" }
      ],
      isLoading: true
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
    var _this = this;
    //获取轮播图片
    axios({
      url: API.indexMo,
      responseType: "json"
    })
      .then(function(data) {
        _this.isLoading = false;
        _this.indexData = data.data;
        //subject
        _this.isLoading = false;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.home {
  background: #eeeee1;
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
      right: 4.586rem;
      top: 0.9rem;
      width: 1.667rem;
      height: 1.667rem;
      background: url(../m-images/header-search.png) no-repeat;
      background-size: 1.667rem 1.667rem;
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

  .home_main {
    height: 12.083rem;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
    .home_nav {
      border-bottom: 1px solid #eeeee1;
      background: #fff;
      .nav_list {
        padding: 10px 0;
        float: left;
        width: 25%;
        display: inline-block;
        text-align: center;
      }
    }
    .home_hot {
      .hot_title {
        height: 3.125rem;
        text-align: center;
        line-height: 3.125rem;
        font-size: 1.3rem;
        background: #fff;
        border-top: 1px solid #eeeee1;
        border-bottom: 1px solid #eeeee1;
      }
      ul li {
        float: left;
        width: 50%;
        margin-left: -1px;
        border-left: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        img {
          width: 100%;
        }
      }
    }
    .home_good {
      .hot_title {
        height: 3.125rem;
        text-align: center;
        line-height: 3.125rem;
        font-size: 1.3rem;
        border-top: 1px solid #eeeee1;
        border-bottom: 1px solid #eeeee1;
      }
      ul li {
        float: left;
        margin-left: -1px;
        background:#fff;
        border-left: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
