<template>
  <div class="main-container">
    <wyvonj-header :class="{'nav-hide': !openDrawer}" :notification="notification"></wyvonj-header>
    <mu-drawer @close="handleDrawerClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
      <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png" alt="GDMS">
          <p class="jnudm">
            Jnudm
          </p>
        </div>
        <mu-list class="menu-border" @change="handleMenuChange" :value="menuValue">
          <mu-list-item value="topics" title="学生选题">
            <img src="../../assets/icon/description.svg" slot="left" alt="W" />
          </mu-list-item>
          <mu-list-item value="status" title="选题结果">
            <img src="../../assets/icon/beenhere.svg" slot="left" alt="W" />
          </mu-list-item>
          <mu-list-item value="grouping" title="答辩分组">
            <img src="../../assets/icon/group.svg" slot="left" alt="W" />
          </mu-list-item>
          <mu-list-item value="evaluation" title="导师评价">
            <img src="../../assets/icon/star_half.svg" slot="left" alt="W" />
          </mu-list-item>
          <mu-list-item value="contact" title="联系信息">
            <img src="../../assets/icon/contact_phone.svg" slot="left" alt="W" />
          </mu-list-item>
          <mu-list-item value="account" title="帐号管理">
            <img src="../../assets/icon/settings.svg" slot="left" alt="W" />
          </mu-list-item>
        </mu-list>
      </div>
    </mu-drawer>
    <transition name="main-transition" appear>
      <router-view :class="{'nav-hide': !openDrawer}" class="main-content"></router-view>
    </transition>
    <wyvonj-footer></wyvonj-footer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import WyvonjHeader from '../utils/WyvonjHeader.vue'
import WyvonjFooter from '../utils/WyvonjFooter.vue'
let isDesktop = () => window.innerWidth > 993
export default {
  data() {
      const desktop = isDesktop()
      return {
        openDrawer: desktop,
        docked: desktop,
        desktop: desktop,
        menuValue: 'topics',
        notification: '',
      }
    },
    methods: {
      changeNav() {
        const desktop = isDesktop()
        this.docked = desktop
        if (desktop === this.desktop)
          return
        if (!desktop && this.desktop && this.openDrawer)
          this.openDrawer = false
        if (desktop && !this.desktop && !this.openDrawer)
          this.openDrawer = true
        this.desktop = desktop
      },
      handleMenuChange(value) {
        this.menuValue = value
        this.$router.push('/student/' + value)
        if (!isDesktop())
          this.handleDrawerClose()
      },
      handleDrawerClose() {
        this.openDrawer = !this.openDrawer
      },
      toggleNav() {
        this.$children[2].sortCategory.apply(this)
        this.openDrawer = !this.openDrawer
      }
    },
    computed: {
      ...mapState(['user', 'notification'])
    },
    components: {
      WyvonjHeader,
      WyvonjFooter
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      var that = this
      //if (cookie.get('usertype') != 0)
      //return this.$router.push('/')
      this.handleResize = () => {
        this.changeNav()
      }
      window.addEventListener('resize', this.handleResize)
    }
}

</script>
