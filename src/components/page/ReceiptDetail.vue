<script setup >
import { ref } from "vue";
import arrowDown from "../../img/ico/arrow_down.png"
import arrowUp from "../../img/ico/arrow_up.png"
const show = ref(false);
console.log("show = ",show)

</script>
<template>
  <div className="wrap">
    <div className="" id="continer">
      <Gbox_pc_2000_left_menu />
      <div className="content">
        <div class="content_wrap" id="hisReceptionTable">
          <!-- title header -->
          <div class="tit_top_wrap">
            <h3 class="tit_h3" i18nCd="lang_RepHst">수신내역</h3>
            <div class="frt" id="app">
              <span class="srch_field">
                <input
                  type="text"
                  placeholder="검색 항목을 입력 주세요"
                  i18nCd="lang_pHSearchHead"
                  id="searchRece"
                  i18n-placeholder="true"
                />
                <a href="javascript:" class="btn_srch" id="btnSearchRecep">
                  <img src="../../img/btn/ico_srch.png" alt="button search"
                /></a>
              </span>
              <a
                @click="show = !show"
                href="javascript:"
                class="white1"
				        v-bind:id="show ? 'detailUp':'detailDown'"
                ><span>
                  <label i18nCd="lang_detail">상세</label>
				          <img v-bind:src="show ? arrowDown : arrowUp" alt="down" />
                </span>
              </a>
              <!-- <a href="javascript:" class="white1" id="detailUp"
                ><span>
                  <label i18nCd="lang_detail">상세</label>
                  <img src= alt="up" /> </span
              ></a> -->
            </div>
          </div>
		  
         <Transition>
			<div class="table_wrap" style="display: block">
            <!-- table search-->
			<div class="tbl_srch" id="block_search" v-if="show">
              <input type="hidden" id="tr_date" data-id="tr_date" />
              <table class="" id="tbl_Reclist">
                <caption></caption>
                <colgroup>
                  <col style="width: 62px" />
                  <col style="width: 267px" />
                  <col style="width: 54px" />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div i18nCd="lang_RepDat">접수 일시</div>
                    </th>
                    <td>
                      <div id="firstDate" class="date-range">
                        <input
                          id="send_ftdate"
                          type="text"
                          style="width: 83px"
                          class="text range-start"
                          data-id="send_ftdate"
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
                          id="send_todate"
                          type="text"
                          style="width: 83px"
                          class="text range-end"
                          data-id="send_todate"
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
                        <select id="INQ_GB" style="width: 75px">
                          <option value="9" i18nCd="lang_total">전체</option>
                          <option value="1" i18nCd="lang_content">내용</option>
                          <option value="2" i18nCd="lang_Snr">발송자</option>
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
                        <a href="javascript:" class="btn_sch" id="btn_Search"
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
          </div>
		 </Transition>

          <div class="table_max mgt20">
            <!-- 최소 높이값에 해당하는 클래스 table_max 입니다. -->
            <!-- table result -->
            <table class="tbl_result">
              <caption></caption>
              <colgroup>
                <col style="width: 150px" />
                <col />
                <col style="width: 250px" />
                <col style="width: 100px" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col"><div i18nCd="lang_RepDat">수신일시</div></th>
                  <th scope="col">
                    <div i18nCd="lang_MsgCnt">메시지 내용</div>
                  </th>
                  <th scope="col"><div i18nCd="lang_ShpNm">발송자명11</div></th>
                  <th scope="col"><div i18nCd="lang_ShpCtg">발송구분</div></th>
                </tr>
              </thead>
              <tbody id="hisTable"></tbody>
              <tfoot id="histfoot" style="text-align: center">
                <tr>
                  <td colspan="4">
                    <div i18ncd="lang_noContentFound">
                      검색된 내용이 존재하지 않습니다.


                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
            <!-- //table result -->
          </div>

          <!-- Paging wrap -->
          <div class="paging_wrap mgt15">
            <div class="combo_wrap">
              <div class="combo_style">
                <a href="javascript:" class="bg"
                  ><span id="hisPageSize" i18nCd="lang_strNo15">15개</span></a
                >
                <ul style="display: none; z-index: 9999">
                  <li value="15개">
                    <a href="javascript:" i18nCd="lang_strNo15">15개</a>
                  </li>
                  <li value="20개">
                    <a href="javascript:" i18nCd="lang_strNo20">20개</a>
                  </li>
                  <li value="30개">
                    <a href="javascript:" i18nCd="lang_strNo30">30개</a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- pagination -->
            <div class="paging" id="hisPaging"></div>
            <!-- //pagination -->
          </div>
          <!-- //Paging wrap -->
        </div>
      </div>
    </div>
  </div>
</template>
