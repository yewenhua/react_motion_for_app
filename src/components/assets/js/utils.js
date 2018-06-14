
export function unixtimefromat(timestamp){
    var dataObj = new Date();
    dataObj.setTime(timestamp);
    var year = dataObj.getFullYear();
    var month = dataObj.getMonth() + 1;
    var monthstr = month < 10 ? ('0' + month) : month;
    var day = dataObj.getDate();
    var daystr = day < 10 ? ('0' + day) : day;
    var hour = dataObj.getHours();
    var hourstr = hour < 10 ? ('0' + hour) : hour;
    var min = dataObj.getMinutes();
    var minstr = min < 10 ? ('0' + min) : min;
    var sec = dataObj.getSeconds();
    var secstr = sec < 10 ? ('0' + sec) : sec;
    var zh_short_date = monthstr + '月' + daystr + '日';
    var hour_min = hourstr + ':' + minstr;
    var fullstr = year + '-' + monthstr + '-' + daystr + ' ' + hourstr + ':' + minstr + ':' + secstr;

    return {
        year: year,
        month: monthstr,
        day: daystr,
        hour: hourstr,
        int_hour: hour,
        min: minstr,
        sec: secstr,
        zh_short_date: zh_short_date,
        hour_min: hour_min,
        all: fullstr
    };
}

export function initHeight(){
    var screenHeight = window.screen.height;
    var PixelRatio = window.devicePixelRatio;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if(isAndroid){
        var viewHeight = screenHeight * PixelRatio - (44 + 20) * PixelRatio;
    }
    else{
        var viewHeight = screenHeight * PixelRatio - (44 + 20) * PixelRatio;
    }

    return {
        viewHeight: viewHeight/2
    }
}