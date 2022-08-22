const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.get("/api/settings", (req, res) => {
  const lang = req.query.lang || "en";

  const menu = {
    fa: [
      { title: "فروشگاه", url: "http://shop.irancell.ir/" },
      { title: "محصولات و خدمات", url: "http://shop.irancell.ir/" },
      { title: "جشنواره‌ها", url: "http://shop.irancell.ir/" },
      { title: "پشتیبانی", url: "http://shop.irancell.ir/" },
      { title: "همکاری با ما", url: "http://shop.irancell.ir/" },
      { title: "وبلاگ", url: "http://shop.irancell.ir/" },
      { title: "اخبار", url: "http://shop.irancell.ir/" },
      { title: "ترابرد به ایرانسل", url: "http://shop.irancell.ir/" }
    ],
    en: [
      { title: "Shop", url: "https://shop.irancell.ir/en" },
      { title: "Products and Services", url: "https://shop.irancell.ir/en" },
      { title: "Festivals", url: "https://shop.irancell.ir/en" },
      { title: "Customer Support", url: "https://shop.irancell.ir/en" },
      { title: "Join Us", url: "https://shop.irancell.ir/en" },
      { title: "Blog", url: "https://shop.irancell.ir/en" },
      { title: "News", url: "https://shop.irancell.ir/en" }
    ]
  };

  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(menu[lang]));
});

app.post("/api/validate", (req, res) => {
  const MIN_CHARGE = 10000;
  const MAX_CHARGE = 900000;
  const banks = {
    fa: [
      {
        id: "PSMN",
        title: "بانک سامان",
        imageURL:
          "https://apishop.irancell.ir/static/v2/images/bankIcon/PSMN.png"
      },
      {
        id: "MLT",
        title: "بانک ملت",
        imageURL:
          "https://apishop.irancell.ir/static/v2/images/bankIcon/MLT.png"
      }
    ],
    en: [
      {
        id: "PSMN",
        title: "Pardakht Saman",
        imageURL:
          "https://apishop.irancell.ir/static/v2/images/bankIcon/PSMN.png"
      },
      {
        id: "MLT",
        title: "Mellat Bank",
        imageURL:
          "https://apishop.irancell.ir/static/v2/images/bankIcon/MLT.png"
      }
    ]
  };

  const lang = req.query.lang || "en";
  let errorKey = "";
  const { mobile, email, chargeAmount } = req.body;

  if (!/^09[0-9]{9}$/.test(mobile)) {
    errorKey = "invalidMobile";
  } else if (email && !/^[a-b0-9_]+@[a-z]{2,3}$/i.test(email)) {
    errorKey = "invalidEmail";
  }

  if (!/09[0-9]{9}/g.test(mobile)) {
    errorKey = "invalidMobile";
  } else if (!(MIN_CHARGE <= chargeAmount && chargeAmount <= MAX_CHARGE)) {
    errorKey = "invalidAmount";
  } else if (
    email &&
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  ) {
    errorKey = "invalidEmail";
  }

  if (!errorKey) {
    res.send(JSON.stringify({ valid: true, banks: banks[lang] }));
  } else {
    res.send(JSON.stringify({ valid: false, errorKey }));
  }
});

app.listen(5500);
