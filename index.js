const request = require('request');
const cheerio = require('cheerio');
request.get(
    {   
        url:'http://netflow.stust.edu.tw/test2/usedCalc?_dc=1534325783845&page=1&start=0&limit=25',//網址
        headers: {
            //檔頭標籤
            'Host': 'netflow.stust.edu.tw',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko/20100101 Firefox/61.0',
            'Accept': '*/*',
            'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': 'http://netflow.stust.edu.tw/',
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie': 'PHPSESSID=en5naa0uimp48dfghhk18ece17; php-console-server=100',
            'DNT': '1',
            'Connection': 'keep-alive'
        }
    }, (error, response, body) => { 
            var info = JSON.parse(cheerio.load(body).text()); 
            if (info.data[0].policy != null) {
                console.log("系統提示：" + info.data[0].policy + "\n建議立即更換IP");
            }
            else {
                function GB(cal){ return (cal/1073741824).toFixed(2)};//換算大小用
                console.log("目前IP：" + info.data[0].ip);
                console.log("已使用：" + GB(info.used) + "GB" + ",約"+ Math.round(info.data[0].used) +"%");
                console.log("剩餘：" + GB(info.total - info.used) + "GB");
            }
    }
);