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
    title: { az: "Klassik ikidüyməli trençkot", ru: "Классический двубортный тренч" },
    image: IMG + "AB6AXuDhlqOop07UoMWXHdMu7eSd35M7qorm-AA3OQWN3Q-M3KoJSZAAfPwB_xLAhUTTOcIpRjQV6EvLgEaAApN6PtrdWWAHaGjxLHZ0BJrorWYmfBu5_qSTrh9NE5qxbnVgGFBlTuVJ8bmQUiweW6o_G3k4bQtCGuqDLLwmorVFYZPHsVjLmcYSUH1gxtJagMS5niIHWFHoDrfVCplzYkaM1nPLvng4S-TK-tBBEsLT0rScF8XRdUYJH7qIZg",
    alt: { az: "Kəmərli bej ikidüyməli trençkot", ru: "Бежевый двубортный тренч с поясом" },
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
    image: IMG + "AB6AXuASz5MrfIunRKw5pOQNFvZ8x8DS8Iv-9M4uFLvVFo1r-bJ11HRCpvqNl_IeOd9O-hK5C3yyvVKaVShF1NkHMGIUxV-OylraXYa_YPz9gL-wIpd-9zOJVV-HVNHvVIEOO8df3zCdHzVaut1A9Cil8VLBF5pwD2s7uUBEiVoM82g8K1ZjDwF7WVoaZK01dlpJAr1be0l0OvLbNl1RUmHN4rAhnzWv5R-AZ_B8i7XfqfJkkA58ysnyOS6X-Q",
    alt: { az: "Tünd boz yun qadın pencəyi", ru: "Женский шерстяной пиджак тёмно-серого цвета" },
  },
  {
    id: "canta-qara",
    title: { az: "Qızıl tokalı dəri çanta", ru: "Кожаная сумка с золотой застёжкой" },
    image: IMG + "AB6AXuCM0q3401h3JWZzpVf8-Kz-XhMHDvEpH9bmMDaOhw7W0yE4rfSx4FtJIEBsPFluEWasfko7eHZvQXFTun17n5ue-px08VxbV5qF5J6gq0KT6GAGEm8PWxQb8XCJjONJsiPG9j4ahyXio2IA-GUQQqezVpkPqfxps3bcISNhNeZaHhs1SEeOFwXUU0ZeZt1HBe7vZEIW9iO7gNMFwyokiA46rjYvmPdo_sKolv5qdP2heV4dyaPYaetJ2Q",
    alt: { az: "Qızıl tokalı qara hamar dəri çiyin çantası", ru: "Чёрная гладкая кожаная сумка через плечо с золотой застёжкой" },
  },
  {
    id: "don-ipek",
    title: { az: "İpək askılı don", ru: "Шёлковое платье-комбинация" },
    image: IMG + "AB6AXuBuVjxbUUO2cqAHjDxHnLVg8fkcXX52CIs8XbJdjPxWsnTVl_J3cVR2evIrYYCuSSmEgkc4TCa424qNJNrIr2-C9k78467CWXitgY07z7Jf0Q7LdeOF3c6RqwTOCeHyEtlP6Nx38O1n4rQgPXl6TuOIZez6kiXKlUGSe0S99HfRNo3sHzqBYbWjd7hWtLhbYr6Yx7D87WOC4N4w0j2sb2cuPo4NgkbhH4TT45GioTULMdOw1xT3CUL5",
    alt: { az: "Asılqanda fil sümüyü rəngli ipək don", ru: "Шёлковое платье цвета слоновой кости на вешалке" },
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
