---
meta:
  title: GCN - Konus-Wind
---

# Konus-Wind

**Launch Date:** November 1, 1994

**Extended Mission Lifetime:** 2025+ (pending NASA and Roscosmos)

**End of Operations:** No specific requirement (no consumables, no significant degradation)

**Data Archive:**
http://www.ioffe.ru/LEA/kw/index.html

[Konus](http://www.ioffe.ru/LEA/kw/index.html) is a Russian gamma-ray spectrometer covering the 20 keV–20 MeV energy range with near-continuous full sky coverage. It is on-board the NASA [Wind](https://wind.nasa.gov/) spacecraft which orbits around the Earth-Sun L1 Lagrange point. Konus is a key instrument for the InterPlanetary Network. Konus downlink latency is typically one day, determined by scheduling on the Deep Space Network.

**GCN Notice Types in GCN Classic and GCN Classic Over Kafka:**
[Detailed Descriptions and Examples](https://gcn.gsfc.nasa.gov/konus.html)

| Type               | Contents                     | Latency |
| ------------------ | ---------------------------- | ------- |
| `KONUS_Lightcurve` | Trigger info and lightcurves | ~1 day  |

**Common GCN Circular Types:**

| Type                                      | Latency | Example                                                          |
| ----------------------------------------- | ------- | ---------------------------------------------------------------- |
| Observation of a GRB                      | ~1 day  | [GRB 210706A](https://gcn.gsfc.nasa.gov/gcn3/30403.gcn3)         |
| Observation of SGR flares                 | ~1 day  | [SGR 1935+2154](https://gcn.gsfc.nasa.gov/gcn3/30418.gcn3)       |
| Follow-up of a gravitational wave trigger | ~1 day  | [LIGO/Virgo S200129m](https://gcn.gsfc.nasa.gov/gcn3/26979.gcn3) |
| Follow-up of an optical transient         | ~1 day  | [ZTF19abvizsw](https://gcn.gsfc.nasa.gov/gcn3/26197.gcn3)        |

**Konus Yearly Trigger Rates:**

| Type          | Rates   |
| ------------- | ------- |
| GRBs          | 120–130 |
| SGRs          | 0–100   |
| Solare flares | 0–100   |
