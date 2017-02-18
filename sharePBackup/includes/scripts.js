var map, panorama,start,end,imageSrc;
	 
	 function getButtonsEvents(){
	 	$('#parkingConfirmation1').click(function(){
		var dataString,date,month;
		date = new Date();
		month = date.getMonth()+1;
		dataString = "method=publishParking&onerId=123&day="+date.getDate()+"&month="+month+"&fromHour="+start+"&toHour="+end;	
	 		$.ajax({
	 		type:"POST",
			url:"action.php",
			data:dataString,
			catch:"true",
			success: function(html){
				$('.modal-title').html("Sharing time: " + $('#Time').html());
				$('.confirmationMessage').show();
				$('#myModal').modal("show");
			},
			dataType: "html"
		});}
	 	);
	 }
	 
	 function getMetaData(){
	 	var dataString = "method=getUserUsegeNumber";
	 	$.ajax({
	 		type:"POST",
			url:"action.php",
			data:dataString,
			catch:"true",
			success: function(html){
				if(html >0){
					imageSrc='images/myLocation.svg';
				}
				else{
					imageSrc='images/myLocation.svg';
				}
			},
			dataType: "html"
		});
	 }
	 
	 function getTimeLine(){
	 	var dataString;
	 	dataString = "method=getTimeLine&id=999";
	 	$.ajax({
	 		type:"POST",
			url:"action.php",
			data:dataString,
			catch:"true",
			success: function(html){
				$('.page-header').after(html);
			},
			dataType: "html"
		}); 
	 }
	 
	 function getUserDetails()
	 {
	 	$.ajax({
	 		type:"POST",
			url:"action.php",
			data:"method=test",
			catch:"true",
			success: function(html){
				var temp,arr;
				temp=html;
				arr = temp.split("#");
				$('.box article').html(arr[0]);
				$('.userName span').after(" Hello " + arr[1]);
			},
			dataType: "html"
		});
	 }
	  
	 function getListeners(){
	 	
	 	$.ajax({
	 		type:"POST",
			url:"action.php",
			data:"method=getFavorits&user=123",
			catch:"true",
			success: function(html){
				$('#addToFavorits').before(html);
				$('main section').click(function(){
					localStorage.setItem("serchLocation",$(this).html().split('<')[0]);
	 				window.location.href="serchDetails.html";
	 				
	 	});
			},
			dataType: "html"
		});
	 	
	 	
	 	
	 	
	 }
	 
	 function getSliderAction(){
	 	var min =0,
		max=1000,
		t1,
		t2,
		temp,
		step=10,
		maxHour=23,
		stepTime=1;
		start=0,
		end=0,
		distanceOutput = $('#distanceOutput').text(min + " meter"),
		timeOutPut = $('#Time').text(min + ":00 - "+ min +":00");
		
		t1 =$('#toTimeSlider')
		.attr({'max': maxHour, 'min':min, 'step': stepTime,'value': String(min)})
    	.on('input change', function() {
    		temp = start;
        	timeOutPut.text(temp + ":00 - " + this.value +":00");
        	end = this.value;
    	});
		
		t2 =$('#fromTimeSlider')
		.attr({'max': maxHour, 'min':min, 'step': stepTime,'value': String(min)})
	    .on('input change', function() {
	    	temp = end;
	        timeOutPut.text(this.value + ":00 - " + temp +":00");
	        start=this.value;
	    });

		$("#range-slider")
    	.attr({'max': max, 'min':min, 'step': step,'value': String(min)})
    	.on('input change', function() {
        	distanceOutput.text(this.value + " meter");
    	});
    
    	$('#parkingConfirmation').click(function(){
    			localStorage.setItem("time",$('#Time').html());
    			localStorage.setItem("from",start);
    			localStorage.setItem("to",end);
            	window.location.href ="findP.html";
            });
            $('article article').html(localStorage.getItem("serchLocation"));
	 }
	 
		function loadData(){
			$('#parkingTime').html(localStorage.getItem("time"));
			$('#moneyToPay').html("&#8362;" + (localStorage.getItem("to")-localStorage.getItem("from"))*5+".00");
			$('article section:first').html(localStorage.getItem("serchLocation"));
		}
	 	
      function initialize() {
      	var dataString;
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('street-view'),
            {
              position: {lat: 32.091075, lng: 34.802148},
              pov: {heading: 165, pitch: 0},
              zoom: 1
            });
            $('#parkingConfirmation').hide();
            $('.confirmationMessage').hide();
            $('#parkingConfirmation').click(function(){
            	window.location.href ="index.html";
            });
            if(localStorage.length==0) $('#startParking').attr("disabled",true);
            $('#startParking').click(function(){
            	var sum,date,month;
            	date = new Date();
				month = date.getMonth()+1; 
            	sum = (localStorage.getItem("to") - localStorage.getItem("from"))*5;
            	dataString="method=parkingMatch&id=111&sum="+sum+"&day="+date.getDate()+"&month="+month;
	            $.ajax({
		 			type:"POST",
					url:"action.php",
					data:dataString,
					catch:"true",
					success: function(html){
						//set data base function
						$( 'article section' ).fadeTo( "fast", 0.15 );
						$('#startParking').attr('disabled',true);
						$('#startParking').hide();
						$('#parkingConfirmation').show();
						$('.confirmationMessage').show();
						localStorage.clear();
					},
					dataType: "html"
				});	
            });

      }


      
        function initMap() {
        	        	var dataString,arr,temp,parkingLocation,map,userImage;
        	$.getJSON("includes/userIconSrc.json",function(data){
        		userImage=data;
        	});
        	

        	if($('#street-view').length!=0){
	        	panorama = new google.maps.StreetViewPanorama(
	            document.getElementById('street-view'),
	            {
	              position: {lat: 32.091075, lng: 34.802148},
	              pov: {heading: 165, pitch: 0},
	              zoom: 1
	            });
	            $('#parkingConfirmation').hide();
	            $('.confirmationMessage').hide();
	            $('#parkingConfirmation').click(function(){
	            	window.location.href ="index.html";
	            });
	            
	            $('#startParking').click(function(){
	            	var sum,date,month;
	            	date = new Date();
					month = date.getMonth()+1; 
	            	sum = (localStorage.getItem("to") - localStorage.getItem("from"))*5;
	            	dataString="method=parkingMatch&id=111&sum="+sum+"&day="+date.getDate()+"&month="+month;
	            $.ajax({
		 			type:"POST",
					url:"action.php",
					data:dataString,
					catch:"true",
					success: function(html){
						//set data base function
						$( 'article section' ).fadeTo( "fast", 0.15 );
						$('#startParking').attr('disabled',true);
						$('#startParking').hide();
						$('#parkingConfirmation').show();
						$('.confirmationMessage').show();
						localStorage.clear();
					},
					dataType: "html"
				});

	            });
        	}
 		if($('#map').length!=0){
	
	        map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: 32.091075, lng: 34.802148},
	          zoom: 15
	        });
	     	 //  var infoWindow = new google.maps.InfoWindow({map: map});
			//var image = 'images/myLocation.svg';
			var parking = 'images/pin.svg';
	        // Try HTML5 geolocation.
	    /*    if (navigator.geolocation) {
	          navigator.geolocation.getCurrentPosition(function(position) {
	            var pos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
	            };	
	            var pPos={
	            	lat:32.091075,
	            	lng:34.802148
	            };
				
	           // infoWindow.setPosition(pos);
	           //  infoWindow.setContent('Location found.');
	         	map.setCenter(pos);
	         	
				
	          	var myLocation = new google.maps.Marker({
	          	position: pos,
	          	map: map,
	          	icon: image
	        	});
	        	
	        	var parkingLocation = new google.maps.Marker({
	          	position: pPos,
	          	map: map,
	          	icon: parking
	        	});
	        	
	          parkingLocation.addListener('click', function() {
	         	window.location.href = "parkingDetails.html";
	        });
	        
	          }, function() {
	            handleLocationError(true, infoWindow, map.getCenter());
	          });
	        } else {
	          // Browser doesn't support Geolocation
	          handleLocationError(false, infoWindow, map.getCenter());
	     */     
	           var pPos={
	            	lat:32.091075,
	            	lng:34.802148
	            };
	            
	        var dataString = "method=getUserUsegeNumber";
		 	$.ajax({
		 		type:"POST",
				url:"action.php",
				data:dataString,
				catch:"true",
				success: function(html){
					 var pos = {
	              lat: 32.089883,
	              lng:  34.803068
	            };
					
					if(html > 15){
						imageSrc = userImage.goldMember;
					}
					else{
						imageSrc = userImage.newUser;
					}
	 
	          	var myLocation = new google.maps.Marker({
	          	position: pos,
	          	map: map,
	          	icon: imageSrc
	        	});
					
				},
				dataType: "html"
			});
			
				$.ajax({
		 		type:"POST",
				url:"action.php",
				data:"method=getAvailableParking",
				catch:"true",
				success: function(html){
					temp = html;
					arr = temp.split("#");
					console.log(arr);
					
			for (var i = 0; i < arr.length; i+=2) {
	           	parkingLocation = new google.maps.Marker({
	            position: {lat: parseFloat(arr[i]), lng: parseFloat(arr[i+1])},
	            map: map,
	            icon: parking,
	          });   
	            parkingLocation.addListener('click', function() {     	
	         	window.location.href = "parkingDetails.html";
	        });
	        }
				},
				dataType: "html"
			});
			
	            
	            
	          
	         
	        	
	        	
	        	/*
	        	var parkingLocation = new google.maps.Marker({
	          	position: pPos,
	          	map: map,
	          	icon: parking
	        	});
	        	*/
	
	         } 
	  }
        

      
      
    
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

  