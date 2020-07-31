$(document).ready(function() {

    let client_ip = null;
    $(this).find('input').val("");
    $('#input_ip').mask('999.999.999.999');

    $('#button_name').click(function() {
        $('#button_name').html('<i class="fas fa-spin fa-spinner"></i>')
        $('#button_name').prop('disabled', true);


        let name = $('#input_name').val();
        if (name.length < 2) {
            $('#input_name_valid').html('<span class="tab">Please, insert a name.</span>')
            $('#input_name_valid').addClass('d-block');

            $('#button_name').prop('disabled', false);
            $('#button_name').html('Send')
        } else {
            $('#input_name_valid').removeClass('d-block');

            $.ajax({
                type: "post",
                url: "/search/name",
                data: {
                    name: name
                },
                success: function(response) {
                    $('#button_name').prop('disabled', false);
                    $('#button_name').html('Send')

                    doWork(response);

                },
                error: function(request, status, error) {
                    $('#input_name_valid').html('<span class="tab">Location not found.</span>');
                    $(input_name_valid).addClass('d-block');

                    $('#button_name').prop('disabled', false);
                    $('#button_name').html('Send')
                }
            });
        }


    })


    $('#button_zip').click(function() {

        $('#button_zip').html('<i class="fas fa-spin fa-spinner"></i>')
        $('#button_zip').prop('disabled', true);

        let zip = $('#input_zip').val();
        if (zip.length < 5) {
            $('#input_zip_valid').html('<span class="tab">Please, insert a ZIP code.</span>')
            $('#input_zip_valid').addClass('d-block');

            $('#button_zip').prop('disabled', false);
            $('#button_zip').html('Send')
        } else {
            $('#input_zip_valid').removeClass('d-block');

            $.ajax({
                type: "post",
                url: "/search/zip",
                data: {
                    zip: zip
                },
                success: function(response) {
                    doWork(response);
                    $('#button_zip').prop('disabled', false);
                    $('#button_zip').html('Send')

                },
                error: function(request, status, error) {
                    $('#input_zip_valid').html('<span class="tab">ZIP code not found.</span>');
                    $('#input_zip_valid').addClass('d-block');

                    $('#button_zip').prop('disabled', false);
                    $('#button_zip').html('Send')
                }
            });
        }
    })

    $('#button_coords').click(function() {
        $('#button_coords').html('<i class="fas fa-spin fa-spinner"></i>')
        $('#button_coords').prop('disabled', true);


        let lat = $('#coord_lat').val();
        let lon = $('#coord_lon').val();
        let regex = /([^\s]*)/;


        if (!regex.test(lat)) {
            $('#input_coords_valid').html('<span class="tab">Invalid latitude coordinates.</span><br>');
            $('#input_coords_valid').addClass('d-block');

            $('#button_coords').prop('disabled', false);
            $('#button_coords').html('Send')
        } else {
            if (!regex.test(lon)) {
                $('#input_coords_valid').html('<span class="tab">Invalid longitude coordinates.</span>');
                $('#input_coords_valid').addClass('d-block');

                $('#button_coords').prop('disabled', false);
                $('#button_coords').html('Send')
            } else {
                $('#input_coords_valid').removeClass('d-block');

                $.ajax({
                    type: "post",
                    url: "/search/coords",
                    data: {
                        lat: lat,
                        lon: lon
                    },
                    success: function(response) {
                        doWork(response);
                        $('#button_coords').prop('disabled', false);
                        $('#button_coords').html('Send')
                    },
                    error: function(request, status, error) {
                        $('#input_coords_valid').html('<span class="tab">Coordinates not found.</span>');
                        $('#input_coords_valid').addClass('d-block');

                        $('#button_coords').prop('disabled', false);
                        $('#button_coords').html('Send')
                    }
                });
            }

        }




    })


    $('#button_ip').click(function() {
        $('#button_ip').html('<i class="fas fa-spin fa-spinner"></i>')
        $('#button_ip').prop('disabled', true);


        let ip = $('#input_ip').val();

        let regex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;

        if (!regex.test(ip)) {
            $('#input_ip_valid').html('<span class="tab">Please, insert a valid IP address.</span>')
            $('#input_ip_valid').addClass('d-block');

            $('#button_ip').prop('disabled', false);
            $('#button_ip').html('Send')

        } else {
            $('#input_ip_valid').removeClass('d-block');

            $.ajax({
                type: "post",
                url: "/search/ip",
                data: {
                    ip: ip
                },
                success: function(response) {
                    doWork(response);
					
					$('#button_ip').prop('disabled', false);
					$('#button_ip').html('Send')

                },
                error: function(request, status, error) {
                    $('#input_ip_valid').html('<span class="tab">IP location not found.</span>');
                    $('#input_ip_valid').addClass('d-block');
					
					$('#button_ip').prop('disabled', false);
					$('#button_ip').html('Send')
                }
            });
        }
    })



    $('#local-tab').click(function() {
		$('#client_ip').html('<i class="fas fa-ellipsis-h"></i>');
		
        $.ajax({
            type: "get",
            url: "https://ifconfig.me/ip",
            success: function(response) {
                $('#button_local').prop('disabled', false);
                client_ip = response;
                $('#client_ip').html(client_ip);
				
				

            },
            error: function(request, status, error) {
                $('#button_local').prop('disabled', true);
                $('#client_ip').text("Unable to fetch your IP address");
            }
        });



    })



    $('#button_local').click(function() {
		$('#button_local').html('<i class="fas fa-spin fa-spinner"></i>')
        $('#button_local').prop('disabled', true);

	
        $('#input_local_valid').removeClass('d-block');

        $.ajax({
            type: "post",
            url: "/search/ip",
            data: {
                ip: client_ip
            },
            success: function(response) {
                doWork(response);
				
				$('#button_local').prop('disabled', false);
				$('#button_local').html('Send')

            },
            error: function(request, status, error) {
                $('#input_local_valid').html('<span class="tab">IP location not found.</span>');
                $('#input_local_valid').addClass('d-block');
				
				$('#button_local').prop('disabled', false);
				$('#button_local').html('Send')
            }
        });




    })



    $("#input_name").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#button_name").click();
        }
    });

    $("#input_zip").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#button_zip").click();
        }
    });

    $("#coord_lat").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#button_coords").click();
        }
    });

    $("#coord_lon").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#button_coords").click();
        }
    });

    $("#input_ip").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#button_ip").click();
        }
    });

	$("#clear_history").click(function(){
		$('#clear_history').html('<i class="fas fa-spin fa-spinner"></i>')
        $('#clear_history').prop('disabled', true);
		$.ajax({
            type: "get",
            url: "/clear",
            success: function(response) {
               $('#clear_history').prop('disabled', false);
				$('#clear_history').html('<i class="fas fa-trash-alt x1"></i>')
				window.location.reload();
				

            },
            error: function(request, status, error) {
                $('#clear_history').prop('disabled', false);
				$('#clear_history').html('<i class="fas fa-trash-alt x1"></i>')
            }
        });
		
		
		
		
	});
	
	
	
});

function doWork(response) {
    let data = response;

    let time = new Date(data.location.localtime);
    let h = time.getHours();
    let m = time.getMinutes();
	
	if(h == 0){
		
		h = "00";
	}
	
	if(m == 0){
		
		m = "00";
	}
	

    let desc = "";
    for (let i = 0; i < data.current.weather_descriptions.length; i++) {
        desc += data.current.weather_descriptions[i];
        if (i != data.current.weather_descriptions.length - 1) {
            desc += ", ";
        }
    }


    html = '';

    html += ' <div class="row">';
    html += ' <div class="col-md-6-sm-3">';
    html += ' <div class="card h-100" style="width: 22rem;">';
    html += ' <div class="card-body">';
    html += ' <h5 class="card-title">Location</h5>';

    html += ' <span class="float-left">Name</span><span class="float-right">' + data.location.name + '</span><br>';
    html += ' <hr>';

    html += ' <span class="float-left">Country</span><span class="float-right">' + data.location.country + '</span><br>';


    html += ' </div>';


    html += ' </div>';
    html += ' </div>';
    html += ' <div class="col-md-6-sm-3">';
    html += ' <div class="card h-100" style="width: 22rem;">';
    html += ' <div class="card-body">';
    html += ' <h5 class="card-title">&nbsp</h5>';
    html += ' <span class="float-left">Region</span><span class="float-right">' + data.location.region + '</span><br>';
    html += ' <hr>';

    let offset = data.location.utc_offset;
    if (parseInt(data.location.utc_offset, 10) > 0) {
        offset = "+" + offset;

    }


    html += ' <span class="float-left">Timezone</span><span class="float-right">' + data.location.timezone_id + ' (' + offset + ')</span><br>';

    html += ' </div>';


    html += ' </div>';
    html += ' </div>';

    html += ' </div>';



    html += ' <div class="row">';
    html += ' <div class="col-md-6-sm-3">';
    html += ' <div class="card h-100" style="width: 22rem;">';
    html += ' <div class="card-body">';
    html += ' <h5 class="card-title">Current Weather</h5>';
    html += ' <h6 class="card-subtitle mb-2 text-muted">' + h + ':' + m + '</h6>';
    html += ' <h1 style="margin-left:10px">' + data.current.temperature + 'ºC</h1>';

    html += ' <img class="float-left" style="border: 1px solid #000;" src="' + data.current.weather_icons[0] + '">';


    html += ' </div>';

    html += ' <div class="card-footer">';

    html += ' <p class="float-left">' + desc + '</p>';

    html += ' </div>';
    html += ' </div>';
    html += ' </div>';
    html += ' <div class="col-md-6-sm-3">';
    html += ' <div class="card h-100" style="width: 22rem;">';
    html += ' <div class="card-body">';
    html += ' <h5 class="card-title">&nbsp</h5>';
    html += ' <span class="float-left">Wind Speed</span><span class="float-right">' + data.current.wind_speed + ' km/h</span><br>';
    html += ' <hr>';

    html += ' <span class="float-left">Wind Direction</span><span class="float-right">' + data.current.wind_dir + '</span><br>';

    html += ' </div>';

    html += ' <div class="card-footer">';

    html += ' <p class="float-right">RealFeel® ' + data.current.feelslike + '°C</p>';
    html += ' </div>';
    html += ' </div>';
    html += ' </div>';

    html += ' </div>';


    html += ' <div class="row">';
    html += ' <div class="col-md-6-sm-3">';
    html += ' <div class="card h-100" style="width: 22rem;">';
    html += ' <div class="card-body">';
    html += ' <h5 class="card-title">Details</h5>';
    html += ' <span class="float-left">Pressure</span><span class="float-right">' + data.current.pressure + ' MB</span><br>';
    html += ' <hr>';
    html += ' <span class="float-left">Precipitation </span><span class="float-right">' + data.current.precip + ' MM</span><br>';
    html += ' <hr>';
    html += ' <span class="float-left">Humidity</span><span class="float-right">' + data.current.humidity + '%</span><br>';

    html += ' </div>';


    html += ' </div>';
    html += ' </div>';
    html += ' <div class="col-md-6-sm-3">';
    html += ' <div class="card h-100" style="width: 22rem;">';
    html += ' <div class="card-body">';
    html += ' <h5 class="card-title">&nbsp</h5>';
    html += ' <span class="float-left">UV Index</span><span class="float-right">' + data.current.uv_index + '</span><br>';
    html += ' <hr>';
    html += ' <span class="float-left">Visibility </span><span class="float-right">' + data.current.visibility + ' km/h</span><br>';
    html += ' <hr>';
    html += ' <span class="float-left">Coordinates</span><span class="float-right">' + data.location.lat + ', ' + data.location.lon + '</span><br>';

    html += ' </div>';


    html += ' </div>';
    html += ' </div>';

    html += ' </div>';

    $('#result_placeholder').html(html);


}