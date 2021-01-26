document.getElementById("myBtn").onclick = openModal;
function openModal(){
  jQuery("#myModal").modal();
}
//add user and connection to data
function addUser(name, keystring) {
  
  let location = path.join(__dirname, './database');
  db.insertTableContent('user', location, {
    'name': name,
    'keystring': keystring
  },
    (succ, msg) => {
    });
}

//get name and conection to add in json data
document.getElementById("btnok").onclick = btnok;
function btnok() {
  var name = document.getElementById("name").value;
  var keystring = document.getElementById("keystring").value;
  if (name == "") {
    alert("Do Not Empty. Please enter name!");
  }
  else if (keystring == "") {
    alert("Do Not Empty. Please enter Connection string!");
  }
  else {
    addUser(name, keystring);
		jQuery("#myModal").modal("hide");
    alert("success!")
  }
}




