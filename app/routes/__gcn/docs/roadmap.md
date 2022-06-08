---
meta:
  title: GCN - Road Map
---

# Road Map

The following features are coming soon to GCN.

## Unified Schema

The unified schema is a modern and standards-based format for GCN Notices. The schema itself is described in the machine-readable [Apache Avro](https://avro.apache.org) format and the records are serialized as easily parsed JSON records. Similar fields have consistent naming and units across all missions supported by GCN.

## GRB Name Server

In parnership with the [Transient Name Server](https://www.wis-tns.org), the GCN team is building a GRB name server that will allow GRB-detecting instruments to both name GRBs and retreive names of already discovered GRBs. These names will be automatically ingested into GCN and associated with GCN Notices and Circulars for the same event.
