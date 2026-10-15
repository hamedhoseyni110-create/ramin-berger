/* ============================================================
   رامین برگر — فایل پیکربندی وایت‌لیبل
   برای استفاده‌ی برند دیگر: فقط همین آبجکت را عوض کنید.
   ============================================================ */
const CONFIG = {
  brand: {
    name: "رامین برگر",
    tagline: "لایه‌لایه‌ی خوشمزگی، از آتیش تا میز",
    description: "برگرهای دست‌ساز با گوشت تازه‌ی گریل، نون بریوش داغ و پنیر چدار آب‌شده."
  },
  colors: {
    bg: "#0c0906",
    surface: "#161009",
    text: "#f5efe4",
    muted: "#b9a98f",
    accent: "#f0a832",
    accentDark: "#c07f1a"
  },
  contact: {
    // شماره‌ی نمایشی — قبل از انتشار واقعی شود
    phoneDisplay: "09120000000",
    whatsapp: "989120000000",
    address: "آدرس به‌زودی اعلام می‌شود",
    hours: "هر روز از ساعت ۱۲ تا ۲۴"
  },
  assets: {
    hero: "assets/hero.jpg",
    ingredients: [
      { id: "bun",     name: "نون",   desc: "نون بریوش تازه‌ی داغ",   src: "assets/ing-bun-top.jpg" },
      { id: "patty",   name: "گوشت",  desc: "گوشت گریل آتیشی",        src: "assets/ing-patty.jpg" },
      { id: "cheese",  name: "پنیر",  desc: "پنیر چدار آب‌شده",        src: "assets/ing-cheese.jpg" },
      { id: "lettuce", name: "کاهو",  desc: "کاهوی تازه و ترد",       src: "assets/ing-lettuce.jpg" }
    ],
    assemblyFrames: 80,
    assemblyPath: i => "assets/assembly/f_" + String(i + 1).padStart(3, "0") + ".webp"
  },
  menu: [
    {
      id: "burgers", name: "برگرها", photo: "assets/hero.jpg",
      items: [
        { id: "b1", name: "برگر کلاسیک",     price: 280000 },
        { id: "b2", name: "چیزبرگر دوبل",    price: 390000 },
        { id: "b3", name: "برگر قارچ و پنیر", price: 340000 },
        { id: "b4", name: "برگر دودی بیکن",  price: 420000 }
      ]
    },
    {
      id: "hotdogs", name: "هات‌داگ", photo: "assets/menu-hotdog.jpg",
      items: [
        { id: "h1", name: "هات‌داگ ویژه",  price: 260000 },
        { id: "h2", name: "هات‌داگ پنیری", price: 300000 }
      ]
    },
    {
      id: "pizza", name: "پیتزا", photo: "assets/menu-pizza.jpg",
      items: [
        { id: "p1", name: "پیتزا پپرونی", price: 450000 },
        { id: "p2", name: "پیتزا مخلوط",  price: 480000 }
      ]
    },
    {
      id: "sides", name: "پیش‌غذا", photo: "assets/menu-fries.jpg",
      items: [
        { id: "s1", name: "سیب‌زمینی",        price: 120000 },
        { id: "s2", name: "سیب‌زمینی ویژه",   price: 180000 },
        { id: "s3", name: "ناگت شش‌تکه",      price: 200000 }
      ]
    },
    {
      id: "drinks", name: "نوشیدنی", photo: "assets/menu-cola.jpg",
      items: [
        { id: "d1", name: "نوشابه",     price: 40000 },
        { id: "d2", name: "دلستر",      price: 55000 },
        { id: "d3", name: "آب‌معدنی",   price: 20000 },
        { id: "d4", name: "شیک شکلات",  price: 150000 }
      ]
    }
  ],
  builder: {
    title: "برگرت رو خودت بساز",
    subtitle: "یه برگر پایه انتخاب کن، مخلفات رو اضافه کن، قیمت رو زنده ببین.",
    extras: [
      { id: "e1", name: "پنیر اضافه",  price: 60000 },
      { id: "e2", name: "قارچ",        price: 50000 },
      { id: "e3", name: "بیکن",        price: 90000 },
      { id: "e4", name: "تخم‌مرغ",      price: 40000 },
      { id: "e5", name: "پیاز کاراملی", price: 30000 }
    ]
  }
};
