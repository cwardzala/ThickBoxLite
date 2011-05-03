/*
 * Thickbox Lite only ajax load
 * Modified by Cameron Wardzala
 * Based on Thickbox 3.1
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/

PADDING = 24; // combined padding of #TB_ajaxContent

function tb_remove() {
	$("#TB_closeWindowButton").unbind("click");
	$("#TB_window").fadeOut("fast",function(){$('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		$("body","html").css({height: "auto", width: "auto"});
		$("html").css("overflow","");
	}
	return false;
}

function tb_position(w,h) {
	$("#TB_window").css({marginLeft: '-' + parseInt((w / 2),10) + 'px', width: w + PADDING +'px'});
	if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
		$("#TB_window").css({marginTop: '-' + parseInt((h / 2),10) + 'px'});
	}
}

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
	$(domChunk).click(function(){
		var a = this.href || this.alt;
		tb_show(a);
		this.blur();
		return false;
	});
}

function tb_show (url) {
	try {
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			$("body","html").css({height: "100%", width: "100%"});
			$("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
				$("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
			}
		} else {
			if (document.getElementById("TB_overlay") === null) { $("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>"); }
		}

		$("#TB_overlay").addClass("TB_overlayBG");

		if ($("#TB_window").css("display") !== "block") {
			$("#TB_overlay").unbind();
			$("#TB_window").append("<div id='TB_title'><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a></div></div><div id='TB_ajaxContent' class='TB_modal' style='width:auto;height:auto;'></div>");
		} else { $("#TB_ajaxContent")[0].scrollTop = 0; }

		$("#TB_closeWindowButton").click(tb_remove);

		$("#TB_ajaxContent").load(url,function(){
			//to do a post change this load method
			tb_init("#TB_ajaxContent a.thickbox");
			$("#TB_window").show();
			var tbWidth = $("#TB_ajaxContent").width();
			var tbHeight =  $("#TB_ajaxContent").height();
			tb_position(tbWidth,tbHeight);
		});
	}
	catch (e) {}
}


$(document).ready(function(){   
	tb_init('a.thickbox, area.thickbox, input.thickbox');
});
