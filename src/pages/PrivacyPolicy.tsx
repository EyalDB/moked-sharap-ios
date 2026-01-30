import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, Server, UserCheck, Mail, ArrowRight, Phone } from 'lucide-react';

const APP_LOGO = 'https://d64gsuwffb70l.cloudfront.net/68e9f17482034e6aafbc0b5d_1766955608216_493240d1.jpeg';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = '30 בדצמבר 2025';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-slate-900 to-slate-900" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-red-900/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src={APP_LOGO} 
              alt="מוקד שרפ" 
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span className="text-xl font-black text-white">מוקד שרפ</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            <span className="text-sm">חזרה לאפליקציה</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 shadow-lg shadow-red-500/20">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              מדיניות פרטיות
            </h1>
            <p className="text-slate-400">
              עדכון אחרון: {lastUpdated}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-red-400" />
                </div>
                מבוא
              </h2>
              <div className="text-slate-300 space-y-4 leading-relaxed">
                <p>
                  ברוכים הבאים לאפליקציית "מוקד שרפ". אנו מחויבים להגן על פרטיותכם ולשמור על המידע האישי שלכם בצורה מאובטחת.
                </p>
                <p>
                  מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלכם בעת השימוש באפליקציה שלנו.
                </p>
                <p>
                  בשימוש באפליקציה, אתם מסכימים לתנאים המפורטים במדיניות זו.
                </p>
              </div>
            </section>

            {/* Data Collection */}
            <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-red-400" />
                </div>
                איסוף נתונים
              </h2>
              <div className="text-slate-300 space-y-4 leading-relaxed">
                <p className="font-semibold text-white">מידע שאנו אוספים:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>
                    <span className="font-medium text-white">אנשי קשר לחיוג מהיר:</span> מספרי טלפון ושמות שאתם מוסיפים לרשימת החיוג המהיר. מידע זה נשמר <span className="text-red-400 font-medium">מקומית במכשיר שלכם בלבד</span>.
                  </li>
                  <li>
                    <span className="font-medium text-white">קוד PIN מנהל:</span> קוד הגישה להגדרות נשמר מקומית במכשיר.
                  </li>
                  <li>
                    <span className="font-medium text-white">העדפות משתמש:</span> הגדרות האפליקציה נשמרות מקומית.
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-green-400 font-medium flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    מידע חשוב:
                  </p>
                  <p className="text-slate-300 mt-2">
                    האפליקציה <span className="font-bold text-white">אינה שולחת</span> מידע אישי לשרתים חיצוניים. כל המידע נשמר מקומית במכשיר שלכם בלבד באמצעות LocalStorage.
                  </p>
                </div>

                <p className="font-semibold text-white mt-6">מידע שאנו לא אוספים:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>איננו אוספים מידע על מיקום</li>
                  <li>איננו אוספים היסטוריית שיחות</li>
                  <li>איננו אוספים מידע מאנשי הקשר במכשיר</li>
                  <li>איננו אוספים מידע אישי מזהה</li>
                  <li>איננו משתמשים בעוגיות (cookies) למעקב</li>
                </ul>
              </div>
            </section>

            {/* Data Usage */}
            <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-red-400" />
                </div>
                שימוש במידע
              </h2>
              <div className="text-slate-300 space-y-4 leading-relaxed">
                <p>המידע שנשמר באפליקציה משמש אך ורק למטרות הבאות:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>
                    <span className="font-medium text-white">חיוג מהיר:</span> שמירת מספרי הטלפון שהוספתם לצורך חיוג מהיר בלחיצה אחת.
                  </li>
                  <li>
                    <span className="font-medium text-white">התאמה אישית:</span> שמירת ההגדרות והעדפות שבחרתם באפליקציה.
                  </li>
                  <li>
                    <span className="font-medium text-white">אבטחה:</span> שמירת קוד ה-PIN להגנה על הגדרות המנהל.
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <p className="text-blue-400 font-medium">שיתוף מידע עם צדדים שלישיים:</p>
                  <p className="text-slate-300 mt-2">
                    איננו משתפים, מוכרים או מעבירים מידע אישי לצדדים שלישיים. המידע שלכם נשאר במכשיר שלכם בלבד.
                  </p>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-400" />
                </div>
                אבטחת מידע
              </h2>
              <div className="text-slate-300 space-y-4 leading-relaxed">
                <p>אנו נוקטים באמצעים הבאים להגנה על המידע שלכם:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>
                    <span className="font-medium text-white">אחסון מקומי:</span> כל המידע נשמר מקומית במכשיר שלכם ולא מועבר לשרתים חיצוניים.
                  </li>
                  <li>
                    <span className="font-medium text-white">הגנת PIN:</span> גישה להגדרות המנהל מוגנת באמצעות קוד PIN.
                  </li>
                  <li>
                    <span className="font-medium text-white">ללא רישום:</span> האפליקציה אינה דורשת יצירת חשבון או מסירת פרטים אישיים.
                  </li>
                  <li>
                    <span className="font-medium text-white">חיבור מאובטח:</span> האפליקציה משתמשת בפרוטוקול HTTPS לכל התקשורת.
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <p className="text-amber-400 font-medium">המלצות אבטחה:</p>
                  <ul className="text-slate-300 mt-2 space-y-1">
                    <li>• שנו את קוד ה-PIN מברירת המחדל</li>
                    <li>• הגנו על המכשיר שלכם באמצעות סיסמה או טביעת אצבע</li>
                    <li>• עדכנו את האפליקציה לגרסה האחרונה</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Storage */}
            <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-red-400" />
                </div>
                אחסון ומחיקת מידע
              </h2>
              <div className="text-slate-300 space-y-4 leading-relaxed">
                <p>
                  <span className="font-medium text-white">משך האחסון:</span> המידע נשמר במכשיר שלכם כל עוד האפליקציה מותקנת או עד שתמחקו אותו ידנית.
                </p>
                <p>
                  <span className="font-medium text-white">מחיקת מידע:</span> תוכלו למחוק את כל המידע בכל עת על ידי:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>מחיקת אנשי קשר בודדים דרך הגדרות האפליקציה</li>
                  <li>מחיקת נתוני האפליקציה דרך הגדרות המכשיר</li>
                  <li>הסרת האפליקציה מהמכשיר</li>
                </ul>
                <p className="mt-4">
                  לאחר מחיקת האפליקציה, כל המידע שנשמר מקומית יימחק לצמיתות.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">פרטיות ילדים</h2>
              <div className="text-slate-300 space-y-4 leading-relaxed">
                <p>
                  האפליקציה אינה מיועדת לילדים מתחת לגיל 13 ואיננו אוספים ביודעין מידע אישי מילדים.
                </p>
                <p>
                  אם גיליתם שילד מסר לנו מידע אישי, אנא צרו איתנו קשר ונמחק את המידע.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">שינויים במדיניות</h2>
              <div className="text-slate-300 space-y-4 leading-relaxed">
                <p>
                  אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים משמעותיים יפורסמו באפליקציה.
                </p>
                <p>
                  המשך השימוש באפליקציה לאחר פרסום שינויים מהווה הסכמה למדיניות המעודכנת.
                </p>
                <p>
                  אנו ממליצים לעיין במדיניות זו מעת לעת כדי להישאר מעודכנים.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-red-400" />
                </div>
                יצירת קשר
              </h2>
              <div className="text-slate-300 space-y-4 leading-relaxed">
                <p>
                  אם יש לכם שאלות או הערות בנוגע למדיניות פרטיות זו, אתם מוזמנים לפנות אלינו:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <a
                    href="tel:+972732341234"
                    className="flex items-center gap-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                  >
                    <Phone className="w-5 h-5 text-red-400" />
                    <span className="font-mono" dir="ltr">+972-73-234-1234</span>
                  </a>
                  <a
                    href="mailto:privacy@mokedsharap.co.il"
                    className="flex items-center gap-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                  >
                    <Mail className="w-5 h-5 text-red-400" />
                    <span>privacy@mokedsharap.co.il</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Summary Box */}
            <section className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/30 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-400" />
                סיכום
              </h2>
              <div className="text-slate-300 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>כל המידע נשמר מקומית במכשיר שלכם בלבד</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>איננו שולחים מידע לשרתים חיצוניים</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>איננו משתפים מידע עם צדדים שלישיים</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>תוכלו למחוק את המידע בכל עת</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>הפרטיות שלכם חשובה לנו</p>
                </div>
              </div>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 rounded-xl text-white font-medium transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              חזרה לאפליקציה
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-red-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src={APP_LOGO} 
              alt="מוקד שרפ" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-lg font-bold text-white">מוקד שרפ</span>
          </div>
          <p className="text-slate-600 text-xs">
            © 2025 מוקד שרפ. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
