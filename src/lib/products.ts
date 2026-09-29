// Nümunə kataloq. Test başlamazdan əvvəl razılaşmış butiklərin real məhsulları,
// fotoları, qiymətləri və ölçüləri ilə əvəzlənir. Şəkillər Stitch maketindəndir.

export type Product = {
  id: string;
  seller: string;
  title: { az: string; ru: string };
  price: number;
  oldPrice?: number;
  sizes: string[];
  image: string;
  alt: string;
};

const IMG = "https://lh3.googleusercontent.com/aida-public/";

export const products: Product[] = [
  {
    id: "trench-bej",
    seller: "Butik A",
    title: { az: "Kətan qarışıqlı klassik trençkot", ru: "Классический тренч из льна" },
    price: 179,
    oldPrice: 229,
    sizes: ["XS", "S", "M", "L"],
    image: IMG + "AB6AXuA7zU_22fVCCYstT0QzfXYuOVJvG5ElR7GRTV6e2E1hUCYOPypALLqHQH66nZXz3JBST24htk9vcgpjK9k3c4qr10BnShiH_Ob38E1MJ7Oq1TRNW3JCrpGm_fvKHqOb-vAmZcI1_SVxs0dzapagAkrgZH3Iwo7UXpUINBD9m4zDnf01EnuhN8Xt8MsLka7kXB2KnK0k3GxlTjysYQC6e1WmF4rUFj_F4iNK3t6l65h_xTB1Q9_h1f4e",
    alt: "Bej rəngli oversize trençkot",
  },
  {
    id: "botilyon-qara",
    seller: "Butik B",
    title: { az: "Zərif dəri qadın botilyonu", ru: "Женские кожаные ботильоны" },
    price: 195,
    sizes: ["36", "37", "38", "39", "40"],
    image: IMG + "AB6AXuD0g2_3LLmVUgioCL3GsZGFockLlT3T3gMBGcfVcV3qZWXrsk8EtPgVCk080PS-m8P2wVVMPWYLeGcUkz5tmgvHV8TMWUgL7LEvIuNubBNbP5B5-NKO9s4E4Wkjjt0nOuUvzjr2gItPsY3j5xJi6enNMo2ds-Uzsb8Bfaaz8gAxzZWwYEW2eG8cdJs4XLTQPcp2J7b89SASS1Q2m1c9NWBiYrqXYXRoSVltf1-mz_lA8gwHxFfW1M7Q",
    alt: "Qara dəri, iti burunlu botilyon",
  },
  {
    id: "pencek-boz",
    seller: "Butik C",
    title: { az: "Yun slim-fit pencək", ru: "Шерстяной пиджак slim-fit" },
    price: 249.5,
    oldPrice: 299,
    sizes: ["46", "48", "50", "52"],
    image: IMG + "AB6AXuBa5j_UCjDuinKSyOo7P50EMiHm0uinol-JhWbqOu0tcKCFS0Fd3MgudVK7t73zJsN4t7bAaVIn0xva3mx_T5tzl9QjU8J6QqvHR9tNK04Py4T3JcxDLIFVUledvhvm88amqEgFR259vMPrB35Su1xv4vOXGyCBty1uF-zgYs7Ie98ObhzjAB6XA0r5nltEC_8L2AvsIOUcQGHOVSPx1-N7KInqh1Md2uWBGmadkf5XJ8EMtLnn2lTz",
    alt: "Tünd boz yun kişi pencəyi",
  },
  {
    id: "canta-qara",
    seller: "Butik A",
    title: { az: "Qapitone dəri çanta", ru: "Стёганая кожаная сумка" },
    price: 144,
    sizes: ["One size"],
    image: IMG + "AB6AXuBgUQG1-ghkJSO6DkeNuxP8UjXcxQAkkDlbm_DRwHOGnXqmZJot2MEmr2v4SBOT1e7-Dzbd22fVUvXAr2N5Q3AgM70yH3q1lxz4MGtv1iwnjj1xDr8QoglwlXiUsfgwP1u5ry521pL-JFlPa5Ljevq5HkhpC2BuqNEJURC6W6m7x_cYEdbeJpAwzaLdzqoSb9fjxW6IKFAs5pry2odGNYEJSQwe73dCQYAoqdQ4AOXh1sHTJb8dKpI_",
    alt: "Qızıl tokalı qara qapitone dəri çanta",
  },
  {
    id: "don-ipek",
    seller: "Butik B",
    title: { az: "Kəsik detallı ipək don", ru: "Шёлковое платье-комбинация" },
    price: 219,
    sizes: ["XS", "S", "M", "L"],
    image: IMG + "AB6AXuDMlsu7ew0PiukdqohE4oHNBfTirb-tRwrfPq1vH4pHXLdI1BA5VfF-T2dallOEMa9dAdfA6nLVjnL-gFrxLeWnAUTuB0Qka_GkmzzoQOMzj2xgiTIXZ4cOGtRoL0ShAEHzSBnhKeE-fITRcpJfqtetEjAOiKeF1GXkkBCF4ZYr_a80Xw6ylzVNcbc154ln-u-jp9T21bVvEsRd4Z2jugq6SZGiAVhh6kwiqSmWjvDTrugKlkdL_L8Z",
    alt: "Fil sümüyü rəngli atlas midi don",
  },
  {
    id: "pencek-qara",
    seller: "Butik C",
    title: { az: "Klassik düz kəsim pencək", ru: "Классический прямой пиджак" },
    price: 159.9,
    sizes: ["S", "M", "L", "XL"],
    image: IMG + "AB6AXuBC_csDr5xLYjv6lg22LfcUlUubRivGYQR1ruobhVqnMFKaUwhsVyko_I8Tg8YCaS9ar9ZzbHRhZ8T3q-SL8o5fMW8yVtiwFJrCptwIpwT1WizeVxMGWh232AxJvKDCcMhctl7CuvJZQrccPut35X_WUlB2Q1ZqPQg_4LIpEGzJdrQjUTaNlyieuk17AK7MBndOMTnJkFf2KWluVAnbtLzZAS4nlgaR6d9m7l6LVwFAx3g6yPjTDWHz",
    alt: "Qara oversize ikidüyməli pencək",
  },
  {
    id: "loafer-qehveyi",
    seller: "Butik A",
    title: { az: "Dəri loafer", ru: "Кожаные лоферы" },
    price: 165,
    sizes: ["40", "41", "42", "43", "44"],
    image: IMG + "AB6AXuC6c0XzLM5soMO2UzP2-VY0CXtDE1WedDf9SFhf4ykXUHoufNW2wKdkGaxmTko0s-oPTI4mifS-YbiWqzZvkav2cDwaclAqcZbo-GLEiWOnjM-fKvp_on9PdzCdfw_M52Jgr1H2JNh30JRTDp7IMtdd88gfZWpoWA__ehrmPGDBh40xNV8GIuHZZfr-ONlU2-RESHg9jypmzrJFYIShlKV8avCXo3zJQ3Lkdcymy1AnQ2djoflwRiZb",
    alt: "Karamel rəngli dəri loafer",
  },
  {
    id: "krossovka-ag",
    seller: "Butik B",
    title: { az: "Minimalist dəri idman ayaqqabısı", ru: "Минималистичные кожаные кеды" },
    price: 189,
    sizes: ["37", "38", "39", "40", "41", "42"],
    image: IMG + "AB6AXuDo6lTtnO5A6xXjgRO6CDerna6nBuQq5udBde2s9NSZUe08D-aJW4ERirnHgRKJiA8xLyJh6IdC1XZxh2Injy2raSl9B4UTsyc8jJWfNL_4qv1SU2tL9EUqqhTwOYyibObIzGetTbTkjpClmtUyDQjxMGv4seRkzFc93nonqUEYv7mIUMmuF_Z7m2ouEoSWYb2mKMfwMT3meZkx6jqCMtiZI-j0YcIe99eN2tbgloS-Mg3yYojV56ym",
    alt: "Ağ dəri minimalist krossovka",
  },
];

export const heroImage = IMG + "AB6AXuBLCY4-wck-tD55eloQmnUquGQzu-wP8sc4HJXUI3uxoatIlwM50lYfXkOe495vd8mkX2rvjk7DY0iJmniJJuLg6Uj2-ofL3WjEWwayEu8fyJ42n_olDqe2aTRRTJ0Rq5aYydxTUyA42XwPdYqA8-583nOdMLbcr2UGc9fNn2h5QJ_ULz271c3T50wtc90hjQuPoBWxzDfpjeDK8suKXdhmsep2GzdgmyB5QgzdJnEmz6UXU6cG8dnz";

// Zona A tarifi: docs-mooda/business/13-decisions-and-risks/delivery-zones.md
const DELIVERY_FEE = 4.9;
const FREE_DELIVERY_FROM = 80;

export function deliveryFee(subtotal: number): number {
  return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatAzn(value: number): string {
  return `${value.toFixed(2)} ₼`;
}
