<style>
  @import './css/content_new.css';
  @import './css/content.css';
  @import './css/common.css';
  /* @import './css/jquery_ui_custom.css'; */
  /* @import './css/reset.css'; */
  /* @import './css/reset_new.css'; */
  /* @import './css/gm_contents.css'; */

</style>
<script setup>
import Gbox_pc_2000_left_menu from './components/layout/Gbox_pc_2000_left_menu.vue';
import Gbox_pc_header from './components/layout/Gbox_pc_header.vue';
</script>
<template>
     <div className="wrap" style="min-height: 100vh !important;" >
        <Gbox_pc_header/>
      <div className="container" id="container">
        <Gbox_pc_2000_left_menu />
        <div className="content">
            <router-view></router-view>   
        </div>
      </div>
    </div>
</template>