var list_of_reminders = []
const getRems = async (url) => {
  var json_object = JSON.stringify({ form: "yes" })
  fetch('/', {
    method: 'POST', body: json_object, headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(function (data) {
      for (var i = 0; i < data.list.length; i++) {
        list_of_reminders.push(" " + data.list[i].name);
        //console.log(data.list[i].name);
        let parent = document.getElementById("current-div");
        let child = document.createElement("label");
        child.innerText = data.list[i].name;
        child.textContent = data.list[i].name;
        child.for = data.list[i].name;
        let child2 = document.createElement("input");
        child2.name = data.list[i].name;
        child2.type = "checkbox";
        child2.onclick = "checked()";
        child2.class = "checkbox-for-reminders";
        child2.style.marginRight = "5px";
        parent.appendChild(child2);
        parent.appendChild(child);
        parent.appendChild(document.createElement('br'));
        //document.getElementById('notification').hidden = false
      }

    })
  //e.preventDefault();


};

const removeRem = async (name) => {
  var json_object = JSON.stringify({ remove: "yes", nameArray: name })
  fetch('/', {
    method: 'POST', body: json_object, headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(function (data) {
      window.location.reload();


    })
  //e.preventDefault();


};

window.onload = function (e) {
  getRems(e);
}

function submission(e) {
  var name = document.getElementById("name").value
  //alert(name);
  if (name == "") {
    alert("Please fill out all fields!");
    return
  }
  document.getElementById("name").value = ""
  var object = {
    name: name
  }
  var json_object = JSON.stringify(object)
  console.log(json_object)
  //alert(json_object)
  //e.preventDefault();
  fetch('../../', {
    method: 'POST', body: json_object, headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(console.log)

  let parent = document.getElementById("current-div");
  let child = document.createElement("label");
  child.innerText = " " + name;
  child.textContent = " " + name;
  child.for = name;
  let child2 = document.createElement("input");
  child2.name = name;
  child2.type = "checkbox";
  child2.onclick = "checked()";
  child2.class = "checkbox-for-reminders";
  child2.style.marginRight = "5px";
  parent.appendChild(child2);
  parent.appendChild(child);
  parent.appendChild(document.createElement('br'));
  //document.getElementById('notification').hidden = false
  e.preventDefault();
}

//alert(checkbox_array);
document.getElementById("submission").onclick = function (e) {
  submission(e);
}

function checked() {
  alert("AAAAAAAAAAAAAAAAAAAAAAAAAA");
}


document.getElementById("clear").onclick = function (e) {
  //console.log("CLEARED");
  //alert('CLEARED');
  let checked = Array.prototype.slice.call(document.querySelectorAll("input[type='checkbox']:checked"));
  //console.clear();
  // Loop over the array and inspect contents
  let nameArray = []
  checked.forEach(function (cb) {
    console.log(cb.name);
    nameArray.push(cb.name)
    //let label = $(cb).next().innerText;
    //console.log(label);
  });
  removeRem(nameArray);
  window.location.reload();
}


// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== 'granted')
    Notification.requestPermission();
});


function notifyMe() {
  if (Notification.permission !== 'granted')
    Notification.requestPermission();
  else {
    var notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: 'Hey there! You\'ve been notified!',
    });
    notification.onclick = function () {
      window.open('http://stackoverflow.com/a/13328397/1269037');
    };
  }
}