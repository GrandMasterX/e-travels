 $(document).ready(function(){
 /*
 var a=$("div.srcBlock").html();
 $("div.srcBlock").html("");
 $("div.targetForm").html(a);
*/
	$("body").live("click", function(){
		$("span.podskazka-more-seats-txt").fadeOut("100");
		$("span.podskazka-skidki-txt").fadeOut("100");
		$("span.podskazka-adress").fadeOut("100");
	 });
	$("span.podskazka-more-seats-txt").live("click", function(e){e.stopPropagation();$(this).fadeOut("100");});
	$("span.podskazka-skidki-txt").live("click", function(e){e.stopPropagation();$(this).fadeOut("100");});
	$("span.podskazka-skidki").live("click", function(e)
		{
			e.stopPropagation();
			$("input.podskazka-hidden").attr({value:"1"});
			$("span.podskazka-more-seats-txt").fadeOut("100",function(){$("span.podskazka-skidki-txt").fadeIn("100");});
		});
	$("span.podskazka-more-seats").live("click", function(e)
		{
			e.stopPropagation();
			$("input.podskazka-hidden").attr({value:"1"});
			$("span.podskazka-skidki-txt").fadeOut("100",function(){$("span.podskazka-more-seats-txt").fadeIn("100");});
		});
		
		
	$("span.read-uslovia-oformlenia").live("click", function(){
	
	$(".read-uslovia-vozvrata-div").slideUp("slow",function(){
				$("span.read-uslovia-vozvrata-active").replaceWith("<span class='read-uslovia-vozvrata'> Прочитать условия возврата оплаченых средств</span>");
					$(".read-uslovia-oformlenia-div").slideDown("slow",function(){
					$("span.read-uslovia-oformlenia").replaceWith("<span class='read-uslovia-oformlenia-active'> Скрыть условия оформления продажи</span>");
					});				
				});
		});	

	$("span.read-uslovia-oformlenia-active").live("click", function(){
			$(".read-uslovia-oformlenia-div").slideUp("slow",function(){
				$("span.read-uslovia-oformlenia-active").replaceWith("<span class='read-uslovia-oformlenia'>Прочитать условия оформления продажи</span>");
				});
		});			
	$("span.read-uslovia-vozvrata").live("click", function(){
	
				$(".read-uslovia-oformlenia-div").slideUp("slow",function(){
				$("span.read-uslovia-oformlenia-active").replaceWith("<span class='read-uslovia-oformlenia'>Прочитать условия оформления продажи</span>");
				
				$(".read-uslovia-vozvrata-div").slideDown("slow",function(){
				$("span.read-uslovia-vozvrata").replaceWith("<span class='read-uslovia-vozvrata-active'>Скрыть условия возврата оплаченых средств</span>");
				});
				});
	

		});	

	$("span.read-uslovia-vozvrata-active").live("click", function(){
			$(".read-uslovia-vozvrata-div").slideUp("slow",function(){
				$("span.read-uslovia-vozvrata-active").replaceWith("<span class='read-uslovia-vozvrata'> Прочитать условия возврата оплаченых средств</span>");
				});
		});	
		
	$("span.more").live("hover", function(){	
			$(this).next("span").show();
		});	
	$("span.more").live("mouseout", function(){	
			$(this).next("span").hide();
		});			

	$("img.busicon").live("hover", function(){	
			$(this).next("span").show();
		});	
	$("img.busicon").live("mouseout", function(){	
			$(this).next("span").hide();
		});			
		
	$("div.lock-seats").live("hover", function(){	
	var status=$(this).attr('disabled');
	if(status=="disabled"){$(this).next("span").show();}
		});	
	$("div.lock-seats").live("mouseout", function(){	
			$(this).next("span").hide();
		});			

	$(".get-hint").live("hover", function(){	
			$(this).next("span").show();
		});	
	$(".get-hint").live("mouseout", function(){	
			$(this).next("span").hide();
		});	
	$("input.get-hint").live("click", function(){	
			$(this).next("span").hide();
		});			
		
		
		
	$("input.morepvays").live("click", function(){
		$("div.hidden-pways").slideDown("100");
	 });		
 });
 
