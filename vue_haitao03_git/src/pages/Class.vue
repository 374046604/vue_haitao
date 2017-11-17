<template>
  <div class="class">
    <div class="home_header">
      <h1>何大大海淘</h1>
      <router-link to="/search" class="home_select_logo"></router-link>
      <router-link to="/shopCar" class="home_showCar">
        <span v-html="$store.state.carCount"></span>
      </router-link>
    </div>
    <div class="clear" style="height:3.5rem;"></div>
    <div class="class_main clearfix">
        <ul class="class_left">
            <li v-for="(item,index) in oneClassList" :key="item.id" :onindex="item.classid" v-html="item.classdesc" :class="{active:item.classid==categoryId}" @click="change(item.classid)" ></li>
        </ul>
        <div class="class_right" >
            <div class="class_right_main" v-for="data in twoClassList" v-if="twoClassList.length>0">
                <h2 v-html="data.name"></h2>
                <ul class="clearfix">
                        <li class="right_li" v-for="goods in data.threeCategoryList">
                            <router-link :to="'/goodsResult?twoCategoryId=' + goods.id +'&twoCategoryName=' + goods.threeName" class="link-items" v-bind:id="goods.id">
                                <img v-bind:src="goods.imgUrl" />
                                <p v-html="goods.threeName"></p>
                            </router-link>
                        </li>
                    </ul>
            </div>
            <div class="no_num" v-show="noNum">暂无任何数据</div>
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
  name: "hot",
  data() {
    return {
      //一级分类数据
      oneClassList: [],
      //二级分类数据
      twoClassList: [],
      //选中的ID
      categoryId: "",
      //没有数据状态
      noNum: false,
      isLoading: true,
      //存放所有的数据
      stagingStation: {}
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
    this.getOneClassList();
  },
  methods: {
    //获取左边的数据
    getOneClassList: function() {
      var oThis = this;
      axios
        .post(API.getCategory)
        .then(function(data) {
          var data = data.data;
          if (data.message) {
            oThis.oneClassList = data.classList;
            oThis.categoryId = oThis.oneClassList[0].classid;
            oThis.getTwoClassList(oThis.categoryId);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //获取右边的数据
    getTwoClassList(categoryId) {
      var oThis = this;
      this.isLoading = true;
      this.noNum = false;
      oThis.twoClassList = [];
      $.ajax({
        type: "post",
        url: API.getCategoryTwo,
        data: {
          categoryId: categoryId
        },
        dataType: "json",
        success: function(data) {
          if (data.message) {
            oThis.twoClassList = data.classTwoList;
            oThis.stagingStation[categoryId] = data.classTwoList;
            oThis.isLoading = false;
            if (oThis.twoClassList.length == 0) {
              oThis.noNum = true;
            }
          }
        }
      });
    },
    change(index) {
      var _this = this;
      //如果已经选中了就弹出
      if (_this.categoryId == index) {
        return;
      }
      //赋值
      _this.categoryId = index;
      //不管怎么样 先隐藏
      _this.noNum = false;

      if (_this.stagingStation[_this.categoryId]) {
        _this.twoClassList = _this.stagingStation[_this.categoryId];
        if (_this.twoClassList.length == 0) {
          _this.noNum = true;
        }
      } else {
        _this.getTwoClassList(_this.categoryId);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.class {
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
  .class_main {
    background: #fff;
    .class_left {
      float: left;
      padding-top: 20px;
      width: 25%;
      text-align: center;
      & > li {
        margin-bottom: 1.25rem;
        height: 1.75rem;
        line-height: 1.75rem;
        color: #4d4d4d;
      }
      & > li.active {
        color: #aa4f53;
        border-left: 4px solid #aa4f53;
      }
    }
    .class_right {
      float: right;
      width: 75%;
      margin-left: -1px;
      border-left: 1px solid #eeeee1;
      .class_right_main {
        padding: 20px;
        .right_li {
          float: left;
          width: 33.3%;
          margin-bottom: 0.5rem;
          text-align: center;
          & > a > img {
            width: 4rem;
            height: 4rem;
          }
          p {
            font-size: 0.8rem;
          }
        }
      }
      .no_num {
        text-align: center;
      }
    }
  }
}
</style>
