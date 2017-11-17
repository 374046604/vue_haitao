<template>
  <div class="shop_car">
    <div class="car_header">
        <a href="javascript:history.go(-1)" class="car_back"></a>
        购物车
    </div>
    <div class="yes-shop" v-if="$store.state.carCount>0">
        <div class="goods-item" v-for="(item1,index1) in carList">
            <div class="item_boxs" v-for="(item2,index2) in item1.shopCarList">
              <a class="item_checkbox" :class="{'item_checkbox_on': item2.selected}" @click="theCheckBoxChange(index1,index2)" ></a>
              <div class="item_link">
                <p><span>规格：</span><span >{{item2.skuName}}</span></p>
                <p><span>仓库：</span><span >{{item2.warehouseName}}</span></p>
                <p><span>价格：</span><span class="item_money" v-show="true">¥{{item2.skuPrice.toFixed(2)}}</span></p>
              </div>
              <div class="item_number clearfix">
                  <num-control :theNumber="item2.num" :theMaxNumber="item2.realStock" :index1="index1" :index2="index2" ></num-control>
                  <div class="item_delete"  v-show="test" >
                  </div>
                  <span class="sui_money">税费：¥220.86</span>
              </div>
            
            </div>
        </div>
    </div>
    <div class="no-shop" v-if="$store.state.carCount==0">
        <img src="../m-images/no-shop.png" />
        <router-link to="/index">
            <span>去逛逛吧 !</span>
        </router-link>
    </div>
    <div class="car_footer clearfix" v-if="$store.state.carCount>0">
        <div class="car_footer_l">
            <div class="clearfix">
              <div class="checkbox_box":class="{'checkbox_box_on':checkboxOn}" @click="checkboxChange">全选</div>
              <ul class="car_moneylist">
                  <li class="money_sum"><span>总金额：</span><span class="money_color">¥10000</span></li>
                  <li class="money_sum1"><span>商品总额：</span><span class="money_color">¥10000</span></li>
                  <li class="money_move"><span>运费：</span><span class="money_color">¥10000</span></li>
                  <li class="money_sui"><span>预计税费：</span><span class="money_color">10000</span></li>
              </ul>
              </div>
        </div>
        <div class="car_footer_r">去结算</div>
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
import numControl from "../components/numControl";

export default {
  name: "shop-car",
  data() {
    return {
      //全选
      checkboxOn: false,
      //购物车数据
      carList: [],
      test: false
    };
  },
  components: {
    Swiper,
    SwiperItem,
    goodsList,
    comEnd,
    comFooter,
    numControl
  },
  mounted() {
    //如果没登陆 登陆
    if (!this.$store.state.isLogin) {
      this.$router.push("/login");
    }
    //获取购物车数据
    this.getShopCar();
  },
  methods: {
    //更改全选
    checkboxChange() {
      var _this = this;
      _this.checkboxOn = !_this.checkboxOn;
      this.carList.forEach(function(item, index, source) {
        item.shopCarList.forEach(function(item, index, source) {
          if (item.isStatus) {
            item.selected = _this.checkboxOn;
            console.log(item.selected)
          }
        });
      });
      //计算总价钱
      _this.commodityTotal();
    },
    //单个单选切换
    theCheckBoxChange(index1, index2) {
      //切换
      this.carList[index1]["shopCarList"][index2]["selected"] = !this.carList[
        index1
      ]["shopCarList"][index2]["selected"];
    },
    // 获取购物车数据
    getShopCar() {
      var oThis = this;
      $.ajax({
        type: "post",
        url: API.shopCarIndexMobile,
        dataType: "json",
        success: function(data) {
          oThis.isLoading = false;
          console.log(data);
          if (data.msg) {
            if (data.carList) {
              data.carList.forEach(function(item, index, arr) {
                item.isMeet = false;
                item.amount1 = item.amount;
                item.goodsNum = item.amount;
                item.goodsAllMoney = 0.0;
                //扫描购物车里面的东西
                for (var x in item) {
                  item.shopCarList.forEach(function(item, index, arr) {
                    item.selected = false;
                    item.goodsTax = 0.0;
                    item.showPrice = 0.0;

                    if (
                      item.isShow == 1 &&
                      item.status == 1 &&
                      item.realStock > 0
                    ) {
                      item.isStatus = true;
                    }
                  });
                }
              });
              oThis.carList = data.carList;
              // oThis.calEveryGoodsPrice();
              // oThis.calEveryTaxMoney();
            }
            oThis.postpolicy = data.postpolicy;
            console.log(oThis.carList);
          } else {
            $.customTips({
              msg: "请求错误，请稍后重试"
            });
          }
        },
        error: function(msg) {
          $.customTips({
            msg: "请求错误，请稍后重试"
          });
        }
      });
    },
    //计算总价
    commodityTotal(){
      // 判断有活动的商品总额是否满足活动
      this.checkIsMeet();

    },
    // 判断有活动的商品总额是否满足活动
    checkIsMeet(){
      var _this=this,
      goodsMoney=0,
      goodsNum=0;
      //当前的折扣
      _this.discountAmount=0;
      


    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.shop_car {
  width: 100%;
  height: 100%;
  background: #eeeee1;
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
  .no-shop {
    padding-top: 5rem;
    text-align: center;
    & > a {
      display: block;
      & > span {
        display: inline-block;
        margin: 1.25rem auto;
        width: 7.583rem;
        line-height: 2.208rem;
        border: 1px solid #9f2e33;
        color: #9f2e33;
        text-align: center;
        border-radius: 3px;
      }
    }
  }
  .yes-shop {
    padding-top: 3.4rem;
    .goods-item {
      .item_boxs {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 1rem;
        height: 9rem;
        background: #fff;
        border-bottom: 1px solid #ebebeb;
      }
      .item_checkbox {
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        background: url(../m-images/check_off.png) no-repeat left /1.4rem 1.4rem;
      }
      .item_checkbox_on {
        background: url(../m-images/check_on.png) no-repeat left /1.4rem 1.4rem;
      }
      .item_link {
        width: 10rem;
        font-size: 0.8rem;
        color: #999;
        .item_money {
          font-size: 1.3rem;
          color: #f34f34;
        }
      }
      .item_number {
        width: 9rem;
        .number_computter {
          float: right;
          width: 9rem;
          height: 3rem;
          border: 1px solid #ebebeb;
          .computer_jian,
          .computer_jia,
          .computer_num {
            float: left;
            display: inline-block;
            width: 3rem;
            line-height: 3rem;
            text-align: center;
            margin-left: -1px;
            border-right: 1px solid #ebebeb;
          }
          .computer_jia {
            border-right: none;
          }
        }
        .item_delete {
          float: right;
          height: 3rem;
          width: 3rem;
          background: url(../m-images/delete.png) no-repeat center /2rem 2rem;
          border: 1px solid #fff;
        }
        .sui_money {
          float: right;
          line-height: 2rem;
          color: #999;
        }
      }
    }
  }
  .car_footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6rem;
    border-top: 1px solid #e9ebf1;
    background: #fff;
    font-size: 1.143rem;
    .car_footer_l {
      float: left;
      width: 64%;
      & > div {
        padding: 1rem 1rem;
      }
      .checkbox_box {
        float: left;
        margin-top: 1.5rem;
        margin-left: 0.5rem;
        padding-left: 1.4rem;
        display: inline-block;
        height: 1.4rem;
        line-height: 1.4rem;
        background: url(../m-images/check_off.png) no-repeat left /1.4rem 1.4rem;
      }
      .checkbox_box_on {
        background: url(../m-images/check_on.png) no-repeat left /1.4rem 1.4rem;
      }
      .car_moneylist {
        float: right;
        text-align: right;
        font-size: 1rem;
        .money_sum {
          .money_color {
            color: #9f2e33;
          }
        }
        .money_sum1,
        .money_move,
        .money_sui {
          font-size: 0.83rem;
          color: #c3c3c3;
          line-height: 1rem;
        }
      }
    }
    .car_footer_r {
      float: right;
      width: 36%;
      background: #9f2e33;
      color: #fff;
      text-align: center;
      line-height: 6rem;
      font-size: 1.4rem;
    }
  }
}
</style>
