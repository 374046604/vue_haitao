<template>
  <div class="good_result">
  <div class="search-wrap" v-if="$route.query.keyword">

        <div class="search-main">
            <a href="javascript:history.go(-1)" class="header-back"></a>
            <router-link to="/search"><div class="search-box search-tips" v-html="$route.query.keyword"></div></router-link>
        </div>
    </div>
    <div class="car_header" v-if="$route.query.twoCategoryId">
        <a href="javascript:history.go(-1)" class="car_back"></a>
        <span v-html="$route.query.twoCategoryName"></span>
    </div>
    <div class="car_header" v-if="$route.query.brandId">
        <a href="javascript:history.go(-1)" class="header-back"></a>
        <h1 v-html="$route.query.brandName"></h1>
    </div>
    <div class="clear" style="height:3.5rem;"></div>
    <div class="goods-sort-box">
        <div class="com-goods-sort">
            <a href="javascript:;" class="items" data-sort="xl">销量</a>
            <a href="javascript:;" class="items" data-sort="sj">售价</a>
            <a href="javascript:;" class="items" data-sort="kc">库存量</a>
            <a href="javascript:;" class="items" data-sort="sjsj">上架时间</a>
        </div>
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
  name: "good_result",
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem,
    goodsList,
    comEnd,
    comFooter
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.good_result {
  .car_header {
    position: fixed;
    left: 0;
    top: 0;
    height: 3.4rem;
    width: 100%;
    text-align: center;
    line-height: 3.4rem;
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
    .car_back {
      position: absolute;
      top: 1rem;
      left: 0.875rem;
      width: 1.4rem;
      height: 1.4rem;
      background: url(../m-images/header-back.png) no-repeat center /1.3rem 1.3rem;
    }
  }
  .goods-sort-box {
    .com-goods-sort {
      align-items: center;
      height: 3.125rem;
      border-bottom: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      text-align: center;
      .items {
        flex-grow: 1;
      }
      .items:affter {
        content: "";
        display: inline-block;
        margin-left: 0.208rem;
        width: 0.917rem;
        height: 1rem;
        background: url(../m-images/icon-week.png) no-repeat -2.083rem 0;
        background-size: 8.333rem 8.333rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
