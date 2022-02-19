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
document.getElementById("user_name").innerHTML="welcome "+user_name+"!";


function addRoom(){
    room_name=document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });

localStorage.setItem("room_name", room_name);
window.location="kwitter_page.html";
}

function getdata(){
    firebase.database().ref("/").on('value',function(snapshot){document.getElementById("output").innerHTML="";
    snapshot.forEach(function(childSnapshot){childKey=childSnapshot.key;
    Room_names=childKey;
    console.log('Room Name -'+ Room_names);
    row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>"; 
    document.getElementById("output").innerHTML +=row;

});});}

getdata();

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name",name);
    window.location="kwitter_page.html";
}


function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="kwitter.html";
}