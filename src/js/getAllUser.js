//get all user
function getAllUser(){
    let location = path.join(__dirname, './database');
    db.getAll('user', location, (succ, data) => {
      if (succ) {
          for (i = 0; i < data.length; i++) {
              document.write('<tr class="d-flex">');
              document.write('<td class="col-9"><a onclick = "selectUser('+data[i].id+')"> '+ data[i].name + '</a></td>');
              document.write('<td class="col-1"><i onclick = "editUser('+data[i].id+')" class="far fa-edit" style="font-size:14px;color:blue"></i></td>');
              document.write('<td class="col-1"><i onclick = "deleteUser('+data[i].id+')" class="fas fa-trash" style="font-size:14px; color:red"></i></i></td>');
              document.write('</tr>');
          }
    
      } else {
          document.write('<tr>');
          document.write('<td><h3>Chưa có dữ liệu người dùng</h3></td>');
          document.write('</tr>');
      }
    });
  }
  getAllUser();