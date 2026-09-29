import type { Lang } from "./context";

const az = {
  metaTitle: "mooda — sifariş et, evdə yoxla, sonra qərar ver",
  metaDescription: "Bakıda hazırlanan yeni moda alış təcrübəsi. İlk müştərilərdən olun və ilk sifarişinizə 30% açılış endirimi qazanın.",
  skipToContent: "Əsas məzmuna keç",
  homeLabel: "mooda ana səhifəsi",
  topBar: "İlk müştərilər siyahısına qatıl və dünya brendlərində 30%-dək endirim qazan",
  langSwitch: "RU",
  heroKicker: "Dünyanın bütün geyim brendləri indi bir yerdə",
  heroTitle1: "Sifariş et. Evdə yoxla.",
  heroTitle2: "Sonra qərar ver.",
  heroOffer: "Elə indi qeydiyyatdan keç, 30%-dək endirim qazan.",
  heroBody: "Mooda hələ sifariş qəbul etmir. Hazırladığımız xidmətdə məhsulları evdə yoxlayıb yalnız istədiklərinizi alacaqsınız.",
  carouselLabel: "Mooda moda kolleksiyası",
  heroImageAlts: [
    "Açıq rəngli kostyumda qadın model",
    "Tünd pencək və açıq şalvarda kişi model",
    "Çəhrayı don və açıq palto geyinmiş qadın model",
    "Bej pencəkdə kişi model",
    "Açıq trençkot və qara donda qadın model",
  ],
  phone: "Mobil nömrə",
  leadFormLabel: "Erkən giriş üçün mobil nömrə forması",
  leadCta: "Mənə xəbər ver",
  leadSubmitting: "Qeyd edilir…",
  leadPrivacy: "Nömrənizi yalnız açılış xəbəri və 30% endirim kodu üçün istifadə edəcəyik. Hazırda sifariş və ödəniş qəbul etmirik.",
  leadPhoneError: "Nömrəni +994 XX XXX XX XX formatında yazın",
  leadSubmitError: "Nömrə qeyd edilmədi. Bir az sonra yenidən cəhd edin.",
  leadSuccessTitle: "Siz siyahıdasınız",
  leadSuccessBody: "Xidmət açıldıqda sizə xəbər verəcəyik və ilk sifarişiniz üçün 30% endirim kodunu göndərəcəyik.",
  gridTitle: "Açılışda nələri sınaya bilərsiniz",
  gridSubtitle: "Nümunə kolleksiya — məhsullar hazırda satışda deyil",
  productCardCta: "Evdə yoxlamaq üçün maraqlanıram",
  productInterestTitle: "Bu məhsulu evdə yoxlamaq istəyirsiniz?",
  productInterestBody: "Nömrənizi yazın. Xidmət açıldıqda bu məhsul barədə sizə xəbər verək və ilk sifarişinizə 30% endirim tətbiq edək.",
  back: "Geri",
  footer: "mooda — sifariş et, evdə yoxla, bəyəndiyini al. Xidmət hələ aktiv deyil.",
};

export type Dict = typeof az;

const ru: Dict = {
  metaTitle: "mooda — закажите, примерьте дома, затем решите",
  metaDescription: "Новый способ покупать одежду в Баку. Станьте одним из первых клиентов и получите скидку 30% на первый заказ.",
  skipToContent: "Перейти к основному содержанию",
  homeLabel: "Главная страница mooda",
  topBar: "Присоединяйтесь к первым клиентам и получите скидку до 30% на мировые бренды",
  langSwitch: "AZ",
  heroKicker: "Все мировые бренды одежды теперь в одном месте",
  heroTitle1: "Закажите. Примерьте дома.",
  heroTitle2: "Затем решите.",
  heroOffer: "Зарегистрируйтесь сейчас и получите скидку до 30% на мировые бренды.",
  heroBody: "Mooda пока не принимает заказы. В сервисе, который мы готовим, вы сможете примерить товары дома и купить только то, что захотите оставить.",
  carouselLabel: "Модная коллекция Mooda",
  heroImageAlts: [
    "Женская модель в светлом костюме",
    "Мужская модель в тёмной куртке и светлых брюках",
    "Женская модель в розовом платье и светлом пальто",
    "Мужская модель в бежевом пиджаке",
    "Женская модель в светлом тренче и чёрном платье",
  ],
  phone: "Мобильный номер",
  leadFormLabel: "Форма раннего доступа по мобильному номеру",
  leadCta: "Сообщить мне",
  leadSubmitting: "Сохраняем…",
  leadPrivacy: "Используем номер только для новости о запуске и кода на скидку 30%. Сейчас мы не принимаем заказы и оплату.",
  leadPhoneError: "Укажите номер в формате +994 XX XXX XX XX",
  leadSubmitError: "Не удалось сохранить номер. Попробуйте ещё раз чуть позже.",
  leadSuccessTitle: "Вы в списке",
  leadSuccessBody: "Сообщим о запуске и отправим код на скидку 30% для первого заказа.",
  gridTitle: "Что можно будет примерить после запуска",
  gridSubtitle: "Пример коллекции — сейчас товары не продаются",
  productCardCta: "Хочу примерить дома",
  productInterestTitle: "Хотите примерить этот товар дома?",
  productInterestBody: "Оставьте номер. Мы сообщим о запуске, напомним об этом товаре и дадим скидку 30% на первый заказ.",
  back: "Назад",
  footer: "mooda — закажите, примерьте дома и купите то, что понравилось. Сервис пока не запущен.",
};

const dicts: Record<Lang, Dict> = { az, ru };

export function t(lang: Lang): Dict {
  return dicts[lang];
}
