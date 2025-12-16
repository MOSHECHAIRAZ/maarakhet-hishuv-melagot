# 🎯 Quick Reference - מערכת חישוב מלגות

## 📱 התחלה מהירה

```bash
# חד-פעמי בלבד
npm install

# כל פעם שתרצה להפעיל
npm start

# אתח בדפדפן
http://localhost:3001
```

---

## 📂 מבנה תיקייה

```
מערכת חישוב מלגות/
├── 📄 index.html          ← ממשק (טוען ב-http://localhost:3001)
├── 🖥️ server.js            ← שרת Node.js
├── 📦 package.json         ← תלויות
├── 📁 data/                ← DB (JSON files)
│   └── scholarships.json
├── 📘 README.md            ← תיעוד
├── 📖 SETUP.md             ← התחלה
├── 🏗️ ARCHITECTURE.md      ← מבנה טכני
├── 🔧 TROUBLESHOOTING.md   ← בעיות
├── ✅ CHECKLIST.md          ← בדיקות
└── 📝 SUMMARY.md           ← סיכום
```

---

## 🎮 שימוש

### פרק 1: עלייה (Upload)
1. גרור קובץ CSV או בחר בקליק
2. בדוק שהשם הופיע

### פרק 2: הגדרות (Settings)
1. סכום מלגה חודשית (ברירת מחדל 1500₪)
2. ימי לימוד בחודש (ברירת מחדל 22)
3. תקופות זמנים (option)

### פרק 3: חישוב (Calculate)
1. לחץ "חשב מלגות"
2. חכה עד לתוצאות
3. ראה את התוצאות בטבלה

### פרק 4: שמירה (Save)
1. לחץ כפתור "שמור" (ירוק)
2. חישוב יישמר בהיסטוריה

### פרק 5: הדוחות (Reports)
1. "ייצא ל-CSV" - לקובץ Excel
2. "הפקת דוחות" - להדפסה

---

## 📊 API Endpoints

| Method | Path | תיאור |
|--------|------|-------|
| POST | /api/scholarships | שמור |
| GET | /api/scholarships | קבל הכל |
| GET | /api/scholarships/:id | קבל אחד |

---

## 🐛 בעיות נפוצות

| בעיה | פתרון |
|------|--------|
| Port 3001 תפוס | `npm stop` ואז `npm start` |
| CSV לא טוען | בדוק format (TSV, not CSV) |
| Blank page | Ctrl+F5 refresh |
| No history | בדוק data/scholarships.json |

---

## 📋 CSV Format

```
ID	FirstName	LastName	Arrival	Departure
123	שם	משפחה	15/7/2025 02:00	15/7/2025 05:00
```

**חיוני:**
- Tab-separated (לא comma!)
- תאריך: DD/MM/YYYY
- זמן: HH:MM

---

## 💾 Data Location

```
מערכת חישוב מלגות/data/scholarships.json
```

**Structure:**
```json
{
  "scholarships": [
    {
      "id": "sch_...",
      "user_id": "default",
      "month": "2025-12",
      "amount": 5250.75,
      "details": {...},
      "timestamp": "2025-12-16T..."
    }
  ]
}
```

---

## 🔑 Key Features

✅ CSV import
✅ Auto calculation
✅ Weekly bonus
✅ History tracking
✅ Report generation
✅ Export to CSV
✅ Offline capable
✅ Local storage

---

## 🆘 Help

| Need | File |
|------|------|
| Quick start | SETUP.md |
| Full docs | README.md |
| Architecture | ARCHITECTURE.md |
| Fix issues | TROUBLESHOOTING.md |
| Verify all | CHECKLIST.md |

---

## ⌨️ Commands

```bash
npm install          # Install dependencies
npm start            # Start server
npm stop             # Stop server
npm --version        # Check npm version
node --version       # Check Node version
```

---

## 🌐 Ports & URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3001 | 3001 |
| API | http://localhost:3001/api/... | 3001 |

---

## 🎓 Calculation Formula

```
Daily Rate = Monthly Stipend ÷ Workable Days

Base Stipend:
- Hour 1: 50% of daily rate
- Hours 2-3: 25% each

Bonus:
- 5 days present = bonus
```

---

## 📞 Emergency Commands

```bash
# Kill process on port 3001 (Windows)
netstat -ano | findstr :3001
taskkill /PID <number> /F

# Kill process on port 3001 (Mac/Linux)
lsof -i :3001
kill -9 <PID>

# Clean install
rm -rf node_modules
rm package-lock.json
npm install
```

---

## ✨ System Status

- **Status:** ✅ READY
- **Stability:** ✅ STABLE
- **Documentation:** ✅ COMPLETE
- **Independence:** ✅ FULL

---

**Last Updated:** December 16, 2025
**Version:** 1.0.0
