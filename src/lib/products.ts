// Konsepti göstərən nümunə kolleksiya. Məhsullar satışda deyil və real kataloq kimi təqdim
// olunmur. Sıra Azərbaycan bazarı araşdırmasına (2026-10-09) əsaslanır: qadın geyimi və
// idman ayaqqabısı önə, tişört, cins və trikotaj sonra; kostyum və polo zəif tələbdir.
// Şəkillər Unsplash-dandır (pulsuz lisenziya), public/products/-dadır; mənbələr CREDITS.md-də.

export type Product = {
  id: string;
  title: { az: string; ru: string };
  image: string;
  alt: { az: string; ru: string };
};

export const products: Product[] = [
  {
    id: "don-qara",
    title: { az: "Qara askılı midi don", ru: "Чёрное платье-комбинация миди" },
    image: "/products/don-qara.webp",
    alt: { az: "Qara askılı midi donda qadın", ru: "Женщина в чёрном платье-комбинации миди" },
  },
  {
    id: "krossovka-ag",
    title: { az: "Ağ dəri krossovka", ru: "Белые кожаные кеды" },
    image: "/products/krossovka-ag.webp",
    alt: { az: "Qara fonda ağ dəri krossovka cütü", ru: "Пара белых кожаных кед на чёрном фоне" },
  },
  {
    id: "tishort-qara",
    title: { az: "Qara pambıq tişört", ru: "Чёрная хлопковая футболка" },
    image: "/products/tishort-qara.webp",
    alt: { az: "Qara sadə tişörtdə kişi", ru: "Мужчина в однотонной чёрной футболке" },
  },
  {
    id: "canta-qara",
    title: { az: "Qara dəri çiyin çantası", ru: "Чёрная кожаная сумка через плечо" },
    image: "/products/canta-qara.webp",
    alt: { az: "Enli qayışlı qara dəri çanta", ru: "Чёрная кожаная сумка с широким ремнём" },
  },
  {
    id: "don-ipek",
    title: { az: "Şampan rəngli atlas don", ru: "Атласное платье цвета шампань" },
    image: "/products/don-ipek.webp",
    alt: { az: "Şampan rəngli atlas midi donda qadın", ru: "Женщина в атласном платье миди цвета шампань" },
  },
  {
    id: "cins-kisi",
    title: { az: "Kişi cinsi", ru: "Мужские джинсы" },
    image: "/products/cins-kisi.webp",
    alt: { az: "Üst-üstə qatlanmış göy cinslər", ru: "Стопка синих джинсов" },
  },
  {
    id: "sviter-qadin",
    title: { az: "Bej toxunma sviter", ru: "Бежевый вязаный свитер" },
    image: "/products/sviter-qadin.webp",
    alt: { az: "Bej iri toxunma sviterdə qadın", ru: "Женщина в бежевом свитере крупной вязки" },
  },
  {
    id: "krossovka-bej",
    title: { az: "İkirəngli dəri krossovka", ru: "Двухцветные кожаные кеды" },
    image: "/products/krossovka-bej.webp",
    alt: { az: "Ağ və bej dəri krossovka", ru: "Кожаные кеды белого и бежевого цвета" },
  },
  {
    id: "cins-qadin",
    title: { az: "Geniş paçalı qadın cinsi", ru: "Женские широкие джинсы" },
    image: "/products/cins-qadin.webp",
    alt: { az: "Geniş paçalı göy cinsdə qadın", ru: "Женщина в широких синих джинсах" },
  },
  {
    id: "sviter-kisi",
    title: { az: "Tünd göy kişi sviteri", ru: "Мужской тёмно-синий свитер" },
    image: "/products/sviter-kisi.webp",
    alt: { az: "Tünd göy sadə sviterdə kişi", ru: "Мужчина в однотонном тёмно-синем свитере" },
  },
  {
    id: "trench-bej",
    title: { az: "Kəmərli bej trençkot", ru: "Бежевый тренч с поясом" },
    image: "/products/trench-bej.webp",
    alt: { az: "Kəmərli bej trençkotda qadın", ru: "Женщина в бежевом тренче с поясом" },
  },
  {
    id: "botilyon-qara",
    title: { az: "Dabanlı qara botilyon", ru: "Чёрные ботильоны на каблуке" },
    image: "/products/botilyon-qara.webp",
    alt: { az: "Nazik dabanlı qara botilyon", ru: "Чёрные ботильоны на тонком каблуке" },
  },
];

// Kolleksiyadan çıxarılmış kartlar: paylaşılmış linklər 404 yox, kolleksiyaya aparır.
const RETIRED = new Set(["pencek-boz", "pencek-qara", "loafer-qehveyi"]);

export function isRetiredProduct(id: string): boolean {
  return RETIRED.has(id);
}

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
