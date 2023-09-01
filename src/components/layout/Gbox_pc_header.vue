<template>
  <form id="bizEl_frmStnd" name="bizEl_frmStnd" method="post">
    <input type="hidden" id="PTL_ID" name="PTL_ID" value="PTL_51" />
    <input type="hidden" id="USER_ID" name="USER_ID" value="simdemo01t" />
    <input type="hidden" id="CHNL_ID" name="CHNL_ID" value="CHNL_1" />
    <input type="hidden" id="USER_DATA" name="USER_DATA" value="" />
    <input type="hidden" id="APP_SRNO" name="APP_SRNO" value="" />
    <input type="hidden" id="BLBR_ID" nwame="BLBR_ID" value="" />
    <input type="hidden" id="CNTS_NM" name="CNTS_NM" value="그린메시지" />
    <input type="hidden" id="CNTS_ID" name="CNTS_ID" value="CNTS_338" />
    <input type="hidden" id="CNTS_PATH" name="CNTS_PATH"
      value="/file/img/20140813_f0292155-a039-4be0-ae67-9aae69cef10b.png" />
    <input type="hidden" id="quick_menu" name="quick_menu" />
    <input type="hidden" id="USER_OS" name="USER_OS" value="" />
    <input type="hidden" id="DSNC" name="DSNC" value="2" />
    <input type="hidden" id="USE_INTT_ID" name="USE_INTT_ID" value="UTLZ_1709060902735" />
    <input type="hidden" id="CUY_ID" name="CUY_ID" value="CUY_14" />
  </form>
  <div class="wp_header3_wrap bg_white1_">
    <div class="wp_header3_box">
      <div class="right2" style="float: right">
        <em class="txt_line f_left">|</em>
        <div class="inline_block f_left">
          <a href="javascript:bizJs.community('https://sportal-dev.bizplay.co.kr/');">
            <img class="icon_img" src="https://sportal-dev.bizplay.co.kr/img/btn/btn_tophd_community.png?v=1" />
            <span ml-text="cnts-community">온라인고객센터</span>
          </a>
        </div>
        <span id="bizEl_community_tooltip" onclick="bizJs.tooltipHide()" style="
            position: absolute;
            cursor: pointer;
            z-index: 999;
            top: 19px;
            margin-left: -170px;
            display: none;
          "><img src="https://sportal-dev.bizplay.co.kr/img/bg/wp_hdalrmlayerbg1.png?v=1" /></span>
        <div class="inline_block f_left" style="display: ">
          <a id="bizEl_btnBizPoint" href="javascript:;">
            <img class="icon_img" id="bizEl_info"
              src="https://sportal-dev.bizplay.co.kr/img/btn/btn_tophd_point.png?v=1" />
            <span ml-text="cnts-point">포인트
              <div id="bizEl_bizPointDiv" class="ly_cmd_header" style="
                  top: 32px;
                  right: -10px;
                  width: 161px;
                  height: 103px;
                  display: none;
                ">
                <div id="bizEl_bizPointDivNotibx" class="ly_notibx">
                  <span class="arr" style="
                      left: auto;
                      right: 15px;
                      background-image: url(https://sportal-dev.bizplay.co.kr/biz/img/cmd_header/bg_lycmd_arr.png);
                    "></span>
                  <form id="bizEl_bizPointFrm" target="bizEl_bizPointFrame"
                    action="https://wepoint-dev.bizplay.co.kr/widget_0003.act" method="post">
                    <input type="hidden" name="PTL_ID" value="PTL_51" />
                    <input type="hidden" name="CHNL_ID" value="CHNL_1" />
                    <input type="hidden" name="USE_INTT_ID" value="UTLZ_1709060902735" />
                    <input type="hidden" name="OWNER_ID" value="UTLZ_1709060902735" />
                    <input type="hidden" name="USR_ID" value="simdemo01t" />
                    <input type="hidden" name="CHRG_USE_URL" value="1" />
                  </form>
                </div>
              </div>
            </span>
            <strong class="num2" style="display: none">N</strong></a>
        </div>
        <a href="javascript:bizJs.smartAppDown('https://sportal-dev.bizplay.co.kr/');" class="f_left">
          <img class="icon_img" id="bizEl_info"
            src="https://sportal-dev.bizplay.co.kr/img/btn/btn_tophd_mobile.png?v=1" />
          <span ml-text="cnts-download">앱 다운로드</span>
          <strong class="num2" style="display: none">N</strong>
        </a>
        <div class="inline_block f_left">
          <a href="javascript:bizJs.cntsRemote('https://sportal-dev.bizplay.co.kr/');">
            <img class="icon_img" src="https://sportal-dev.bizplay.co.kr/img/btn/btn_tophd_reSupport.png" />
            <span>원격지원</span>
          </a>
        </div>
      </div>
      <div class="left">
        <h1>
          <a href="https://sportal-dev.bizplay.co.kr/main_0003_01.act">
            <img src="https://sportal-dev.bizplay.co.kr/file/img/20150122_50fd974b-2049-4902-9b0d-33214d50500e.png"
              alt="메인바로가기" class="logo_resize" /></a>
        </h1>
        <h3>비플테스트(주)</h3>
        <h2 id="titH" ml-text="cnts-header">그린메시지</h2>
      </div>
     
    </div>
  </div>
</template>
