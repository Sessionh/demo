<template>
  <div class="ganeralize">
    <BScroll
      class="bscroll"
      :isTop="true"
      :bounce="false"
    >

      <div class="header">
        <img
          class="user-logo"
          :src="userDetail.iamge"
        >

        <span class="msg">
          <p>{{userDetail.videoTitle}}</p>
          <p class="use">
            <img :src="userDetail.userPic">
            <span>{{userDetail.userNickname}}</span>
          </p>
        </span>

      </div>

      <div
        class="checked-item"
        @click="isCity = true"
      >
        <span class="name">选择投放城市</span>
        <span>{{this.userDetail.city ? this.userDetail.city : '全部'}}</span>
        <van-icon
          class="icon"
          name="arrow"
        />
      </div>

      <!-- <div class="checked-item">
        <span class="name">选择投放板块</span>
        <span>全部</span>
        <van-icon
          class="icon"
          name="arrow"
        />
      </div> -->

      <div class="select-money">
        <div class="title">
          投放金额
        </div>
        <div class="money-cloumn">
          <div
            class="num-li "
            :class="index === moneyIndex ? 'action' : ''"
            v-for="(item, index) in moneyList"
            @click="changeMoney(index)"
            :key="index"
          >
            <span>￥{{item.num}}</span>
          </div>

        </div>
      </div>

      <div class="user-count-column">
        <span class="item">
          <span class="fwb">预计受众用户：</span>
          <span class="color-red">{{numDetail.expectUserNum | filterTenThousand}}万人</span>
        </span>
        <span class="item">

          <span class="fwb">预计浏览量：</span>
          <span class="color-red">{{numDetail.expectViewNum | filterTenThousand}}万人/次</span>
        </span>
        <span class="item">
          <span class="fwb">预计获得点赞量：</span>
          <span class="color-red">{{numDetail.expectLikeNum | filterTenThousand}}万</span>
        </span>

      </div>

      <div class="item-hr border-top"></div>

      <div
        class="progress"
        @touchmove="touchmove"
      >

        <div class="progress-title fwb">调整KB抵扣数量</div>
        <div class="progress-num">
          <div
            class="now-num"
            :style="{left: `${progressNum}%`}"
          >
            <div class="content">
              <img src="generalize/1@3x.png">
              <div
                class="num"
                :style="{left: progressNum <= 2 ? '0.2rem' : 0 }"
              >{{nowNum}}kb</div>

            </div>

          </div>

          <div class="start-num">0kb</div>
          <div class="end-num">{{countNum}}kb</div>
        </div>
      </div>

    </BScroll>

    <div class="pay-action border-top">
      <div class="left-msg">
        <div class="top-num">
          <span class="item ">实付金额:<span class="color-red">￥{{numDetail.realMoney}}</span></span>
          <span class="item count-money">总金额:￥{{moneyList[moneyIndex].num}}</span>
        </div>
        <div class="bottom-num">
          <span class="item">kb抵扣:￥{{numDetail.kbMoney}}</span>
          <!-- <span class="item right">源力抵扣:s￥10.00</span> -->
        </div>
      </div>
      <div class="pay-but" @click="goToPay">去支付</div>
     
    </div>

    <div
      class="city-f"
      v-show="isCity"
    >

      <van-area
        class="area"
        :value="cityValue"
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择']"
        :columns-num="2"
        @cancel="areaCancel"
        @confirm="areaConfirm"
        title="投放城市"
      />

    </div>

  </div>
</template>
<script>
import BScroll from 'components/BScroll.vue';
import areaList from '@/lib/city.js'
import { getVideoDetail, extendPutMoney } from '../lib/api'

export default {
  components: {
    BScroll
  },
  data() {
    return {
      areaList,
      isCity: false,
      progressNum: 3,
      loop: '',
      startX: 0,
      windowWidth: '',
      windowSize: '',
      countNum: 100,
      nowNum: '0',
      moneyIndex: 0,
      moneyList: [
        {
          num: 100
        },
        {
          num: 200
        },
        {
          num: 300
        },
        {
          num: 400
        },
        {
          num: 500
        }
      ],
      userDetail: '',
      cityValue: '',
      numDetail: '',
      putMoney: 0,
      id: ''

    }
  },
  filters: {
    filterTenThousand(val) {
      if(val) {
        return val/10000 > 0 ? val/10000 : 0
      } else {
        return ''
      }

    }

  },
  mounted() {
    this.windowWidth = window.innerWidth;
    let size = document.getElementsByTagName('html')[0].style.fontSize;
    size = size.replace(/px/, '')
    this.windowSize = size
    this.getList()
    console.log(this.areaList.city_list)


  },
  methods: {
    // 提交e
    goToPay() {     
      this.appMessage({id: '823929392', money: 300})   
    },
   
     // 通知客户端，token失效
   
    appMessage(str) {
      
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器   
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
        if (isAndroid) {
          // window.android.test();
          JavaScriptClient.goToPay(str);
        } else if (isiOS) {
            window.webkit.messageHandlers.AppModel.postMessage({
                'str': str
            });
            // Window.webkit.messageHandlers.callPhone.postMessage(['电话咨询'])
        }
    },


    findKey(value, obj, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value))
    },
    async getList() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
      await getVideoDetail({ id: '5285890796667689016' }).then(ret => {
      
        console.log(ret.data.data)
        this.userDetail = ret.data.data
        if (this.userDetail.city) {
          let result = this.findKey(this.userDetail.city, this.areaList.city_list);
          this.cityValue = result
        }

      })
      await extendPutMoney({
        kbNum: 0 ,
        putMoney: this.putMoney
      }).then(ret => {
        console.log(ret)
        this.numDetail = ret.data.data
      })
      this.$toast.clear();

     

    },
    async getExtendPutMoney() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
      await extendPutMoney({
        kbNum: 0 ,
        putMoney: this.putMoney
      }).then(ret => {
        console.log(ret)
        this.numDetail = ret.data.data

      })
      this.$toast.clear();


    },
    areaCancel() {
      this.isCity = false

    },
    areaConfirm(ev) {
      this.isCity = false
      this.userDetail.city = ev[1].name
    },
    changeMoney(val) {
      this.moneyIndex = val;
     
      console.log( this.moneyList[val].num)
      let num = this.moneyList[val].num
      this.putMoney = num ? num : 0;
      this.getExtendPutMoney()

    },

    touchmove(ev) {

      let pageX = ev.changedTouches[0].pageX;
      let resultProNum = Number(pageX / this.windowWidth * 100).toFixed(2);
      // console.log(curNum)
      if (Number(resultProNum) < 0) {
        this.progressNum = 0
      } else if (Number(resultProNum) > 100) {
        this.progressNum = 100
      } else {
        this.progressNum = Number(resultProNum)
      }
      this.nowNum = Number(this.countNum * this.progressNum / 100).toFixed(2)




    },

  }

}
</script>
<style lang="scss" scoped>
.color-red {
  color: #ff4c64;
}
.ganeralize {
  height: 100%;
  width: 100%;
  .bscroll {
    background: #ffffff;
  }
  .header {
    display: flex;
    background: #ffd91b;
    padding: 40px 50px;
    .user-logo {
      width: 142px;
      height: 142px;
      border-radius: 20px;
    }
    .msg {
      padding-left: 20px;
      font-size: 28px;
      font-weight: bold;
      .use {
        display: flex;
        align-items: center;
        font-size: 20px;
        padding-top: 50px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
        span {
          padding-left: 10px;
        }
      }
    }
  }

  .checked-item {
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 25px;
    font-size: 24px;
    .name {
      flex: 1;
      font-size: 28px;
    }

    .icon {
      font-size: 28px;
    }
  }

  .select-money {
    .title {
      font-size: 24px;
      padding: 30px 25px 10px 25px;
    }
    .money-cloumn {
      display: flex;
      flex-flow: row wrap;
      padding: 0 30px;
      font-size: 24px;
      .num-li {
        width: 216px;
        height: 100px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        margin: 20px 20px 0 0;
        font-size: 28px;
      }
      .num-li:nth-child(3n) {
        margin: 20px 0 0 0;
      }
      .action {
        background: #ffd917;
      }
    }
  }

  .user-count-column {
    display: flex;
    flex-flow: row wrap;
    padding: 20px 30px 0;
    font-size: 24px;
    .item {
      padding: 18px 60px 0 0;
    }
    .item:nth-child(2n) {
      padding: 18px 0 0 0;
    }
  }

  .item-hr {
    height: 2px;
    width: calc(100% - 60px);
    margin: 48px 30px 0;
  }

  .progress {
    padding: 0 30px;
    border-bottom: 134px solid #fff;
    .progress-title {
      padding: 40px 0 70px 0;
    }
    .progress-num {
      height: 10px;
      width: 100%;
      border-radius: 10px;
      background: #eaeaea;
      position: relative;
      font-size: 20px;
      img {
        width: 44px;
        height: 44px;
      }
      .start-num {
        position: absolute;
        left: 0;
        top: 30px;
      }
      .end-num {
        position: absolute;
        right: 0;
        top: 30px;
      }
      .now-num {
        position: absolute;
        left: 0;
        top: -17px;
        width: 160px;
        text-align: center;
        transform: translateX(-80px);

        .num {
          position: absolute;
          left: 0;
          top: -32px;
          width: 160px;
          text-align: center;
        }
        .content {
          position: relative;
        }
      }
    }
  }
  .pay-action {
    height: 124px;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 0 30px;
    .left-msg {
      flex: 1;
      .top-num {
        display: flex;
        align-items: center;

        .count-money {
          font-size: 22px;
          text-decoration: line-through;
          padding-left: 20px;
        }
      }
      .bottom-num {
        display: flex;
        align-items: center;
        font-size: 22px;
        color: #a9a9a9;
        margin-top: 14px;
        .right {
          padding-left: 20px;
        }
      }
    }
    .pay-but {
      width: 150px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ff494d;
      color: #fff;
      border-radius: 10px;
      font-size: 32px;
    }
  }

  .city-f {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    .area {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
    }
  }
}
</style>