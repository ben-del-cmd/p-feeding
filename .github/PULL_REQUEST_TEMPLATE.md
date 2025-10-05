# PR Title
feat: feeding calc UX — Dog/Cat defaults + basis notes + custom factor & cups precision

## What
- Calc: Dog/Cat defaults (Dog 1.6 / Cat 1.3), factor labels show values
- Basis & Notes (EN/zh), disclaimers
- 7-Day caution bolded
- Copy: cups requirement note
- **New:** custom MER factor (checkbox + number), guarded 0.8–6.0
- **New:** optional density inputs (kcal/100g OR kcal/cup + g/cup) → precise grams/cups; show (est.) when using typical density

## Why
Improve trust & explainability; keep informational boundary; enable precision without forcing inputs.

## Checklist
- [ ] Default language = en; `?lang` + localStorage OK
- [ ] Routes: `#home/#calc/#switch/#feedback`
- [ ] RER=70×kg^0.75; MER=RER×factor
- [ ] Defaults: Dog 1.6 / Cat 1.3; labels show numeric factors
- [ ] Custom factor clamped 0.8–6.0; toggling clears radios
- [ ] Cups only when grams/cup known; otherwise `—`
- [ ] (est.) shown when typical density used
- [ ] Single-file SPA intact; 404 compatibility retained
- [ ] Signed commits; Squash merge
