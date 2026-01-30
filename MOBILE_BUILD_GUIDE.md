# 📱 מדריך פרסום לחנויות האפליקציות - מוקד שרפ

## שלב 1: התקנת תלויות

```bash
npm install
```

## שלב 2: בניית האפליקציה

```bash
npm run build
```

## שלב 3: הוספת פלטפורמות

### Android:
```bash
npx cap add android
```

### iOS (דורש Mac):
```bash
npx cap add ios
```

## שלב 4: סנכרון הקוד

```bash
npx cap sync
```

או בפקודה אחת:
```bash
npm run mobile:build
```

## שלב 5: פתיחה בסביבת פיתוח

### Android Studio:
```bash
npx cap open android
# או
npm run cap:android
```

### Xcode (iOS):
```bash
npx cap open ios
# או
npm run cap:ios
```

---

## 🤖 פרסום ב-Google Play Store

### דרישות מקדימות:
1. חשבון Google Play Console - $25 (תשלום חד פעמי)
2. Android Studio מותקן
3. Java JDK 17+

### שלבים:
1. פתח את הפרויקט ב-Android Studio
2. עבור ל: `Build > Generate Signed Bundle / APK`
3. בחר `Android App Bundle`
4. צור או בחר Keystore (שמור אותו במקום בטוח!)
5. בחר `release` ולחץ Finish
6. העלה את קובץ ה-AAB ל-Google Play Console

### הגדרות ב-Google Play Console:
- שם האפליקציה: מוקד שרפ
- תיאור קצר ומלא
- צילומי מסך (לפחות 2)
- אייקון 512x512
- גרפיקה מובלטת 1024x500
- מדיניות פרטיות (URL)
- סיווג תוכן

---

## 🍎 פרסום ב-Apple App Store

### דרישות מקדימות:
1. חשבון Apple Developer - $99/שנה
2. Mac עם Xcode
3. Apple ID

### שלבים:
1. פתח את הפרויקט ב-Xcode
2. הגדר את ה-Team וה-Bundle Identifier
3. עבור ל: `Product > Archive`
4. לחץ `Distribute App`
5. בחר `App Store Connect`
6. העלה ל-App Store Connect

### הגדרות ב-App Store Connect:
- שם האפליקציה: מוקד שרפ
- תיאור
- צילומי מסך לכל גודל מסך
- אייקון 1024x1024
- מדיניות פרטיות (URL)
- קטגוריה: Utilities / Safety

---

## 📁 מבנה הקבצים

```
android/                  # פרויקט Android
├── app/
│   ├── src/main/
│   │   ├── res/         # אייקונים ומשאבים
│   │   └── AndroidManifest.xml
│   └── build.gradle
└── ...

ios/                      # פרויקט iOS
├── App/
│   ├── Assets.xcassets/ # אייקונים
│   └── Info.plist
└── ...
```

---

## 🎨 הכנת אייקונים

### Android:
- מקם אייקונים בתיקיות:
  - `android/app/src/main/res/mipmap-mdpi/` (48x48)
  - `android/app/src/main/res/mipmap-hdpi/` (72x72)
  - `android/app/src/main/res/mipmap-xhdpi/` (96x96)
  - `android/app/src/main/res/mipmap-xxhdpi/` (144x144)
  - `android/app/src/main/res/mipmap-xxxhdpi/` (192x192)

### iOS:
- פתח `ios/App/App/Assets.xcassets/AppIcon.appiconset`
- הוסף אייקונים בכל הגדלים הנדרשים

---

## 🔧 פתרון בעיות נפוצות

### "SDK location not found"
צור קובץ `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### בעיות Gradle
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

### בעיות CocoaPods (iOS)
```bash
cd ios/App
pod install
cd ../..
```

---

## 📞 תמיכה

לשאלות נוספות, פנה למפתח האפליקציה.

בהצלחה! 🚀
