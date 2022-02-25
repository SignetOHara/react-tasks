// Create a short program that will simulate a fight between two fighters. Each fighter must be created
// using the Fighter constructor function. When creating a new fighter using this function, you need to
// pass to it (all properties, except for the name, must contain a number of points; max number of
// points that can be distributed is 30): ...

export const Task3 = () => {
  const Fighter = (name, strength, agility, vitality) => {
    const baseDamage = 10;
    const baseDefense = 10;
    const baseHp = 50;

    const validate = (attr, name) => {
      if (isNaN(attr)) {
        console.error(`${name} needs to be a number`);
        return;
      }

      if (attr > 30) {
        console.error(
          `${name} can have a maximum of 30 points. Points set to 30`
        );
        return 30;
      }

      return attr;
    };

    const strengthPts = validate(strength, 'Strength');
    const agilityPts = validate(agility, 'Agility');
    const vitalityPts = validate(vitality, 'Vitality');

    let damage = baseDamage + strengthPts * 5 - agilityPts * 3;
    let defense = baseDefense + agilityPts * 5 + strengthPts * 3 + vitalityPts;
    let hp = baseHp + vitalityPts * 10 + strengthPts * 5 + agilityPts * 3;

    const getName = () => name;
    const getHp = () => hp;
    const takeDamage = (damage) => {
      if (damage / defense < 1) {
        hp = hp - 1;
      } else {
        hp = hp - damage / defense;
      }
    };
    const dealDamage = (rival) => rival.takeDamage(damage);

    return { getName, getHp, takeDamage, dealDamage };
  };

  const fighter1 = Fighter('Jeff', 30, 30, 10);
  const fighter2 = Fighter('Bob', 20, 15, 15);

  const fight = (f1, f2) => {
    let winner;
    while (f1.getHp() > 0 && f2.getHp() > 0) {
      f1.dealDamage(f2);
      console.log(`Fighter ${f2.getName()} has ${f2.getHp()} Hp remaining.`);
      if (f2.getHp() <= 0) {
        console.log(`Fighter ${f1.getName()} wins!`);
        winner = f1.getName();
      }
      f2.dealDamage(f1);
      if (f1.getHp() > 0) {
        console.log(`Fighter ${f1.getName()} has ${f1.getHp()} Hp remaining.`);
      } else {
        console.log(`Fighter ${f2.getName()} wins!`);
        winner = f2.getName();
      }
    }

    return `Fighter ${winner} Wins!`;
  };

  return <div>{fight(fighter1, fighter2)}</div>;
};
