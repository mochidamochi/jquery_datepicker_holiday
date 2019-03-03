//祝日読み取り
var holidays = [];
let req = new XMLHttpRequest();
req.open("get", "https://cdn.glitch.com/18e5cac7-d297-4aa5-ad0d-ac8656c50ae6%2Fsyukujitsu.csv?1549949743596", true);
req.overrideMimeType('text/plain; charset=Shift_JIS');
req.send(null);

req.onload = function(){
  holidays = convertCSVtoArray(req.responseText);
}
req.onerror = function() {
  alert('失敗しました');
  window.stop();
}

function convertCSVtoArray(str){
	let tmp = str.split("\n");
	tmp.shift();
	let result = [];
	let date = "";

	for(let i=0;i<tmp.length;i++){
	  if(!tmp[i]) continue;
	  result[i] = tmp[i].split(',');
	  date = new Date(result[i][0]);
	  result[i][0] = getDayStr(date)
	}
  
	return result;
};

function getDayStr(date){
  let yy = date.getFullYear();
  let mm = ("0" + (date.getMonth() + 1)).slice(-2);
  let dd = ("0" + date.getDate()).slice(-2);
  return yy + '/' + mm + '/' + dd;
}

$(document).ready(function(){
  function isHoliday(dayStr){
    for(let i=0;i<holidays.length;i++){
      if(holidays[i][0] === dayStr){
        return true;
      }
    }
    return false;
  }
  
  $( "#datepicker" ).datepicker({
    beforeShowDay: function(date) {
      let disSunday = date.getDay() != 0;
      if(!disSunday || isHoliday(getDayStr(date))){
        return [true,"ui-test"];
      }
      return [true]
    }
  });
});