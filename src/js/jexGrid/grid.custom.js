var bnk;
if(!bnk) bnk={};
if(!bnk.grid) bnk.grid={};
bnk.grid.getDefaultOptions = function() {
	return {
		width: "99.8%",
//		cssGrid: "hahahah",
		border: "1px solid #999",
		font: "12px",
//		footerEnabled: true,
		ColHeader: {
			reorderEnabled: true,
			reorderSyncEnabled:true,
			background: "#dde4ec repeat-x center bottom",
// 			sortBackground:"/img/jexgrid/sort.png",
// 			sortBackgroundAsc:"/img/jexgrid/sort-asc.png",
// 			sortBackgroundDesc:"/img/jexgrid/sort-desc.png",	
			classColHeader  : "grid-colHeader",
			resizeHandleBackground: "",
			font: "12px",
			headerStyle: "padding : 1px, 5px, 5px, 1px; border-bottom: 1px solid silver; color : #637b97;"
		},
		ColDefManager: {
			colDef: {
				resizable: true,
				width: 100
			}
		},
		ViewportManager: {
			rowsPerPage: 20,
			rowH: 20,
			autoColWEnabled: false,
	        evenOddRows: true
		}
//		DataManager: {
//			idColKeys:[sortId]
//		},
//		,MenuBar:{}
		,SearchManager:false		
		,SelectionManager:{
			//bgColorSelection:"red"			
		}
		,autoColWEnabled: false

	};	
}


function DefaultEditor(options)
{
    return JGM.create("Editor", {
                 edit: function(){
                    var s=this.cell.getValue();
                    return '<input type="text" style="position:relative;" value="'+(null2void(s,"")==""?"":s)+'" onblur="blurEdit(event)" class="basic-editor"/>';
                }
                ,value:function()
                {
                    var _inval = this.cell.getNode().childNodes[0].value;
                    return (null2void(_inval,"")==""?"":_inval);
                }
            });
}



function IntegerEditor(options)
{
    return JGM.create("Editor", {
                 edit: function(){
                    var s=this.cell.getValue();
                    return '<input type="text" style="position:relative;ime-mode:disabled" value="'+(null2void(s,"")==""?"0":s)+'" onkeydown="downInt(event)" onkeypress="pressInt(event)" onblur="blurEdit(event)" class="basic-editor"/>';
                }
                ,value:function()
                {
                    var _inval = this.cell.getNode().childNodes[0].value;
                    if(_inval=="") _inval=="0";
        			var Re = /[^0-9]/g;
                    return String(_inval.replace(Re,'') == "" ? "0" : _inval.replace(Re,''));
                }
            });
}


function CustomImpoRenderer(targetFiled , compareList){
	   return function(value, rowIdx, colIdx, datarow, colDef, view){	   
		   var displayString="";
		   try{
			   var targetValue = datarow[targetFiled];
			   for(var i = 0; i < compareList.length; i++){
				   if(targetValue == compareList[i].KEY){
					   displayString=compareList[i].VALUE;
				   }
			   }
		   }catch(e){}
		   return displayString;
	   }
}

function blurEdit(event){
	GRID.editMgr.commit();
}

function downInt(event){
	if(event.keyCode  == 229){
		event.returnValue=false;
		return false;
	}
}

function pressInt(event){
	if (!(event.keyCode  > 47 && event.keyCode  < 58 || event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 9 || event.keyCode  == 46 || event.keyCode  == 36 || event.keyCode == 35 || event.keyCode == 16)){
		event.returnValue=false;
		return false;
	}
}
function null2void(_instance , custom_value)
{
	var instance = _instance;
	if( instance == "undefined" || instance == null || instance == "null" ){
		return custom_value;
	}
	return instance;
}