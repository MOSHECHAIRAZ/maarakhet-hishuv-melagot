# 🏗️ ארכיטקטורה - מערכת חישוב מלגות

## סקירה כללית

מערכת עצמאית לחישוב מלגות עם ממשק משתמש תומך וברקאנד משלה.

```
┌─────────────────────────────────────────┐
│  דפדפן ברשת                             │
│  http://localhost:3001                  │
└──────────────────┬──────────────────────┘
                   │
                   ↓
        ┌──────────────────────┐
        │  index.html          │
        │  (Tailwind + JS)     │
        └──────────┬───────────┘
                   │
        ┌──────────↓───────────┐
        │  API Requests        │
        │  /api/scholarships   │
        └──────────┬───────────┘
                   │
                   ↓
        ┌──────────────────────┐
        │  server.js           │
        │  (Express.js)        │
        └──────────┬───────────┘
                   │
                   ↓
        ┌──────────────────────┐
        │  data/               │
        │  scholarships.json   │
        └──────────────────────┘
```

## רכיבים

### 1. Frontend (`index.html`)
- **טכנולוגיה:** HTML5 + CSS (Tailwind) + Vanilla JavaScript
- **אחריות:**
  - ממשק משתמש
  - טעינת קבצי CSV
  - חישוב מלגות
  - הפקת דוחות
  - ניהול היסטוריה
  - ייצוא לקובצים

### 2. Backend (`server.js`)
- **טכנולוגיה:** Node.js + Express.js
- **PORT:** 3001
- **אחריות:**
  - הנפקת קבצים סטטיים
  - API endpoints לנתונים
  - שמירת נתונים
  - טיפול ב-CORS

### 3. Data Storage (`data/`)
- **סוג:** JSON files
- **קבצים:**
  - `scholarships.json` - היסטוריית חישובים
- **מיקום:** `./data/scholarships.json`

## Data Flow

### 1. העלאת קובץ
```
User → Browser → Read CSV → Parse Data → Store in rawStudentData
```

### 2. חישוב
```
CSV Data + Parameters → calculateStipends() → Processed Results → Display
```

### 3. שמירה
```
Processed Data → POST /api/scholarships → Save to scholarships.json
```

### 4. טעינת היסטוריה
```
GET /api/scholarships → Load from scholarships.json → Populate Dropdown → Display
```

## API Endpoints

| Method | Endpoint | תיאור |
|--------|----------|------|
| POST | `/api/scholarships` | שמירת חישוב חדש |
| GET | `/api/scholarships` | קבלת כל החישובים |
| GET | `/api/scholarships/:id` | קבלת חישוב ספציפי |
| POST | `/api/scholarships-batch` | שמירת קבוצה |

## חישוב מלגה - לוגיקה

```
1. Parser CSV → Extract attendance data
2. Aggregate → Group by student and date
3. Calculate → Daily value based on time slots
   - Prime hour: 50% of daily rate
   - Regular hours: 25% of daily rate each
4. Weekly Bonus → 5+ days in week = bonus
5. Total → Base stipend + Bonus stipend
```

## קובץ CSV - דוגמה

```csv
ID	FirstName	LastName	Arrival	Departure
123	יוחנן	כהן	15/7/2025 02:00	15/7/2025 05:00
456	דוד	לוי	15/7/2025 01:45	15/7/2025 04:00
```

## State Management

### LocalStorage
- היסטוריית חישובים (אם צריך)
- הגדרות משתמש (פרמטרים אחרונים)

### Server
- כל החישובים בקובץ JSON
- ניתן לגישה דרך API

## Ports

| Service | Port | Protocol |
|---------|------|----------|
| Scholarship Server | 3001 | HTTP |
| Static Files | 3001 | HTTP |

## Files Structure

```
מערכת חישוב מלגות/
├── index.html              # Frontend
├── server.js               # Backend
├── package.json            # Dependencies
├── README.md               # Documentation
├── SETUP.md                # Quick start
├── ARCHITECTURE.md         # This file
├── start.bat               # Batch runner
├── .gitignore              # Git config
├── data/
│   └── scholarships.json   # Database
└── CSV files & PDFs        # Data & Reports
```

## Security Notes

⚠️ **Development Only** - לשימוש מקומי בלבד

- ✅ CORS מופעל - לשימוש בדפדפן מקומי
- ✅ No authentication - מסביבה מקומית
- ⚠️ JSON files - No encryption - שמור נתונים רגישים

## Performance

- **Load Time:** < 1 second
- **Calculation:** Instant
- **Storage:** Limited by local disk
- **Users:** Single local user

## Future Enhancements

- [ ] Multi-user support
- [ ] Database integration (MongoDB/MySQL)
- [ ] Advanced reports
- [ ] Export to Excel
- [ ] Bulk operations
- [ ] User authentication

---

**Version:** 1.0.0
**Last Updated:** December 2025
