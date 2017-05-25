var row=6;
var col=4;

$(document).ready(function(){

	tableClass();
	addSubtract();
	order();

	$(".bulid-btn").click(function(event) {
		
	
		if ($(".modify").text()=='修改表格')
		 {
		 $(".modify").text('修改完成').css({
		 	background  : '#C7C7C7',
	
		 });;
		 modify();
		}
		$("td").css({
			border: '1px solid red',
		});
		build_tr();
		tableClass(); 
		addSubtract();
		

	});

	$(".build_th").click(function(event) {
		if ($(".modify").text()=='修改表格')
		 {
		 $(".modify").text('修改完成').css({
		 	background  : '#C7C7C7',
		
		 });;
		 modify();
		}
	build_th();
	tableClass(); 
		addSubtract();
	});


	$(".row").click(function(event){
		alert("row:"+row+"col:"+col);
	});


	$(".modify").click(function(event){

		if ($(this).text()=='修改表格')
		 {
		 $(this).text('修改完成').css({
		 	background : '#C7C7C7',
		 
		 });;
		 modify();
		}
		else
		{
		$(this).text('修改表格').css({
			background: '#fff',
			
		});;
		modifyComplete();
		
		}
		
	});

	
})

function tableClass(){
	$("#con tr:odd").addClass('odd');
	$("#con tr:even").removeClass('odd');
	$("#con tr").hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});

}

function addSubtract(){
	$("#con tr").hover(function() {
		$(this).find('td:last').append('<span  class="subtract"></span>');
		$("span.subtract").click(function(event) {
		$(this).parent().parent().remove();
		row--;
		tableClass()
	});
	}, function() {
		$(this).find('.subtract').remove();


	});
}

function modify(){
	$("td,th").each(function(){
		var text=$(this).text();
		$(this).html('<input type="text" value="'+text+'">');
		$(this).css({
			border: '1px solid red',
		});
	});
}

function modifyComplete(){
	$("td").each(function(){
		var text=$(this).find('input').attr('value');

		var inp=$(this).find('input')[0];

		$(this).html(inp.value).css({
			border: '1px solid #D4D4D4',
		
		});
	});


	$("th").each(function(){
		var text=$(this).find('input').attr('value');
		var inp=$(this).find('input')[0];

		$(this).html(inp.value+'<span class="order"></span><span class="reverse"></span>').css({
			border: '1px solid #D4D4D4',
		
		});
	});

	order();
}


function build_tr(){

	// var newTr=document.createElement("tr");
	// var td_1=document.createElement("td");
	// var td_2=document.createElement("td");
	// var td_3=document.createElement("td");
	// var input_1=document.createElement("input");
	// var input_2=document.createElement("input");
	// var input_3=document.createElement("input");
	// td_1.appendChild(input_1);
	// td_2.appendChild(input_2);
	// td_3.appendChild(input_3);
	// newTr.appendChild(td_1);
	// newTr.appendChild(td_2);
	// newTr.appendChild(td_3);
	// var table=document.getElementsByTagName("table")[0];
	// table.appendChild("<tr></tr>");
	
	// $("<tr><td><input type=	&quot;text	&quot;></td><td><input type=	&quot;text	&quot;></td><td><input type=	&quot;text	&quot;></td></tr>").insertAfter('tr:last');
	// row++;
	$("tr:last").after('<tr></tr>');
	for(var i=0;i<col;i++)
	{
	$("tr:last").append('<td><input type=	&quot;text	&quot;></td>');
	}
	row++;

}

function build_th(){
	if(col>=9)
		alert("列数已经达到最大值");
	else
	{
		$("<th><input type=	&quot;text	&quot;></th>").insertAfter('th:last');
	col++;

	$("tr").find('td:last').each(function(){
		$(this).after("<td><input type=	&quot;text	&quot;></td>").css({
			border: '1px solid red',
			
		});;
	});
	}
	
}

function order(){
	$(".order,.reverse" ).click(function(event) {
		/* Act on the event */
		var flag=1;
		if( $(this).attr('class')=="reverse" )
		{
			flag=0;
		}

		var i=$(this).parent().index();	
		var temp=new Array();
		for(var n=0;n<row;n++)
		{
			var m=n+1;
			temp[n]=$("tr:eq("+m+") td:eq("+i+")").text();
			
		}	
		var reg = /^\d+$/;

		for(var inp=0;inp<row-1;inp++)
		{
			for(var j=0;j<row-inp-1;j++)
			{
				if( temp[j].match(reg)&& temp[j+1].match(reg) )  //如果字符串全为数字
				{	
					if(temp[j]==''||temp[j+1]=='')  {continue;}
					
					if ( flag? parseInt(temp[j])>parseInt(temp[j+1]) : parseInt(temp[j])<parseInt(temp[j+1])) 
					{
					var temp0;
					temp0=temp[j];
					temp[j]=temp[j+1];
					temp[j+1]=temp0;

					$("tr:eq("+(j+2)+")").insertBefore("tr:eq("+(j+1)+")");
					
					}

				}
				else
				{
					if(temp[j]==''||temp[j+1]=='')  {continue;}
					if ( flag? temp[j]>temp[j+1] : temp[j]<temp[j+1] ) 
					{
					var temp0;
					temp0=temp[j];
					temp[j]=temp[j+1];
					temp[j+1]=temp0;

					$("tr:eq("+(j+2)+")").insertBefore("tr:eq("+(j+1)+")");
					}
				}
			}
		}
		tableClass();
	});


}
