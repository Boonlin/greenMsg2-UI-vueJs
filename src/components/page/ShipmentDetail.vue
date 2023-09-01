<!-- <script>
import { ref } from "vue";

const show = ref(false)

</script> -->
<template>
  <div class="content_wrap">
    <!-- title header -->
    <div class="tit_top_wrap">
      <h3 class="tit_h3" i18nCd="lang_sendHst">발송내역</h3>
      <div class="frt srch_field_wrap">
        <!-- class of icon list srch_field_wrap -->
        <span class="srch_field">
          <input
            type="text"
            i18nCd="lang_pHSearchHead"
            id="searchHead"
            placeholder="검색 항목을 입력 주세요"
            i18n-placeholder="true"
            maxlength="50"
          />
          <a href="javascript:" class="btn_srch" id="btnSearchHead"
            ><img src="../../img/btn/ico_srch.png" alt="button search"
          /></a> </span
        ><a href="javascript:" class="white1" v-bind:id="showDetail?'detailD':'detailU'"
             @click="toggleDetail"><span
            ><label i18nCd="lang_detail">상세</label
            ><img v-bind:src="showDetail? arrowDown:arrowUp" alt="down" /></span></a
        ><a href="javascript:" class="white1" id="detailU" style="display: none"
          ><span
            ><label i18nCd="lang_detail">상세</label
            ><img src="../../img/ico/arrow_up.png" alt="up" /></span></a
        ><a href="javascript:" class="white1" id="btnVisible">
          <span
               @click="toggleViewSetting()"><img
              src="../../img/ico/list_ico.png"
              alt="setting"
              style="margin-top: 4px"
            /><img
              src="../../img/ico/list_ico.png"
              alt="setting"
              style="margin-top: 4px; display: none"
            /> </span></a
        ><a href="javascript:" class="white1" id="setting"
          ><span
          @click="toggleInfo()"><img
              src="../../img/ico/ico_setting.png"
              alt="setting"
              style="margin-top: 4px; display: none" /><img
              src="../../img/ico/ico_setting.png"
              alt="setting"
              style="margin-top: 4px" /></span
        ></a>
        <!-- <span class="srch_field"><input type="text" id="searchHead" placeholder="검색 항목을 입력 주세요" maxlength="50"/><a href="javascript:" class="btn_srch" id="btnSearchHead">
						<img src="../img/btn/ico_srch.png" alt="button search"/></a></span><a href="javascript:" class="white1" id="detailD" ><span>상세<img src="../img/ico/arrow_down.png" alt="down"/></span></a>
						<a href="javascript:" class="white1" id="detailU" style="display: none;"><span>상세<img src="../img/ico/arrow_up.png" alt="up"/></span></a>
						<a href="javascript:" class="white1" id="setting">
							<span>
								<img src="../img/ico/ico_setting.png" alt="setting" style="margin-top:4px; display:none;"/>
								<img src="../img/ico/list_ico.png" alt="setting" style="margin-top: 4px;"/>
							</span>
						</a> -->

        <!-- layer -->
        <div class="tit_top_layer" v-if="showInfo">
          <ul>
            <li>
              <a href="javascript:" id="editProfile" i18nCd="lang_senderInfo"
                >   </a
              >
            </li>
            <li>
              <a href="javascript:" id="linKGroup" i18nCd="lang_linkInfo"
                >링크정보</a
              >
            </li>
            <li>
              <a href="javascript:" id="setTimeSMS" i18nCd="lang_unSendSmsInfo"
                >미확인 SMS 안내</a
              >
            </li>
            <!-- SMS전송설정 -->
            <li>
              <a href="javascript:" id="smsSendSetting" i18nCd="lang_setSendSms "
                >SMS 발송 설정</a
              >
            </li>
            <!-- <li><a href="javascript:" id="paidUseSetting">유료 사용 설정</a></li> -->
          </ul>
        </div>
        <!-- //layer -->
      </div>
    </div>
    <form id="submitForm">
      <input type="hidden" id="SEND_DT" data-id="SEND_DT" />
      <div class="table_wrap">
        <!-- table search-->
        <!-- <div class="tbl_srch"style="display: none;"> -->
        <div class="tbl_srch" id="block_srch" v-if="showDetail">
          <table class="">
            <caption></caption>
            <colgroup>
              <col style="width: 62px" />
              <col style="width: 267px" />
              <col style="width: 54px" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row"><div i18nCd="lang_sendDate">발송일자</div></th>
                <td>
                  <div id="sendFrdt" class="date-range">
                    <input
                      type="text"
                      style="width: 83px"
                      id="SEND_FRDT"
                      class="text range-start"
                      data-id="SEND_FRDT"
                      data-validation-engine="validate[required]"
                      title="달력;"
                    /><a href="javascript:"
                      ><img
                        class="text range-start"
                        src="../../img/ico/ico_calendar.png"
                        alt="달력"
                    /></a>
                    ~
                    <input
                      type="text"
                      style="width: 83px"
                      id="SEND_TODT"
                      class="text range-end"
                      data-id="SEND_TODT"
                      data-validation-engine="validate[required]"
                      title="달력"
                    /><a href="javascript:"
                      ><img
                        class="text range-start"
                        src="../../img/ico/ico_calendar.png"
                        alt="달력"
                    /></a>
                  </div>
                </td>
                <th scope="row">
                  <div
                    i18nCd="lang_content"
                    style="text-align: right; padding-right: 5px"
                  >
                    내용
                  </div>
                </th>
                <td>
                  <div class="srch_field_wrap">
                    <select id="INQ_GB" data-id="INQ_GB" style="width: 75px">
                      <option value="" i18nCd="lang_total">전체</option>
                      <option value="1" i18nCd="lang_content">내용</option>
                      <option value="2" i18nCd="lang_receiver">수신자</option>
                      <option value="3">수신자번호</option>
                    </select>
                    <span i18nCd="lang_pHInqData"
                      ><input
                        type="text"
                        style="width: 198px"
                        id="INQ_DATA"
                        data-id="INQ_DATA"
                        placeholder="검색어를 입력하세요."
                        maxlength="50"
                    /></span>
                    <a href="javascript:" class="btn_sch" id="btnSearch"
                      ><span i18nCd="lang_search">검색</span></a
                    >
                    <!-- <a href="javascript:" class="white2 mgl5" id ='btnSearch' style="min-width:32px;"><img src="../img/btn/ico_srch.png" alt="button search"><span style="display:inline-block;padding: 2px 11px 0 0;">검색</span></a> -->
                    <!-- <a href="javascript:" class="white2" id ='btnVisible'><span>부가기능 보기설정 <img src="../img/ico/arrow_down.png" alt="down"><img src="../img/ico/arrow_up.png" alt="up" style="display:none"></span></a> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- //table search -->

        <!--20140929 mengly  -->
        <!-- popup wrap -->

        <!-- <div class="popup_wrap srch_field_wrap" id="visibleTable" style="display:none; right:58px; top: 56px; border: 1px solid  #888;z-index: 1"> left: 628px;  -->
        <div
          class="lypopup_wrap srch_field_wrap"
          id="visibleTable"
          style="
            right: 58px;
            top: 56px;
            border: 1px solid #888;
            z-index: 1;
          "
                v-if="showViewSetting" >
          <!-- left: 628px;  -->
          <!-- title -->
          <div class="pop_tit1_wrap">
            <!--<img src="../img/bg/tail_layer_popup3_wrap.png" alt="" style="margin-top: -9px;margin-left: 168px;"/>	 -->
            <h1 class="tit_h1" i18nCd="lang_viewSetting">보기설정</h1>
            <a
              href="javascript:"
              id="visibleCancel"
              class="btn_style btn_popx"
              style="
                background-image: url('../imgs/btn/btn_ly_popclose.png');
                background-position: 0px 0px;
              "
              ><span class="blind">팝업 닫기</span></a
            >
          </div>
          <!-- //title -->
          <div class="popup_cnt">
            <!-- title -->
            <div class="popup_tit2_wrap">
              <h2 class="tit_h2" i18nCd="lang_visibleField">보이는 필드</h2>
              <div class="frt">
                <a href="javascript:" id="last"
                  ><img src="../../img/btn/btn_go_last.png" alt=""
                /></a>
                <a href="javascript:" id="next"
                  ><img src="../../img/btn/btn_go_next.png" alt=""
                /></a>
                <a href="javascript:" id="prev"
                  ><img src="../../img/btn/btn_go_prev.png" alt=""
                /></a>
                <a href="javascript:" id="first"
                  ><img src="../../img/btn/btn_go_first.png" alt=""
                /></a>
              </div>
            </div>
            <!-- //title -->

            <div class="view_setting_lst" style="width: 190px">
              <ul id="sortable">
                <li>
                  <label for=""
                    ><input
                      type="checkbox"
                      checked
                      name="tblView"
                      id="01"
                      value="01"
                    /><span i18nCd="lang_01">발송일시</span></label
                  >
                </li>
                <li>
                  <label for=""
                    ><input
                      type="checkbox"
                      checked
                      name="tblView"
                      id="02"
                      value="02"
                    /><span i18nCd="lang_02">메시지내용</span></label
                  >
                </li>
                <li>
                  <label for=""
                    ><input
                      type="checkbox"
                      checked
                      name="tblView"
                      id="03"
                      value="03"
                    /><span i18nCd="lang_03">발송구분</span></label
                  >
                </li>
                <li>
                  <label for=""
                    ><input
                      type="checkbox"
                      checked
                      name="tblView"
                      id="04"
                      value="04"
                    /><span i18nCd="lang_04">미확인/전체</span></label
                  >
                </li>
                <li>
                  <label for=""
                    ><input
                      type="checkbox"
                      checked
                      name="tblView"
                      id="05"
                      value="05"
                    /><span i18nCd="lang_05">발송자명</span></label
                  >
                </li>
                <li>
                  <label for=""
                    ><input
                      type="checkbox"
                      checked
                      name="tblView"
                      id="06"
                      value="06"
                    /><span i18nCd="lang_06">사업장</span></label
                  >
                </li>
                <li>
                  <label for=""
                    ><input
                      type="checkbox"
                      checked
                      name="tblView"
                      id="07"
                      value="07"
                    /><span i18nCd="lang_07">SMS건수</span></label
                  >
                </li>
              </ul>
            </div>

            <div class="tac mgt10">
              <a href="javascript:" class="green2" id="visibleSave"
                ><span i18nCd="lang_save">저장</span></a
              ><a href="javascript:" class="white3" id="visibleCancel"
                ><span i18nCd="lang_cancel">취소</span></a
              >
            </div>
          </div>
        </div>
        <!-- //popup wrap -->
        <!--20140929 mengly  -->
      </div>
    </form>
    <!-- 메시지송신목록 -->
    <div class="table_max mgt20">
      <!-- 최소 높이값에 해당하는 클래스 table_max 입니다. -->
      <!-- table -->
      <table
        id="tbl_list"
        class="tbl_result"
        summary="메시지송신목록을 나타내주는 표 입니다."
        style="font-weight: normal"
      >
        <caption i18nCd="lang_smsSendList">
          메시지송신목록
        </caption>
        <colgroup>
          <col style="width: 152px; min-width: 152px" />
          <col style="" />
          <col style="width: 135px" />
          <col style="width: 86px" />
          <col style="width: 100px" />
          <col style="width: 80px" />
          <col style="width: 75px" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" id="h01">
              <div i18nCd="lang_01" data-jxLn="DateofShipment">발송일시</div>
            </th>
            <th scope="col" id="h02">
              <div i18nCd="lang_02" data-jxLn="messageContent">메시지 내용</div>
            </th>
            <th scope="col" id="h03"><div i18nCd="lang_03">발송구분</div></th>
            <th scope="col" id="h04" class="bory">
              <div
                class="tar"
                i18nCd="lang_unComplete_total"
                data-jxLn="Total received/unknownt"
              >
                미확인/전체
              </div>
            </th>
            <th scope="col" id="h05"><div i18nCd="lang_05">발송자명</div></th>
            <th scope="col" id="h06"><div i18nCd="lang_06">사업장</div></th>
            <th scope="col" id="h07">
              <div class="tar" i18nCd="lang_07">SMS건수</div>
            </th>
          </tr>
        </thead>
        <!-- 
						<tfoot>
							<tr>
								<td colspan="3"><div id="getmsg" ></div></td>
							</tr>
						</tfoot> -->

        <tbody style="display: none">
          <tr>
            <td id="col01">
              <div id="">
                <span id="REG_DT"></span>&nbsp;<span id="REG_TM"></span>
              </div>
            </td>
            <td id="col02" class="tal">
              <div>
                <a href="Javascript:" class="msg_cnt" id="Ttext">
                  <span id="MSG_TXT"></span>
                </a>
              </div>
            </td>
            <td id="col03">
              <div>
                <span id="CHNL_CODE" style="display: none"></span
                ><span id="AppType"></span>
              </div>
            </td>
            <td id="col04" class="tar">
              <div id="CNT">
                <a href="javascript:" class="msg_cnt"
                  ><strong class="num_red" id="MI_CNT"></strong>/<span
                    id="TOT_CNT"
                  ></span
                ></a>
              </div>
            </td>
            <td id="col05">
              <div
                style="
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                "
              >
                <span id="SEND_NM" data-id="SEND_NM" title=""></span>
              </div>
            </td>
            <td id="col06">
              <div
                style="
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                "
              >
                <span id="SAUP_NM"></span>
              </div>
            </td>
            <td id="col07">
              <div><span id="SMS_CNT"></span></div>
            </td>
            <!-- <td id="col07"><div align="right"><span id="smsCnt"></span></div></td>  --><!-- SMS_CNT -->
          </tr>
        </tbody>
        <tfoot id="tfoot" style="display: none; text-align: center">
          <tr>
            <td colspan="7">
              <div data-jxLn="noContentFound" i18nCd="lang_noContentFound">
                <!-- No content found. -->
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <!-- //table -->
    </div>
    <!-- paging -->
    <div class="paging_wrap mgt15">
      <div class="field_wrap">
        <div class="field_cbox" style="width: 57px" data-ui-component="select">
          <a href="javascript:" class="field_style field_cbox_lst"
            ><span i18nCd="lang_strNo15"></span
          ></a>
          <ul class="field_cbox_ly" style="display: none"></ul>
          <select id="cmbo" style="display: none">
            <option value="15" i18nCd="lang_strNo15" selected>15개</option>
            <option value="20" i18nCd="lang_strNo20">20개</option>
            <option value="30" i18nCd="lang_strNo30">30개</option>
          </select>
        </div>
      </div>

      <!-- 
						<div class="combo_wrap">
							<div class="combo_style" data-ui-component="select">
								<a href="javascript:" class="bg"><span></span></a>
								<ul style="display:none;">
								</ul>
								<select id="cmbo" style="display:none;">							
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>		
								</select>
							</div>
						</div> -->

      <ul>
        <!-- <li><a href="javascript:"><img src="../../imgs/btn/btn_first.png" alt="처음 페이지" /><span class="blind">처음 페이지</span></a></li>
							<li><a href="javascript:"><img src="../../imgs/btn/btn_prev.png" alt="이전 페이지" /><span class="blind">이전 페이지</span></a></li> -->
        <li><div class="paging" id="paging"></div></li>
        <!-- <li><a href="javascript:"><img src="../../imgs/btn/btn_next.png" alt="다음 페이지" /><span class="blind">다음 페이지</span></a></li>
							<li><a href="javascript:"><img src="../../imgs/btn/btn_last.png" alt="마지막 페이지" /><span class="blind">마지막 페이지</span></a></li> -->
        <!-- <li><div class="newbutton">이용약관</div></li> -->
      </ul>
    </div>
    <!-- //paging -->

    <!-- //메시지송신목록 -->
  </div>
</template>
<script >
import arrowDown from '../../img/ico/arrow_down.png'
import arrowUp from '../../img/ico/arrow_up.png'
export default{
    data(){
      return{
        showDetail: false,
        arrowDown:arrowDown,
        arrowUp: arrowUp,
        showInfo: false,
        showViewSetting: false,
      }

    },
    methods:{
    toggleDetail(){
      this.showDetail = !this.showDetail
    },
    toggleInfo(){
        this.showInfo = !this.showInfo
    },
    toggleViewSetting(){
      this.showViewSetting = !this.showViewSetting
    }

    }
}

</script>