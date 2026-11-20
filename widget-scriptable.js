// Life Countdown widget for the free Scriptable app on iPhone.
// 1. Change BIRTH and TARGET_AGE below.
// 2. Paste this into a new script in Scriptable.
// 3. Add a Scriptable widget to your home screen and pick this script.

var BIRTH = "1996-05-10";   // your birth date, YYYY-MM-DD
var TARGET_AGE = 80;

var DAY = 86400000, YEAR = 365.25 * DAY, WEEK = 7 * DAY;
var birth = new Date(BIRTH + "T00:00:00");
var end = new Date(birth);
end.setFullYear(birth.getFullYear() + TARGET_AGE);
var now = new Date();
var left = Math.max(0, end - now);
var years = Math.floor(left / YEAR);
var days = Math.floor((left - years * YEAR) / DAY);
var pct = Math.min(100, (now - birth) / (end - birth) * 100);

var w = new ListWidget();
var g = new LinearGradient();
g.colors = [new Color("#000000"), new Color("#1d1d1f")];
g.locations = [0, 1];
w.backgroundGradient = g;

var label = w.addText("TIME LEFT TO USE");
label.font = Font.semiboldSystemFont(11);
label.textColor = new Color("#86868b");
w.addSpacer(6);

var big = w.addText(years + "y " + days + "d");
big.font = Font.boldSystemFont(30);
big.textColor = Color.white();
big.minimumScaleFactor = 0.5;
w.addSpacer(4);

var small = w.addText(Math.floor(left / WEEK).toLocaleString() + " weeks left");
small.font = Font.systemFont(12);
small.textColor = new Color("#a1a1a6");
w.addSpacer(10);

// Progress bar: % of life lived
var dc = new DrawContext();
dc.size = new Size(300, 10);
dc.opaque = false;
dc.respectScreenScale = true;
var bg = new Path();
bg.addRoundedRect(new Rect(0, 0, 300, 10), 5, 5);
dc.addPath(bg); dc.setFillColor(new Color("#3a3a3c")); dc.fillPath();
var fg = new Path();
fg.addRoundedRect(new Rect(0, 0, Math.max(10, 300 * pct / 100), 10), 5, 5);
dc.addPath(fg); dc.setFillColor(new Color("#0071e3")); dc.fillPath();
w.addImage(dc.getImage());
w.addSpacer(4);

var p = w.addText((100 - pct).toFixed(1) + "% still yours");
p.font = Font.systemFont(11);
p.textColor = new Color("#86868b");

w.refreshAfterDate = new Date(Date.now() + 30 * 60 * 1000); // iOS refreshes widgets roughly every 15-30 min

if (config.runsInWidget) { Script.setWidget(w); } else { w.presentSmall(); }
Script.complete();
