define([
	'jquery',
	'underscore',
	'backbone',
	'http',
	'icheck',
	'jquery-ui'
	],
	function($, _, Backbone,http) {
		var gridView = Backbone.View.extend({

			listHeadTemplate:_.template(
					  '<table id="<%=grid%>" class="table table-striped responsive-utilities jambo_table dataTable" style="table-layout: fixed">'+
		        		'<thead style="<%if(!showTableTop){%> display:none; <%}%>">'+
						  '<%if(theadTop){%>' +
					  		'<tr>' +
                                '<%_.each(theadTop,function(v,k){%>' +
                                '<td style="text-align: center;" colspan="<%=v.colspan||v.cols%>"><%=v.text%></td>' +
                                '<%})%>' +
					        '</tr>' +
					  		'<%}%>'	+
		        		  '<tr class="headings" role="row">'+
		        		  	'<%if(checkbox!=null && checkbox==true) {%>'+
		                    '<td width="35px">'+
		                    '<input type="checkbox" id="check-all" class="flat">'+
		                     '</td>'+
		                    '<%}%>'+
							  '<%if(isSortable){%>'+
							  '<td width="70px" class="a-center sort text-center">拖动排序</td>'+
							  '<%}%>'+
		                    '<% _.each(column,function(item,i){%>'+
		                    '<td title="<%=item.name%>" id="<%=grid%>_t<%=i%>" class="dropdown <%if(item.nosort){%>  <%} else{%> <%=grid%>-grid-list sorting<%}%> t<%=i%> <%if(item.hide){%>hide<%}%>" style=" width: <%=item.width%>; vertical-align: middle;cursor:pointer " data-code="<%=item.colkey%>" data-asign="sorting">' +
					  		'	<div class="dropdown-toggle" data-toggle="dropdown">' +
					  		'		<%=item.name%>' +
					  		'		<%if(item.nosort&&item.nosort.length){%>' +
					  		'		<i class="fa fa-filter" style="position: absolute;right: 7px;top: 8px;font-size: 14px;"></i>' +
					  		'		<%}%>' +
					  		'	</div>' +
					  		'	<%if(item.nosort&&item.nosort.length){%>' +
					  		'	<ul class="dropdown-menu">' +
					  		'		<%_.each(item.nosort,function(v,k){%>' +
					  		'		<li><a><%=v.label%></a></li>' +
					  		'		<%})%>' +
					  		'	</ul>' +
					  		'	<%}%>' +
					  		'</td>' +
		                    '<%})%>'+
                            /* '<td style="width:20px;vertical-align: middle;cursor:pointer" class="columns-list"><i class="fa fa-navicon"></i></td>'+*/
		                   /* '<td style="width:35px;vertical-align: middle;cursor:pointer;position: relative;" class="columns-list top_nav" >'+
                               '<div class=""> <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="true">'+

                                  '<span class="fa fa-navicon" ></span> </a>'+
                                    '<ul class="dropdown-menu dropdown-usermenu animated fadeInDown pull-right" style="min-width: 120px">'+

                                    '<% _.each(column,function(item,i){%><li><a href="javascript:void(0);" style="padding: 5px 10px;"><input type="checkbox" class="<%=grid%>-col-view"  <%if(item.hide){%> <%}else{ %> checked<%} %> value="<%=grid%>_t<%=i%>"  /> <%=item.name%></a></li><%})%>'+
                                '</ul>'+
                            '</div>'+
                            '</td>'+*/
		                     '</tr>'+

		        		'</thead>'+
		        		'<tbody>'+
		        		'</tbody></table><div style="vertical-align: middle;" class="span12 center page" ></div>'
					),
           	listPageTemplate:_.template(
				'<div width="100%">'+
				   '<div  style="float: left;vertical-align: bottom;  <%if(hidePageNum){%> display:none; <%}%> "><ul><li class="prev"><label> 总&nbsp;<%=totalRecords%>&nbsp;条&nbsp;&nbsp;每页&nbsp;<%=pageSize%>&nbsp;条&nbsp;&nbsp;共&nbsp;<%=totalPages%>&nbsp;页</label>'+
                    '&nbsp;&nbsp;&nbsp;<label>显示 <select style="width: 60px;" name="<%=grid%>_num" id="<%=grid%>_num" aria-controls="example"><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option></select> 条</label></li>'+
				   '</ul></div>'+
				   '<div style="float: right;"> <nav><ul style=" margin: 0px 0;" class="pagination">'+

                       '<% _.each(pageli,function(item,i){ %>'+
                    ' <li class="<%=item.className%>" data-code="<%=item.data%>">  <a href="javascript:void(0);"><%=item.text%></a></li>' +
                    '<%})%>'+
				   '</ul></nav></div>'+
				   '</div>'
			),

			listTemplate: _.template(
           '<% _.each(records,function(item,i){  %>'+
           '<tr data-parentid="<%=item.parentId%>" data-id="<%=item.id%>" data-rank="<%=item.rank%>" data-index="<%=i%>" style="display: <%=item.rank==1||!istree?\'black\':\'none\'%>">'+
	           '<%if(checkbox!=null && checkbox==true) {%>'+
	           '<td class="a-center "><input type="checkbox" value="<%=item[checkValue]%>" class="flat" name="table_records"></input></td>'+
	           '<%}%>'+
			   '<%if(isSortable){%>'+
			   '<td class="a-center sort text-center"><i class="fa fa-arrows"></i></td>'+
			   '<%}%>'+
		   		'<%var createTree=false;%>'+

              '<% _.each(column,function(col,n){var isCreateTree=(!createTree&&istree&&!col.hide); %>'+
              '<td class="td-autocut <%if(isCreateTree){%>treetd<%}%> <%=grid%>_t<%=n%>_body <%if(col.tbodyClass){%> <%=col.tbodyClass%> <%} %>" <%if(col.hide){%> style= "display:none;" <%}%>  <%if(col.align) {%>align="<%=col.align%>" <%}%> <%if(!col.isHideTitle){%>title="<%=_.escape(item[col.colkey])%>"<%}%>> '+
		   		'<%if(isCreateTree){%>' +
				   '<i class="fa <%=item.haveChild?\'fa-plus-square-o treeFold\':\'\'%>"></i>'+
				   '<%createTree=true;%>' +
		   		'<%}%>'+
              '<%if(col.renderData){%> ' +
                   ' <%= col.renderData(i,item[col.colkey],item,col.colkey) %>' +
                 '<%}else{%>' +
              ' <%=_.escape(item[col.colkey])%>' +
              '<%}%>'+
              '</td><%})%>' +
            '</tr>' +
            '<%})%>'
        ),


        initialize : function() {

			var self = this;
			var model = this.model;
			self.initHeadBody();

			if (model.get('url')) {
				self.loadBodyData();
			} else if (model.get('records')) {
                model.set('totalrecords',model.get('records').length);
				self.createdTable();
			}



		},

		events:{
			'click .fa.treeFold':'treeFold',
			'click .fa.treeOpen':'treeOpen',
			'click thead .dropdown-menu li':'changeSort',
		},
		treeFold:function(e){
			e.stopPropagation();
			var $e=$(e.currentTarget).removeClass('treeFold fa-plus-square-o').addClass('treeOpen fa-minus-square-o'),
				$tr=$e.closest('[data-parentId]'),
				$childs=$tr.prevAll().add($tr.nextAll()).filter('[data-parentId='+$tr.data('id')+']');
			if(!$e.data('init')){
				$tr.after($childs);
				$childs.find('.treetd').css('padding-left',parseInt($tr.find('.treetd').css('padding-left'))+20);
				$e.data('init',true);
			}
			$childs.show();
		},
		treeOpen:function(e){
			e.stopPropagation();
			var $e=$(e.currentTarget).removeClass('treeOpen fa-minus-square-o').addClass('treeFold fa-plus-square-o'),
				$tr=$e.closest('[data-parentId]'),
				$childs=$tr.prevAll().add($tr.nextAll()).filter('[data-parentId='+$tr.data('id')+']').hide(),
				$activeChilds=$childs.find('.treeOpen').click();

			//$tr.after($childs);
		},
		changeSort:function(e){
			e.stopPropagation();
			var self=this;
			var $e=$(e.currentTarget);
			var sortIndex=$e.index();
			var colkey=$e.closest('td').data('code');
			var model=self.model;
			var column = model.get('column');
			var searchGroupData=model.get('searchGroupData')||{};
			//var param=column&&column[index]&&column[index].nosort&&column[index].nosort[sortIndex]&&column[index].nosort[sortIndex].param;
			var param= _.findWhere(column,{colkey:colkey}).nosort[sortIndex].param;
			try{
				if(!_.isObject(param)){
					param=JSON.parse(param)
				}

				if($e.hasClass('active')){
					searchGroupData=_.omit(searchGroupData,_.keys(param));
					$e.removeClass('active');
					$e.closest('td').find('>div>i').removeClass('fa-active');
				}else{
					_.extend(searchGroupData, param);
					$e.addClass('active').siblings('.active').removeClass('active');
					$e.closest('td').find('>div>i').addClass('fa-active');
				}
				model.set('searchGroupData',searchGroupData);
				$e.closest('.open').removeClass('open');
				self.searchGrid(searchGroupData,'filter');
			}catch(e){
				console.log(e);
				layer.msg('错误的筛选参数格式,正确格式为：{"key":"val"}',{icon:0})
			}
		},

		showLoading : function(target) {
			var self = this;
			var model = this.model;
			var str = '<div class="loading"></div>';
			target.append(str);
		},

		initHeadBody : function(){
		   var self = this;
	   	   var model = this.model;

           var gridBody = model.get('gridid');
	   	   var column = model.get('column');
	   	   var showTableTop = model.get('showTableTop');
	   	   var checkbox = model.get('checkbox');
			var istree=model.get('tree');
			var isSortable=model.get('sortable');
			var theadTop=model.get('theadTop');
	   	   var grid = gridBody+'_table';

           var headarr = self.listHeadTemplate({
        	   	checkbox : checkbox,
                grid : grid,
                column : column,
			   	showTableTop : showTableTop,
			   	istree:istree,
			   isSortable:isSortable,
               theadTop:theadTop
           });

           $('#'+gridBody,self.$el).html(headarr);

           //添加表头事件
			$('#'+gridBody,self.$el).on('click','thead td[class*="sorting"]',function(e){
				self.columnOrderBy(e);
			});
           //添加表头下拉隐藏列事件
           $('.'+grid+'-col-view',self.$el).click(function(e){
           	    self.columnShowOrHide(e);
           });
		},

		loadBodyData : function() {
			var self = this;
			var model = this.model;

			var el = this.$el;
			var grid = model.get('gridid');
			var url = model.get('url');
			if(url.indexOf("?")==-1)
				url+="?";
			var column = model.get('column');

			var pagesize = model.get('pageSize');
			var pagenum = model.get('pageNow');

            if(model.get('searchCondition')){
            	var param = model.get('searchCondition');
            	var searchGroupData = model.get('searchGroupData')||{};
                param =_.pairs(_.extend({},param,searchGroupData));
                var condition = '';
                _.each(param,function(item){

                   condition +='&'+item[0]+'='+item[1];
                });
                url += condition;

               // model.set('pageNow',1);
            }



            url +='&pagenum='+pagenum+'&pagesize='+pagesize ;

           // var postData =  url.substring(url.indexOf("?")+1, url.length);

			var obj={};
			var keyvalue=[];
			var key="",value="";
			var paraString=url.substring(url.indexOf("?")+1,url.length).split("&");
			for(var i = 0; i < paraString.length; i++) {
				keyvalue=paraString[i].split("=");
				key=keyvalue[0];
				value= _.rest(keyvalue).join('=');
				if(key){
					try{
						obj[key]=decodeURIComponent(value)
					}catch(e){
						obj[key]=value
					}
				}
			}
            if( model.get('sortname')){
            	var so={ sortdatafield: model.get('sortname'), sortorder: model.get('sortorder') } ;
            	$.extend(obj,so) ;
            }
            url = url.substring(0,url.indexOf("?"));
			var onloadFn=model.get('onloadFn');
			http.post(url,obj,'','',onloadFn?{notSend:true}:{}).success(function(data) {

				var records = data.records;
				var totalrecords;
               if(data.rowCount == undefined){
               		totalrecords = data.totalrecords;
               }else{
              		totalrecords=data.rowCount
               }
               /* records = _.each(records,function(val,key){
                	  var key = key.toUpperCase();
                      return {key:val};
                });*/
                model.set('totalrecords',totalrecords);
				model.set('records', records);

				self.createdTable();
				onloadFn&&onloadFn(self.$el);

			}).error(function(err) {
				onloadFn&&onloadFn(self.$el);
				console.info(err);
			});

		},

		createdTable : function() {

			var self = this;
			var model = this.model;

			var el = this.$el;
			var grid = model.get('gridid');
			var column = model.get('column');
			var un_order_row = model.get('un_order_row');
			var records = model.get('records');

			if (un_order_row) {
				var checkbox = model.get('checkbox');
				var checkValue = model.get('checkValue');
				var isShowTitle = model.get('isShowTitle');
				var un_array = null;
				 un_array = _.filter(records, function(v, k) {
					return k < un_order_row;
				})

				records = _.filter(records, function(v, k) {
					return k >= un_order_row;
				})
				model.set('records',records);
				var grid_t =  grid+'_table';
			    var  htmlarr = self.listTemplate({
			    	checkbox : checkbox,
			    	checkValue : checkValue,
					records : un_array,
					column : column,
					isShowTitle : isShowTitle,
					grid:grid_t
				});

				$('#' + grid + ' tbody',self.$el).html(htmlarr);

			}
			model.set('currentRecords',records);
			self.changeTableBody(records);

		},

		changeTableBody : function(records){
            var self = this;
			var model = this.model;
			var el = this.$el;
			var grid = model.get('gridid');
			var column = model.get('column');
			var ispage = model.get('ispage');
            var htmlarr = '';
			var totalRecords = model.get('totalrecords');
			var pageSize = model.get("pageSize"); // 每页显示多少
			var un_order_row = model.get('un_order_row');
			var checkbox = model.get('checkbox');
			var checkValue = model.get('checkValue');
			var isShowTitle = model.get('isShowTitle');
			var isCustomSort = model.get('isCustomSort');
			var searchState=model.get('searchState',false);
			var customSortState = isCustomSort&&isCustomSort.url&&isCustomSort.key&&!searchState;
			var istree=model.get('tree');
			var isSortable=model.get('sortable')&&!searchState;

			if(searchState){
				$('td.sort',this.el).hide();
			}else{
				$('td.sort',this.el).show();
			}
			if (totalRecords <= pageSize) {
				ispage = false;
			}else{
				ispage = model.get('ispage');
			}

          var async = model.get("async");   //是否异步请求
          var _array = null;

			if(istree){
				records= _.map(records,function(val,key){
					if(!_.where(records,{id:val.parentId}).length){
						val.rank=1;
					}
					if(_.where(records,{parentId:val.id}).length){
						val.haveChild=true;
					}
					return val;
				});

			   var defaultsort = model.get("defaultsort");
			   if(defaultsort !=null&&defaultsort !=''){
				 records= records.sort(function(a,b){
				    var levelA=a.level;
					var levelB=b.level;
					if(defaultsort=="DESC"){
					   return levelB-levelA;
					}else{
					   return levelA-levelB;
					}
				});
				 model.set("defaultsort",'');
				}
			}
			if (ispage) {


				if (async) {
					_array = records;

				} else {
					var pageNow = model.get("pageNow");

					_array = _.filter(records, function (v, i) {
						return (i >= (pageNow - 1) * pageSize && i < pageNow * pageSize);
					});
				}

                 var grid_t =  grid+'_table';
					htmlarr = self.listTemplate({
						checkbox : checkbox,
						checkValue : checkValue,
						records : _array,
						column : column,
						isShowTitle : isShowTitle,
						grid:grid_t,
						istree : istree,
						isSortable : isSortable,
					});

					self.page(records);
					model.set("currentPageRecords",_array);

			} else {

				 _array = records;
				 var grid_t =  grid+'_table';
				htmlarr = self.listTemplate({
						checkbox : checkbox,
						checkValue : checkValue,
						records : _array,
						column : column,
						isShowTitle : isShowTitle,
						grid:grid_t,
						istree : istree,
					isSortable : isSortable,
					});

				self.page(records);
				model.set("currentPageRecords",records);
			}

            //查出现有列表固定行
            if(un_order_row){
                 var tr_body = $('#' + grid + ' tbody  tr:lt('+un_order_row+')',self.$el).prop("outerHTML");

                htmlarr = tr_body + htmlarr ;
             }

			$('#' + grid + ' tbody',self.$el).html(htmlarr);

			if(isSortable){
				$('.table',self.$el).sortable({
					items :'tbody>tr',
					handle :'td.sort',
					containment:'tbody',
					axis:'y',
					revert:200,
					helper:'clone',
					stop:function(e,ui){
						var $tr=$(ui.item),
							$bottom=$tr.prev('[data-parentId='+$tr.data('parentid')+']'),//判断上一个元素是否为同级标签之外
							$top=$tr.next('[data-parentId='+$tr.data('parentid')+']');//判断上一个元素是否为同级标签之外
						$tr.add($tr.prevAll().add($tr.nextAll()).filter('[data-parentId='+$tr.data('id')+']')).find('.treeFold').data('init',false);
						var isvalid=$tr.data('rank')==1||$bottom.length||$top.length?true:false;
						if(!isvalid){
							layer.msg('禁止移动到层级范围之外',{icon:0})
						}else if(customSortState){
							var param={};
							param[isCustomSort.key]=[];
							$tr.parent().children('tr').each(function(i,e){
								param[isCustomSort.key].push($(this).data('id'))
							});
							param[isCustomSort.key]=param[isCustomSort.key].join(',');
							http.post(isCustomSort.url,param).success(function(data){
								console.log(data);
							})
						}
						return isvalid
					},
					start:function(e,ui){
						var $tr=$(ui.item);
						var $content=null;
						if($tr.data('rank')==1){
							$content=ui.item.parent().children('tr');
						}else{
							$content=$tr;
						}
						$content.find('.treeOpen').click();
					}})
			}

			if(checkbox){
				if ($("input.flat",self.$el)[0]) {
				        $('input.flat',self.$el).iCheck({
				            checkboxClass: 'icheckbox_flat-blue',
				            radioClass: 'iradio_flat-blue'
				        });

				}

				$('#' + grid + ' input#check-all',self.$el).on('ifChecked', function () {
				    $("#" + grid + " input[name='table_records']",self.$el).iCheck('check');


				});
				$('#' + grid + ' input#check-all',self.$el).on('ifUnchecked', function () {
				     $("#" + grid + " input[name='table_records']",self.$el).iCheck('uncheck');

				});

				$('.grid_list input',self.$el).on('ifChecked', function (index) {

				    $(this).parent().parent().parent().addClass('selected');


				});
				$('.grid_list input',self.$el).on('ifUnchecked', function (index) {

					    $(this).parent().parent().parent().removeClass('selected');

				});
			}

			//根据指定顺序排序颜色
			if(model.get('renderKey')!=null&&_array.length>0) {
                var key = model.get('renderKey');
                var index = -1;
                _.find(column,function(v,k){
                     if(v.colkey == key){
                        index = k;
                        return true;
                     }else{
                     	return false;
                     }
                });

				self.renderData(model.get('renderKey'), _array,index, grid);
			}


		},

		renderData : function(renderKey, records,index, grid) {
			var sortData = _.sortBy(records,renderKey);
			sortData = sortData.reverse();

		  $("#"+grid+" tbody tr td:nth-child("+(index+1)+")",self.$el).each(function(){

		  	  if($(this).text() ==sortData[0][renderKey] ){
		  	  	$(this).parent().css('background-color', 'red');
		  	  }else  if($(this).text() ==sortData[1][renderKey] ){
		  	  	$(this).parent().css('background-color', 'orange');
		  	  }else  if($(this).text() ==sortData[2][renderKey] ){
		  	  	$(this).parent().css('background-color', 'yellow');

		  	  }
		  })


		},
        //列表头排序
	    columnOrderBy : function(e){
            var self = this;
            var model = this.model;

            var code = e.currentTarget.dataset.code;
            var asign = e.currentTarget.dataset.asign;
            var span = e.currentTarget.children[0];

	            if(asign=='descending'||asign=='sorting'){
	               e.currentTarget.dataset.asign = 'ascending';

	               e.currentTarget.className = model.get('gridid')+'-grid-list sorting_asc';
	               // 添加当前表头高亮显示
	            }else{
	               e.currentTarget.dataset.asign = 'descending';
	               e.currentTarget.className = model.get('gridid')+'-grid-list sorting_desc';
	            }
	        var async = model.get('async');
            if(async){ // 异常查找
            	var order = (asign=='descending'||asign=='sorting')?'asc':'desc' ;
                model.set('sortname',code);
                model.set('sortorder',order);

                self.gotoPage(1);
            }else{
                self.tableList(code,asign);
            }
      },
      //显示隐藏列
      columnShowOrHide : function(e){
      		  var self = this;
            var model = this.model;
            var code = e.currentTarget;
            var obj = e.currentTarget;
            var column = model.get('column');
            var grid = model.get('gridid');
             var value = obj.value;

             var st = grid+'_table_t';
             var index = value.substring(st.length,value.length);

             var col = column[parseInt(index)];
             if(obj.checked){
                $('#'+value,self.$el).show();
                $('.'+value+'_body',self.$el).show();
                col['hide'] = false;
             }else{
             	 $('#'+value,self.$el).hide();
             	 $('.'+value+'_body',self.$el).hide();
             	 col['hide'] = true;
             }

      },

        // 前端key值排序
		tableList : function(key, asign) {
			var self = this;
			var el = this.$el;
			var model = this.model;
			var records = model.get('currentRecords');
			var ispage = model.get('ispage');
			var column = model.get('column');

			var htmlarr = '';
			//var _array;

			var	_array = _.sortBy(records, key);

				if (asign == 'ascending') {
					_array = _array.reverse();
				}

			model.set("currentRecords", _array);
           self.changeTableBody(_array);

		},

		page : function(records) {
			var self = this;
			var model = this.model;
			var el = this.$el;
			var grid = model.get('gridid');
			//var jsonData = model.get('records');
			var jsonData = records;
			var totalRecords = 0;
			if(model.get('async')){
                totalRecords = model.get('totalrecords');
			}else{
                  totalRecords = records.length;
			}
			var pageSize = model.get("pageSize"); // 每页显示多少
			var totalPages = Math.ceil(totalRecords / pageSize); // 总页数
			var pageNow = model.get("pageNow");
			var pagecode = model.get("pagecode"); //默认显示10个分页;
			var hidePageNum = model.get("hidePageNum") ==null?false:true; //显示分页num
			var prev; //前一页
			var pageli; //中间页
			var next; // 后一页

			pageli = new Array();
			if (pageNow > 1) {

				prev = {
					id : 'pagNum_' + (pageNow - 1),
					className : 'pagNum_' + grid,
					data : (pageNow - 1),
					text : '上一页'
				};
			} else {

				prev = {
					id : 'pagNum_' + (pageNow - 1),
					className : 'prev disabled',
					data : (pageNow - 1),
					text : '上一页'
				};
			}
			pageli.push(prev);
			var pg = self.pagesIndex(pagecode, pageNow, totalPages);

			var startpage = pg.start;
			var endpage = pg.end;

			if (startpage != 1) {
				var start = {
					id : 'pagNum_1',
					className : 'pagNum_' + grid,
					data : 1,
					text : '1...'
				};
				pageli.push(start);
			}

			for (var i = startpage; i <= endpage; i++) {
				if (i == pageNow) {
					var p = {
						id : 'pagNum_' + i,
						className : 'active',
						data : i,
						text : i
					};
					pageli.push(p);

				} else {
					var p = {
						id : 'pagNum_' + i,
						className : 'pagNum_' + grid,
						data : i,
						text : i
					};
					pageli.push(p);
				}
				;

			}
			if (endpage != totalPages) {
				var p = {
					id : 'pagNum_' + totalPages,
					className : 'pagNum_' + grid,
					data : totalPages,
					text : '...' + totalPages
				};
				pageli.push(p);
			}
			if (pageNow >= totalPages) {

				var p = {
					id : 'pagNum_' + totalPages,
					className : 'prev disabled',
					data : totalPages,
					text : '下一页'
				};
				pageli.push(p);
			} else {

				var p = {
					id : 'pagNum_' + (pageNow + 1),
					className : 'pagNum_' + grid + ' next',
					data : (pageNow + 1),
					text : '下一页'
				};
				pageli.push(p);
			}

			var htmlarr = self.listPageTemplate({
				totalRecords : totalRecords,
				pageSize : pageSize,
				totalPages : totalPages,
				pageli : pageli,
				grid:grid,
				hidePageNum:hidePageNum
			});

			$('#'+grid+'_page',self.$el).html(htmlarr);
		//	el.find('.page').html(htmlarr);

		    $('#'+grid+'_num',self.$el).val(model.get('pageSize'));
				//切换每页显示行数
				 $('#'+grid+'_num',self.$el).change(function(){
                  var pagesize = $(this).val();
                    model.set('pageSize',pagesize);
                    self.gotoPage(1);
                });

			//添加表头事件
			$('.pagNum_' + grid,self.$el).click(function(e) {
				var num = Number(e.currentTarget.dataset.code);
				self.gotoPage(num);
			});

		},
        //页面跳转
		gotoPage : function(num) {
			var self = this;
			var model = this.model;
			var el = this.$el;

			var pageSize = model.get("pageSize");
			var pageSize = model.get("pageSize"); // 每页显示多少
			var async = model.get("async");       // 是否异步请求

			model.set('pageNow', num);
            if(async){
                 self.loadBodyData();
            }else{
//                var records = model.get('currentRecords');

            	var records = model.get('currentRecords');
				var param = model.get('searchCondition');
				if(param!=null && !param=='') {
					var keys = _.keys(param);
					var _array = _.filter(records, function(item){
						var flag = false;
						  for(var i=0;i<keys.length;i++){
							 if(item[keys[i]].indexOf(param[keys[i]])>-1){
								flag = true ;
								break;
							 }
						  }
						  return flag;
					});
					var total = _array.length;
					model.set('totalRecords',total);
					self.changeTableBody(_array);
				} else {
					self.changeTableBody(records);
				}
            }


		},

		/**
		 * 这是一个分页工具 主要用于显示页码,得到返回来的 开始页码和结束页码 pagecode 要获得记录的开始索引 即 开始页码 pageNow
		 * 当前页 pageCount 总页数
		 *
		 */
		pagesIndex : function(pagecode, pageNow, pageCount) {

			pagecode = parseInt(pagecode, 10);
			pageNow = parseInt(pageNow, 10);
			pageCount = parseInt(pageCount, 10);
			var startpage = pageNow - (pagecode % 2 == 0 ? pagecode / 2 - 1 : pagecode / 2);
			var endpage = pageNow + pagecode / 2;
			if (startpage < 1) {
				startpage = 1;
				if (pageCount >= pagecode)
					endpage = pagecode;
				else
					endpage = pageCount;
			}
			if (endpage > pageCount) {
				endpage = pageCount;
				if ((endpage - pagecode) > 0)
					startpage = endpage - pagecode + 1;
				else
					startpage = 1;
			}
			;
			var se = {
				start : startpage,
				end : endpage
			};
			return se;
		},

		// 查询列表数据

		searchGrid : function(param,isfilter) {
			var self = this;
			var model = this.model;
			var el = this.$el;
            var column = model.get('column');
			!isfilter&&model.set('searchCondition',param);
              model.set('pageNow',1);
			var searchState=false;
			if(param){
				_.each(param,function(val,key){
					if(val){
						searchState=true;
						return false
					}
				})
			}
			if(model.get('checkbox')){
				$('#check-all',el).iCheck('uncheck');
			}
			model.set('searchState',searchState);
		    if(model.get("async")){
                self.loadBodyData();
		    }else{
				var searchGroupData = model.get('searchGroupData')||{};
				_.extend(param,searchGroupData);
				var keys = _.keys(param);
		    	var records = model.get('records');
				var _array = _.filter(records, function(item){
					var flag = false;
					  for(var i=0;i<keys.length;i++){
	                     if(item[keys[i]].indexOf(param[keys[i]])>-1){
	                     	flag = true ;
	                     	break;
	                     }
					  }
	                  return flag;
				});
				 // model.set('pageNow', 1);
				// model.set('currentRecords',_array);
				var total = _array.length;
                 model.set('totalRecords',total);
				self.changeTableBody(_array);
				return _array;
			}


		},

		// 获取选中行对应字段的数据
		getGridSelected : function(col){
            var self = this;
            var el = this.$el;
			var model = this.model;
			var grid = model.get('gridid');
            var currentRecords = model.get('currentPageRecords');
            var values = new Array();
			el.find('#'+grid+' tbody tr td:first-child input:checked').each(function(i,e){
				var $this=$(this),
					index=$this.closest('tr').data('index');
				if(col === undefined){
					values.push(currentRecords[index]);
				} else {
					values.push(currentRecords[index][col]);
				}
			})
            return values;
		},


	});
	return gridView;


});