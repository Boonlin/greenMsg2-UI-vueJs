<template>
    <div class="lnb_box" style="min-height: 100vh;">
        <!-- lnb top -->
        <div class="lnb_top" style="margin-bottom: 15px">
            <!-- user view -->

            <div class="user_view" style="
          min-height: 58px;
          position: relative;
          padding-left: 10px;
          padding-top: 11px;
        ">
                <img src="../../img/ico/user_img.png" alt="" class="img_user" />
                <div class="user_r_side" style="width: 117px">
                    <!--  select -->
                    <div class="select_com">
                        <div class="combo">
                            <span id="SAUP_NM"><!-- 웹케시(주) --></span><a href="javascript:" style="
                  width: 10px; /* float: right; */
                  position: relative;
                  margin-left: 2px;
                "><img src="../../img/btn/combo_link.png" alt="combo link" /></a>
                        </div>
                        <ul style="display: none" id="scroll_con">
                            <li><a href="javascript:">국민은행국민은행국민은행</a></li>
                            <li><a href="javascript:">나라상사</a></li>
                            <li><a href="javascript:">삼성중공업</a></li>
                        </ul>
                        <select id="BSNNCombo" style="display: none"></select>
                    </div>
                    <!-- //select -->
                    <div class="edit_group_box" id="edit_orgsaupnm" style="
              display: none;
              color: rgb(240, 248, 255);
              padding: 0px;
              width: 131px;
            ">
                        <span style="width: 97px">
                            <input type="text" style="color: aliceblue; width: 97px" autocomplete="off" /></span>
                        <em class="opt" style="top: 1px; right: 0"><a href="javascript:" id="btnSaveOrgSaupNm"
                                class="done"><span class="blind">done</span></a><a href="javascript:" id="btnClearOrgSaupNm"
                                class="ico_del"><span class="blind">cancel</span></a></em>
                    </div>

                    <p>
                        <strong id="SEND_NM" style="
                color: #fff;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 82%;
                white-space: nowrap;
              "><!-- 홍길동 --></strong>
                        님
                    </p>
                </div>
                <!-- <a href="javascript:" value="kr" name="LANG" style="padding-left: 19px;color: #fff;">KR</a>
                <a href="javascript:" value="en" name="LANG" style="padding: 2px;color: #fff;">EN</a>
                <a href="javascript:" value="kh" name="LANG" style="color: #fff;">KH</a>
                <a href="javascript:" value="cn" name="LANG" style="color: #fff;">CN</a>
                <a href="javascript:" value="ja" name="LANG" style="color: #fff;">JA</a> -->
            </div>

            <!-- //user view -->

            <!-- btn send -->
            <div class="btn_send_wrap">
                <!--<div class="widget_bizpoint_wrap widget_bizpoint_style2">
                <div class="widget_bizpoint_inner"style="width:180px;">
                    <div class="widget_img"><span class="blind">biz포인트</span></div>
                    <div class="widget_area">
                        <span class="widget_point" id="chrgPnt">78,100</span>
                        
                        <a href="javascript:" class="btn_widget_charge" id="btn_chrg1"><span>충전</span></a>
                    </div>
                </div>
            </div>
                width="210px"  height="89px" iframe below -->
                <!-- //2015-01-30 : widget (그린메시지) -->
                <a href="javascript:" class="btn_send"><span i18nCd="lang_writeMsg">메시지 작성</span></a>
            </div>
            <!-- //btn send -->
        </div>
        <!-- //lnb top -->
        <div class="com_group_wrap">
            <!--company list -->
            <div class="com_list">
                <div class="com_list_box">
                    <!-- company item -->
                    <div class="com_item">
                        <div :class="['group_name', activeLinkId === 'linkhostory' ? 'on' : '']"
                            @click="handleClick('linkhostory')">
                            <router-link to="/shipmentDetail" id="linkhostory">
                                <img id="IconBtn" src="../../img/ico/ico_book_on.png"  alt="company icon" />
                                <span>발송내역</span>
                            </router-link> 
                        </div>

                        <router-link to="/receiptDetail">
                            <div :class="['group_name', activeLinkId === 'receptionHistory' ? 'on' : '']"
                                @click="handleClick('receptionHistory')">
                                <a href="javascript:" id="receptionHistory">
                                    <img src="../../img/ico/ico_book_on.png" alt="company icon" />
                                    <span i18nCd="lang_RepHst">수신내역</span>
                                </a>
                            </div>
                        </router-link>

                        <!-- <div class="group_name on"><a href="javascript:" id="linkhostory"><img src="../img/ico/ico_book_on.png" alt="company icon"/>발송내역</a></div> -->

                        <!-- company sub item -->
                      
                        <!-- //company sub item -->
                    </div>
                    <!-- //company item -->

                    <!-- add on 21-02-2015 start -->
                    <div class="com_item">
                        <!-- <div class="group_name"><a href="javascript:" id="statisticsReportGmsg"><img id="IconBtn"
                                    src="../../img/ico/ico_book_on.png" alt="company icon">통계정보</a>
                    </div> -->

                        <!-- company sub item -->

                        <!-- //company sub item -->
                    </div>
                    <!-- add on 21-02-2015  end-->

                    <!-- company item -->

                    <div class="com_item">
                        <router-link to="/groupStatus">
                            <div :class="['group_name', activeLinkId === 'linkGroups' ? 'on' : '']"
                                @click="handleClick('linkGroups')">
                                <a href="javascript:" id="linkGroups"><img src="../../img/ico/ico_folder.png" alt="" /><span
                                        i18nCd="lang_grpSts">그룹현황</span></a>
                            </div>
                        </router-link>
                        <!-- company sub item -->
                        <div class="com_sub_name max_height" id="GROUP_TBL">
                            <!-- company sub item --><!--<div class="com_sub_name max_height">-->
                            <div class="scroll-container" id="scroll" style="overflow: hidden; padding: 0px; width: 210px;">
                                <!--  <a href="javascript:"><img src="../img/btn/btn_scroll.png" alt="button scroll"/></a>  -->

                                <!-- <div class="scroll-container fluid-width clear"> -->

                                <div class="jspContainer" style="width: 210px; height: 289px;">
                                    <div class="jspPane" style="padding: 0px; top: 0px; left: 0px; width: 210px;">
                                        <ul style="width: 100%;" id="groupName">
                                            <li data-grp_no="000000424" data-grp_nm="20230807">
                                                <div id="group"><a href="javascript:" class="com_sub_item"
                                                        data-grp_no="000000424" data-grp_nm="20230807" title="20230807"
                                                        style="width:100px;max-width:41%">20230807</a><span
                                                        style="display: block; text-align: right;right: 50px; top: 0"><strong
                                                            data-gruser_cnt="0" id="GRUSER_CNT">0</strong></span><span
                                                        class="snb_btn"><a href="javascript:" class="ico_edit"
                                                            id="editGroup"><span class="blind">edit button</span></a><a
                                                            href="javascript:" class="ico_del" id="delGroup"
                                                            data-grp_no="000000424"></a></span></div>
                                            </li>
                                            <div class="edit_group_box" id="edit_group"
                                                style="display: none; color: aliceblue;"><span style="width: 130px;"><input
                                                        type="text" data-grp_no="000000424" id="GRP_NM" value="20230807"
                                                        style="color: aliceblue;"></span><em class="opt"><a
                                                        href="javascript:" id="btnSaveGr" class="done"><span
                                                            class="blind">done</span></a><a href="javascript:" id="icon_del"
                                                        class="ico_del"><span class="blind">cancel</span></a></em></div>
                                            <li data-grp_no="000000417" data-grp_nm="2211">
                                                <div id="group"><a href="javascript:" class="com_sub_item"
                                                        data-grp_no="000000417" data-grp_nm="2211" title="2211"
                                                        style="width:100px;max-width:41%">2211</a><span
                                                        style="display: block; text-align: right;right: 50px; top: 0"><strong
                                                            data-gruser_cnt="3" id="GRUSER_CNT">3</strong></span><span
                                                        class="snb_btn"><a href="javascript:" class="ico_edit"
                                                            id="editGroup"><span class="blind">edit button</span></a><a
                                                            href="javascript:" class="ico_del" id="delGroup"
                                                            data-grp_no="000000417"></a></span></div>
                                            </li>
                                            <div class="edit_group_box" id="edit_group"
                                                style="display: none; color: aliceblue;"><span style="width: 130px;"><input
                                                        type="text" data-grp_no="000000417" id="GRP_NM" value="2211"
                                                        style="color: aliceblue;"></span><em class="opt"><a
                                                        href="javascript:" id="btnSaveGr" class="done"><span
                                                            class="blind">done</span></a><a href="javascript:" id="icon_del"
                                                        class="ico_del"><span class="blind">cancel</span></a></em></div>
                                            <li data-grp_no="000000423" data-grp_nm="My Group">
                                                <div id="group"><a href="javascript:" class="com_sub_item"
                                                        data-grp_no="000000423" data-grp_nm="My Group" title="My Group"
                                                        style="width:100px;max-width:41%">My Group</a><span
                                                        style="display: block; text-align: right;right: 50px; top: 0"><strong
                                                            data-gruser_cnt="3" id="GRUSER_CNT">3</strong></span><span
                                                        class="snb_btn"><a href="javascript:" class="ico_edit"
                                                            id="editGroup"><span class="blind">edit button</span></a><a
                                                            href="javascript:" class="ico_del" id="delGroup"
                                                            data-grp_no="000000423"></a></span></div>
                                            </li>
                                            <div class="edit_group_box" id="edit_group"
                                            style="display: none; color: aliceblue;"><span style="width: 130px;"><input
                                                    type="text" data-grp_no="000000423" id="GRP_NM" value="My Group"
                                                    style="color: aliceblue;"></span><em class="opt"><a
                                                    href="javascript:" id="btnSaveGr" class="done"><span
                                                        class="blind">done</span></a><a href="javascript:" id="icon_del"
                                                    class="ico_del"><span class="blind">cancel</span></a></em></div>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- //scrollbar -->
                    </div>
                    <div class="com_sub_name max_height" id="GROUP_TBL">
                        <!--<div class="com_sub_name max_height">-->
                        <div class="scroll-container" id="scroll" style="overflow: auto">
                            <!--  <a href="javascript:"><img src="../img/btn/btn_scroll.png" alt="button scroll"/></a>  -->
                            <ul style="width: 100%" id="groupName"></ul>
                            <!-- <div class="scroll-container fluid-width clear"> -->
                        </div>

                        <!-- //scrollbar -->
                    </div>
                    <!-- //company sub item -->
                </div>
                <!-- //company item -->
            </div>
        </div>
        <!--//company list -->

        <!-- edit group box -->
        <div class="edit_group_box" id="edit_group" style="display: none">
            <span><input type="text" id="GR_NM" style="width: 100%"
                    maxlength="50" /><!-- <a href="javascript:" class="btn_clear" style="top: 14px;"><img src="../img/ico/ico_input_del.png" alt="clear text"/></a> --></span><em
                class="opt"><a href="javascript:" id="btnSaveGr" class="done"><span class="blind">done</span></a><a
                    href="javascript:" id="icon_del" class="ico_del"><span class="blind">cancel</span></a></em>
        </div>
        <!-- //edit group box -->

        <!--button add group -->
        <div class="btn_add_group">
            <a href="javascript:" i18nCd="lang_addGroup">그룹 추가하기</a>
        </div>
        <!--button add group -->
    </div>
    <!-- //group wrap -->

</div></template>
<script >
export default {
    data() {
        return {
            activeLinkId: 'linkhostory',
            // showImage: true, 
            // icoBookOn: require('../../img/ico/ico_book_on.png'),
            // icoBook: require('../../img/ico/ico_book.png')
        };
    },
    methods: {
        handleClick(linkId) {
            this.activeLinkId = linkId; // Update the activeLinkId with the clicked linkId
        }
    }
} 
</script>
