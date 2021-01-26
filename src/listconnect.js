function selectUser(id1) {
    let location = path.join(__dirname, './database');
    db.getRows('user', location, {id: id1,}, (succ, result) => {
      //console.log("Success: " + succ);
      console.log(result[0].keystring);
      document.getElementById("connectstring").innerHTML = result[0].keystring;
    })
}
function editUser(id) {
    console.log("edit: " + id);
}
function deleteUser(id1) {
    let location = path.join(__dirname, './database');
    db.deleteRow('customers',location, {id: id1,}, (succ, msg) => {
        console.log(msg);
      });
}