
$(function(){
	var params = {
		fileInput: $("#fileImage").get(0),
		uploadInput: $("#fileSubmit").get(0),
		dragDrop: $("#fileDragArea").get(0),
		url: $("#uploadForm").attr("action"),
		
		filterFile: function(files) {
			var arrFiles = [];
			for (var i = 0, file; file = files[i]; i++) {
				if (file.size >= 51200000) {
					alert('您这张"'+ file.name +'"图片大小过大');	
				} else {
					// 在这里需要判断当前所有文件中
					arrFiles.push(file);	
				}			
			}
			return arrFiles;
		},
		onSelect: function(files) {
			var html = '', i = 0;
			//$("#preview").html('<div class="upload_loading"></div>');
			// 组织预览html
			var funDealtPreviewHtml = function() {
				file = files[i];
				if (file) {
					var reader = new FileReader()
					reader.onload = function(e) {
						// 图片上传的是图片还是其他            
						if (file.type.indexOf("image") == 0) {
							html = html + '<div id="uploadList_'+ file.index +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+ 
								'<a href="javascript:" class="upload_delete" title="删除" data-index="'+ file.index +'">删除</a><br />' +
								'<img id="uploadImage_' + file.index + '" src="' + e.target.result + '" class="upload_image" /></p>'+ 
								'<span id="uploadProgress_' + file.index + '" class="upload_progress"></span>' +
							'</div>';
						}else{
							html = html + '<div id="uploadList_'+ file.index +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+ 
								'<a href="javascript:" class="upload_delete" title="删除" data-index="'+ file.index +'">删除</a><br />' +
								'<span id="uploadProgress_' + file.index + '" class="upload_progress"></span>' +
							'</div>';
						}
						
						i++;
						funDealtPreviewHtml();
					}
					reader.readAsDataURL(file);
				} else {
					// 走到这里说明文件html已经组织完毕，要把html添加到预览区
					funAppendPreviewHtml(html);
				}
			};
			
			// 添加预览html
			var funAppendPreviewHtml = function(html){
				//$("#preview .upload_loading").remove();
				$("#preview").append(html);
				// 绑定删除按钮
				funBindDelEvent();
			};
			
			// 绑定删除按钮事件
			var funBindDelEvent = function(){
				//删除方法
				$(".upload_delete").click(function() {
					ZYFILE.funDeleteFile(parseInt($(this).attr("data-index")), true);
					return false;	
				});
			};
			
			funDealtPreviewHtml();		
		},
		onDelete: function(file) {
			$("#uploadList_" + file.index).fadeOut();
		},
		onProgress: function(file, loaded, total) {
			var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
			eleProgress.html(percent);
			console.info(file.index);
		},
		onSuccess: function(file, response) {
				$("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
		},
		onFailure: function(file) {
			$("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");	
			$("#uploadImage_" + file.index).css("opacity", 0.2);
		},
		onComplete: function(response){
			console.info(response);
		},
		onDragOver: function() {
			$(this).addClass("upload_drag_hover");
		},
		onDragLeave: function() {
			$(this).removeClass("upload_drag_hover");
		}

	};
	
	ZYFILE = $.extend(ZYFILE, params);
	ZYFILE.init();
});

