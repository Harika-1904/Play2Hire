import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "learn": "Learn",
      "leaderboard": "Leaderboard",
      "sub_title": "Learn • Play • Get Hired",
      "start_learning": "Start Learning",
      "recruiter_login": "Recruiter Login",
      "top_players": "Top Players",
      "about": "About | Contact | Terms",
      "welcome_back": "Welcome back",
      "build_smart": "Let's Build Something Smart 🧠",
      "your_invites": "Your Invites",
      "status": "Status:",
      "accept": "Accept",
      "reject": "Reject",
      "new_user": "New User",
      "existing_user": "Existing User",
      "score": "Score:",
      "continue": "Continue",
      "take_mock_test": "Take Mock Test",
      "play_memory_game": "Play 3D Memory Game 🧠",
      "roadmap": "Roadmap"
    }
  },
  te: {
    translation: {
      "home": "హోమ్",
      "learn": "నేర్చుకోండి",
      "leaderboard": "లీడర్‌బోర్డ్",
      "sub_title": "నేర్చుకోండి • ఆడండి • ఉద్యోగం పొందండి",
      "start_learning": "నేర్చుకోవడం ప్రారంభించండి",
      "recruiter_login": "రిక్రూటర్ లాగిన్",
      "top_players": "ఉత్తమ క్రీడాకారులు",
      "about": "గురించి | సంప్రదించండి | నిబంధనలు",
      "welcome_back": "తిరిగి స్వాగతం",
      "build_smart": "తెలివైనది నిర్మిద్దాం 🧠",
      "your_invites": "మీ ఆహ్వానాలు",
      "status": "స్థితి:",
      "accept": "అంగీకరించు",
      "reject": "తిరస్కరించు",
      "new_user": "కొత్త వాడుకరి",
      "existing_user": "ఉన్న వాడుకరి",
      "score": "స్కోరు:",
      "continue": "కొనసాగించు",
      "take_mock_test": "మాక్ టెస్ట్ రాయండి",
      "play_memory_game": "3D మెమరీ గేమ్ ఆడండి 🧠",
      "roadmap": "రోడ్‌మ్యాప్"
    }
  },
  hi: {
    translation: {
      "home": "होम",
      "learn": "सीखें",
      "leaderboard": "लीडरबोर्ड",
      "sub_title": "सीखें • खेलें • नौकरी पाएं",
      "start_learning": "सीखना शुरू करें",
      "recruiter_login": "रिक्रूटर लॉगिन",
      "top_players": "शीर्ष खिलाड़ी",
      "about": "के बारे में | संपर्क | शर्तें",
      "welcome_back": "वापसी पर स्वागत है",
      "build_smart": "आइए कुछ स्मार्ट बनाएं 🧠",
      "your_invites": "आपके आमंत्रण",
      "status": "स्थिति:",
      "accept": "स्वीकार करें",
      "reject": "अस्वीकार करें",
      "new_user": "नया उपयोगकर्ता",
      "existing_user": "मौजूदा उपयोगकर्ता",
      "score": "स्कोर:",
      "continue": "जारी रखें",
      "take_mock_test": "मॉक टेस्ट लें",
      "play_memory_game": "3D मेमोरी गेम खेलें 🧠",
      "roadmap": "रोडमैप"
    }
  },
  ta: {
    translation: {
      "home": "முகப்பு",
      "learn": "கற்க",
      "leaderboard": "முன்னிலை",
      "sub_title": "கற்க • விளையாட • வேலை பெறு",
      "start_learning": "கற்கத் தொடங்கு",
      "recruiter_login": "பணியமர்த்துபவர் உள்நுழைவு",
      "top_players": "சிறந்த வீரர்கள்",
      "about": "பற்றி | தொடர்பு | விதிமுறைகள்",
      "welcome_back": "மீண்டும் வருக",
      "build_smart": "புத்திசாலித்தனமாக உருவாக்குவோம் 🧠",
      "your_invites": "உங்கள் அழைப்புகள்",
      "status": "நிலை:",
      "accept": "ஏற்றுக்கொள்",
      "reject": "நிராகரி",
      "new_user": "புதிய பயனர்",
      "existing_user": "தற்போதைய பயனர்",
      "score": "மதிப்பெண்:",
      "continue": "தொடர்க",
      "take_mock_test": "மாதிரித் தேர்வு எழுது",
      "play_memory_game": "3D நினைவக விளையாட்டு ஆடு 🧠",
      "roadmap": "பாதைக்கோடு"
    }
  },
  ml: {
    translation: {
      "home": "ഹോം",
      "learn": "പഠിക്കുക",
      "leaderboard": "ലീഡർബോർഡ്",
      "sub_title": "പഠിക്കുക • കളിക്കുക • ജോലി നേടുക",
      "start_learning": "പഠനം തുടങ്ങുക",
      "recruiter_login": "റിക്രൂട്ടർ ലോഗിൻ",
      "top_players": "മികച്ച കളിക്കാർ",
      "about": "കുറിച്ച് | ബന്ധപ്പെടുക | നിബന്ധനകൾ",
      "welcome_back": "സ്വാഗതം",
      "build_smart": "നമുക്ക് സ്മാർട്ടായി എന്തെങ്കിലും നിർമ്മിക്കാം 🧠",
      "your_invites": "നിങ്ങളുടെ ക്ഷണങ്ങൾ",
      "status": "അവസ്ഥ:",
      "accept": "സ്വീകരിക്കുക",
      "reject": "നിരസിക്കുക",
      "new_user": "പുതിയ ഉപയോക്താവ്",
      "existing_user": "നിലവിലുള്ള ഉപയോക്താവ്",
      "score": "സ്കോർ:",
      "continue": "തുടരുക",
      "take_mock_test": "മോക്ക് ടെസ്റ്റ് എടുക്കുക",
      "play_memory_game": "3D മെമ്മറി ഗെയിം കളിക്കുക 🧠",
      "roadmap": "റോഡ്മാപ്പ്"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
