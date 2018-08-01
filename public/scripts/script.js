// Grab the Modal
var modal = document.getElementById('id01');

// User delete form
var usrDel = document.getElementById('delForm');

// Delete account button
var delButton = document.getElementById('delAcc');

//  When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// User account deletion confirmation
delButton.addEventListener('click', function () {
  var x = confirm('Are you sure you want to Delete your account?');
    if(x) {
      usrDel.submit();
    }

});
