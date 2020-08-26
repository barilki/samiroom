var firebaseConfig = 
{
 apiKey: "AIzaSyDVTike3Eq-GijxR0gaepvM2ylhNQTxqlc",
  authDomain: "sce-pmc.firebaseapp.com",
  databaseURL: "https://sce-pmc.firebaseio.com",
  projectId: "sce-pmc",
  storageBucket: "sce-pmc.appspot.com",
  messagingSenderId: "80461758843",
  appId: "1:80461758843:web:f1ad2c164be971a775bdde",
  measurementId: "G-LYZNXBDPCK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;



// Sign in button actions
$("#btn-login").click(function()
{

  var email = $("#email").val();
  var password = $("#password").val();

  // Check if email and password not empty
  if(email != "" && password !="")
  {
    var result = firebase.auth().signInWithEmailAndPassword(email, password);
  
    result.catch(function(error)
    {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message: " + errorMessage);

    });
  }
  else
  {
    window.alert("Please fill out all fields.");
  }
});



// Sign up button actions
$("#btn-signup").click(function()
{

  var email = $("#email").val();
  var password = $("#password").val();
  var cPassword = $("#confirmPassword").val();

  var student= $('input[id=student]:checked').val();
  var owner= $('input[id=owner]:checked').val();


  // Check if email and password not empty
  if(email != "" && password !="" && cPassword )
  {
    //Check if password match to Confirm password
    if(password== cPassword)
    {
      if(student)
      {
      // var db = firebase.database();
      var result = firebase.auth().createUserWithEmailAndPassword(email, password);
      // var userID = firebase.auth().currentUser.uid; 
      
      let data = {
        email: this.email,
        password: this.password,
        acaInst: 'sce'
        // userID: userID

      };
      db.collection("Users").doc("students").collection("Students").doc(this.email).set(data)
      result.catch(function(error)
      {
        console.log("Error");

      });
      
    }
  
      result.catch(function(error)
      {
          var errorCode = error.code;
          var errorMessage = error.message;
  
          console.log(errorCode);
          console.log(errorMessage);
  
          window.alert("Message: " + errorMessage);
  
      });
    }
    else
    {
      window.alert("Password do not match with the Confirm Password.")
    }
  }
  else
  {
    window.alert("Please fill out all fields.");
  }
});



// Sign out button actions
$("#btn-logout").click(function()
{
    firebase.auth().signOut();
  
});

// Reset password button actions
$("#btn-resetPassword").click(function()
{
    var auth = firebase.auth();
    var email = $("#email").val();

    if(email != "")
    {
      auth.sendPasswordResetEmail(email).then(function()
      {
        window.alert(".נשלחה כעת הודעה למייל שלך");

      })
      .catch(function(error)
      {  
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message: " + errorMessage);
      });
    }
    else
    {
      window.alert("אנא כתוב תחילה את כתובת המייל שלך")
    } 
  
});


// Update button actions
$("#btn-update").click(function()
{
  var phone = $("#phone").val();
  var address = $("#address").val(); 
  var fName = $("#firstName").val();
  var sName = $("#secondName").val();
  var city = $("#city").val();
  var gender = $("#gender").val();

  var rootRef = firebase.database().ref().child("Users");
  var userID= firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);

  if(fName!="" && sName!="" && phone!="" && address!="" && city!="" && gender!="")
  {
    var userData=
    {
      "phone": phone,
      "address": address,
      "firstName": fName,
      "secondName": sName,
      "city": city,
      "gender": gender,
    };

    usersRef.set(userData, function(error)
    {
      if(error)
      {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message: " + errorMessage);

      }
      else
      {
        window.location.href= "MainPage.html";

      }

    });
  }
  else
  {
    window.alert(".אנא מלא את כל השדות")

  }
});


// add unit button actions
$("#btn-addunit").click(function()
{
  // Create a storage ref
  const ref = firebase.storage().ref()
 
  const file =document.querySelector("#choosefile").files[0];

  // Get current username
  var user = firebase.auth().currentUser;

  const name ='Users/' + user.uid + '/apartmentPicture/' + file.name ;
  const metadata= {
    contentType:file.type
  };

  const task= ref.child(name).put(file,metadata)

  


  // Check if file isn`t empty
  if(file !="")
  {
     
  task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url =>{
    console.log(url)
    alert("התמונה הועלתה בהצלחה!")
  });
     
  }
  else
  {
    window.alert("אנא מלא את כל השדות!");
  }
});