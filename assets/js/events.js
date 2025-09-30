/* assets/js/events.js — feeding calculator logic (stable) */
(() => {
  "use strict";

  const qs = (s) => document.querySelector(s);

  function toKg(value, unit) {
    const w = Number(value) || 0;
    return unit === "lb" ? w * 0.45359237 : w;
  }

  function rerKg(kg) {
    return kg > 0 ? 70 * Math.pow(kg, 0.75) : 0;
  }

  function activityFactor(kind, pet) {
    // 简化常用倍数；够用且稳定
    const mapDog = { resting: 1.0, normal: 1.6, active: 2.0 };
    const mapCat = { resting: 1.0, normal: 1.2, active: 1.4 };
    return (pet === "cat" ? mapCat[kind] : mapDog[kind]) || 1.6;
    // 兜底 1.6
  }

  function fmt(n, d = 2) {
    return (Number(n) || 0).toFixed(d);
  }

  function calcOnce() {
    const pet = qs("#pet")?.value || "dog";
    const unit = qs("#unit")?.value || "kg";
    const activity = qs("#activity")?.value || "normal";
    const kg = toKg(qs("#weight")?.value, unit);
    const kcalPerCup = Number(qs("#kcalPerCup")?.value) || 350;
    const gramsPerCup = Number(qs("#gramsPerCup")?.value) || 110;

    const rer = rerKg(kg);
    const mer = rer * activityFactor(activity, pet);

    let cups = 0, grams = 0;
    if (kcalPerCup > 0) {
      cups = mer / kcalPerCup;
      grams = cups * gramsPerCup;
    }

    qs("#result").innerHTML =
      `RER: <strong>${fmt(rer,1)}</strong> kcal/day<br>` +
      `MER: <strong>${fmt(mer,1)}</strong> kcal/day<br>` +
      `Daily: <strong>${fmt(cups,2)}</strong> cups ≈ <strong>${fmt(grams,0)}</strong> g`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = qs("#btnCalc");
    if (btn) btn.addEventListener("click", calcOnce);
  });
})();
