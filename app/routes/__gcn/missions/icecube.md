---
meta:
  title: GCN - IceCube
---

# IceCube

<div className="width-card-lg float-right">
  <img 
    src="/_static/img/icecube-logo.png"
    alt="IceCube logo"
  />
</div>

**Construction Completion Date:** December 17, 2010

**Planned Lifetime:** IceCube Upgrade planned for Winter 2025

**End of Operations:** No specific requirement

**Data Archives:**
https://icecube.wisc.edu/science/data-releases/
https://heasarc.gsfc.nasa.gov/W3Browse/icecube/icecubepsc.html

[IceCube](https://icecube.wisc.edu/) is an all-sky detector at the South Pole which detects high energy neutrinos in the range of 10<sup>10</sup> to 10<sup>21</sup> eV. The University of Wisconsin-Madison is the lead management institute for IceCube. The construction of IceCube, maintenance and operations, and the IceCube Upgrade are supported by the National Science Foundation as well as the Department of Energy, the University of Wisconsin Alumni Research Foundation, Michigan State University, and agencies in Belgium, Germany, Sweden, Japan, and Korea.

**GCN Notice Types in GCN Classic and GCN Classic Over Kafka:**
[Detailed Descriptions and Examples](https://gcn.gsfc.nasa.gov/amon.html)

| Type                        | Latency   | Comments                                     |
| --------------------------- | --------- | -------------------------------------------- |
| `ICECUBE_ASTROTRACK_GOLD`   | 0.5–1 min | Hi-energy single neutrino directions         |
| `ICECUBE_ASTROTRACK_BRONZE` | 0.5–1 min | Hi-energy single neutrino directions         |
| `AMON_NU_EM_COINC`          | 7 hour    | Coincidence of IceCube+HAWC or ANTARES+Fermi |
| `AMON_ICECUBE_CASCADE`      | 0.5–1 min | Direction of a single hi-energy neutrino     |

**Common GCN Circular Types:**

| Type                                             | Latency | Example                                                          |
| ------------------------------------------------ | ------- | ---------------------------------------------------------------- |
| Identification of high energy neutrino candidate | ~1 day  | [IceCube-220524A](https://gcn.gsfc.nasa.gov/gcn3/32102.gcn3)     |
| Follow up of high energy neutrino candidate      | ~1 day  | [IceCube-220524A](https://gcn.gsfc.nasa.gov/gcn3/32114.gcn3)     |
| Follow up of gravitational wave trigger          | ~1 day  | [LIGO/Virgo S200129m](https://gcn.gsfc.nasa.gov/gcn3/26927.gcn3) |

**IceCube Yearly Alert Rates:**

| Type                        | Rate | Radius    |
| --------------------------- | ---- | --------- |
| `ICECUBE_ASTROTRACK_GOLD`   | 12   | 0.2–0.75° |
| `ICECUBE_ASTROTRACK_BRONZE` | 16   | 0.2–0.75° |
| `AMON_NU_EM_COINC`          | 4–8  | 0.2–1°    |
| `AMON_ICECUBE_CASCADE`      | 8    | 2–20°     |
