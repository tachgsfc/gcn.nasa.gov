---
meta:
  title: GCN - LIGO/Virgo/KAGRA
---

# Gravitational Wave Network

<div className="width-card-lg float-right">
  <img 
    src="/_static/img/lsc-logo.png"
    alt="LIGO logo"
  />
  <img 
    src="/_static/img/virgo-logo.png"
    alt="Virgo logo"
  />
  <img 
    src="/_static/img/kagra-logo.png"
    alt="KAGRA logo"
  />
</div>

**Planned Lifetime:** 2028+

**End of Operations:** No specific requirement

**Data Archive:**
https://www.gw-openscience.org

LIGO, Virgo, and KAGRA comprise the advanced gravitational wave detector network. [LIGO](https://www.ligo.org/) is operated by the National Science Foundation, [Virgo](https://www.virgo-gw.eu/) by the European Gravitational Wave Observatory, and [KAGRA](https://gwcenter.icrr.u-tokyo.ac.jp/en/) by the ministry of Education, Culture, Sports, Science and Technology-Japan (MEXT). Together they detect, localize, and characterize the coalescence of compact binary mergers, continuous gravitational waves, and burst gravitational waves.

| Interferometers                                                                        | Location                                       | Size | Joined GW Network | BNS Range (O4) |
| -------------------------------------------------------------------------------------- | ---------------------------------------------- | ---- | ----------------- | -------------- |
| [Laser Interferometer Gravitational-Wave Observatory (LIGO)](https://www.ligo.org)     | Hanford, WA, USA Livingston, LA, USA           | 5 km | 2015              | 160-190 Mpc    |
| [Virgo Gravitational Wave Interferometer (Virgo)](https://www.virgo-gw.eu)             | Pisa, Italy                                    | 3 km | 2017              | 90-120 Mpc     |
| [Kamioka Gravitational Wave Detector (KAGRA)](https://gwcenter.icrr.u-tokyo.ac.jp/en/) | Kamioka-cho, Hida-city, Gifu-prefecture, Japan | 3 km | 2020              | 25-230 Mpc     |

<img
  src="https://observing.docs.ligo.org/plan/_images/ObsScen_timeline.png"
  width="650"
  aligh="center"
  alt="LVK Observing Timeline"
/>

**GCN Notice Types in GCN Classic and GCN Classic Over Kafka:**
[Detailed Descriptions and Examples](https://gcn.gsfc.nasa.gov/lvc.html)

| Type              | Contents                                                                                      | Latency  |
| ----------------- | --------------------------------------------------------------------------------------------- | -------- |
| `LVC_PRELIMINARY` | First Notice, Timestamp Alert, location probability sky map; all automated processing.        | 1–10 min |
| `LVC_INITIAL`     | Improved SkyMap now available (human-involved procesing).                                     | 4–24 h   |
| `LVC_UPDATE`      | Ultimate refined skymap (more detailed off-line processing).                                  | ~1–7 d   |
| `LVC_RETRACTION`  | After human analysis/evaluation, a retraction will be issued if trigger is not astrophysical. | 1 h–1 d  |

**Common GCN Circular Types:**

| Type                                     | Latency | Example                                                          |
| ---------------------------------------- | ------- | ---------------------------------------------------------------- |
| Identification of a GW trigger           | 1 hour  | [LIGO/Virgo S191105e](https://gcn.gsfc.nasa.gov/gcn3/26182.gcn3) |
| Updated sky localization of a GW trigger | days    | [LIGO/Virgo S191105e](https://gcn.gsfc.nasa.gov/gcn3/26245.gcn3) |
| Retraction of a GW trigger               | days    | [LIGO/Virgo S191117j](https://gcn.gsfc.nasa.gov/gcn3/26254.gcn3) |

**Predicted Detection Rates for O4:**

| Merger Class            | Detection Rates per Calendar Year | Area [deg<sup>2</sup>] |
| ----------------------- | --------------------------------- | ---------------------- |
| Binary Neutron Star     | 10 (0–62)                         | 33 (28–38)             |
| Neutron Star-Black Hole | 1 (0–92)                          | 50 (42–58)             |
| Binary Black Hole       | 79 (35–168)                       | 41 (35–48)             |

O4 predictions from [Abbott et al. 2020, LRR](https://link.springer.com/article/10.1007/s41114-020-00026-9). Uncertainties are the 90% confidence interval, including Poisson uncertainty. This document is updated periodically for future observing runs.
