$(document).ready(function(){
      


      $('#button_name').click(function(){
        let name = $('#input_name').val();
        if(name.length<2){
          $('#input_name_valid').addClass('d-block');
        } else{
          $('#input_name_valid').removeClass('d-block');
		  window.location.href = "/details/"+name;
		  
        }
        

      })






    });