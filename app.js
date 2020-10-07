'use strict';
var allDevices = [];
var tHeader = [' Decive Name ', ' Quantity', ' unit Price ', ' Category'];
// - Whenever we add a new device, you should generate the device price as an integer random number between 350 and 750.
var totalprice=0;
if(localStorage.getItem('devices')){
    var data=JSON.parse(localStorage.getItem('devices'));
    for (var i = 0; i < data.length; i++) {
        new Device(data[i].name,data[i].category,data[i].random,data[i].quantity);
    }
}

function Device(name, category, quantity) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.random = 0;
    allDevices.push(this);
}

Device.prototype.priceRandom = function () {
    this.random = Math.floor(Math.random() * (750 - 350 + 1) + 350);
    return this.random;

}

function total(){
var totalprice=document.getElementById('totalprice');
for (var i = 0; i < allDevices.length; i++) {
    totalprice+=this.random;
    
}
totalprice.textContent=totalprice();

}
var parent = document.getElementById('table-id');
var table = document.createElement('table');
parent.appendChild(table);
tHead();
function tHead() {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    var th;
    for (var i = 0; i < tHeader.length; i++) {
        th = document.createElement('th');
        th.textContent = tHeader[i];
        tr.appendChild(th);
    }
}
Device.prototype.renerTable = function () {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for (var i = 0; i < allDevices.length; i++) {
    var td1 = document.createElement('td');
    td1.textContent = allDevices[i].name;
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    td2.textContent = allDevices[i].category;
    tr.appendChild(td2);

    var td3 = document.createElement('td');
    td3.textContent = allDevices[i].priceRandom();
    tr.appendChild(td3);
    
    var td4 = document.createElement('td');
    td4.textContent = allDevices[i].quantity;
    tr.appendChild(td4);

    }

}

var form = document.getElementById('form-id');
form.addEventListener('submit', formSubmit);
function formSubmit(event) {
    event.preventDefault();
    var itemName = event.target.itemName.value;
    var categ = event.target.categ.value;
    var quantitiy = event.target.quantitiy.value;
    var devcie = new Device(itemName, categ, quantitiy);
    devcie.priceRandom();
    devcie.renerTable();
localStorage.setItem('devices',JSON.stringify(allDevices));
}
for (var i = 0; i < allDevices.length; i++) {
    allDevices[i].priceRandom();
    allDevices[i].renerTable();
}