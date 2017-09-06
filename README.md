# s-page
### 参数说明
```bash
  total: 10,   //总页数       
	page: 1,//当前页数
	next: '下一页',
  prev: '上一页',
  nextClass: 'next',
  prevClass: 'prev',
	maxVisible:5,//每次最多可显示的页数
  activeClass: 'active',//当前活动页数的class
  disabledClass: 'disabled',
	wrapClass: 'pagination'
```
### 使用说明
```bash
$('.demo1').page({
	    total: 10,   //总页数       
	    page: 1,//当前页数
	    next: '下一页',
      prev: '上一页',
      nextClass: 'next',
      prevClass: 'prev',
	    maxVisible:5,//每次最多可显示的页数
      activeClass: 'active',//当前活动页数的class
      disabledClass: 'disabled',
	    wrapClass: 'pagination'
	}).on("page", function(event, num){
    		$(".demo2").html("Page " + num); 
	});
```
其中 on("page")是自定义事件
```bash
// 定义自定义事件
$('name').on('事件名称', function() {
  console.log('定义事件');
});
//触发事件
$('触发事件event').trigger('自定义事件名'); 
```
可以向上面那样写，也可以分开写，$('.demo1').page({})是插件的初始化，可以在开始的时候初始化插件，在需要的地方触发事件
```bash
$("#pageInfo").bootpag({
	        total: self.totalPage,
	        maxVisible: 5,
	        leaps: true,//是点击 翻页还是点击点击进入下一页
	        next: '下一页',
	        prev: "上一页",
	        activeClass: 'active',
	        disabledClass: 'disabled'
	      })
$("#pageInfo").on('page', function(event, num) {
	    	 event.stopPropagation();
	    	  _this.loadData(num);
});
$(".type-list ul li").click(function(){
			$('#pageInfo').bootpag({page: 1});
			_this.cur = 1;
			_this.loadData(_this.cur); 
		});
```
这样可以实现值初始化一个分页，但是可以根据情况进行更改，比如一个页面好几个分页切换，在进页面的时候初始化某个，点击不同的时候将page设为1即可，避免多次初始化
