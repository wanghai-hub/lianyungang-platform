/**
 * a gallery example
 */

var gallery={};
$.extend(gallery,{
	init : function(list){
		if(!list || list.length==0){
			return;
		}
		this.list=list;
		this.index=-1;
		$this=$('.gallery');
		$canvas=$this.find('.gall-canvas');
		$tail=$this.find('.gall-tail');
		this.render();
	},
	render : function(){
		//set size
		var _h=$this.height();
		var _w=$this.width()-100;
		$canvas.css({'height':(_h-105)+'px','width':_w+'px'});
		$tail.css('width',_w+'px');
		this.width=_w;
		
		//add previous & next button
		$this.append('<span class="to-prev"></span><span class="to-next"></span>');
		
		//buttons for tail
		$this.append('<span class="thum-back"></span><span class="thum-forw"></span>');
		
		var list=this.list,size=list.length;
		//render images
		var $ul=$('<ul></ul>').appendTo($tail);
		this.ulWidth=(size*51-1);
		$ul.css('width',this.ulWidth+'px');
		for(var i=0;i<size;i++){
			var d=this.list[i];
//			$canvas.append('<img src="'+d.url+'"/>');
			var $li=$('<li></li>').appendTo($ul);
			$li.append('<img src="'+d.url+'"/>');
			$li.data('index',i);
			$li.attr('title',(i+1));
		}
		this.action();
	},
	action : function(){
		var tt=this;
		$tail.find('ul').find('li').click(function(){
			tt.moveto($(this).data('index'));
		});
		$this.find('.to-prev').click(function(){
			var idx=tt.index-1;
			tt.moveto(idx);
		});
		$this.find('.to-next').click(function(){
			var idx=tt.index+1;
			tt.moveto(idx);
		});
		$this.find('.thum-back').click(function(){
			tt.tailslide('right');		
		});
		$this.find('.thum-forw').click(function(){
			tt.tailslide('left');		
		});
		
		this.moveto(0);
	},
	moveto : function(idx){
		if(!idx || idx<0){
			idx=0;
		}
		if(idx>=this.list.length){
			idx=this.list.length-1;
		}
		if(idx==this.index){
			return;
		}
		this.index=idx;
		this.show(idx);
		$tail.find('ul').find('li').eq(idx).addClass('on').siblings('li').removeClass('on');
	},
	show : function(idx){
		var imgid='imgg'+idx;
		var $img=$canvas.find('img#'+imgid);
		if(!$img.length){
			$img=$canvas.append('<img src="'+this.list[idx].url+'" id="'+imgid+'"/>').find('img#'+imgid);
			var h=$canvas.height();
			$img.load(function(){
				var $t=$(this);
				var ih=$t.height();
				var mh=(h-ih)/2;
				$t.css('margin-top',mh+'px');
			});
		}
		$img.siblings().hide();
		$img.fadeIn();
	},
	//thumb slide
	tailslide : function(direction){
		var width=this.width;
		var ulw=this.ulWidth;
		
		var minl=width-ulw;
		if(minl>0){
			minl=0;
		}
		var $ul=$tail.find('ul');
		var lft=$ul.css('left');
		lft=parseInt(lft);
		if(direction=='left'){
			lft-=width;
		}else{
			lft+=width;
		}
		if(lft<minl){
			lft=minl;
		}
		if(lft>0){
			lft=0;
		}
		$ul.animate({'left':lft+'px'});
	}
});