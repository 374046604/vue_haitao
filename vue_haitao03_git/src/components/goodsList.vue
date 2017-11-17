<template>
  <ul class="good_list clearfix">
    <li v-for="(item,index) in goodsLists" :key="item.id">
        <router-link :to="'/goodsDetails?goodsNo='+ item.goodsNo">
        <div v-if="item.count==0" class="no-goods">已抢光</div>
        <div class="goods-img">
          <img :src="item.imgUrl" width="100%"  />
        </div>
      <p class="goods-der">
          <span class="activity" v-html="item.couponPolicyName" v-if="item.couponPolicyName &&getNowTime(nowTime) > getNowTime(item.startTime) && getNowTime(nowTime) < getNowTime(item.endTime)"></span>
          <span v-html="item.goodsName"></span>
        </p>
        <div class="goods-price">
            <ins class="current-price">¥<span v-html="parseFloat(item.mallPrice).toFixed(2)"></span></ins>
            <del class="original-price">¥<span v-html="parseFloat(item.marketPrice).toFixed(2)"></span></del>
        </div>

        </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "good_list",
  props: ["oneList","queryParams","queryApi"],
  data() {
    return {
      //现在的时间
      nowTime: "",
      goodsList:[]
    };
  },
  //父级传来的数据是异步的 想要处理必须在计算属性
  computed: {
    //数据处理
    goodsLists() {
      return this.oneList ||this.goodsList;
    }
  },
  components: {},
  mounted() {
    var _this=this;
    //第三方进来的数据
    if(this.queryParams){
      _this.getGoodsList();

    }
  },
  methods: {
    getNowTime(nowTime) {
      return new Date(nowTime).getTime();
    },
    getGoodsList() {
            var oThis = this;
            //判断是不是初始值
            if( oThis.changePage()==1 ) {
                oThis.goodsList = [];
                $('.com-loading').addClass('margin-top1');
                $(window).scrollTop(0);
            }
            oThis.isLoading = true;
            oThis.end = false;
            oThis.runing = false;
            oThis.noNum = false;
            $.ajax({
                type : 'post',
                url:  this.queryApi,
                dataType: 'json',
                data : this.queryParams,
                success : function(data) {
                    console.log(data);
                    if( data.message ) {
                        //第一次加载
                        if( oThis.changePage()===1 ) {
                            oThis.goodsList = data.list;
                            oThis.pageTotal = data.pageTotal || data.pages;
                            // 没有数据
                            if( oThis.goodsList.length===0 ) {
                                oThis.isLoading = false;
                                oThis.noNum  = true;
                            }
                        } else {
                            oThis.goodsList = oThis.goodsList.concat(data.list);
                        }
                        oThis.nowTime = data.nowTime;
                        oThis.addPage();
                        oThis.runing = true;
                        // 数据加载完毕
                        if( oThis.changePage()===oThis.pageTotal+1 ) {
                            oThis.end = true;
                            oThis.isLoading = false;
                        }
                    }
                }
            });
        },
        changePage() {
            return this.queryParams.page || this.queryParams.pageNum;
        },
        addPage() {
            return this.queryParams.page++ || this.queryParams.pageNum++;
        }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.good_list {
  li {
    padding-bottom: 1rem;
    float: left;
    width: 50%;
    background: #fff;
    .goods-img {
      padding: 0.833rem;
    }
    .goods-der {
      padding: 0 0.75rem;
      height: 2.7rem;
      line-height: 1.4rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      span {
        color: #4d4d4d;
      }
    }
    .goods-price {
      padding: 0 0.75rem;
      .current-price {
        color: #f34f34;
        text-decoration: none;
      }
      .original-price {
        color: #b6bbc1;
      }
    }
  }
}
</style>
