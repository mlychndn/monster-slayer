function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      countAttack: 0,
      winner: null,
      logMessage: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: 0 + "%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: 0 + "%" };
      }
      return { width: this.playerHealth + "%" };
    },
    disableAttack() {
      return this.countAttack % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },

  methods: {
    attackMonster() {
      console.log("attackMonster function is invoked!");
      this.countAttack++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.attackPlayer();
      this.addBattleLogMessage("player", "attack", attackValue);
      console.log(this.winner, this.playerHealth);
    },
    attackPlayer() {
      const attackValue = getRandomValue(15, 8);
      this.playerHealth = this.playerHealth - attackValue;
      this.addBattleLogMessage("monster", "attack", attackValue);
    },
    specialAttack() {
      this.countAttack++;
      const attackValue = getRandomValue(25, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addBattleLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    healAfterAttack() {
      this.countAttack++;
      const healValue = getRandomValue(25, 12);
      if (this.playerHealth >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.addBattleLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    startAgain() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.countAttack = 0;
      this.winner = null;
      this.logMessage = [];
    },
    surrender() {
      this.playerHealth = 0;
      this.winner = "monster";
      this.addBattleLogMessage("player", "surrender", 100);
    },
    addBattleLogMessage(attackBy, action, value) {
      this.logMessage.push({
        attackBy: attackBy,
        action: action,
        value: value,
      });
    },
  },
});

app.mount("#game");
