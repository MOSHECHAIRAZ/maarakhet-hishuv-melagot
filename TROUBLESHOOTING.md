# 🔧 פתרון בעיות - מערכת חישוב מלגות

## בעיות נפוצות וזה הפתרון

### ❌ "Cannot find module 'express'"

**סיבה:** npm packages לא התקנו

**פתרון:**
```bash
npm install
```

---

### ❌ "Port 3001 is already in use"

**סיבה:** תהליך אחר משתמש בפורט

**פתרון (Windows):**
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**פתרון (Mac/Linux):**
```bash
lsof -i :3001
kill -9 <PID>
```

---

### ❌ "Cannot GET /"

**סיבה:** Server לא משרת קבצים סטטיים

**פתרון:** ודא שאתה בתיקייה הנכונה:
```bash
cd "מערכת חישוב מלגות"
npm start
```

---

### ❌ "Cannot read CSV file"

**סיבה:** הקובץ בעל פורמט שגוי

**דרישות CSV:**
- Tab-separated (TSV format)
- 5 עמודות לפחות:
  1. ID (מספר)
  2. שם פרטי
  3. שם משפחה
  4. זמן כניסה (HH:MM)
  5. זמן יציאה (HH:MM)

**דוגמה:**
```
123	יוחנן	כהן	15/7/2025 02:00	15/7/2025 05:00
```

---

### ❌ "API endpoint not responding"

**סיבה:** Server לא רץ או כתובת שגויה

**בדוק:**
1. האם ה-server פעיל? (בקונסולה צריך לראות "✅ Scholarship Calculator Server running")
2. הקובץ index.html משתמש ב-http://localhost:3001?

---

### ❌ "Data not saving"

**סיבה:** בעיה בהרשאות או בנתיב

**בדוק:**
1. האם תיקייה `data/` קיימת?
2. האם יש הרשאות כתיבה?
3. בדוק console errors בדפדפן (F12)

**פתרון:**
```bash
# טוען ידנית את התיקייה
mkdir data
```

---

### ❌ "Cannot find port 3001"

**סיבה:** Port שגוי בקובץ HTML או server.js

**בדוק:**
- `server.js` → `const PORT = 3001;`
- `index.html` → `http://localhost:3001/api/scholarships`

---

### ❌ "History not loading"

**סיבה:** קובץ `scholarships.json` ריק או שגוי

**בדוק:**
```bash
cat data/scholarships.json
```

צריך להיראות:
```json
{
  "scholarships": []
}
```

**פתרון:** אתחל מחדש:
```bash
npm start
```

---

### ❌ "Browser shows blank page"

**סיבה:** קובץ index.html לא נטען

**בדוק:**
1. בדוק console (F12) - יש errors?
2. בדוק Network tab - עמוד נטען?
3. refresh (Ctrl+F5)

---

### ❌ "Calculation results show NaN"

**סיבה:** נתונים בקובץ CSV בפורמט שגוי

**פתרון:**
1. ודא שתאריך בפורמט: DD/MM/YYYY
2. ודא שזמן בפורמט: HH:MM
3. ודא שמספרים תקינים

---

### ❌ "Cannot export to CSV"

**סיבה:** קובץ לא משתמר כראוי

**בדוק:**
1. יש תוצאות חישוב?
2. לחץ כפתור "Export"
3. אם עדיין בעיה - תלוי בדפדפן

**פתרון:** נסה דפדפן אחר (Chrome, Firefox)

---

### ❌ CORS Errors

**סיבה:** בקשה מ-domain אחר

**בדוק:**
- הקובץ index.html תומך ב-CORS? ✅ כן

**אם בעיה:**
```javascript
// בקובץ server.js זה כבר מכוסה:
res.header('Access-Control-Allow-Origin', '*');
```

---

## Commands - עזרה בעדכון

### Install dependencies
```bash
npm install
```

### Start server
```bash
npm start
```

### Kill process
```bash
npm stop
```

### Check logs
```bash
# תראה console הודעות בזמן ריצה
```

### Clear data
```bash
# מחק את data/scholarships.json
# restart server
```

---

## לוגיסטיקה

### File Locations
```
קבצי CSV:     בתיקייה הראשית או subdirectory
Scholarships: data/scholarships.json
Logs:         Console של node.js
```

### Ports
- **3001** - Scholarship Calculator (main)
- Port אחר פנוי? שנה ב-server.js

---

## עצות שימושיות

✅ **Always save calculations** - לא תאבד נתונים
✅ **Backup data folder** - שמור עותק לבטחון
✅ **Use consistent CSV format** - לא תהיו errors
✅ **Check browser console** - F12 למידע יתר

---

## Still not working?

1. בדוק את NODE version: `node --version`
2. בדוק את NPM version: `npm --version`
3. נקה ו-restart:
   ```bash
   npm install
   npm start
   ```
4. Restart המחשב (אם צריך)

---

**Need Help?** בדוק את README.md ו-ARCHITECTURE.md לפרטים נוספים.
