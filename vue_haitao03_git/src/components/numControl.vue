<template>
  <div class="number_computter">
    <span class="computer_jian" @click="jian">-</span>
    <span class="computer_num">{{val}}</span>
    <span class="computer_jia" @click="jia">+</span>
  </div>
</template>

<script>
export default {
  name: "number_computter",
  //theMaxNumber 库存最大值
  props: ["theNumber", "theMaxNumber", "index1", "index2"],
  data() {
    return {
      val: this.theNumber
    };
  },
  watch: {
    //这个组件的核心就是这个数量 每次操作数量 就将值传给父类
    //组件修改的只是展示的 负组件还要做相应的修改
    val: function() {
      //如果不为整数或0
      if (!/^\d*$/.test(this.val) || /^0/.test(this.val)) {
        this.val = 1;
      }
      if (parseInt(this.val) > this.theMaxNumber) {
        this.val = this.theMaxNumber;
      }
      this.$emit("cb", {
        val: this.val,
        index1: this.index1,
        index2: this.index2
      });
    }
  },

  computed: {},
  components: {},
  mounted() {
    console.log(this.index1 + "____" + this.index2 + "_____" + this.val);
  },
  methods: {
    jian() {
      if (this.val <= 0) {
        return;
      }
      this.val--;
      //将值传给前台
      //为什么传-1 是为了计算这个购物车的数量
      this.$emit("cb2", {
        val: -1,
        index1: this.index1,
        index2: this.index2
      });
    },
    jia() {
      if (this.val >= this.theMaxNumber) {
        return;
      }
      this.val++;
      //将值传给前台
      //为什么传 1 是为了计算这个购物车的数量
      this.$emit("cb1", {
        val: 1,
        index1: this.index1,
        index2: this.index2
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
</style>
