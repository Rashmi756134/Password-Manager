function maskpassword(pass){
  let str = ""
  for(let index = 0;index < pass.length; index++){
    str += "*";
  }
  return str;
}


function CopyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      document.getElementById("alert").style.display = "inline";
      setTimeout(() => {
        document.getElementById("alert").style.display = "none"
      }, 2000);
    },
    () => {
      alert("Clipboard copying failed");
    },
  );
}
//logic to fill the table

const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website
  })
  localStorage.setItem("passwords", JSON.stringify(arrUpdated))
  alert(`Successfully deleted ${website}'s password`)
  showPasswords();
};
const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "No Data To Show";
  } else {
    tb.innerHTML = `<tr>
    <th>WEBSITE</th>
    <th>USERNAME</th>
    <th>PASSWORD</th>
    <th>DELETE</th>
</tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str += `<tr>
    <td>${element.website} <img onclick ="CopyText('${element.website}')" src="./copy.svg" alt = "Copy Button" width="15" height = "12">
    </td>
    <td>${element.username} <img onclick ="CopyText('${element.username}')" src="./copy.svg" alt = "Copy Button" width="15" height = "12">
    </td>
    <td>${maskpassword(element.password)} <img onclick ="CopyText('${element.password}')" src="./copy.svg" alt = "Copy Button" width="15" height = "12">
    </td>
    <td><button class = "btnsm" onclick ="deletePassword('${element.website}')">Delete</button></td>
        <tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};
console.log("Working");
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked.....");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords();
});
