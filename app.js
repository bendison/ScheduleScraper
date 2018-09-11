//Schedule Scraper
//Bendison
//Scrapes schedules from the Loblaw schedule website and exports the shift data to either Google Calendar or iCalendar
const puppeteer = require('puppeteer');
var args = require('yargs').argv;

let scrapeLoblaw = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://stas.loblaw.ca/en/badgeid');
    await page.waitFor(1000);

    await page.type('#firstName', args.f);
    await page.type('#lastName', args.l);
    //Puppeteer is weird and won't pass an integer so toString is needed
    await page.type('#badgeId', args.b.toString());
    const navPromise = page.waitForNavigation();    
    await page.click('#main > div > div > div:nth-child(1) > div:nth-child(2) > div > div.btn.clearfix.defaultBtn');
    await navPromise;

    //wait for the React page to load, Loblaw servers are not the best
    await page.waitFor(5000);

    const result = await page.evaluate(() => {
        let data = [];
        let days = document.querySelectorAll('.shiftList');
        let startEnd = document.querySelectorAll('.shiftStartEnd');

        for (i = 0; i < days.length; i++) {
            //all the child nodes
            let dayOfWeek = days[i].children[0].children[0].firstElementChild.textContent;                      
            let dayOfMonth = days[i].children[0].children[0].lastElementChild.textContent;
            let startTime = startEnd[i].childNodes[0].textContent;
            let endTime = startEnd[i].childNodes[4].textContent;
            data.push({dayOfWeek, dayOfMonth, startTime, endTime});
        }        
        return data;
    })

    await browser.close();
    return result;    
}

//TODO: Write scrapeFoodBasics();

if (args.w == null) {
    console.log('No workplace specified. Exiting...');
}
else if (args.w == 'loblaw') {
    console.log('Loblaw selected, logging in.');
    scrapeLoblaw().then((value) => {
        console.log(value)
    });
}
else if (args.w == 'foodbasics') {
    console.log('FoodBasics selected, logging in.');
    //scrapeFoodBasics();
}
else {
    console.log('Workplace specified does not match any available ones. Exiting...');
}