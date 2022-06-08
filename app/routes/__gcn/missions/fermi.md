---
meta:
  title: GCN - Fermi
---

# Fermi Gamma-ray Space Telescope

<img 
  src="/_static/img/Fermi_Gamma-ray_Space_Telescope_logo.svg"
  width="200"
  align="right"
  alt="Fermi Gamma-ray Space Telescope logo"
/>

**Launch Date:** June 11, 2008

**Extended Mission Lifetime:** 2024+ (Pending NASA Senior Review)

**End of Operations:** No specific requirement (no consumables, no significant degradation)

**Data Archive:**
https://fermi.gsfc.nasa.gov/ssc/data/

[Fermi](https://fermi.gsfc.nasa.gov) is a probe class mission operated by [NASA](https://www.nasa.gov/fermi/) in partnership with DOE, and agencies in Italy, France, Sweden, Japan, and Germany. It surveys the sky over a wide gamma-ray band with two instruments, the LAT and GBM. Both instruments provide alerts to GCN autonomously upon the detection of transients.

| Instruments                                                          | Energy Range       | Field of View | Localization                             |
| -------------------------------------------------------------------- | ------------------ | ------------- | ---------------------------------------- |
| [Large Area Telescope (LAT)](https://glast.sites.stanford.edu)       | 20 MeV–&gt;300 GeV | 2.5 ster      | &leq;1° radius (statistical, 90%)        |
| [Gamma-ray Burst Monitor (GBM)](https://gammaray.msfc.nasa.gov/gbm/) | 8 keV–30 MeV       | 8.8 ster      | ≳1–10° radius (statistical + systematic) |

**GCN Notice Types in GCN Classic and GCN Classic Over Kafka:**
[Detailed Descriptions and Examples](https://gcn.gsfc.nasa.gov/fermi.html)

| Type                  | Contents                                              | Latency  |
| --------------------- | ----------------------------------------------------- | -------- |
| `FERMI_GBM_ALERT`     | Trigger info                                          | ~5 s     |
| `FERMI_GBM_FLT_POS`   | Flight localization, classification                   | ~10 s    |
| `FERMI_GBM_GND_POS`   | Updated ground localization using finer lookup tables | 20–300 s |
| `FERMI_GBM_FIN_POS`   | Final trigger localization                            | 15 min   |
| `FERMI_GBM_SUBTHRESH` | Ground pipeline detected signals                      | 0.5–6 h  |
| `FERMI_LAT_POS_INI`   | Onboard LAT detection, initial position               | 2–4 s    |
| `FERMI_LAT_POS_UPD`   | Updated onboard localization with more data           | 2–32 s   |
| `FERMI_LAT_GND`       | Ground localization of onboard trigger                | 8–12 h   |
| `FERMI_LAT_OFFLINE`   | Ground-detected GRB localization                      | 8–12 h   |
| `FERMI_LAT_TRANS`     | Unknown source transient                              | 1 d      |
| `FERMI_LAT_MONITOR`   | Known source flare                                    | 1 d      |

**Common GCN Circular Types:**

| Type                           | Latency    | Example                                                          |
| ------------------------------ | ---------- | ---------------------------------------------------------------- |
| GBM identification of a GRB    | 15 minutes | [GRB 220530A](https://gcn.gsfc.nasa.gov/gcn3/32147.gcn3)         |
| GBM analysis of a GRB          | 4 hours    | [GRB 220528A](https://gcn.gsfc.nasa.gov/gcn3/32155.gcn3)         |
| LAT observation of a GRB       | 8 hours    | [GRB 220228A](https://gcn.gsfc.nasa.gov/gcn3/31659.gcn3)         |
| GBM subthreshold detection     | 8 hours    | [GRB 220325A](https://gcn.gsfc.nasa.gov/gcn3/31791.gcn3)         |
| GBM observations of SGR flares | 1 day      | [SGR 1935+2154](https://gcn.gsfc.nasa.gov/gcn3/31445.gcn3)       |
| GBM follow-up of GW trigger    | 8 hours    | [LIGO/Virgo S200128d](https://gcn.gsfc.nasa.gov/gcn3/26916.gcn3) |
| LAT follow-up of GW trigger    | 8 hours    | [LIGO/Virgo S200128d](https://gcn.gsfc.nasa.gov/gcn3/26925.gcn3) |
| GBM follow-up of a neutrino    | 8 hours    | [IceCube-211216A](https://gcn.gsfc.nasa.gov/gcn3/31255.gcn3)     |
| LAT follow-up of a neutrino    | 8 hours    | [IceCube-211216A](https://gcn.gsfc.nasa.gov/gcn3/31257.gcn3)     |

**Fermi Yearly Trigger Rates:**

| Instrument | Type                           | Rates |
| ---------- | ------------------------------ | ----- |
| GBM        | Short gamma-ray burst          | 35–40 |
|            | Long gamma-ray burst           | 200   |
|            | Soft gamma-ray repeater flares | 35–40 |
|            | Terrestrial gamma-ray flashes  | 80–90 |
|            | Solar flares                   | 90–95 |
| LAT        | Gamma-ray burst                | 15–20 |

Trigger Rates determined from catalogued information including the [Fermi-GBM Trigger Catalog](https://heasarc.gsfc.nasa.gov/W3Browse/fermi/fermigtrig.html), the [Fermi-GBM GRB Catalog](https://heasarc.gsfc.nasa.gov/W3Browse/fermi/fermigbrst.html), and the [Fermi-LAT GRB Catalog](https://heasarc.gsfc.nasa.gov/W3Browse/fermi/fermilgrb.html).
