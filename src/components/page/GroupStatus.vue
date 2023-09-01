<template>
  <div class="content_wrap" id="groupSide" style="">
    <!-- title header -->
    <div class="tit_top_wrap">
      <!--  <h3 class="tit_h3" id="GRP_NM" data-id="GRP_NM" value=""><span id="GRUSER_CNT"></span></h3>  -->
      <h3 class="tit_h3" id="GRP_NM" data-id="GRP_NM" value=""></h3>
      <h3
        class="tit_h3"
        id="GRUSER_CNT"
        data-id="GRUSER_CNT"
        value=""
        style="background: white; color: #19a979; padding: 3px"
      ></h3>
      <div class="frt">
        <input type="hidden" id="USER_NM" data-id="USER_NM" />
        <span class="srch_field" i18nCd="lang_pHSearchContact"
          ><input
            type="text"
            id="searchContact"
            placeholder="이름,휴대폰번호,비고 검색"
            maxlength="50" /><a
            href="javascript:"
            class="btn_srch"
            id="btnSearchContact"
            ><img
              src="../../img/btn/ico_srch.png"
              alt="button search" /></a></span
        ><a href="javascript:" class="white1" style="display: none"
          ><span
            ><img
              src="../../img/ico/list_ico.png"
              alt="setting"
              style="margin-top: 4px" /></span></a
        ><a href="javascript:" id="setting" class="white1"
        @click="toggle=!toggle" ><span
            ><img
              src="../../img/ico/ico_setting.png"
              alt="setting"
              style="margin-top: 4px; display: none" /><img
              src="../../img/ico/ico_setting.png"
              alt="setting"
              style="margin-top: 4px" /></span
        ></a>
        <!-- layer -->
     <Transition>
      <div  v-if="toggle"  class="tit_top_layer" style="">
          <ul>
            <li>
              <a href="javascript:" id="editProfile" i18nCd="lang_senderInfo"
                >발송자정보</a
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
              <a href="javascript:" id="smsSendSetting" i18nCd="lang_setSendSms"
                >SMS 발송 설정</a
              >
            </li>
            <!-- <li><a href="javascript:" id="paidUseSetting">유료 사용 설정</a></li> -->
          </ul>
        </div>
     </Transition>
       
        <!-- //layer -->
      </div>
    </div>

    <!-- button wrap-->
    <div class="btn_wrap mgt10">
      <!-- btn -->
      <div class="frt" style="display: flex; justify-content: flex-end;">
        <a href="javascript:" class="green1" id="btnAdd"
          ><span i18nCd="lang_add">추가</span></a
        ><a href="javascript:" id="btnUpdate" class="white2"
          ><span i18nCd="lang_edit">수정</span></a
        ><a href="javascript:" id="btndelete" class="white2"
          ><span i18nCd="lang_del">삭제</span></a
        ><a  href="javascript:" id="excelUpload" class="white1"
          ><span class="fwn"
            ><img src="../../img/ico/excel_icon.png" alt="file" />
            <span i18nCd="lang_batchReg">일괄등록</span></span
          ></a
        ><a href="javascript:" id="excelDownload" class="white1"
          ><span class="fwn" i18nCd="lang_export"
            ><img src="../../img/ico/excel_icon.png" alt="file" />
            내보내기</span
          ></a
        >
      </div>
      <!-- //btn -->
    </div>
    <!-- //button wrap-->

    <!-- 연락처목록 -->
    <div class="tbl_address_wrap" style="margin: 0 !important">
      <div class="table_max mgt10">
        <!-- 최소 높이값에 해당하는 클래스 table_max 입니다. -->
        <!-- <caption></caption> -->
        <!-- <colgroup> -->
        <!-- <col /> -->
        <!-- </colgroup> -->
        <!-- <tr> -->
        <!-- <td> -->
        <!-- table -->
        <table
          id="USR_TBL"
          class="tbl_result"
          summary="연락처를 나타내주는 표 입니다."
        >
          <caption i18nCd="lang_contact">
            연락처
          </caption>
          <colgroup>
            <col style="width: 33px" />
            <col style="width: 108px" />
            <col style="width: 153px" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <!-- <th scope="col"><div><input type="checkbox" style="margin-top:6px;"></input></div></th> -->
              <th scope="col">
                <div>
                  <input
                    type="checkbox"
                    id="chkSelectAll"
                    class="checkbox"
                    title="선택"
                    style="margin-top: 6px"
                  />
                </div>
              </th>
              <th scope="col"><div i18nCd="lang_nm">이름</div></th>
              <th scope="col"><div i18nCd="lang_phoneNo">휴대폰번호</div></th>
              <th scope="col"><div i18nCd="lang_remark">비고</div></th>
            </tr>
          </thead>
          <tfoot id="tfootGroup" style="display: none; text-align: center">
            <tr>
              <td colspan="4">
                <div i18nCd="lang_noContentFound">
                  <!-- data-jxLn="noContentFound" --><!-- No content found -->검색된
                  내용이 존재하지 않습니다.
                </div>
              </td>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <!-- <td><div><input id="checkb" type="checkbox" style="margin-top:6px;" /></div></td> -->
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="chkSelect"
                    class="checkbox"
                    title="선택"
                    style="margin-top: 6px"
                  />
                </div>
              </td>
              <td class="tal"><div id="USER_NM" class="txt_ellipsis"></div></td>
              <td><div id="HP_NO"></div></td>
              <td><div id="BIGO"></div></td>
              <td style="display: none"><div id="USER_NO"></div></td>
            </tr>
          </tbody>
        </table>
        <!-- //table -->
      </div>
      <!-- paging -->
      <div class="paging_wrap mgt15">
        <div class="field_wrap">
          <div
            class="field_cbox"
            style="width: 57px"
            data-ui-component="select"
          >
            <a href="javascript:" class="field_style field_cbox_lst"
              ><span i18nCd="lang_strNo15"></span
            ></a>
            <ul class="field_cbox_ly" style="display: none">
              <!-- <li><a href="javascript:">20</a></li>
								<li><a href="javascript:">30</a></li>
								<li><a href="javascript:">50</a></li> -->
            </ul>
            <select id="cmbo1" style="display: none">
              <option value="15" i18nCd="lang_strNo15" selected>15개</option>
              <option value="20" i18nCd="lang_strNo20">20개</option>
              <option value="30" i18nCd="lang_strNo30">30개</option>
            </select>
          </div>
        </div>
        <ul>
          <li><span class="paging" id="paging1"></span></li>
        </ul>
      </div>
      <!-- //paging -->
      <!-- <tr><td style="border-top:1px solid #dfdfdf;"></td></tr>
				<tr>
					<td>
						<div class="frt mgt10">
							<a id="btnC" href="javascript:" class="btn_style btn_sty3"><span data-jxLn="delete">Delete</span></a>
							<a id="btnClose" href="javascript:" class="btn_style btn_sty3"><span>취소</span></a>
						</div>
					</td>
				</tr> -->

      <!-- //연락처목록 -->
    </div>
   
    <!-- //popup content -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
const toggle = ref(false)

</script>
