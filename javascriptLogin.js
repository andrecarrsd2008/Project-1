
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdTZeeAEZWsCZdVRULlWzKHF62JF7l6K8",
    authDomain: "project1-383c1.firebaseapp.com",
    databaseURL: "https://project1-383c1.firebaseio.com",
    projectId: "project1-383c1",
    storageBucket: "",
    messagingSenderId: "178533881009"
  };
  firebase.initializeApp(config);


  var database = firebase.database();
 

  $("#login-button").on("click", function() {
    event.preventDefault()
var email = $("#email-login").val()
var password = $("#password-login").val()
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  }
  if (errorCode === 'auth/wrong-email') {
    alert('Wrong Email')
  
  } else {
    alert(errorMessage);
  }
  console.log(error);
  // ...
});

})


$("#register-button").on("click", function(){

event.preventDefault()
var username = $("#username-register").val()
var email = $("#email-register").val()
var password = $("#password-register").val()
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
})
$("#button-logout").on("click", function() {


  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
})
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var logoutButton = $("#button-logout")
var loginButton = $("#button-login")
var questionBox = $("#questionSection")
var returnBtn = $("#return")
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#id01").hide()
      loginButton.hide()
      logoutButton.show() 
      questionBox.show()
      returnBtn.show()
      var userId = user.uid 
      var userEmail = user.email
      database.ref("user").child(userId).set({
        user: userId, 
        email: userEmail, 
       
      }) 
    
  
      $(document).on('change','#selectTab',function() {
          
 
         
          var selected = $(this).val();
   
      
    
          database.ref("user").child("choice").child(userId).push({
            choice: selected
          })
        // })
        })
        
                        
       
        

     
      //  database.ref().push({
      //   userID: {
      //    example: example
      //   }
    
   
    

    database.ref("user").child("choice/" + userId).on("child_added", function(snapshot){
      console.log(snapshot.val().choice)
   
    })
    } else {
 
      logoutButton.hide()
      loginButton.show()
      questionBox.hide()
      returnBtn.hide()
    }
  });
 
    


      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  
//refresh
  function refreshPage(){
    window.location.reload();
} 
  // var firebaseExample = database.ref("user").child(user.uid)
  // firebaseExample.on("child_added", function(snapshot){
  //   console.log(snapshot.val())
  //   $("#example-output").text(snapshot.val())
  // })


