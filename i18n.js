/* ============================================================
   رامین برگر — جدول ترجمه‌ها (فارسی / انگلیسی / عربی)
   هر زبان: جهت، لوکییل اعداد، واحد پول، برند، رابط کاربری،
   عنوان‌ها (سه‌تکه با accent)، مراحل مونتاژ، مواد، دسته‌ها،
   آیتم‌ها و مخلفات برگرساز.
   ============================================================ */
const I18N = {
  fa: {
    dir: "rtl",
    locale: "fa-IR",
    currency: "تومان",
    listSep: "، ",
    brand: {
      name: "رامین برگر",
      tagline: "لایه‌لایه‌ی خوشمزگی، از آتیش تا میز",
      description: "رامین برگر — لایه‌لایه‌ی خوشمزگی، از آتیش تا میز. برگرهای دست‌ساز، هات‌داگ، پیتزا و پیش‌غذا."
    },
    contact: {
      address: "آدرس به‌زودی اعلام می‌شود",
      hours: "هر روز از ساعت ۱۲ تا ۲۴"
    },
    ui: {
      kicker: "فست‌فود دست‌ساز",
      ctaMenu: "دیدن منو",
      ctaBuilder: "برگرت رو بساز",
      scrollHint: "اسکرول کن",
      ingSub: "همه‌چی از بهترینش؛ نون داغ، گوشت گریل، پنیر آب‌شده و سبزیجات تازه.",
      menuSub: "هرچی دلت بخواد، داغ و تازه.",
      builderSub: "یه برگر پایه انتخاب کن، مخلفات رو اضافه کن، قیمت رو زنده ببین.",
      stepNum1: "۱.",
      stepNum2: "۲.",
      step1: "برگر پایه",
      step2: "مخلفات اضافه",
      builderTotalLabel: "جمع برگر دست‌سازت",
      builderAdd: "افزودن به سبد",
      add: "افزودن",
      cartTitle: "سبد خرید",
      cartEmpty: "سبدت خالیه — یه چیزی از منو انتخاب کن!",
      cartTotal: "جمع کل",
      checkout: "ثبت سفارش در واتساپ",
      cartNote: "سفارشت با واتساپ برای ما ارسال می‌شه",
      addedToCart: "«{name}» به سبد اضافه شد",
      customAdded: "برگر دست‌سازت به سبد اضافه شد",
      customSuffix: "(دست‌ساز)",
      loadHint: "در حال بارگذاری فریم‌ها… {loaded} از {total}",
      orderGreeting: "سلام {brand}! سفارش من:",
      orderTotal: "جمع کل:",
      footerCopy: "ساخته‌شده با عشق به برگر",
      openCart: "باز کردن سبد خرید",
      closeCart: "بستن سبد",
      decQty: "کم کردن",
      incQty: "زیاد کردن",
      removeItem: "حذف",
      heroVideoLabel: "ویدیوی مونتاژ برگر",
      assemblyLabel: "مونتاژ لایه‌به‌لایه‌ی برگر با اسکرول"
    },
    titles: {
      ingredients: ["مواد ", "تازه", "، هر روز"],
      assembly: ["تماشا کن چطور ", "ساخته", " می‌شه"],
      menu: ["منوی ", "رامین", ""],
      builder: ["برگرت رو ", "خودت", " بساز"]
    },
    stages: [
      "اول، نون تازه‌ی بریوش",
      "بعد، گوشت گریل آتیشی",
      "پنیر چدار آب‌شده",
      "کاهو و گوجه‌ی تازه",
      "و تمام — برگر آماده‌ست"
    ],
    ingredients: {
      bun:     ["نون",   "نون بریوش تازه‌ی داغ"],
      patty:   ["گوشت",  "گوشت گریل آتیشی"],
      cheese:  ["پنیر",  "پنیر چدار آب‌شده"],
      lettuce: ["کاهو",  "کاهوی تازه و ترد"]
    },
    categories: {
      burgers: "برگرها",
      hotdogs: "هات‌داگ",
      pizza: "پیتزا",
      sides: "پیش‌غذا",
      drinks: "نوشیدنی"
    },
    items: {
      b1: "برگر کلاسیک",  b2: "چیزبرگر دوبل",   b3: "برگر قارچ و پنیر", b4: "برگر دودی بیکن",
      h1: "هات‌داگ ویژه",  h2: "هات‌داگ پنیری",
      p1: "پیتزا پپرونی",  p2: "پیتزا مخلوط",
      s1: "سیب‌زمینی",     s2: "سیب‌زمینی ویژه", s3: "ناگت شش‌تکه",
      d1: "نوشابه",        d2: "دلستر",          d3: "آب‌معدنی",        d4: "شیک شکلات"
    },
    extras: {
      e1: "پنیر اضافه", e2: "قارچ", e3: "بیکن", e4: "تخم‌مرغ", e5: "پیاز کاراملی"
    }
  },

  en: {
    dir: "ltr",
    locale: "en-US",
    currency: "Toman",
    listSep: ", ",
    brand: {
      name: "Ramin Burger",
      tagline: "Layer upon layer of flavor, from fire to table",
      description: "Ramin Burger — layer upon layer of flavor, from fire to table. Handcrafted burgers, hot dogs, pizza and sides."
    },
    contact: {
      address: "Address coming soon",
      hours: "Open daily, 12:00–24:00"
    },
    ui: {
      kicker: "Handcrafted Fast Food",
      ctaMenu: "View Menu",
      ctaBuilder: "Build Your Burger",
      scrollHint: "Scroll",
      ingSub: "Only the best — warm buns, grilled beef, melted cheese and fresh vegetables.",
      menuSub: "Whatever you crave, hot and fresh.",
      builderSub: "Pick a base burger, add your extras, watch the price live.",
      stepNum1: "1.",
      stepNum2: "2.",
      step1: "Base Burger",
      step2: "Extra Toppings",
      builderTotalLabel: "Your custom burger total",
      builderAdd: "Add to Cart",
      add: "Add",
      cartTitle: "Cart",
      cartEmpty: "Your cart is empty — pick something from the menu!",
      cartTotal: "Total",
      checkout: "Order via WhatsApp",
      cartNote: "Your order will be sent to us via WhatsApp",
      addedToCart: "\u201C{name}\u201D added to cart",
      customAdded: "Your custom burger was added to cart",
      customSuffix: "(custom)",
      loadHint: "Loading frames… {loaded} of {total}",
      orderGreeting: "Hello {brand}! My order:",
      orderTotal: "Total:",
      footerCopy: "Made with love for burgers",
      openCart: "Open cart",
      closeCart: "Close cart",
      decQty: "Decrease quantity",
      incQty: "Increase quantity",
      removeItem: "Remove item",
      heroVideoLabel: "Burger assembly video",
      assemblyLabel: "Layer-by-layer burger assembly on scroll"
    },
    titles: {
      ingredients: ["", "Fresh", " Ingredients, Every Day"],
      assembly: ["Watch How It's ", "Made", ""],
      menu: ["", "Ramin's", " Menu"],
      builder: ["", "Build", " Your Own Burger"]
    },
    stages: [
      "First, the fresh brioche bun",
      "Then, fire-grilled beef",
      "Melted cheddar cheese",
      "Fresh lettuce & tomato",
      "And done — the burger is ready"
    ],
    ingredients: {
      bun:     ["Bun",     "Fresh warm brioche bun"],
      patty:   ["Beef",    "Fire-grilled beef"],
      cheese:  ["Cheese",  "Melted cheddar"],
      lettuce: ["Lettuce", "Fresh crisp lettuce"]
    },
    categories: {
      burgers: "Burgers",
      hotdogs: "Hot Dogs",
      pizza: "Pizza",
      sides: "Sides",
      drinks: "Drinks"
    },
    items: {
      b1: "Classic Burger",     b2: "Double Cheeseburger", b3: "Mushroom & Cheese Burger", b4: "Smoky Bacon Burger",
      h1: "Special Hot Dog",    h2: "Cheesy Hot Dog",
      p1: "Pepperoni Pizza",    p2: "Mixed Pizza",
      s1: "French Fries",       s2: "Loaded Fries",        s3: "6-Piece Nuggets",
      d1: "Soft Drink",         d2: "Malt Drink",          d3: "Mineral Water",            d4: "Chocolate Shake"
    },
    extras: {
      e1: "Extra Cheese", e2: "Mushrooms", e3: "Bacon", e4: "Egg", e5: "Caramelized Onions"
    }
  },

  ar: {
    dir: "rtl",
    locale: "ar-EG",
    currency: "تومان",
    listSep: "، ",
    brand: {
      name: "برجر رامين",
      tagline: "طبقات من النكهة، من النار إلى الطاولة",
      description: "برجر رامين — طبقات من النكهة، من النار إلى الطاولة. برجر مصنوع يدويًا وهوت دوج وبيتزا ومقبلات."
    },
    contact: {
      address: "العنوان قريبًا",
      hours: "يوميًا من ١٢:٠٠ إلى ٢٤:٠٠"
    },
    ui: {
      kicker: "فاست فود مصنوع يدويًا",
      ctaMenu: "عرض القائمة",
      ctaBuilder: "اصنع برجرك",
      scrollHint: "مرّر",
      ingSub: "الأفضل فقط؛ خبز ساخن ولحم مشوي وجبن ذائب وخضروات طازجة.",
      menuSub: "كل ما تشتهيه، ساخن وطازج.",
      builderSub: "اختر برجر الأساس، أضف إضافاتك، وشاهد السعر مباشرة.",
      stepNum1: "١.",
      stepNum2: "٢.",
      step1: "برجر الأساس",
      step2: "إضافات",
      builderTotalLabel: "مجموع البرجر الخاص بك",
      builderAdd: "أضف إلى السلة",
      add: "أضف",
      cartTitle: "سلة التسوق",
      cartEmpty: "سلتك فارغة — اختر شيئًا من القائمة!",
      cartTotal: "المجموع",
      checkout: "اطلب عبر واتساب",
      cartNote: "سيتم إرسال طلبك إلينا عبر واتساب",
      addedToCart: "تمت إضافة «{name}» إلى السلة",
      customAdded: "تمت إضافة البرجر الخاص بك إلى السلة",
      customSuffix: "(مخصص)",
      loadHint: "جارٍ تحميل الإطارات… {loaded} من {total}",
      orderGreeting: "مرحبًا {brand}! طلبي:",
      orderTotal: "المجموع:",
      footerCopy: "صُنع بحب للبرجر",
      openCart: "فتح سلة التسوق",
      closeCart: "إغلاق السلة",
      decQty: "إنقاص الكمية",
      incQty: "زيادة الكمية",
      removeItem: "حذف العنصر",
      heroVideoLabel: "فيديو تجميع البرجر",
      assemblyLabel: "تجميع البرجر طبقة فوق طبقة بالتمرير"
    },
    titles: {
      ingredients: ["مكونات ", "طازجة", "، كل يوم"],
      assembly: ["شاهد كيف ", "يُصنع", ""],
      menu: ["قائمة ", "رامين", ""],
      builder: ["اصنع ", "برجرك", " بنفسك"]
    },
    stages: [
      "أولًا، خبز البريوش الطازج",
      "ثم، اللحم المشوي على النار",
      "جبن الشيدر الذائب",
      "خس وطماطم طازجة",
      "وانتهى — البرجر جاهز"
    ],
    ingredients: {
      bun:     ["خبز", "خبز بريوش طازج ساخن"],
      patty:   ["لحم", "لحم مشوي على النار"],
      cheese:  ["جبن", "جبن شيدر ذائب"],
      lettuce: ["خس",  "خس طازج مقرمش"]
    },
    categories: {
      burgers: "البرجر",
      hotdogs: "الهوت دوج",
      pizza: "البيتزا",
      sides: "المقبلات",
      drinks: "المشروبات"
    },
    items: {
      b1: "برجر كلاسيك",      b2: "دبل تشيز برجر",        b3: "برجر المشروم والجبن", b4: "برجر البيكن المدخن",
      h1: "هوت دوج سبيشل",     h2: "هوت دوج بالجبن",
      p1: "بيتزا البيبروني",   p2: "بيتزا مشكلة",
      s1: "بطاطس مقلية",      s2: "بطاطس سبيشل",         s3: "ناجتس (٦ قطع)",
      d1: "مشروب غازي",       d2: "مشروب الشعير",        d3: "مياه معدنية",         d4: "ميلك شيك بالشوكولاتة"
    },
    extras: {
      e1: "جبن إضافي", e2: "مشروم", e3: "بيكن", e4: "بيض", e5: "بصل مكرمل"
    }
  }
};
