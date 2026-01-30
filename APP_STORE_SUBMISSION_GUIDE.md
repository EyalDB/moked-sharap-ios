# מדריך העלאת אפליקציה לחנות אפל (App Store) עם Capacitor

## מדריך מלא ומפורט בעברית

---

## תוכן עניינים

1. [דרישות מקדימות](#1-דרישות-מקדימות)
2. [הרשמה לתוכנית המפתחים של אפל](#2-הרשמה-לתוכנית-המפתחים-של-אפל)
3. [הכנת הפרויקט](#3-הכנת-הפרויקט)
4. [הגדרות ב-Xcode](#4-הגדרות-ב-xcode)
5. [יצירת Privacy Manifest](#5-יצירת-privacy-manifest)
6. [יצירת רשומה ב-App Store Connect](#6-יצירת-רשומה-ב-app-store-connect)
7. [יצירת Archive והעלאה](#7-יצירת-archive-והעלאה)
8. [הגשה לבדיקה](#8-הגשה-לבדיקה)
9. [בדיקות TestFlight](#9-בדיקות-testflight-אופציונלי)
10. [עדכון האפליקציה](#10-עדכון-האפליקציה)
11. [פתרון בעיות נפוצות](#11-פתרון-בעיות-נפוצות)

---

## 1. דרישות מקדימות

### חומרה ותוכנה נדרשים:
- ✅ **מחשב Mac** - חובה! אי אפשר לבנות אפליקציות iOS ללא Mac
- ✅ **Xcode 15.0 ומעלה** - הורד בחינם מה-App Store
- ✅ **חשבון Apple ID** - צור בחינם ב-appleid.apple.com
- ✅ **חברות בתוכנית המפתחים של אפל** - עלות: $99 לשנה

### בדיקת גרסאות:
```bash
# בדוק גרסת Xcode
xcodebuild -version

# בדוק גרסת Node.js
node --version

# בדוק גרסת npm
npm --version
```

---

## 2. הרשמה לתוכנית המפתחים של אפל

### שלב 2.1: יצירת Apple ID (אם אין לך)
1. היכנס לאתר: https://appleid.apple.com
2. לחץ על "Create Your Apple ID"
3. מלא את הפרטים הנדרשים
4. אמת את כתובת האימייל

### שלב 2.2: הפעלת אימות דו-שלבי (חובה!)
1. היכנס ל-Apple ID שלך
2. לך ל-"Security" (אבטחה)
3. הפעל "Two-Factor Authentication"
4. עקוב אחר ההוראות להגדרה

### שלב 2.3: הרשמה לתוכנית המפתחים
1. היכנס לאתר: https://developer.apple.com/programs/
2. לחץ על "Enroll"
3. בחר סוג חשבון:
   - **Individual** - למפתחים עצמאיים ($99/שנה)
   - **Organization** - לחברות ($99/שנה, דורש מספר D-U-N-S)
4. מלא את הפרטים הנדרשים
5. שלם את דמי החברות השנתיים
6. המתן לאישור (בדרך כלל 24-48 שעות)

---

## 3. הכנת הפרויקט

### שלב 3.1: בניית גרסת Production
```bash
# בנה את האפליקציה לייצור
npm run build
```

### שלב 3.2: סנכרון עם פלטפורמת iOS
```bash
# סנכרן את הקוד לפרויקט iOS
npx cap sync ios
```

### שלב 3.3: פתיחת הפרויקט ב-Xcode
```bash
# פתח את הפרויקט ב-Xcode
npx cap open ios
```

---

## 4. הגדרות ב-Xcode

### שלב 4.1: הגדרת Bundle Identifier
1. ב-Xcode, לחץ על הפרויקט בסרגל השמאלי (App)
2. בחר את ה-Target הראשי (App)
3. לך ללשונית "General"
4. ב-"Bundle Identifier" הזן מזהה ייחודי:
   ```
   com.yourcompany.yourappname
   ```
   **חשוב:** המזהה חייב להיות ייחודי בכל העולם!

### שלב 4.2: הגדרת גרסה
1. ב-"Version" הזן את מספר הגרסה (לדוגמה: `1.0.0`)
2. ב-"Build" הזן את מספר הבנייה (לדוגמה: `1`)

**הערה:** 
- Version = גרסה שהמשתמש רואה
- Build = מספר פנימי (חייב לעלות בכל העלאה)

### שלב 4.3: הגדרת Signing (חתימה)
1. לך ללשונית "Signing & Capabilities"
2. סמן ✅ "Automatically manage signing"
3. ב-"Team" בחר את הצוות שלך (החשבון שנרשמת איתו)
4. Xcode ייצור אוטומטית את כל האישורים הנדרשים

### שלב 4.4: הגדרת Deployment Target
1. ב-"Minimum Deployments" בחר את גרסת iOS המינימלית
2. מומלץ: iOS 15.0 ומעלה

### שלב 4.5: הגדרת App Icons
1. ב-Navigator השמאלי, פתח את תיקיית "Assets"
2. לחץ על "AppIcon"
3. גרור אייקונים בגדלים הנדרשים:
   - 1024x1024 (App Store)
   - 180x180 (iPhone @3x)
   - 120x120 (iPhone @2x)
   - 167x167 (iPad Pro)
   - 152x152 (iPad)
   - 76x76 (iPad @1x)

**טיפ:** השתמש בכלי כמו https://appicon.co ליצירת כל הגדלים אוטומטית

### שלב 4.6: הגדרת Launch Screen
1. פתח את קובץ `LaunchScreen.storyboard`
2. עצב את מסך הפתיחה של האפליקציה
3. או: הגדר תמונת רקע פשוטה

---

## 5. יצירת Privacy Manifest

### חובה מאז מאי 2024!

### שלב 5.1: יצירת קובץ Privacy Manifest
1. ב-Xcode, לחץ ימני על תיקיית "App"
2. בחר "New File..."
3. בחר "App Privacy" מהרשימה
4. שמור כ-`PrivacyInfo.xcprivacy`

### שלב 5.2: הגדרת תוכן הקובץ
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    <key>NSPrivacyCollectedDataTypes</key>
    <array/>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

### שלב 5.3: בדיקת Privacy Report
1. ב-Xcode, לך ל-Product > Analyze
2. בדוק את הדוח לאזהרות
3. תקן בעיות אם יש

---

## 6. יצירת רשומה ב-App Store Connect

### שלב 6.1: כניסה ל-App Store Connect
1. היכנס לאתר: https://appstoreconnect.apple.com
2. התחבר עם ה-Apple ID שלך
3. קבל את כל התנאים וההסכמים (אם יש)

### שלב 6.2: יצירת אפליקציה חדשה
1. לחץ על "My Apps" (האפליקציות שלי)
2. לחץ על כפתור ה-**+** הכחול
3. בחר "New App"

### שלב 6.3: מילוי פרטי האפליקציה
מלא את הפרטים הבאים:

| שדה | הסבר | דוגמה |
|-----|-------|--------|
| **Platforms** | בחר iOS | ✅ iOS |
| **Name** | שם האפליקציה (עד 30 תווים) | מוקד שרפ |
| **Primary Language** | שפה ראשית | Hebrew |
| **Bundle ID** | המזהה מ-Xcode | com.sharp.mokad |
| **SKU** | מזהה פנימי ייחודי | mokad-sharp-001 |
| **User Access** | גישה מלאה או מוגבלת | Full Access |

4. לחץ "Create"

### שלב 6.4: מילוי מידע על האפליקציה

#### לשונית "App Information":
- **Name**: שם האפליקציה
- **Subtitle**: כותרת משנה (עד 30 תווים)
- **Category**: קטגוריה ראשית (לדוגמה: Business, Utilities)
- **Secondary Category**: קטגוריה משנית (אופציונלי)
- **Content Rights**: האם יש תוכן של צד שלישי?

#### לשונית "Pricing and Availability":
- **Price**: בחר מחיר (Free = חינם)
- **Availability**: באילו מדינות האפליקציה זמינה

#### לשונית "App Privacy":
1. לחץ על "Get Started"
2. ענה על השאלון לגבי איסוף מידע
3. הזן את כתובת ה-URL של מדיניות הפרטיות:
   ```
   https://yourwebsite.com/privacy
   ```

### שלב 6.5: הכנת צילומי מסך (Screenshots)

#### גדלים נדרשים (חובה):
| מכשיר | גודל בפיקסלים | יחס |
|--------|---------------|------|
| iPhone 6.7" | 1290 x 2796 | iPhone 15 Pro Max |
| iPhone 6.5" | 1284 x 2778 | iPhone 14 Plus |
| iPhone 5.5" | 1242 x 2208 | iPhone 8 Plus |
| iPad Pro 12.9" | 2048 x 2732 | iPad Pro |

#### דרישות:
- מינימום 3 צילומי מסך לכל גודל
- מקסימום 10 צילומי מסך לכל גודל
- פורמט: PNG או JPEG
- ללא שקיפות

#### טיפים:
- השתמש ב-Simulator של Xcode לצילומי מסך
- או כלים כמו: https://screenshots.pro
- הוסף טקסט שיווקי על התמונות

### שלב 6.6: מילוי תיאור האפליקציה

#### Description (תיאור):
כתוב תיאור מפורט של האפליקציה (עד 4000 תווים):
```
מוקד שרפ - מערכת ניהול מוקד מתקדמת

האפליקציה מאפשרת:
• ניהול קריאות שירות בזמן אמת
• מעקב אחר טכנאים בשטח
• דוחות וסטטיסטיקות מתקדמים
• התראות בזמן אמת

מתאים לעסקים בכל גודל.
```

#### Keywords (מילות מפתח):
הזן עד 100 תווים של מילות מפתח, מופרדות בפסיקים:
```
מוקד,שירות,ניהול,קריאות,טכנאים,עסקים
```

#### Support URL:
כתובת לתמיכה טכנית:
```
https://yourwebsite.com/support
```

#### Marketing URL (אופציונלי):
כתובת לדף שיווקי:
```
https://yourwebsite.com
```

### שלב 6.7: מידע לבודקים (App Review Information)

#### Contact Information:
- **First Name**: שם פרטי
- **Last Name**: שם משפחה
- **Phone Number**: מספר טלפון (עם קידומת מדינה)
- **Email**: כתובת אימייל

#### Demo Account (אם נדרש):
אם האפליקציה דורשת התחברות, ספק פרטי משתמש לבדיקה:
- **Username**: demo@example.com
- **Password**: Demo123456

#### Notes:
הערות לבודקים (באנגלית):
```
This app requires an internet connection.
Demo account provided above for testing purposes.
```

---

## 7. יצירת Archive והעלאה

### שלב 7.1: הכנה לבנייה
1. ב-Xcode, ודא שבחרת "Any iOS Device (arm64)" בתפריט המכשירים
2. ודא שכל ההגדרות נכונות

### שלב 7.2: יצירת Archive
1. לך ל-**Product** > **Archive**
2. המתן לסיום הבנייה (יכול לקחת כמה דקות)
3. כשהבנייה תסתיים, ייפתח חלון "Organizer"

### שלב 7.3: בדיקת ה-Archive
1. בחלון Organizer, בחר את ה-Archive שנוצר
2. לחץ על "Validate App"
3. המתן לסיום הבדיקה
4. תקן שגיאות אם יש

### שלב 7.4: העלאה ל-App Store Connect
1. לחץ על "Distribute App"
2. בחר "App Store Connect"
3. בחר "Upload"
4. סמן את האפשרויות הבאות:
   - ✅ Upload your app's symbols
   - ✅ Manage Version and Build Number
5. לחץ "Next"
6. בדוק את הפרטים ולחץ "Upload"
7. המתן לסיום ההעלאה

### שלב 7.5: אלטרנטיבה - העלאה עם Transporter
1. הורד את אפליקציית **Transporter** מה-App Store (בחינם)
2. ב-Xcode Organizer, לחץ על "Export App"
3. בחר "App Store Connect" ושמור קובץ IPA
4. פתח את Transporter
5. גרור את קובץ ה-IPA לתוך Transporter
6. לחץ "Deliver"

---

## 8. הגשה לבדיקה

### שלב 8.1: בחירת Build
1. חזור ל-App Store Connect
2. לך לאפליקציה שלך
3. לחץ על הגרסה (לדוגמה: "1.0")
4. גלול למטה ל-"Build"
5. לחץ על "+" ובחר את ה-Build שהעלית

**הערה:** ה-Build יופיע תוך 5-30 דקות מההעלאה

### שלב 8.2: בדיקה אחרונה
ודא שמילאת את כל השדות הנדרשים:
- ✅ צילומי מסך לכל הגדלים
- ✅ תיאור האפליקציה
- ✅ מילות מפתח
- ✅ קטגוריה
- ✅ מדיניות פרטיות
- ✅ מידע ליצירת קשר
- ✅ Build נבחר

### שלב 8.3: הגשה לבדיקה
1. גלול למעלה ולחץ על "Add for Review"
2. בדוק את כל הפרטים
3. לחץ על "Submit to App Review"

### שלב 8.4: מעקב אחר סטטוס
סטטוסים אפשריים:
| סטטוס | משמעות |
|--------|---------|
| Waiting for Review | ממתין לבדיקה |
| In Review | בבדיקה כרגע |
| Pending Developer Release | אושר, ממתין לשחרור |
| Ready for Sale | פורסם בחנות! |
| Rejected | נדחה (תקבל הסבר) |

**זמן בדיקה ממוצע:** 24-48 שעות (90% מהאפליקציות)

---

## 9. בדיקות TestFlight (אופציונלי)

### מה זה TestFlight?
TestFlight מאפשר לך להפיץ גרסאות בטא לבודקים לפני הפרסום הרשמי.

### שלב 9.1: הגדרת בודקים פנימיים
1. ב-App Store Connect, לך ל-"TestFlight"
2. לחץ על "Internal Testing"
3. הוסף בודקים מצוות הפיתוח (עד 100)
4. הבודקים יקבלו הזמנה באימייל

### שלב 9.2: הגדרת בודקים חיצוניים
1. לחץ על "External Testing"
2. צור קבוצת בודקים חדשה
3. הוסף בודקים (עד 10,000)
4. **הערה:** הבנייה הראשונה עוברת בדיקה מהירה של אפל

### שלב 9.3: איסוף משוב
- בודקים יכולים לשלוח משוב ישירות מהאפליקציה
- צפה במשוב ב-App Store Connect

---

## 10. עדכון האפליקציה

### שלב 10.1: הכנת עדכון
1. עדכן את הקוד באפליקציה
2. בנה מחדש:
   ```bash
   npm run build
   npx cap sync ios
   npx cap open ios
   ```

### שלב 10.2: עדכון מספרי גרסה
ב-Xcode:
- **Version**: עדכן לגרסה חדשה (לדוגמה: 1.0.0 → 1.1.0)
- **Build**: הגדל את מספר הבנייה (לדוגמה: 1 → 2)

### שלב 10.3: יצירת Archive חדש
1. Product > Archive
2. Validate App
3. Distribute App

### שלב 10.4: הגשת העדכון
1. ב-App Store Connect, צור גרסה חדשה
2. הוסף "What's New" (מה חדש בגרסה)
3. בחר את ה-Build החדש
4. הגש לבדיקה

---

## 11. פתרון בעיות נפוצות

### בעיה: "No signing certificate found"
**פתרון:**
1. ב-Xcode, לך ל-Preferences > Accounts
2. בחר את החשבון שלך
3. לחץ "Download Manual Profiles"

### בעיה: "Bundle ID is not available"
**פתרון:**
Bundle ID כבר בשימוש. בחר מזהה אחר ייחודי.

### בעיה: "Missing Privacy Manifest"
**פתרון:**
צור קובץ PrivacyInfo.xcprivacy כמתואר בסעיף 5.

### בעיה: "Invalid Binary"
**פתרון:**
1. ודא שכל האייקונים בגדלים הנכונים
2. ודא שאין קוד מיושן או deprecated
3. בדוק את ה-Deployment Target

### בעיה: "App rejected - Guideline X.X"
**פתרון:**
1. קרא בעיון את הסיבה לדחייה
2. תקן את הבעיה
3. הגש מחדש עם הסבר ב-Resolution Center

### בעיה: Build לא מופיע ב-App Store Connect
**פתרון:**
1. המתן 15-30 דקות
2. בדוק אימייל להודעות שגיאה
3. ודא שה-Bundle ID תואם

---

## רשימת בדיקה לפני הגשה (Checklist)

### הגדרות טכניות:
- [ ] Bundle ID ייחודי ונכון
- [ ] Version ו-Build מוגדרים
- [ ] Signing מוגדר נכון
- [ ] Privacy Manifest קיים
- [ ] אייקונים בכל הגדלים

### App Store Connect:
- [ ] אפליקציה נוצרה
- [ ] צילומי מסך הועלו (כל הגדלים)
- [ ] תיאור מלא
- [ ] מילות מפתח
- [ ] קטגוריה נבחרה
- [ ] מחיר/זמינות מוגדרים
- [ ] מדיניות פרטיות URL
- [ ] מידע ליצירת קשר
- [ ] Demo account (אם נדרש)

### לפני הגשה:
- [ ] Build הועלה בהצלחה
- [ ] Build נבחר בגרסה
- [ ] כל השדות מלאים
- [ ] בדיקה אחרונה של האפליקציה

---

## קישורים שימושיים

- 🔗 [Apple Developer Program](https://developer.apple.com/programs/)
- 🔗 [App Store Connect](https://appstoreconnect.apple.com)
- 🔗 [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- 🔗 [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- 🔗 [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- 🔗 [App Icon Generator](https://appicon.co)
- 🔗 [Screenshot Generator](https://screenshots.pro)

---

## תמיכה

אם נתקלת בבעיות:
1. בדוק את [הפורום של אפל](https://developer.apple.com/forums/)
2. חפש ב-[Stack Overflow](https://stackoverflow.com/questions/tagged/app-store-connect)
3. פנה לתמיכה של אפל דרך App Store Connect

---

**בהצלחה בהעלאת האפליקציה! 🚀**

*מדריך זה עודכן לאחרונה: דצמבר 2024*
