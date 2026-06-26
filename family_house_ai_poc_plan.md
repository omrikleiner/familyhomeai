# Family House AI — תכנית פעולה לבניית POC לאפליקציית ווב

מסמך זה מיועד לסוכן קוד / Copilot Agent שצריך לבצע את המשימה בצורה ישירה, בלי להמציא מוצר חדש ובלי להתרחב מעבר ל־POC.

## 1. מטרת ה־POC

לבנות אפליקציית ווב בשם **Family House AI** שמרכזת למשפחה במקום אחד:

- אירועים קרובים
- מטלות משפחתיות
- רשימת קניות
- פרופיל משפחתי
- עוזר AI בסיסי שמקבל טקסט חופשי ומציע להפוך אותו למטלה / אירוע / פריט קניות

ה־POC צריך להיות מוצר דמו עובד, לא מערכת מלאה לפרודקשן.

## 2. פירוש הסקיצה המצורפת

הסקיצה מתארת דף בית ראשי:

- מסגרת כללית של אפליקציה.
- בצד שמאל תפריט ניווט אנכי.
- במרכז מקום ללוגו / שם האפליקציה.
- בצד ימין אזור כרטיסים, למשל:
  - מטלות שלי
  - רשימת קניות
- בחלק העליון כותרת / אזור פרופיל, כנראה פרופיל של בן משפחה, לדוגמה עומרי.

ה־POC צריך לקחת את הסקיצה הזו ולהפוך אותה לדשבורד משפחתי ברור ושמיש.

## 3. Scope של ה־POC

### בתוך ה־POC

1. דף בית / Dashboard.
2. תפריט צד שמאל.
3. כרטיסי מידע:
   - אירועים קרובים
   - מטלות שלי
   - רשימת קניות
   - בני משפחה
4. אפשרות להוסיף מטלה.
5. אפשרות לסמן מטלה כהושלמה.
6. אפשרות להוסיף פריט קניות.
7. אפשרות לסמן פריט קניות כנקנה.
8. אפשרות להוסיף אירוע משפחתי.
9. שמירת מידע ב־LocalStorage.
10. עוזר AI בסיסי:
    - Textbox שבו המשתמש כותב בקשה בעברית.
    - כפתור “נתח בקשה”.
    - המערכת מזהה בצורה פשוטה אם מדובר במטלה / אירוע / קניות.
    - המערכת מציעה למשתמש לאשר הוספה.

### מחוץ ל־POC

לא לממש כרגע:

- Login / הרשאות.
- Backend אמיתי.
- Database אמיתי.
- אינטגרציה אמיתית עם Google Calendar.
- Notification push.
- Mobile app native.
- תשלומים.
- ניהול הרשאות מתקדם לפי הורה / ילד.
- AI אמיתי דרך API, אלא אם יש זמן בסוף.

## 4. טכנולוגיה מומלצת

לבנות כאפליקציית Frontend בלבד.

Stack מומלץ:

- React
- TypeScript
- Vite
- CSS רגיל או CSS Modules
- LocalStorage לשמירת State

לא להשתמש ב־backend בשלב הזה.

## 5. פקודות הקמה

```bash
npm create vite@latest family-house-ai -- --template react-ts
cd family-house-ai
npm install
npm run dev
```

## 6. מבנה תיקיות נדרש

```text
src/
  App.tsx
  main.tsx
  styles/
    global.css
  components/
    Sidebar.tsx
    Header.tsx
    DashboardCard.tsx
    TasksCard.tsx
    ShoppingListCard.tsx
    EventsCard.tsx
    FamilyMembersCard.tsx
    AiAssistantCard.tsx
  data/
    seedData.ts
  types/
    models.ts
  services/
    storageService.ts
    aiParserService.ts
```

## 7. מודל נתונים

ליצור את הקובץ `src/types/models.ts`.

```ts
export type FamilyMemberRole = 'parent' | 'child' | 'other';

export interface FamilyMember {
  id: string;
  name: string;
  role: FamilyMemberRole;
  avatarEmoji: string;
}

export type TaskStatus = 'open' | 'done';

export interface FamilyTask {
  id: string;
  title: string;
  assignedToMemberId: string;
  dueDate?: string;
  status: TaskStatus;
}

export interface ShoppingItem {
  id: string;
  title: string;
  quantity?: string;
  isPurchased: boolean;
}

export interface FamilyEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
}

export type AiIntent = 'task' | 'shopping' | 'event' | 'unknown';

export interface AiSuggestion {
  intent: AiIntent;
  title: string;
  confidence: number;
  rawText: string;
}
```

## 8. Seed Data

ליצור את הקובץ `src/data/seedData.ts` עם מידע ראשוני לדמו.

דוגמאות תוכן:

### בני משפחה

| שם | תפקיד | Avatar |
|---|---|---|
| עומרי | ילד | 🧒 |
| אמא | הורה | 👩 |
| אבא | הורה | 👨 |
| נועה | ילדה | 👧 |

### מטלות

| מטלה | אחראי | תאריך | סטטוס |
|---|---|---|---|
| להוציא את הכלב | עומרי | היום | פתוחה |
| לסדר חדר | עומרי | היום | פתוחה |
| להוריד כביסה | אמא | מחר | פתוחה |

### קניות

| פריט | כמות | סטטוס |
|---|---|---|
| חלב | 2 | לא נקנה |
| ביצים | 12 | לא נקנה |
| לחם | 1 | נקנה |

### אירועים

| אירוע | תאריך | שעה | מיקום |
|---|---|---|---|
| חוג כדורגל | היום | 17:00 | מגרש שכונתי |
| ביקור אצל סבתא | שישי | 18:30 | באר שבע |
| יום הולדת לנועה | שבת | 11:00 | בית |

## 9. LocalStorage

ליצור את `src/services/storageService.ts`.

דרישות:

- קריאה מ־LocalStorage.
- כתיבה ל־LocalStorage.
- אם אין מידע קיים, להשתמש ב־Seed Data.
- להחזיר אובייקט אחד שמכיל:
  - familyMembers
  - tasks
  - shoppingItems
  - events

```ts
export const STORAGE_KEY = 'family-house-ai-state';
```

פונקציות נדרשות:

```ts
export function loadAppState(): AppState;
export function saveAppState(state: AppState): void;
```

להגדיר `AppState` בקובץ המודלים או בתוך הקובץ הזה.

## 10. Layout כללי

### App Shell

המסך צריך להיות RTL.

מבנה הדף:

1. Sidebar קבוע בצד שמאל.
2. אזור תוכן ראשי.
3. Header עליון.
4. Grid של כרטיסים.

### Sidebar

פריטי תפריט:

- בית
- פרופיל משפחתי
- אירועים
- מטלות
- קניות
- עוזר AI
- הגדרות

ב־POC אין צורך ב־routing אמיתי. לחיצה על פריט יכולה רק לסמן אותו כ־active.

### Header

להציג:

- שם האפליקציה: Family House AI
- טקסט משנה: הבית המשפחתי החכם שלך
- פרופיל נוכחי: עומרי

### Dashboard Cards

להציג 5 כרטיסים:

1. מטלות שלי
2. רשימת קניות
3. אירועים קרובים
4. בני משפחה
5. עוזר AI משפחתי

## 11. רכיבים לפיתוח

### `DashboardCard.tsx`

רכיב Card גנרי.

Props:

```ts
interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}
```

### `TasksCard.tsx`

דרישות:

- להציג רשימת מטלות.
- להציג מי אחראי על כל מטלה.
- להציג תאריך יעד אם קיים.
- Checkbox לסימון השלמה.
- Input להוספת מטלה חדשה.
- Select לבחירת בן משפחה אחראי.
- כפתור “הוסף מטלה”.

Acceptance:

- כאשר מוסיפים מטלה, היא מופיעה מיידית ברשימה.
- כאשר מסמנים מטלה כהושלמה, הסטטוס משתנה ונשמר.
- אחרי Refresh המידע נשמר.

### `ShoppingListCard.tsx`

דרישות:

- להציג רשימת קניות.
- Checkbox לסימון פריט כנקנה.
- Input לשם פריט.
- Input אופציונלי לכמות.
- כפתור “הוסף לקניות”.

Acceptance:

- פריט חדש מתווסף לרשימה.
- פריט שנקנה מסומן ויזואלית.
- אחרי Refresh המידע נשמר.

### `EventsCard.tsx`

דרישות:

- להציג אירועים קרובים.
- לאפשר הוספת אירוע חדש.
- שדות:
  - שם אירוע
  - תאריך
  - שעה
  - מיקום
- כפתור “הוסף אירוע”.

Acceptance:

- אירוע חדש מופיע ברשימה.
- האירועים מסודרים לפי תאריך.
- אחרי Refresh המידע נשמר.

### `FamilyMembersCard.tsx`

דרישות:

- להציג בני משפחה עם שם, תפקיד ו־emoji.
- אין צורך בעריכה ב־POC.

### `AiAssistantCard.tsx`

דרישות:

- Textarea שבו המשתמש כותב בקשה בעברית.
- כפתור “נתח בקשה”.
- הצגת הצעה:
  - סוג: מטלה / קניות / אירוע / לא ידוע
  - כותרת שהמערכת חילצה
  - רמת ביטחון
- כפתור “אשר והוסף”.
- לפי הסוג, להוסיף לרשימה המתאימה.

דוגמאות קלט שה־POC צריך לתמוך בהן:

| קלט משתמש | תוצאה רצויה |
|---|---|
| תוסיף לקניות חלב וביצים | פריט קניות |
| להזכיר לעומרי לסדר את החדר | מטלה |
| מחר ב־17:00 חוג כדורגל | אירוע |
| צריך לקנות לחם | פריט קניות |
| ביום שישי הולכים לסבתא | אירוע |

## 12. Parser פשוט ל־AI

ליצור את `src/services/aiParserService.ts`.

ב־POC לא צריך לקרוא ל־OpenAI API. צריך לבנות Parser פשוט מבוסס חוקים.

חוקים:

- אם הטקסט מכיל “לקנות”, “קניות”, “סופר”, “חלב”, “לחם”, “ביצים” → shopping.
- אם הטקסט מכיל “להזכיר”, “מטלה”, “צריך לעשות”, “לסדר”, “להוציא” → task.
- אם הטקסט מכיל “מחר”, “היום”, “ביום”, שעה בפורמט `17:00`, “חוג”, “אירוע”, “יום הולדת” → event.
- אם אין זיהוי → unknown.

פונקציה נדרשת:

```ts
export function parseFamilyRequest(text: string): AiSuggestion;
```

הפונקציה צריכה להחזיר confidence:

- 0.85 אם יש התאמה חזקה.
- 0.6 אם יש התאמה חלקית.
- 0.2 אם לא ידוע.

## 13. עיצוב UI

דרישות עיצוב:

- RTL מלא.
- עיצוב נקי, משפחתי, מודרני.
- רקע בהיר.
- כרטיסים עם border-radius.
- Sidebar עם צבע רקע מעט שונה.
- כפתורים ברורים.
- Layout רספונסיבי בסיסי:
  - Desktop: Sidebar + cards grid.
  - Mobile: Sidebar הופך לאזור עליון או מוסתר בצורה פשוטה.

אין צורך להשתמש בספריית UI חיצונית.

## 14. התנהגות State ב־`App.tsx`

`App.tsx` צריך להחזיק את כל ה־state המרכזי:

- familyMembers
- tasks
- shoppingItems
- events
- activeMenuItem

בכל שינוי ב־state צריך לקרוא ל־`saveAppState`.

אפשר להשתמש ב־`useEffect`.

## 15. שלבי ביצוע לסוכן

### Phase 1 — Project Setup

1. ליצור פרויקט Vite React TypeScript.
2. לנקות קבצי דמו מיותרים.
3. להגדיר RTL ב־`index.html` או ב־CSS.
4. ליצור מבנה תיקיות לפי סעיף 6.

Definition of Done:

- האפליקציה עולה עם `npm run dev`.
- אין שגיאות TypeScript.

### Phase 2 — Data Model and Storage

1. ליצור `models.ts`.
2. ליצור `seedData.ts`.
3. ליצור `storageService.ts`.
4. לבדוק טעינה ושמירה מול LocalStorage.

Definition of Done:

- אחרי Refresh הנתונים נשמרים.
- אם LocalStorage ריק, נטענים נתוני דמו.

### Phase 3 — Layout and Static UI

1. ליצור Sidebar.
2. ליצור Header.
3. ליצור DashboardCard.
4. לבנות Grid ראשי.
5. להציג נתוני Seed בצורה סטטית.

Definition of Done:

- המסך דומה לרעיון בסקיצה.
- יש תפריט שמאלי.
- יש לוגו / שם אפליקציה במרכז העליון.
- יש כרטיסים של מטלות, קניות, אירועים ובני משפחה.

### Phase 4 — CRUD בסיסי

1. הוספת מטלה.
2. סימון מטלה כהושלמה.
3. הוספת פריט קניות.
4. סימון פריט קניות כנקנה.
5. הוספת אירוע.
6. שמירה אוטומטית ל־LocalStorage.

Definition of Done:

- כל פעולה עובדת מה־UI.
- אין צורך לפתוח Console כדי להשתמש באפליקציה.
- הנתונים נשמרים אחרי Refresh.

### Phase 5 — AI Assistant Mock

1. ליצור Parser מבוסס חוקים.
2. לחבר אותו ל־AiAssistantCard.
3. להציג הצעה למשתמש.
4. לאפשר אישור הוספה.
5. להוסיף את הפריט לרשימה המתאימה.

Definition of Done:

- המשתמש יכול לכתוב “צריך לקנות חלב”.
- המערכת מזהה קניות.
- המשתמש מאשר.
- חלב נוסף לרשימת הקניות.

### Phase 6 — Polish and Demo Readiness

1. לשפר מרווחים, צבעים וטיפוגרפיה.
2. לוודא שהאפליקציה נראית טוב במסך מחשב.
3. לוודא שאין שגיאות Console.
4. להוסיף Empty States.
5. להוסיף README קצר.

Definition of Done:

- אפשר להציג את ה־POC בפגישה.
- כל הזרימות המרכזיות עובדות.

## 16. Acceptance Criteria כלליים

ה־POC ייחשב מוכן כאשר:

1. יש דף בית פעיל בשם Family House AI.
2. יש Sidebar עם פריטי ניווט.
3. יש כרטיס מטלות עובד.
4. יש כרטיס קניות עובד.
5. יש כרטיס אירועים עובד.
6. יש כרטיס בני משפחה.
7. יש עוזר AI בסיסי שמזהה לפחות 3 סוגי בקשות.
8. המידע נשמר ב־LocalStorage.
9. האפליקציה עובדת ב־RTL.
10. אין שגיאות TypeScript או Runtime.

## 17. בדיקות ידניות

לבצע את הבדיקות הבאות לפני סיום:

| מספר | בדיקה | תוצאה צפויה |
|---|---|---|
| 1 | פתיחת האפליקציה | הדשבורד נטען |
| 2 | הוספת מטלה לעומרי | המטלה מופיעה בכרטיס מטלות |
| 3 | סימון מטלה כהושלמה | המטלה מסומנת כבוצעה |
| 4 | Refresh לדף | המטלה עדיין קיימת |
| 5 | הוספת חלב לקניות | חלב מופיע ברשימת הקניות |
| 6 | סימון חלב כנקנה | חלב מסומן כנקנה |
| 7 | הוספת אירוע | האירוע מופיע בכרטיס אירועים |
| 8 | כתיבה לעוזר AI: צריך לקנות לחם | המערכת מזהה shopping |
| 9 | אישור הצעת AI | לחם נוסף לקניות |
| 10 | פתיחה במובייל | המסך עדיין שמיש |

## 18. README נדרש

בסוף הפיתוח ליצור `README.md` עם:

```md
# Family House AI POC

A web-based proof of concept for managing family tasks, events, shopping items, and simple AI-assisted family requests.

## Run locally

npm install
npm run dev

## Main features

- Family dashboard
- Tasks management
- Shopping list
- Upcoming events
- Family members
- Rule-based AI assistant mock
- LocalStorage persistence
```

## 19. הנחיות חשובות לסוכן

- לא להוסיף Backend.
- לא להוסיף Authentication.
- לא להוסיף ספריות UI כבדות.
- לא לבנות מערכת מושלמת; לבנות POC עובד וברור.
- לא לשבור את ה־RTL.
- לא להחליף את שם המוצר.
- לא להמציא פיצ׳רים גדולים שלא מופיעים במסמך.
- כל שינוי צריך להשאיר את האפליקציה רצה.
- לאחר כל Phase להריץ בדיקה מקומית.

## 20. שדרוגים אופציונליים רק אם נשאר זמן

רק אחרי שכל ה־POC עובד:

1. פילטר לפי בן משפחה.
2. Drag and drop למטלות.
3. Dark mode.
4. חיבור אמיתי ל־OpenAI API.
5. חיבור עתידי ל־Google Calendar.
6. Notifications בדפדפן.

## 21. סיכום קצר לביצוע

לבנות אפליקציית React Web בשם **Family House AI** שמציגה דשבורד משפחתי לפי הסקיצה: תפריט צד, כותרת / לוגו, כרטיסי מטלות, קניות, אירועים, בני משפחה ועוזר AI בסיסי. כל המידע נשמר ב־LocalStorage. אין Backend. אין Login. המטרה היא דמו עובד שאפשר להציג ולהמשיך ממנו למוצר אמיתי.
