# ScheduleScraper

Currently there is no way to export schedules from Loblaw or FoodBasics employee websites. This application allows you to export your shifts and add them to widely used calendar applications. ScheduleScraper scrapes schedule information from the Loblaw website and exports the shift data to either Google Calendar or iCalendar compatible formats. 

Running the application
--------------------------
Arguments for your specified workplace, first name, last name, and badge ID # are required when running the application and are entered as follows:

```
node app.js -w loblaw -f John -l Doe -b 1234567
```

Future additions
--------------------------
```
- Add generating and exporting of Google Calendar and iCalendar files
- Add support for FoodBasics employee schedule site
```