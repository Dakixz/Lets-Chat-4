const firebaseConfig = {
      apiKey: "AIzaSyBEBDTl9kjGe8WsDA1W81Sa1zbXi3dAqVo",
      authDomain: "kwitter-e9d4e.firebaseapp.com",
      databaseURL: "https://kwitter-e9d4e-default-rtdb.firebaseio.com",
      projectId: "kwitter-e9d4e",
      storageBucket: "kwitter-e9d4e.appspot.com",
      messagingSenderId: "441328579597",
      appId: "1:441328579597:web:95b1c871ccea8c0a0fd144"
    };
    
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name=localStorage.getItem("user_name");
  room_name=localStorage.getItem("room_name");

  function send(){
        msg=document.getElementById("msg").value;
firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
});
document.getElementById("msg").value="";
  }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
namee=message_data["name"];
message=message_data["message"];
like=message_data["like"];
name_with_tag="<h4>"+namee+"<img class='user_tick' src='tick.png'></h4>";
messgae_with_tag="<h4 class='message_h4'>"+message+"<h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatedlike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span></button><hr>";
row=name_with_tag+messgae_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;

      } });  }); }
getData();


  function updatedlike(message_id){
console.log("click on like button"+message_id);
button_id=message_id;
likes=document.getElementById(button_id).value;
updated_likes=Number(likes)+1;

firebase.database().ref(room_name).child(message_id).update({                            
      like:updated_likes
})
  }

  function logout(){
        localStorage.removeItem("user_name");
        localStorage.removeItem("room_name");
        window.location.replace("kwitter.html")
  }


