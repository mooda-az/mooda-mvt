// Konsepti göstərən nümunə kolleksiya. Məhsullar satışda deyil; şəkillər
// Stitch maketindəndir və real kataloq kimi təqdim olunmamalıdır.

export type Product = {
  id: string;
  title: { az: string; ru: string };
  image: string;
  alt: { az: string; ru: string };
};

const IMG = "https://lh3.googleusercontent.com/aida-public/";

export const products: Product[] = [
  {
    id: "trench-bej",
    title: { az: "Kətan qarışıqlı klassik trençkot", ru: "Классический тренч из льна" },
    image: IMG + "AB6AXuA7zU_22fVCCYstT0QzfXYuOVJvG5ElR7GRTV6e2E1hUCYOPypALLqHQH66nZXz3JBST24htk9vcgpjK9k3c4qr10BnShiH_Ob38E1MJ7Oq1TRNW3JCrpGm_fvKHqOb-vAmZcI1_SVxs0dzapagAkrgZH3Iwo7UXpUINBD9m4zDnf01EnuhN8Xt8MsLka7kXB2KnK0k3GxlTjysYQC6e1WmF4rUFj_F4iNK3t6l65h_xTB1Q9_h1f4e",
    alt: { az: "Bej rəngli oversize trençkot", ru: "Бежевый тренч свободного кроя" },
  },
  {
    id: "botilyon-qara",
    title: { az: "Zərif dəri qadın botilyonu", ru: "Женские кожаные ботильоны" },
    image: IMG + "AB6AXuD0g2_3LLmVUgioCL3GsZGFockLlT3T3gMBGcfVcV3qZWXrsk8EtPgVCk080PS-m8P2wVVMPWYLeGcUkz5tmgvHV8TMWUgL7LEvIuNubBNbP5B5-NKO9s4E4Wkjjt0nOuUvzjr2gItPsY3j5xJi6enNMo2ds-Uzsb8Bfaaz8gAxzZWwYEW2eG8cdJs4XLTQPcp2J7b89SASS1Q2m1c9NWBiYrqXYXRoSVltf1-mz_lA8gwHxFfW1M7Q",
    alt: { az: "Qara dəri, iti burunlu botilyon", ru: "Чёрные кожаные ботильоны с острым носом" },
  },
  {
    id: "pencek-boz",
    title: { az: "Yun slim-fit pencək", ru: "Шерстяной пиджак slim-fit" },
    image: IMG + "AB6AXuBa5j_UCjDuinKSyOo7P50EMiHm0uinol-JhWbqOu0tcKCFS0Fd3MgudVK7t73zJsN4t7bAaVIn0xva3mx_T5tzl9QjU8J6QqvHR9tNK04Py4T3JcxDLIFVUledvhvm88amqEgFR259vMPrB35Su1xv4vOXGyCBty1uF-zgYs7Ie98ObhzjAB6XA0r5nltEC_8L2AvsIOUcQGHOVSPx1-N7KInqh1Md2uWBGmadkf5XJ8EMtLnn2lTz",
    alt: { az: "Tünd boz yun kişi pencəyi", ru: "Мужской шерстяной пиджак тёмно-серого цвета" },
  },
  {
    id: "canta-qara",
    title: { az: "Qapitone dəri çanta", ru: "Стёганая кожаная сумка" },
    image: IMG + "AB6AXuBgUQG1-ghkJSO6DkeNuxP8UjXcxQAkkDlbm_DRwHOGnXqmZJot2MEmr2v4SBOT1e7-Dzbd22fVUvXAr2N5Q3AgM70yH3q1lxz4MGtv1iwnjj1xDr8QoglwlXiUsfgwP1u5ry521pL-JFlPa5Ljevq5HkhpC2BuqNEJURC6W6m7x_cYEdbeJpAwzaLdzqoSb9fjxW6IKFAs5pry2odGNYEJSQwe73dCQYAoqdQ4AOXh1sHTJb8dKpI_",
    alt: { az: "Qızıl tokalı qara qapitone dəri çanta", ru: "Чёрная стёганая кожаная сумка с золотой застёжкой" },
  },
  {
    id: "don-ipek",
    title: { az: "Kəsik detallı ipək don", ru: "Шёлковое платье-комбинация" },
    image: IMG + "AB6AXuDMlsu7ew0PiukdqohE4oHNBfTirb-tRwrfPq1vH4pHXLdI1BA5VfF-T2dallOEMa9dAdfA6nLVjnL-gFrxLeWnAUTuB0Qka_GkmzzoQOMzj2xgiTIXZ4cOGtRoL0ShAEHzSBnhKeE-fITRcpJfqtetEjAOiKeF1GXkkBCF4ZYr_a80Xw6ylzVNcbc154ln-u-jp9T21bVvEsRd4Z2jugq6SZGiAVhh6kwiqSmWjvDTrugKlkdL_L8Z",
    alt: { az: "Fil sümüyü rəngli atlas midi don", ru: "Атласное платье миди цвета слоновой кости" },
  },
  {
    id: "pencek-qara",
    title: { az: "Klassik düz kəsim pencək", ru: "Классический прямой пиджак" },
    image: IMG + "AB6AXuBC_csDr5xLYjv6lg22LfcUlUubRivGYQR1ruobhVqnMFKaUwhsVyko_I8Tg8YCaS9ar9ZzbHRhZ8T3q-SL8o5fMW8yVtiwFJrCptwIpwT1WizeVxMGWh232AxJvKDCcMhctl7CuvJZQrccPut35X_WUlB2Q1ZqPQg_4LIpEGzJdrQjUTaNlyieuk17AK7MBndOMTnJkFf2KWluVAnbtLzZAS4nlgaR6d9m7l6LVwFAx3g6yPjTDWHz",
    alt: { az: "Qara oversize ikidüyməli pencək", ru: "Чёрный двубортный пиджак свободного кроя" },
  },
  {
    id: "loafer-qehveyi",
    title: { az: "Dəri loafer", ru: "Кожаные лоферы" },
    image: IMG + "AB6AXuC6c0XzLM5soMO2UzP2-VY0CXtDE1WedDf9SFhf4ykXUHoufNW2wKdkGaxmTko0s-oPTI4mifS-YbiWqzZvkav2cDwaclAqcZbo-GLEiWOnjM-fKvp_on9PdzCdfw_M52Jgr1H2JNh30JRTDp7IMtdd88gfZWpoWA__ehrmPGDBh40xNV8GIuHZZfr-ONlU2-RESHg9jypmzrJFYIShlKV8avCXo3zJQ3Lkdcymy1AnQ2djoflwRiZb",
    alt: { az: "Karamel rəngli dəri loafer", ru: "Кожаные лоферы карамельного цвета" },
  },
  {
    id: "krossovka-ag",
    title: { az: "Minimalist dəri idman ayaqqabısı", ru: "Минималистичные кожаные кеды" },
    image: IMG + "AB6AXuDo6lTtnO5A6xXjgRO6CDerna6nBuQq5udBde2s9NSZUe08D-aJW4ERirnHgRKJiA8xLyJh6IdC1XZxh2Injy2raSl9B4UTsyc8jJWfNL_4qv1SU2tL9EUqqhTwOYyibObIzGetTbTkjpClmtUyDQjxMGv4seRkzFc93nonqUEYv7mIUMmuF_Z7m2ouEoSWYb2mKMfwMT3meZkx6jqCMtiZI-j0YcIe99eN2tbgloS-Mg3yYojV56ym",
    alt: { az: "Ağ dəri minimalist krossovka", ru: "Белые минималистичные кожаные кеды" },
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
