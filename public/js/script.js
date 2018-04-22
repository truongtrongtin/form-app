$("#myForm").submit(function(e) {

  $.ajax({
    type: "POST",
    url: '/',
    data: $("#myForm").serialize(), // serializes the form's elements.
    success: function(data)
    {
      if(data.email) {
        $('#emailError').text(data.email.msg);
      } else {
        $('#emailError').text('');
      }
      if(data.password) {
        $('#passwordError').text(data.password.msg);
      } else {
        $('#passwordError').text('');
      }
      if(data.repassword) {
        $('#repasswordError').text(data.repassword.msg);
      } else {
        $('#repasswordError').text('');
      }
      if(data.name) {
        $('#nameError').text(data.name.msg);
      } else {
        $('#nameError').text('');
      }
      if(data.success) {
        alert('Successfully Signup');
        $('#myForm').trigger('reset');
      }
    }
  });

  e.preventDefault(); // avoid to execute the actual submit of the form.
});