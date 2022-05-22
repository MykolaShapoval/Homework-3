
var responseResult;

const tableBlock = document.querySelector('#tableList');

async function loadData() {

   const server = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20201021&json'
   const response = await fetch(server);
   responseResult = await response.json();
   if (response.ok) {
      totNumPages();
      change(1);

   } else {
      tableBlock.innerHTML = "eror";
   }
}


var current_page = 1;
var obj_per_page = 5;

function totNumPages() {
   return Math.ceil(responseResult.length / obj_per_page);
}

function prevPage() {
   if (current_page > 1) {
      current_page--;
      change(current_page);
   }
}

function nextPage() {
   if (current_page < totNumPages()) {
      current_page++;
      change(current_page);
   }
}

function change(page) {

   const btn_next = document.getElementById("btn_next");
   const btn_prev = document.getElementById("btn_prev");

   const listing_table = document.getElementById("tableList");

   const page_span = document.getElementById("page");

   table = document.createElement('table');
   const tbody = document.createElement('tbody');

   if (page < 1) page = 1;
   if (page > totNumPages()) page = totNumPages();
   listing_table.innerHTML = "";


   for (var i = (page - 1) * obj_per_page; i < (page * obj_per_page); i++) {

      let row = document.createElement('tr');

      let columnR = document.createElement('td');
      columnR.innerHTML = responseResult[i].r030;

      let columnTxt = document.createElement('td');
      columnTxt.innerHTML = responseResult[i].txt;

      let columnRate = document.createElement('td');
      columnRate.innerHTML = responseResult[i].rate;

      let columnCc = document.createElement('td');
      columnCc.innerHTML = responseResult[i].cc;

      let columnExchangedate = document.createElement('td');
      columnExchangedate.innerHTML = responseResult[i].exchangedate;

      row.appendChild(columnR);
      row.appendChild(columnTxt);
      row.appendChild(columnRate);
      row.appendChild(columnCc);
      row.appendChild(columnExchangedate);

      tbody.appendChild(row);
      table.appendChild(tbody);

      document.getElementById('tableList').appendChild(table);
   }

   page_span.innerHTML = page;

   if (page == 1) {
      btn_prev.style.visibility = "hidden";
   } else {
      btn_prev.style.visibility = "visible";
   }
   if (page == totNumPages()) {
      btn_next.style.visibility = "hidden";
   } else {
      btn_next.style.visibility = "visible";
   }
}

var table;


function sortByIndex(responseResult) {
   const sortIndex =
      responseResult.sort(function (a, b) {
         return a.r030 - b.r030;
      });
   table.innerHTML = '';
   change(1);
   
}




function sortByName(responseResult) {

   const sortIndex =
      responseResult.sort(function (a, b) {
         return a.txt.localeCompare(b.txt);
      });


      table.innerHTML = '';
      change(1);
   
}


function sortByRate(responseResult) {
   const sortIndex =
      responseResult.sort(function (a, b) {
         return a.rate - b.rate;
      });

      table.innerHTML = '';
      change(1);
   }

function sortByAbbr(responseResult) {
   const sortIndex =
      responseResult.sort(function (a, b) {

         if (a.cc > b.cc) {
            return 1;
         }
         if (a.cc < b.cc) {
            return -1;
         }
         return 0;
      });

      table.innerHTML = '';
      change(1);
   }

function sortByDate(responseResult) {
   const sortIndex =
      responseResult.sort(function (a, b) {
         return a.exchangedate - b.exchangedate;
      });

      table.innerHTML = '';
      change(1);
   }

if (tableBlock) {
   loadData();
}
