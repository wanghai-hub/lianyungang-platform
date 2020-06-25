var dlNum = $("#aui-selectList").find("dl");
for (i = 0; i < dlNum.length; i++) {
	$(".aui-screen-head-choice .aui-clear-list").append("<div class='aui-selected-info selectedShow' style='display:none'><span></span><label></label><em>&times;</em></div>");
}
var refresh = "true";
$(".aui-screen-list-item a ").on("click", function () {
	var text = $(this).text();
	var selectedShow = $(".selectedShow");
	var textTypeIndex = parseInt($(this).parents("dl").attr("data-index"));
	var textType = $(this).parent("dd").siblings("dt").text();
	index = textTypeIndex;
	$(".aui-clear-delete").show();
	$(".selectedShow").eq(index).show();
	$(this).addClass("selected").siblings().removeClass("selected");
	selectedShow.eq(index).find("span").text(textType);
	selectedShow.eq(index).find("label").text(text);
	var show = $(".selectedShow").length - $(".selectedShow:hidden").length;
	// if (show > 2) {
	// 	$(".aui-eliminate").show();
	// }
	if (show > 0) {
		$(".aui-collect").show();
	}

});
$(".selectedShow em").on("click", function () {
	// debugger;
	$(this).parents(".selectedShow").hide();
	var textTypeIndex = $(this).parents(".selectedShow").index();
	index = textTypeIndex;
	$(".aui-screen-list-item").eq(index).find("a").removeClass("selected");

	// if ($(".aui-screen-list-item .selected").length < 2) {
	// 	$(".aui-eliminate").hide();
	// }
	if ($(".aui-screen-list-item .selected").length < 1) {
		$(".aui-collect").hide();
	}
});

$(".aui-eliminate").on("click", function () {
	$(".selectedShow").hide();
	$(this).hide();
	$(".aui-screen-list-item a ").removeClass("selected");
});
$(".aui-collect").on("click", function () {
	$(this).toggleClass("active");
});

// 点击更多
$('#aui-selectList .aui-screen-list-item>span').click(function () {
	// debugger;
	if ($(this).siblings("dd").hasClass("autoHeight")) {
		$(this).html('').html('更多<i>+</i>')
	} else {
		$(this).html('').html('收起<i>-</i>')
	}
	$(this).siblings("dd").toggleClass('autoHeight');
});
// 显示更多
$(".res-filter-more").click(function () {
	// debugger;
	if ($(this).find('i').hasClass('fa fa-angle-down')) {
		$(this).find('span').text("收起").end().find('i').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
	} else {
		$(this).find('span').text("显示更多").end().find('i').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
	}
	$('.filter-more-wrap').slideToggle();
});

// 找资源--资源列表头部过滤条件--更多
$('#zzy-more').click(function () {
	if ($(this).find("i").hasClass("fa-caret-down")) {
		$(this).html("收起<i class='fa fa-caret-up'></i>")
	} else {
		$(this).html("更多<i class='fa fa-caret-down'></i>")
	}
	$("#zzy-tab-list").toggleClass('autoHeight');
});
// 我的资源--资源列表头部过滤条件--更多
$('#myres-more').click(function () {
	if ($(this).find("i").hasClass("fa-caret-down")) {
		$(this).html("收起<i class='fa fa-caret-up'></i>")
	} else {
		$(this).html("更多<i class='fa fa-caret-down'></i>")
	}
	$("#myres-list-filter").toggleClass('autoHeight');
});

	/* 顶部菜单弹出相关js */
	$(".xiala-pop-menu>a i").click(function (event) {
		// debugger;
		var e = window.event || event;
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		$("#xiala-pop").slideToggle();
		$(".xiala-pop-menu>a i").toggleClass('active');
	});