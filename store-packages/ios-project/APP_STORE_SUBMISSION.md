# הוראות העלאה ל-App Store

## לפני ההעלאה

### 1. פתח את הפרויקט ב-Xcode
```bash
cd src
open "מוקד שרפ.xcworkspace"
```

### 2. הוסף את ה-Widget Extension ב-Xcode
1. File → New → Target
2. בחר "Widget Extension"
3. שם: `EmergencyWidget`
4. Language: Swift
5. העתק את הקבצים מתיקיית `EmergencyWidget` לתוך ה-target החדש

### 3. הגדרות Bundle ID
- Main App: `ai.elorin.projects`
- Widget: `ai.elorin.projects.widget`

### 4. חתום על האפליקציה
- Team: בחר את ה-Apple Developer account שלך
- Automatically manage signing: מסומן

## בעת ההעלאה ל-App Store Connect

### App Information
- **Name:** מוקד שרפ
- **Subtitle:** חיוג מהיר למוקד רפואי
- **Category:** Medical
- **Content Rights:** Does not contain third-party content

### Description (Hebrew)
```
מוקד שרפ - אפליקציית חירום לחיוג מהיר

אפליקציה פשוטה ונגישה המיועדת לקשישים ואנשים הזקוקים לגישה מהירה לשירותי רפואה.

תכונות:
• כפתור חיוג גדול ובולט
• Widget למסך הבית לגישה מיידית
• עיצוב נגיש ופשוט
• פועלת גם ללא חיבור לאינטרנט

האפליקציה מאפשרת התקשרות מיידית למוקד שרפ - שירותי רפואה פרטית.
```

### Keywords
```
חירום, מוקד, רפואה, קשישים, נגישות, חיוג מהיר, בריאות, emergency, medical
```

### App Review Notes (IMPORTANT!)
```
This is a medical emergency speed-dial application designed specifically for elderly users and people with accessibility needs who require quick access to their healthcare provider.

The app is intentionally simple - featuring a large, easy-to-tap call button - to ensure maximum accessibility for users who may have difficulty with complex interfaces.

Key features that enhance the native experience:
1. Home Screen Widget for instant access without opening the app
2. Haptic feedback when pressing the call button
3. Works offline
4. Native URL scheme handling (mokadsharap://)

The simplicity is a core accessibility feature, not a limitation.

For testing: Simply tap the red call button to initiate a call to the medical center.
```

### Privacy Policy URL
```
https://projects.elorin.ai/emergency-sharap/privacy
```

### Support URL
```
https://elorin.ai/contact
```

## Screenshots נדרשים
- iPhone 6.7" (iPhone 15 Pro Max)
- iPhone 6.5" (iPhone 11 Pro Max)
- iPad 12.9" (אופציונלי)

## מחירים
- Free (חינם)

## Age Rating
- 4+ (מתאים לכל הגילאים)
- Medical/Treatment Information: Yes
