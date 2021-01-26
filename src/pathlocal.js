//add path local
function addPath(pathlocal) {
    let location = path.join(__dirname, './database');
    db.insertTableContent('pathlocal', location, {
      'pathlocal': pathlocal
    },
      (succ, msg) => {
      });
  
  }

document.getElementById("fileSubmit").onclick = uploadFile;
function uploadFile() {
  var fileInput = document.getElementById("file");
  var files = fileInput.files;
  var pathAll = files[0].path;
  var pathCut = files[0].webkitRelativePath;
  //replace "\" -> "/"
  for (i = 0; i < pathAll.length; i++) {
    if (pathAll[i] == String.fromCharCode(92)) {
      pathAll = pathAll.replace(String.fromCharCode(92), "/");
    }
  }

  for (i = 0; i < pathCut.length; i++) {
    if (pathCut[i] == String.fromCharCode(92)) {
      pathCut = pathCut.replace(String.fromCharCode(92), "/");
    }
  }

  var pathCut2 = pathCut;
  for (i = 0; i < pathCut.length; i++) {
    if (pathCut[i] != "/") {
      pathCut2 = pathCut2.substr(1);
    }
    if (pathCut[i] == "/")
      break;
  }
  pathAll = pathAll.replace(pathCut2, "/");
  addPath(pathAll);
  alert(pathAll);
}