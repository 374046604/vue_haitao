<template>
  <div class="search">
    <div class="search_wrap clearfix">
      <a href="javascript:history.go(-1)" class="search_back"></a>
      <span class="search_f"></span>
      <div class="search_input" >
        <input type="text" class="search" v-model="searchKey" placeholder="方便面" @blur="setHistory(searchKey)"/>
        <a class="search_clear" href="javascript:void(0);" v-show="searchKey.trim()!==''" @click="clearSearch()" ></a>
      </div>
      <a class="search_button" href="javascript:void(0);" @click="goSearch"></a>
    </div>
    <div class="clear" style="height:3.4rem;"></div>
    <div class="hot-search">
        <p>热门搜索</p>
        <ul class="hot-items clearfix" >
            <li v-for="data in hotSearch">
                <a href="javascript:;" v-html="data.linkContent" @click="go($event)"></a>
            </li>
        </ul>
    </div>
    <div class="clear" style="height:20px;"></div>
    <div class="history-header">
        历史纪录  
        <button class="history-clear" @click="clearHistory">清空记录</button>
    </div>
    <ul class="history-item">
      <li class="history-item-list" v-for="data in history">
          <a href="javascript:;" v-html="data"></a>
      </li>
    </ul>
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

export default {
  name: "search",
  data() {
    return {
      //搜索词
      searchKey: "",
      //按键感应内容
      responseList: [],
      //热门关键字
      hotSearch: ["方便面", "德基", "1便面", "5德基", "方便面", "肯德基", "肯德基", "方便面", "肯德基"],
      //历史记录
      history: [],
      //默认搜索关键词
      linkContent: "方便面"
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
    let _this = this;
    //得到热门的关键字
    _this.getHotSearch();
    console.log(localStorage["lishi"]);
  },
  methods: {
    // 清除搜索关键词
    clearSearch: function() {
      this.searchKey = "";
      this.responseList = [];
    },
    //得到热门的关键字
    getHotSearch() {
      var oThis = this;
      axios
        .post(API.getHotSearch)
        .then(function(data) {
          if (data.data.message) {
            oThis.hotSearch = data.data.hotList;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //点击得到对应的数据 并且搜索
    go(e) {
      let _this = this;
      let theDom = e.target;
      //搜索关键词
      this.searchKey = theDom.innerText;
      //跳转到对应的页面
      if (this.searchKey == "") {
        this.$router.push({
          path: "goodsResult",
          query: { keyword: _this.linkContent }
        });
        return;
      }
      //如果不是无痕模式  就是存当前的 搜索关键字
      if (this.storageTest()) {
        this.setHistory(this.searchKey);
      }
      //带着当前关键字 跳转
      // this.$router.push({
      //   path: "goodsResult",
      //   query: { keyword: _this.searchKey }
      // })
    },
    // 判断是不是无痕模式
    storageTest: function() {
      if (window.localStorage) {
        return true;
      } else {
        return false;
      }
    },
    //存储历史关键词
    setHistory(v) {
      let lishi = JSON.parse(localStorage["lishi"]);
      if (lishi.length > 0) {
        for (var i in lishi) {
          if (v == lishi[i]) {
            return;
          }
        }
        lishi.unshift(v);
      } else {
        lishi.unshift(v);
      }
      if (lishi.length > 10) {
        lishi = lishi.slice(0, 10);
      }
      console.log(lishi);
      this.history = lishi;
      localStorage["lishi"] = JSON.stringify(lishi);
    },
    //清除历史记录
    clearHistory() {
      let lishi = [];
      this.history = lishi;
      localStorage["lishi"] = JSON.stringify(lishi);
    },
    goSearch() {
      if (!this.searchKey) {
        this.$router.push({
          path: "goodsResult",
          query: { keyword: this.linkContent }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.search {
  background: #eeeee1;
  .search_wrap {
    position: fixed;
    left: 0;
    top: 0;
    height: 3.4rem;
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
    .search_back {
      position: absolute;
      top: 1rem;
      left: 0.875rem;
      width: 1.4rem;
      height: 1.4rem;
      background: url(../m-images/header-back.png) no-repeat center /1.3rem 1.3rem;
    }
    .search_f {
      float: left;
      display: inline-block;
      width: 10%;
      height: 3.4rem;
    }
    .search_input {
      position: relative;
      float: left;
      margin-top: 0.7rem;
      width: 80%;
      height: 2rem;
      line-height: 2rem;
      border: none;
      background: #f4f4f4;
      border-radius: 8px;
      overflow: hidden;
      .search {
        padding-left: 0.5rem;
        width: 80%;
        height: 2rem;
        line-height: 2rem;
        border: none;
        background: #f4f4f4;
      }
      .search_clear {
        position: absolute;
        right: 1rem;
        top: 0.5rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: url(../m-images/close2.png) no-repeat center /1rem 1rem;
      }
    }
    .search_button {
      position: absolute;
      top: 1rem;
      right: 0.875rem;
      width: 1.4rem;
      height: 1.4rem;
      background: url(../m-images/header-search.png) no-repeat center /1.3rem 1.3rem;
    }
  }
  .hot-search {
    padding: 1rem;
    background: #fff;
    .hot-items {
      & > li {
        float: left;
        margin-right: 10px;
        margin-bottom: 8px;
        padding: 0 0.5rem;
        height: 1.6rem;
        line-height: 1.6rem;
        border-radius: 5px;
        background: #f1f1f1;
      }
    }
  }
  .history-header {
    padding: 0.6rem 1rem;
    background: #fff;
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #ebebeb;
    .history-clear {
      margin-top: 0.2rem;
      padding: 0 0.4rem;
      float: right;
      height: 1.6rem;
      line-height: 1.6rem;
      background: #fff;
      color: #b3b3b3;
      border: 1px solid #b3b3b3;
    }
  }
  .history-item {
    .history-item-list {
      padding: 0.3rem 1rem;
      background: #fff;
      color: #3b3b3b;
      border-bottom: 1px solid #ebebeb;
    }
  }
}
</style>
