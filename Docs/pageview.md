# 分页 的用法


## 客户端分页
使用的是 ko js 做的分页，分为两种使用方式 ，
****
都需要引用.ko ，及 kopage.js 
接口返回的数据结构是 \
	
	json:
		{count:100 ,data:[]};
#### ViewModel 中包含 page 模型
 这种方式使用 PageViewInside 在shared 文件夹中
	
	@{
		var pa = "page"； //此处的ｐａｇｅ　与　page: pa　配置为一样
	}
	<script src="/_content/Sh.Knockout/js/kopage.js"></script>
	<partial name="PageViewInside" model="pa" /> 
	<script>
		function cal(data) {
			console.info("sssssssssss", data);
			//这里绑定你的 table
		}
		var pa =  new kopage(cal, 'https://localhost:44346/Index/Ge', null, 5, 20, 2020);
		var vm = {
			page: pa
		}
		ko.applyBindings(vm);
    </script>

#### ViewModel 中不包含 page 模型 
这种方式使用 PageViewOutSide 在shared 文件夹中

	<script src="/_content/Sh.Knockout/js/kopage.js"></script>
	 <partial name="PageViewOutSide"  />
     
	 function cal(data) {
        console.info("sssssssssss", data);
		 //这里绑定你的 table
    }
	 var pa =  new kopage(cal, 'https://localhost:44346/Index/Ge', null, 5, 20, 2020);
	 ko.applyBindings(pa, document.getElementById("kopage"));


## 服务端分页

#### 使用方
	
	// 页面模型	必须是 Sh.Knockout.PageViewModel<t>
	@Html.Partial("PageView",Model.ToPageViewModel("onclick='reload({0})'"))
    <script>
		function reload(id) {
			var searchdata = $("#searchform").serialize();
			window.location.href = "/Letyoufly/ADlist?take=20&index=" + id + "&" + searchdata
		}
    </script>
	