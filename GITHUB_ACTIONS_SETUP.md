# מדריך הגדרת GitHub Actions לבניית iOS

## סקירה כללית

מדריך זה יעזור לך להגדיר בנייה אוטומטית של האפליקציה והעלאה ל-TestFlight **בלי Mac**.

---

## שלב 1: יצירת Repository ב-GitHub

1. היכנס ל-[GitHub](https://github.com)
2. צור Repository חדש (חייב להיות **Public** לבנייה חינמית)
3. שם מומלץ: `moked-sharap-ios`

---

## שלב 2: יצירת Distribution Certificate (בלי Mac!)

### אפשרות א: דרך אתר Apple Developer (מומלץ)

1. היכנס ל-[Apple Developer - Certificates](https://developer.apple.com/account/resources/certificates/list)
2. לחץ על **+** ליצירת Certificate חדש
3. בחר **Apple Distribution**
4. תצטרך ליצור **CSR (Certificate Signing Request)**

### יצירת CSR עם OpenSSL (Windows/Linux):

```bash
# 1. צור Private Key
openssl genrsa -out distribution.key 2048

# 2. צור CSR
openssl req -new -key distribution.key -out distribution.csr -subj "/CN=Yaniv Carmel/O=Natali Healthcare Solutions Ltd./C=IL"
```

5. העלה את קובץ `distribution.csr` לאתר Apple
6. הורד את ה-Certificate שנוצר (`distribution.cer`)

### המרה ל-P12:

```bash
# 1. המר CER ל-PEM
openssl x509 -inform DER -in distribution.cer -out distribution.pem

# 2. צור P12 (תתבקש להזין סיסמה - זכור אותה!)
openssl pkcs12 -export -out distribution.p12 -inkey distribution.key -in distribution.pem
```

---

## שלב 3: יצירת Provisioning Profile

1. היכנס ל-[Apple Developer - Profiles](https://developer.apple.com/account/resources/profiles/list)
2. לחץ על **+** ליצירת Profile חדש
3. בחר **App Store** (תחת Distribution)
4. בחר את ה-App ID: `com.yanivcarmel.mokadsharap`
5. בחר את ה-Certificate שיצרת
6. תן שם: `MokedSharap AppStore`
7. הורד את הקובץ (`MokedSharap_AppStore.mobileprovision`)

---

## שלב 4: יצירת App Store Connect API Key

1. היכנס ל-[App Store Connect - Users and Access - Keys](https://appstoreconnect.apple.com/access/api)
2. לחץ על **+** ליצירת Key חדש
3. שם: `GitHub Actions`
4. Access: **App Manager**
5. הורד את קובץ ה-Key (AuthKey_XXXXXX.p8)
6. שמור את ה-**Key ID** ו-**Issuer ID**

---

## שלב 5: המרה ל-Base64

הרץ את הפקודות הבאות (Windows PowerShell):

```powershell
# P12 Certificate
[Convert]::ToBase64String([IO.File]::ReadAllBytes("distribution.p12")) | Out-File cert_base64.txt

# Provisioning Profile
[Convert]::ToBase64String([IO.File]::ReadAllBytes("MokedSharap_AppStore.mobileprovision")) | Out-File profile_base64.txt

# API Key
[Convert]::ToBase64String([IO.File]::ReadAllBytes("AuthKey_XXXXXX.p8")) | Out-File apikey_base64.txt
```

או ב-Linux/Mac:

```bash
base64 -i distribution.p12 > cert_base64.txt
base64 -i MokedSharap_AppStore.mobileprovision > profile_base64.txt
base64 -i AuthKey_XXXXXX.p8 > apikey_base64.txt
```

---

## שלב 6: הוספת Secrets ל-GitHub

1. ב-Repository שלך, לך ל-**Settings** → **Secrets and variables** → **Actions**
2. לחץ **New repository secret** והוסף:

| Secret Name | Value |
|-------------|-------|
| `BUILD_CERTIFICATE_BASE64` | תוכן קובץ cert_base64.txt |
| `P12_PASSWORD` | הסיסמה שהזנת ביצירת ה-P12 |
| `KEYCHAIN_PASSWORD` | סיסמה כלשהי (לדוגמה: `temp123`) |
| `PROVISIONING_PROFILE_BASE64` | תוכן קובץ profile_base64.txt |
| `PROVISIONING_PROFILE_NAME` | `MokedSharap AppStore` |
| `TEAM_ID` | ה-Team ID שלך מ-Apple Developer |
| `APP_STORE_CONNECT_API_KEY_ID` | ה-Key ID מ-App Store Connect |
| `APP_STORE_CONNECT_API_ISSUER_ID` | ה-Issuer ID מ-App Store Connect |
| `APP_STORE_CONNECT_API_KEY_BASE64` | תוכן קובץ apikey_base64.txt |

---

## שלב 7: העלאת הקוד והפעלת Build

```bash
# אתחול Git
cd /path/to/emergency-quick
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/moked-sharap-ios.git
git push -u origin main
```

הבנייה תתחיל אוטומטית!

---

## שלב 8: התקנה על iPhone

1. לאחר שה-Build יסתיים, ה-IPA יועלה ל-TestFlight
2. פתח את אפליקציית **TestFlight** באייפון
3. האפליקציה תופיע שם להתקנה

---

## מציאת Team ID

1. היכנס ל-[Apple Developer - Membership](https://developer.apple.com/account/#!/membership)
2. ה-**Team ID** מופיע שם

---

## פתרון בעיות

### Build נכשל?
- בדוק את ה-logs ב-GitHub Actions
- ודא שכל ה-Secrets הוזנו נכון
- ודא שה-Provisioning Profile תואם ל-Bundle ID

### לא מופיע ב-TestFlight?
- המתן עד 30 דקות
- בדוק ב-App Store Connect אם יש הודעות

---

## צריך עזרה?

פנה אליי ואעזור לך בכל שלב!
