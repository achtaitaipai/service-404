export const texts = {
  fr: {
    hp: "PV :      ",
    mood: "Moral :   ",
    fullness: "Satiété : ",
    examine: "Ausculter",
    chat: "Papoter",
    feed: "Nourrir",
    care: "Soigner",
    back: "Retour",
    "not-hungry": '"Je n\'ai pas faim."',
    hungry: "Vous entendez son ventre gargouiller.",
    "feels-good": [
      '"Ça fait du bien."',
      '"C\'est mauvais, mais ça fait du bien !"',
    ],
    emergency: "Urgence en chambre ",
    room: "Chambre: ",
    death: [
      "Plus aucun signe de vie...",
      "Son voyage s'arrête ici.",
      "La mort l'a emporté.",
    ],
    check_health_critical: [
      "Son état est préoccupant.",
      "Pas sûr qu'on puisse aller plus mal que ça.",
      "Quelque chose ne tourne pas rond.",
    ],
    check_mood_critical: [
      "Son regard est lourd de tristesse.",
      "Un désespoir silencieux l'entoure.",
      "Vous ressentez une grande tristesse.",
    ],
    talk: [
      "Vous parlez météo.",
      "Vous en apprenez plus sur la philatélie.",
      "C'est une sacrée pipelette.",
      "A présent vous savez tout de la défense sicilienne.",
      "Vous ignoriez que les forêts européennes étaient si variées.",
    ],
    talk_good: [
      "Il semble que la conversation lui ait fait du bien.",
      "On dirait que ça lui a fait plaisir de discuter.",
      "Ses yeux se sont éclairés au fil de la discussion.",
      "Vous avez réussi à lui changer les idées.",
      "Au moins, vous l'avez fait rire.",
    ],
    care_good: [
      "Le traitement semble efficace.",
      "Les symptômes s'atténuent.",
      "Ça semble lui faire du bien.",
    ],
    care_bad: [
      "Quelque chose cloche.",
      "Vous remarquez un changement inquiétant.",
      "La réaction au traitement est inquiétante.",
    ],

    tips: [
      '"Alors, comment c\'était hier soir ?"',

      '"Le problème, c\'est que tout prend du temps, même ausculter..."',
      "\"Lorsque je sens qu'ils n'ont pas le moral, je prends le temps de discuter avec eux...\"",
      '"Vu le temps qu\'il fait, on est aussi bien ici de toute façon..."',
      '"Le pire, c\'est lorsque le traitement se passe mal !"',
    ],
    rooms_tips:
      '"Les chambres sont numérotées de gauche à droite et de haut en bas."',

    flowers: [
      "Elles sentent plutôt bon.",
      "La personne qui a acheté ça n'avait pas beaucoup d'imagination.",
      "Vous trouvez que c'est une jolie attention.",
    ],
    end: "La relève arrive, vous rentrez vous coucher.",
    score: "Morts: ",
  },
};

/**
 * @typedef {keyof typeof texts} Lang
 */

/**
 * @type {Lang}
 */
let lang = "fr";

/**
 * @param{Lang} value
 */
export function setLang(value) {
  lang = value;
}

export function getLang() {
  return lang;
}

/**
 * @param {keyof typeof texts[Lang]} key
 * @returns {string}
 */
export function t(key) {
  const res = texts[lang][key] ?? key;
  if (typeof res === "string") return res;
  return res[Math.floor(Math.random() * res.length)];
}
