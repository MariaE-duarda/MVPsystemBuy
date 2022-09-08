function checkInputs(inputs) {
    var filled = true;
    
    inputs.forEach(function(input) {
        
      if(input.value === "") {
          filled = false;
      }

    });
    
    return filled;
    
  }
  var inputs = document.querySelectorAll("input");
  var button = document.querySelector("button");
  inputs.forEach(function(input) {
      
    input.addEventListener("keyup", function() {
      if(checkInputs(inputs)) {
        button.disabled = false;
        button.style.backgroundColor = '#1A4543';
      } else {
        button.disabled = true;
        button.style.backgroundColor = 'grey';
      }
    });
  });