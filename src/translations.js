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

  en: {
    hp: "HP:        ",
    mood: "Mood:      ",
    fullness: "Fullness:  ",
    examine: "Examine",
    chat: "Chat",
    feed: "Feed",
    care: "Care",
    back: "Back",
    "not-hungry": '"I\'m not hungry."',
    hungry: "You hear their stomach growling.",
    "feels-good": ['"That feels good."', '"It\'s bad, but it feels good!"'],
    emergency: "Emergency in room ",
    room: "Room: ",
    death: [
      "No signs of life...",
      "Their journey ends here.",
      "Death has taken them.",
    ],
    check_health_critical: [
      "Their condition is concerning.",
      "It probably couldn't get much worse.",
      "Something's definitely wrong.",
    ],
    check_mood_critical: [
      "Their eyes are full of sadness.",
      "A silent despair surrounds them.",
      "You feel deep sorrow.",
    ],
    talk: [
      "You talk about the weather.",
      "You learn more about stamp collecting.",
      "They sure are talkative.",
      "Now you know everything about the Sicilian Defense.",
      "You didn’t know European forests were so diverse.",
    ],
    talk_good: [
      "The conversation seems to have lifted their spirits.",
      "They look pleased to have talked.",
      "Their eyes brightened during the conversation.",
      "You helped take their mind off things.",
      "At least you made them laugh.",
    ],
    care_good: [
      "The treatment seems effective.",
      "The symptoms are fading.",
      "It seems to help.",
    ],
    care_bad: [
      "Something's wrong.",
      "You notice a worrying change.",
      "Their reaction to the treatment is troubling.",
    ],

    tips: [
      '"So, how was last night?"',
      '"The problem is, everything takes time, even examining..."',
      '"When I feel their mood is low, I take time to talk with them..."',
      '"With this weather, we’re better off staying here anyway..."',
      '"The worst is when treatment goes wrong!"',
    ],
    rooms_tips: '"Rooms are numbered from left to right, top to bottom."',

    flowers: [
      "They smell quite nice.",
      "Whoever bought this wasn’t very imaginative.",
      "You think it’s a lovely gesture.",
    ],
    end: "Your shift is over, you head home to sleep.",
    score: "Deaths: ",
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
