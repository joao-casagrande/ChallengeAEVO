$(document).ready(function(){
      
	   $(this).find('input').val("");


      $('#button_name').click(function(){
        let name = $('#input_name').val();
        if(name.length<2){
		  $('#input_name_valid').html('<span class="tab">Please, insert a name.</span>')
          $('#input_name_valid').addClass('d-block');
        } else{
          $('#input_name_valid').removeClass('d-block');
		  
			  $.ajax({
				type:"post",
				url:"/search/name",
				data:{
					name:name
				},
				success: function(response){
					doWork(response);

				},
				error: function(request, status, error){
					$('#input_name_valid').html('<span class="tab">Invalid name.</span>');
					$(input_name_valid).addClass('d-block');
				}
			});
		  }
      })
	  
	  
	  $('#button_zip').click(function(){
        let zip = $('#input_zip').val();
        if(zip.length<5){
		  $('#input_zip_valid').html('<span class="tab">Please, insert a ZIP code.</span>')
          $('#input_zip_valid').addClass('d-block');
        } else{
          $('#input_zip_valid').removeClass('d-block');
		  
			  $.ajax({
				type:"post",
				url:"/search/zip",
				data:{
					zip:zip
				},
				success: function(response){
					doWork(response);

				},
				error: function(request, status, error){
					$('#input_zip_valid').html('<span class="tab">Invalid ZIP code.</span>');
					$('#input_zip_valid').addClass('d-block');
				}
			});
		  }
      })

	  $('#button_coords').click(function(){
        let lat = $('#coord_lat').val();
		let lon = $('#coord_lon').val();
        let regex = /([^\s]*)/;
		
		
		if(!regex.test(lat)){
			$('#input_coords_valid').html('<span class="tab">Invalid latitude coordinates.</span><br>');
			$('#input_coords_valid').addClass('d-block');
		} else{
			if(!regex.test(lon)){
				$('#input_coords_valid').html('<span class="tab">Invalid longitude coordinates.</span>');
				$('#input_coords_valid').addClass('d-block');
			} else{
				$('#input_coords_valid').removeClass('d-block');
		  
				  $.ajax({
					type:"post",
					url:"/search/coords",
					data:{
						lat:lat,
						lon:lon
					},
					success: function(response){
						doWork(response);

					},
					error: function(request, status, error){
						$('#input_coords_valid').html('<span class="tab">Invalid coordinates code.</span>');
						$('#input_coords_valid').addClass('d-block');
					}
				});
			}
			
		}
		
		
		
		
		
          
		  
      })



});

function doWork(response){
	let data = response;
	
	let time = new Date(data.location.localtime);
	let h = time.getHours();
	let m = time.getMinutes();
	
	let desc = "";
	for(let i=0; i<data.current.weather_descriptions.length; i++){
		desc+= data.current.weather_descriptions[i];
		if(i!=data.current.weather_descriptions.length-1){
			desc+= ", ";
		}
	}
	
	
	html = '';

	html+=' <div class="row">';
	html+=' <div class="col-md-6-sm-3">';
	html+=' <div class="card h-100" style="width: 22rem;">';
	html+=' <div class="card-body">';
	html+=' <h5 class="card-title">Location</h5>';

	html+=' <span class="float-left">Name</span><span class="float-right">'+data.location.name+'</span><br>';
	html+=' <hr>';

	html+=' <span class="float-left">Country</span><span class="float-right">'+data.location.country+'</span><br>';


	html+=' </div>';


	html+=' </div>';
	html+=' </div>';
	html+=' <div class="col-md-6-sm-3">';
	html+=' <div class="card h-100" style="width: 22rem;">';
	html+=' <div class="card-body">';
	html+=' <h5 class="card-title">&nbsp</h5>';
	html+=' <span class="float-left">Region</span><span class="float-right">'+data.location.region+'</span><br>';
	html+=' <hr>';
	
	let offset = data.location.utc_offset;
	if(parseInt(data.location.utc_offset,10)>0){
		offset = "+"+offset;
		
	}
	
	
	html+=' <span class="float-left">Timezone</span><span class="float-right">'+data.location.timezone_id+' ('+offset+')</span><br>';

	html+=' </div>';


	html+=' </div>';
	html+=' </div>';

	html+=' </div>';



	html+=' <div class="row">';
	html+=' <div class="col-md-6-sm-3">';
	html+=' <div class="card h-100" style="width: 22rem;">';
	html+=' <div class="card-body">';
	html+=' <h5 class="card-title">Current Weather</h5>';
	html+=' <h6 class="card-subtitle mb-2 text-muted">'+h+':'+m+'</h6>';
	html+=' <h1 style="margin-left:10px">'+data.current.temperature+'ºC</h1>';

	html+=' <img class="float-left" style="border: 1px solid #000;" src="'+data.current.weather_icons[0]+'">';


	html+=' </div>';

	html+=' <div class="card-footer">';

	html+=' <p class="float-left">'+desc+'</p>';

	html+=' </div>';
	html+=' </div>';
	html+=' </div>';
	html+=' <div class="col-md-6-sm-3">';
	html+=' <div class="card h-100" style="width: 22rem;">';
	html+=' <div class="card-body">';
	html+=' <h5 class="card-title">&nbsp</h5>';
	html+=' <span class="float-left">Wind Speed</span><span class="float-right">'+data.current.wind_speed+' km/h</span><br>';
	html+=' <hr>';

	html+=' <span class="float-left">Wind Direction</span><span class="float-right">'+data.current.wind_dir+'</span><br>';

	html+=' </div>';

	html+=' <div class="card-footer">';

	html+=' <p class="float-right">RealFeel® '+data.current.feelslike+'°C</p>';
	html+=' </div>';
	html+=' </div>';
	html+=' </div>';

	html+=' </div>';


	html+=' <div class="row">';
	html+=' <div class="col-md-6-sm-3">';
	html+=' <div class="card h-100" style="width: 22rem;">';
	html+=' <div class="card-body">';
	html+=' <h5 class="card-title">Details</h5>';
	html+=' <span class="float-left">Pressure</span><span class="float-right">'+data.current.pressure+'</span><br>';
	html+=' <hr>';
	html+=' <span class="float-left">Precipitation </span><span class="float-right">'+data.current.precip+'%</span><br>';
	html+=' <hr>';
	html+=' <span class="float-left">Humidity</span><span class="float-right">'+data.current.humidity+'%</span><br>';

	html+=' </div>';


	html+=' </div>';
	html+=' </div>';
	html+=' <div class="col-md-6-sm-3">';
	html+=' <div class="card h-100" style="width: 22rem;">';
	html+=' <div class="card-body">';
	html+=' <h5 class="card-title">&nbsp</h5>';
	html+=' <span class="float-left">UV Index</span><span class="float-right">'+data.current.uv_index+'</span><br>';
	html+=' <hr>';
	html+=' <span class="float-left">Visibility </span><span class="float-right">'+data.current.visibility+'</span><br>';
	html+=' <hr>';
	html+=' <span class="float-left">Coordinates</span><span class="float-right">'+data.location.lat+', '+data.location.lon+'</span><br>';

	html+=' </div>';


	html+=' </div>';
	html+=' </div>';

	html+=' </div>';
	
	$('#result_placeholder').html(html);
	window.scrollTo(0,document.body.scrollHeight);
	
}