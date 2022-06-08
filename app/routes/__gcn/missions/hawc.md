---
meta:
  title: GCN - HAWC
---

# High Altitude Water Cherenkov Gamma-Ray Observatory (HAWC)

<img 
  src="/_static/img/hawc-logo.png"
  width="200"
  align="right"
  alt="HAWC logo"
/>

**Start of Full Operations:** March 2015

**End of Operations:** No specific requirement

**Data Archive:**
https://data.hawc-observatory.org/

[The High Altitude Water Cherenkov (HAWC)
Observatory](https://hawc-observatory.org/) is a facility designed to
observe gamma rays and cosmic rays between 100 GeV and 100 TeV. It is
located at Sierra Negra, Mexico, at an altitude of 4100 m. The HAWC
observatory has an instantaneous field of view covering 15% of the
sky, and during each 24 hour period it observes two-thirds of the sky.

**GCN Notice Types in GCN Classic and GCN Classic Over Kafka:**

| Type                 | Contents                       | Latency   |
| -------------------- | ------------------------------ | --------- |
| `HAWC_BURST_MONITOR` | HAWC alert of GRB-like events. | 0.5–1 min |

**Common GCN Circular Types:**

| Type                            | Latency | Example                                                          |
| ------------------------------- | ------- | ---------------------------------------------------------------- |
| IceCube-HAWC subthreshold alert | hours   | [NuEm-211209A](https://gcn.gsfc.nasa.gov/gcn3/31192.gcn3)        |
| HAWC follow-up of a neutrino    | hours   | [IceCube-211208A](https://gcn.gsfc.nasa.gov/gcn3/31199.gcn3)     |
| HAWC follow-up of a GW          | hours   | [LIGO/Virgo S200128d](https://gcn.gsfc.nasa.gov/gcn3/26907.gcn3) |
