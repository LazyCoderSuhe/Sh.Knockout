# KO 与jqurey validate 的验证集成

 ********
  > 简单 记录一下 本来是想 设计一个 partview 但是发现集成起来没有多少代码 就直接写了文昌的
  方比那自己 ，使用及,这里表单模型验证都应以在 Model 上了 这需要你有 asp.net web 开发经验就欧克了

页面要引用: 

       
    <form id="form" asp-page="" data-bind="event:{submit:function(){save($element)}}" method="post">
        <input asp-for="Model.Name" />
        <span asp-validation-for="Model.Name"></span>
        <button type="submit">save</button>
    </form>
    <partial name="_ValidationScriptsPartial" />
    <script src="~/lib/knockout/build/output/knockout-latest.js"></script>
    <script>
         var vm = {         
            save: function (t) {
                $form = $(t);
                // $.validator.unobtrusive.parse($form);这里用于一部加载试图时需要 设置这个初始化
                // $form.validate(); // 手动调用验证
                if ($form.valid()) {
                    $.post($form.attr("action"), $("form").serialize(), function (result) {
                        console.info(result);
                    })
                }
            }
        }
        ko.applyBindings(vm);
    </script>




