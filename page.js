//leaps true点击的时候翻页，整倍的翻页，为false，一页一页的翻页
	//firstLastUse 是否可以第一页直接点击到最后一页，最后一页点击直接到第一页
	//last 为最后一个的html，
	//first为第一个的html
          //href分页链接模板（默认javascript:void(0);）
;(function($,window){
	$.fn.bootpag = function(options){
		var $owner = this,

		//参数扩展
	           settings = $.extend({
	                total: 5,//总页数
	                page: 1,
	                maxVisible: null,
	                next: '&raquo;',
                	     prev: '&laquo;',
                	     nextClass: 'next',
                	     prevClass: 'prev',
                	     activeClass: 'active',
                	     disabledClass: 'disabled',
	                wrapClass: 'pagination'
	            },
	           //$owner.data('settings') || {},
            	options || {});

	           //如果总共个数小于0 ，直接返回
            	if(settings.total <= 0) return this;

            	//暂时不知道这句话什么意思
            	//$owner.data('settings', settings);

            	function renderPage($bootpag, page){
            		//获取当前页
            		page = parseInt(page, 10);

            		//当前第几页,以maxVisible为一页
            		var cur = Math.ceil(page/settings.maxVisible);
            		
            		//lp即使跳转到第几页
            		var lp,
               		     $page = $bootpag.find('li');

               		lp = (cur==1)?1: (cur-1)*settings.maxVisible;
               		var lfirst = $page.first();
			lfirst
			.toggleClass(settings.disabledClass, cur === 1)
                		.attr('data-lp', lp)
                		.find('a').attr('href', href(lp));

                		lp = cur*settings.maxVisible+1;
			var llast = $page.last();
			llast
			 .toggleClass(settings.disabledClass, cur === settings.total)
                		.attr('data-lp', lp)
                		.find('a').attr('href', href(lp));
               		
               		var clist = "." + [settings.nextClass,settings.prevClass].join(",.");
            		
            		$page.not(clist).each(function(index){
			           lp = index + 1 + (cur-1)*settings.maxVisible;
			           $(this)
			           .attr('data-lp', lp)
			           .find('a').html(lp).attr('href', href(lp));
			});
            	}

            	function href(c){

            		return 'javascript:void(0);';
        		}

       		return this.each(function(){

            		var $bootpag, lp, me = $(this),
               		 p = ['<ul class="', settings.wrapClass, ' bootpag">'];
            		
            		if(settings.prev){
		                p = p.concat(['<li data-lp="1" class="', settings.prevClass,
		                       '"><a href="', href(1), '">', settings.prev, '</a></li>']);
		           }
		          
		          
            		//如果页数小于设置的最大的可见页数，就是最小的，否则是最大的
		           for(var c = 1; c <=Math.min(settings.total, settings.maxVisible); c++){
		                p = p.concat(['<li data-lp="', c, '"><a href="', href(c), '">', c, '</a></li>']);
		            }
           		
           		if(settings.next){
           			 lp = settings.maxVisible + 1;
		                p = p.concat(['<li data-lp="', lp, '" class="',
		                             settings.nextClass, '"><a href="', href(lp),
		                             '">', settings.next, '</a></li>']);
		           }

           		p.push('</ul>');
           		//删除存在的bootpag，保持唯一
            		me.find('ul.bootpag').remove();
            		me.append(p.join(''));
            		$bootpag = me.find('ul.bootpag');

            		
            		me.find('li').click(function paginationClick(){
                			var me = $(this);
                			 if(me.hasClass(settings.disabledClass) || me.hasClass(settings.activeClass)){
                    				return;
                			}
                			var page = parseInt(me.attr('data-lp'), 10);
                			$owner.find('ul.bootpag').each(function(){
                   			 	renderPage($(this), page);
                			});
                			
                			$owner.trigger('page', page);
           		 });
            		renderPage($bootpag, settings.page);
        		});
    	}
	
})(jQuery, window);
