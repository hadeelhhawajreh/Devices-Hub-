'use strict';
var tHeader = [' Decive Name ', ' Quantity', ' unit Price ', ' Category'];
// - Whenever we add a new device, you should generate the device price as
// an integer random number between 350 and 750.

var totalprice = 0;
function Device(name, category, quantity) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.rannd = 0;
    Device.allDevices.push(this);
    localStorage.setItem('all',JSON.stringify(Device.allDevices));

}
Device.allDevices = [];

Device.prototype.priceRandom = function () {
    this.rannd = Math.floor(Math.random() * (750 - 350 + 1) + 350);
    return (this.rannd);
}


Device.prototype.total = function () {
    console.log('inside function ');
    console.log(this.quantity);
    let x = (this.quantity) * (this.priceRandom());
    return x;
}



let table = document.getElementById('table-id');
let tr = document.createElement('tr');

let th = document.createElement('th');
let td = document.createElement('td');
function thead() {
    tr = document.createElement('tr');
    for (let index = 0; index < tHeader.length; index++) {
        th = document.createElement('th');
        th.textContent = tHeader[index];
        tr.appendChild(th);
    }

    table.appendChild(tr);

}
thead();

Device.prototype.tBody= function () {
    console.log('inside body');

    tr = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.textContent = this.name;
    tr.appendChild(td1);
    let td2 = document.createElement('td');
    td2.textContent = this.quantity;
    tr.appendChild(td2);
    let td3 = document.createElement('td');
    td3.textContent = this.total();
    tr.appendChild(td3);
    let td4 = document.createElement('td');
    td4.textContent = this.category;
    tr.appendChild(td4);
    table.appendChild(tr);
}

console.log('Device.allDevices',Device.allDevices);


function renderAll(params) {
    for (let j = 0; j < Device.allDevices.length; j++) {
        Device.allDevices[j].priceRandom();
        Device.allDevices[j].total();
        Device.allDevices[j].tBody();
        
    }
}

renderAll();

let form=document.getElementById('form-id');
form.addEventListener('submit',submitHandler);

function submitHandler(e) {
    e.preventDefault();
    let item=e.target.item.value;
    let cat=e.target.cat.value;
    let qua=e.target.qau.value;
    console.log('form submit',item,cat,Number(qua));
    new Device(item,cat,Number(qua)); 
    table.textContent='';
    thead();
    renderAll();
}

let data=JSON.parse(localStorage.getItem('all'));
console.log(data);
function getFromLS() {
    for (let i = 0; i < data.length; i++) {
       new Device(data[i].name,data[i].category,data[i].quantity)
        
    }
    renderAll();
}
getFromLS();