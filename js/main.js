var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("tableBody");
var searchInput = document.getElementById("searchInput");
var alerts = document.getElementsByClassName("alert");

var websites = [];

// Getting Data in local storage if exist and display again.
if (JSON.parse(localStorage.getItem("website")) != null) {
  websites = JSON.parse(localStorage.getItem("website"));
  display();
}

// check validation
var urlHttpRegex = /^http/;

function checkValidation() {
  //Site URL input validation checking.

  var urlTest = urlHttpRegex.test(siteUrl.value);

  if (siteName.value && siteUrl.value) {
    alerts[0].classList.add("d-none");
    addBtn.removeAttribute("disabled");
    alerts[1].classList.add("d-none");
    for (var i = 0; i < websites.length; i++) {
      if (websites[i].name == siteName.value) {
        alerts[0].classList.remove("d-none");
        alerts[0].innerHTML = "This website name is exist";
        addBtn.disabled = true;
      }
    }
    if (!urlTest) {
      alerts[1].innerHTML = "Your URL should have the full path";
      alerts[1].classList.remove("d-none");
      addBtn.disabled = true;
    } else {
      alerts[1].innerHTML = "URL is required";
      addBtn.removeAttribute("disabled");
      alerts[1].classList.add("d-none");
    }
  } else if (!siteName.value && !siteUrl.value) {
    alerts[0].innerHTML = "Name is required";
    alerts[1].innerHTML = "URL is required";

    alerts[0].classList.remove("d-none");
    alerts[1].classList.remove("d-none");
    addBtn.disabled = true;
  } else if (!siteName.value && siteUrl.value) {
    alerts[0].innerHTML = "Name is required";
    alerts[1].classList.add("d-none");

    alerts[0].classList.remove("d-none");
    addBtn.disabled = true;
    if (!urlTest) {
      alerts[1].innerHTML = "Your URL should have the full path";
      alerts[1].classList.remove("d-none");
      addBtn.disabled = true;
    } else {
      alerts[1].innerHTML = "URL is required";
      addBtn.removeAttribute("disabled");
      alerts[1].classList.add("d-none");
    }
  } else {
    alerts[1].innerHTML = "URL is required";
    alerts[0].classList.add("d-none");
    alerts[1].classList.remove("d-none");
    addBtn.disabled = true;

    for (var i = 0; i < websites.length; i++) {
      if (websites[i].name == siteName.value) {
        alerts[0].classList.remove("d-none");
        alerts[0].innerHTML = "This website name is exist";
      }
    }
  }
}
siteName.onkeyup = checkValidation;
siteUrl.onkeyup = checkValidation;

// Calling addWebsite function when user clicks Submit button.
addBtn.onclick = function () {
  if (addBtn.innerText == "Submit") {
    addWebsite();
  } else {
    updateWebsite();
  }
};

function addWebsite() {
  var website = {
    name: siteName.value,
    url: siteUrl.value,
  };
  websites.push(website);
  display();
  clear();
}
function display() {
  var trs = "";

  for (var i = 0; i < websites.length; i++) {
    trs += `<tr class="border-secondary border-1 p-3  text-center ">
            <td><h4>${websites[i].name}</h4></td>
            <td><button onclick= deleteWebsite(${i}) class="btn btn-danger shadow">Delete</button></td>
            <td><button onclick= updateData(${i}) class="btn btn-warning shadow">Update</button></td>

            <td><a target="_blank" href="${websites[i].url}" class="btn btn-success shadow">Visit</a></td>
            </tr>`;
  }
  tableBody.innerHTML = trs;
  localStorage.setItem("website", JSON.stringify(websites));
}

function deleteWebsite(index) {
  websites.splice(index, 1);
  display();
}

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}

var indexOfWeb;
function updateData(index) {
  siteName.value = websites[index].name;
  siteUrl.value = websites[index].url;
  addBtn.innerHTML = "Update";
  indexOfWeb = index;
}

function updateWebsite() {
  websites[indexOfWeb].name = siteName.value;
  websites[indexOfWeb].url = siteUrl.value;
  display();
  clear();
  addBtn.innerHTML = "Submit";
}

// Calling search function when user is typing in search input.
searchInput.onkeyup = search;

function search() {
  var trs = "";
  for (var i = 0; i < websites.length; i++) {
    if (
      websites[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      trs += `<tr class="border-secondary border-1 p-3  text-center ">
        <td><h4>${websites[i].name}</h4></td>
        <td><button onclick= deleteWebsite(${i}) class="btn btn-danger shadow">Delete</button></td>
        <td><button onclick= updateData(${i}) class="btn btn-warning shadow">Delete</button></td>
        <td><a target="_blank" href="${websites[i].url}" class="btn btn-success shadow">Visit</a></td>
        </tr>`;
    }
  }
  tableBody.innerHTML = trs;
}

