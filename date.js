// 1. 2022-03-23  周三
// 月份  01 02 03 04  05  06  07 08 09  10  11  12
// 天数  31 28 31 30  31  30  31 31 30  31  30  31

// 月份天数合集
let data = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let getWeek = makeDate(data, "2022-03-23", 3);
// console.log(getWeek("2022-03-20"));
// console.log(getWeek("2022-03-21"));
// console.log(getWeek("2022-03-22"));
console.log(getWeek("2022-02-23"));
console.log(getWeek("2022-03-23"));
console.log(getWeek("2022-03-24"));
console.log(getWeek("2022-03-25"));
console.log(getWeek("2022-03-26"));
console.log(getWeek("2022-03-27"));
console.log(getWeek("2022-03-28"));
console.log(getWeek("2022-03-29"));
console.log(getWeek("2022-03-30"));
console.log(getWeek("2022-03-31"));
console.log(getWeek("2022-04-01"));
console.log(getWeek("2022-04-02"));
console.log(getWeek("2022-04-03"));

function makeDate(data, date, week) {
  //获取需要设置的天数是当前年的第几天
  const dayNum = getDay(data, date);

  return function (currentDate) {
    let newDay = getDay(data, currentDate, week);
    let difference = newDay - dayNum;

    if (difference > 0) {
      newWeek = (difference % 7) + week;
      if (newWeek > 7) {
        newWeek = newWeek % 7;
      }
    } else if (difference === 0) {
      newWeek = week;
    } else {
      newWeek = 7 - Math.abs(difference % 7) + week;

      if (newWeek > 7) {
        newWeek = newWeek % 7;
      }
    }

    let weekStr = null;
    switch (newWeek) {
      case 0:
        weekStr = "周日";
        break;
      case 1:
        weekStr = "周一";
        break;
      case 2:
        weekStr = "周二";
        break;
      case 3:
        weekStr = "周三";
        break;
      case 4:
        weekStr = "周四";
        break;
      case 5:
        weekStr = "周五";
        break;
      case 6:
        weekStr = "周六";
        break;
      case 7:
        weekStr = "周日";
        break;
    }
    if (weekStr === null) {
      throw Error("报错了");
    } else {
      return weekStr;
    }
  };
}

//设置某天是周几 ，返回某天是某年的第几天
function getDay(data, date) {
  let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
  if (reg.test(date)) {
    //获取月
    let month = RegExp.$2;
    //获取日
    let day = RegExp.$3;
    day = day.startsWith("0") ? Number(day.slice(1, 2)) : Number(day);
    month = month.startsWith("0") ? Number(month.slice(1, 2)) : Number(month);

    //当前日期是当前年第几天
    let dayNum = day;
    for (let i = 0; i < month - 1; i++) {
      dayNum = dayNum + data[i];
    }
    return dayNum;
  } else {
    throw Error("日期格式不正确");
  }
}
