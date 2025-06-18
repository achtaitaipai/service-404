import { createGame } from "https://www.unpkg.com/odyc";
import {
  chance,
  clamp,
  genSprite,
  getStatusText,
  pick,
  randInt,
} from "./src/utils.js";
import { getLang, setLang, t, texts } from "./src/translations.js";

const MAX_TURN = 100000;
// const MAX_TURN = 100;

/**@type {number}*/
let tipIndex;
/**@type {number}*/
let roomIndex;
/**@type {Set<number>}*/
let emergencies;
/**@type {number}*/
let deceased;

setup();

function setup() {
  tipIndex = -1;
  roomIndex = 0;
  emergencies = new Set();
  deceased = 0;
}

const nurseSprite = () => {
  const c = pick(8, 9, 5);
  const h = pick(0, 1, 6);

  return `
			...33...
			..3333..
			..${h}${c}${c}${h}..
			.333333.
			3.3333.3
			${c}.3333.${c}
			..3..3..
			..0..0..
			`;
};

const game = createGame({
  background: 2,
  player: {
    sprite: nurseSprite(),
    position: [9, 23],
  },
  templates: {
    c: () => {
      const tips = texts[getLang()].tips;
      tipIndex = (tipIndex + 1) % tips.length;
      let hasTalk = false;

      return {
        sprite: nurseSprite(),

        onScreenLeave(target) {
          if (hasTalk) target.remove();
        },

        onCollide() {
          game.openDialog(texts[getLang()].tips[tipIndex]);
          hasTalk = true;
        },
      };
    },
    C: {
      sprite: nurseSprite(),
      onCollide() {
        game.openDialog(t("rooms_tips"));
      },
    },
    h: {
      sprite: `
			11111111
			11114111
			11114111
			11114444
			11114111
			11114111
			11111111
			11111111
			`,
    },
    H: {
      sprite: `
			11111111
			11141111
			11141111
			44441111
			11141111
			11141111
			11111111
			11111111
			`,
    },
    d: {
      sprite: 0,
      onCollide() {
        const [x] = game.player.position;
        game.player.position = [x, 16];
      },
    },
    D: {
      sprite: 0,
      onCollide() {
        const [x] = game.player.position;
        game.player.position = [x, 21];
      },
    },
    x: {
      sprite: 1,
    },
    "^": {
      sprite: 3,
    },
    b: {
      sprite: `
		  99999999
		  95555559
		  15555551
		  15555551
		  11111111
		  66666666
		  66666666
		  66666666
	  `,
    },
    B: {
      sprite: `
		  66666666
		  66666666
		  99999999
		  9......9
		  ........
		  ........
		  ........
		  ........
		  ........
	  `,
      solid: false,
    },
    "<": {
      sprite: `
			00......
			00......
			00......
			00......
			00......
			00......
			00......
			00......
			`,
      solid: false,
    },
    n: () => {
      const room = roomIndex + 1;
      let sprite =
        room % 2 === 0
          ? `
			11111111
			41111111
			11111111
			11111111
			11111111
			11111111
			11111111
			11111111
			`
          : `
			11111111
			11111111
			11111111
			11111111
			11111111
			11111111
			11111114
			11111111
			`;
      return {
        sprite,
        onTurn(target) {
          if (!emergencies.has(room)) {
            target.sprite = 1;
          } else target.sprite = game.turn % 2 === 0 ? sprite : "1";
        },
      };
    },
    ">": {
      sprite: `
			......00
			......00
			......00
			......00
			......00
			......00
			......00
			......00
			`,
      solid: false,
    },
    t: () => {
      const tvOn = `
			11111111
			00000000
			07722660
			06072550
			00805560
			08885880
			00000000
			11111111
			`;
      const tvOff = ` 
			11111111
			00000000
			02222220
			02222220
			02222220
			02222220
			00000000
			11111111
			`;
      return {
        sprite: pick(tvOn, tvOff),
        sound: ["BLIP", 36],
        onCollide(t) {
          t.sprite = t.sprite === tvOn ? tvOff : tvOn;
        },
      };
    },
    f: {
      sprite: `
			........
			...717..
			.171517.
			15171717
			.1717151
			..15171.
			...199..
			...999..
			`,
      onCollide() {
        game.openDialog(t("flowers"));
      },
    },
    p: patient,
  },
  map: `
  xxxxxx  xxxxxx  xxxxxx
  xb...x  x....x  x...bx
  xB...x  n....x  x...Bx
  x.p..>  <....>  <....x
  x....x  x....n  x..p.x
  xxtxxx  x....x  xxtxxx

  xxxxxx  x....x  xxxxxx
  xb...x  n...cx  x...bx
  xB...>  <....>  <...Bx
  x..p.x  x....n  x....x
  x....x  x....x  x.pf.x
  xxxxxx  x....x  xxxxxx

  xxxxxx  x....x  xxtxxx
  xb..fx  n....x  x...bx
  xB...>  <....>  <...Bx
  x..p.x  x....n  x.p..x
  x....x  x....x  x....x
  xxxxxx  xxDDxx  xxxxxx


  xxxxxx	^xhHx^  xxxxxx
	xxxxxx	xxxxxx  xxxxxx
  xxxxxx	xxddxx  xxxxxx
  xxxxxx	....C.  xxxxxx
  xxxxxx	......  xxxxxx
  xxxxxx	......  xxxxxx
  `,
  screenWidth: 6,
  screenHeight: 6,
  dialogInternvalMs: 10,
});

/**@returns {import('odyc').Template<'p'>}*/
function patient() {
  {
    /**@type {number} */
    let hp;
    /**@type {number} */
    let mood;
    /**@type {number} */
    let fullness;

    /**@type {boolean} */
    let called;
    /**@type {boolean} */
    let death;
    /**@type {boolean} */
    let firstTalk;
    const room = ++roomIndex;

    const init = () => {
      hp = randInt(40, 75);
      mood = randInt(40, 75);
      fullness = randInt(60, 100);
      called = false;
      death = false;
      firstTalk = false;
    };

    init();

    const examine = async () => {
      const message = [
        t("hp") + makeBar(hp),
        t("mood") + makeBar(mood),
        t("fullness") + makeBar(fullness),
      ].join("\n\n");
      game.openMessage(message);
    };

    /**
     * @param {number} value
     */
    const makeBar = (value) => {
      value = clamp(0, value, 100);
      const fullBar = "██████████";
      const color = getStatusText(value, ["<4>", "<6>", "<5>", "<7>"]);
      const score = Math.round(value / fullBar.length);
      return (
        color + fullBar.slice(0, score).padEnd(fullBar.length, "░") + color
      );
    };

    const feed = async () => {
      if (fullness >= 90) {
        await game.openDialog(t("not-hungry"));
        mood -= randInt(10);
        return;
      }
      fullness = 100;
      await game.openDialog(t("feels-good"));
    };

    const chat = async () => {
      let dialog = [t("talk")];

      const goodTalk = chance(9 / 10) || chance(mood / 100);

      if (goodTalk) {
        mood += randInt(5, 20);
        dialog.push(t("talk_good"));
      }

      await game.openDialog(dialog.join("|"));
    };

    const care = async () => {
      const good = chance(14 / 15);
      if (good) {
        hp += randInt(15, 25);
        await game.openDialog(t("care_good"));
      } else {
        hp = Math.max(hp - 5, hp / 2);
        await game.openDialog(t("care_bad"));
      }
    };

    const clampValues = () => {
      hp = clamp(0, hp, 100);
      mood = clamp(0, mood, 100);
      fullness = clamp(0, fullness, 100);
    };

    /**
     * @param {import('odyc').EventTarget} target
     */
    const checkDeath = (target) => {
      if (hp > 0) return false;
      game.playSound("FALL", 93);
      game.openMessage(t("death"));
      emergencies.delete(room);
      target.visible = false;
      target.solid = false;
      death = true;
      deceased++;
      return true;
    };

    const check = async () => {
      if (!firstTalk) return;
      let dialog = [];

      if (fullness < 50) dialog.push(t("hungry"));
      if (hp < 30) dialog.push(t("check_health_critical"));
      if (mood < 30) dialog.push(t("check_mood_critical"));

      if (dialog.length) await game.openDialog(dialog.join("|"));
      firstTalk = true;
    };

    return {
      sprite: genSprite(8, 8),

      async onScreenEnter() {
        game.getAll("c").forEach((el) => el.remove());
        game.addToCell(pick(7, 10), pick(2, 4, 7, 9, 13, 15), "c");
      },

      async onCollide(target) {
        console.log(game.turn);
        if (checkDeath(target)) return;

        check();

        /**@type {string[]}*/

        await game.openMenu({
          [t("examine")]: examine,
          [t("chat")]: chat,
          [t("feed")]: feed,
          [t("care")]: care,
          [t("back")]: null,
        });
        checkDeath(target);
        clampValues();
      },

      onScreenLeave(target) {
        firstTalk = false;
        if (!death) return;
        target.sprite = genSprite(8, 8);
        target.visible = true;
        target.solid = true;
        init();
      },

      async onTurn(target) {
        fullness -= 1 / 2;

        if (chance(1 - hp / 100) || chance(1 - mood / 100))
          hp -= (Math.random() * 1) / 2;

        if (chance(1 - hp / 100) || chance(1 - mood / 100))
          mood -= (Math.random() * 1) / 2;

        if (fullness < 25) {
          hp -= 2 / 3;
          mood -= 2 / 3;
        }

        clampValues();

        if (hp > 15) {
          called = false;
          emergencies.delete(room);
        } else if (!called && !target.isOnScreen) {
          await game.openDialog(`°<4>${t("emergency")}${room}<4>°`);
          emergencies.add(room);
          called = true;
        }
        console.log(game.turn);
        if (game.turn > MAX_TURN) {
          setup();
          game.end(t("end"), t("score") + deceased, "_Service 404_");
        }
      },
    };
  }
}

await game.openMessage("_Service 404_");
await game.openMenu({
  English: () => setLang("en"),
  Français: () => setLang("fr"),
});
