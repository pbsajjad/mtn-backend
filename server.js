const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.listen(5000);
