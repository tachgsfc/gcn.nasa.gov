import {
  Button,
  CardBody,
  CardFooter,
  CardGroup,
  CardHeader,
  IconClose,
  Tag,
} from '@trussworks/react-uswds'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import type {
  SuggestionComponentProps,
  Tag as ReactTag,
  TagComponentProps,
} from 'react-tag-autocomplete'
import ReactTags from 'react-tag-autocomplete'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => ({
  title: 'GCN - Notices',
})

function NoticeCard({
  children,
  name,
  tags,
  selectedTags,
  href,
}: {
  children: ReactNode
  name: string
  tags: string[]
  selectedTags: string[]
  href: string
}) {
  const tagSet = new Set(tags)
  return selectedTags.length == 0 ||
    selectedTags.every((tag) => tagSet.has(tag)) ? (
    <a
      href={href}
      className="tablet:grid-col-4 usa-card notice-card"
      data-testid="Card"
    >
      <div className="usa-card__container">
        <CardHeader>
          <h3>{name}</h3>
        </CardHeader>
        <CardBody>{children}</CardBody>
        <CardFooter>
          {tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </CardFooter>
      </div>
    </a>
  ) : null
}

function ReactTagComponent({
  tag,
  removeButtonText,
  onDelete,
}: TagComponentProps) {
  return (
    <Tag>
      {tag.name}{' '}
      <Button
        type="button"
        unstyled
        title={removeButtonText}
        onClick={onDelete}
      >
        <IconClose className="margin-left-1 text-bottom" color={'white'} />
      </Button>
    </Tag>
  )
}

function ReactSuggestionComponent({ item }: SuggestionComponentProps) {
  return <Tag>{item.name}</Tag>
}

export default function Notices() {
  const ref = useRef<ReactTags>(null)
  const [tags, setTags] = useState<ReactTag[]>([])
  const suggestions = ['gw', 'gamma', 'nu', 'x-ray', 'uv', 'optical']
  const tagNames = tags.map((tag) => tag.name)

  /// @ts-expect-error: focusInput method is present, but not documented in
  // module definition from @types/react-tag-autocomplete
  useEffect(() => ref.current?.focusInput())

  return (
    <>
      <h1>GCN Notices</h1>
      <p>
        GCN Notices are real-time, machine-readable alerts that are submitted by
        participating facilities and redistributed publicly.
      </p>
      <div className="margin-bottom-2">
        <ReactTags
          onAddition={(tag) => setTags((prevTags) => [...prevTags, tag])}
          onDelete={(i) =>
            setTags((prevTags) => {
              const newTags = prevTags.slice(0)
              newTags.splice(i, 1)
              return newTags
            })
          }
          suggestions={suggestions.map((name) => ({ name, id: name }))}
          tags={tags}
          tagComponent={ReactTagComponent}
          suggestionComponent={ReactSuggestionComponent}
          autoresize={false}
          minQueryLength={1}
          ref={ref}
          placeholderText="Filter by tag"
          delimiters={['Enter', 'Tab', ' ', ',']}
        />
      </div>
      <CardGroup>
        <NoticeCard
          name="LIGO/Virgo/KAGRA"
          href="https://gcn.gsfc.nasa.gov/lvc_events.html"
          tags={['gw']}
          selectedTags={tagNames}
        >
          Gravitational-wave transients detected by the LIGO, Virgo, and KAGRA
          network.
        </NoticeCard>
        <NoticeCard
          name="IceCube"
          href="https://gcn.gsfc.nasa.gov/amon_icecube_gold_bronze_events.html"
          tags={['nu']}
          selectedTags={tagNames}
        >
          High-energy astrophysical neutrino event candidates detected by
          IceCube, aggregated by AMON.
        </NoticeCard>
        <NoticeCard
          name="HAWC"
          href="https://gcn.gsfc.nasa.gov/amon_hawc_events.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          High-energy gamma rays detected by HAWC, aggregated by AMON.
        </NoticeCard>
        <NoticeCard
          name="IceCube–HAWC Coincidences"
          href="https://gcn.gsfc.nasa.gov/amon_nu_em_coinc_events.html"
          tags={['gamma', 'nu']}
          selectedTags={tagNames}
        >
          Coincidences between IceCube neutrino and HAWC gamma-ray events,
          aggregated by AMON.
        </NoticeCard>
        <NoticeCard
          name="IceCube Cascades"
          href="https://gcn.gsfc.nasa.gov/amon_icecube_cascade_events.html"
          tags={['nu']}
          selectedTags={tagNames}
        >
          High-energy cascades detected by IceCube, aggregated by AMON.
        </NoticeCard>
        <NoticeCard
          name="CALET"
          href="https://gcn.gsfc.nasa.gov/calet_triggers.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          Gamma-ray transients detected by the GBM instrument on CALET.
        </NoticeCard>
        <NoticeCard
          name="MAXI"
          href="https://gcn.gsfc.nasa.gov/maxi_grbs.html"
          tags={['x-ray']}
          selectedTags={tagNames}
        >
          X-ray transients detected by the MAXI instrument on the ISS.
        </NoticeCard>
        <NoticeCard
          name="Fermi GBM"
          href="https://gcn.gsfc.nasa.gov/fermi_grbs.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          GRBs detected by the GBM instrument on Fermi.
        </NoticeCard>
        <NoticeCard
          name="Fermi LAT"
          href="https://gcn.gsfc.nasa.gov/fermi_lat_mon_trans.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          Non-GRB gamma-ray transients detected by the LAT instrument on Fermi.
        </NoticeCard>
        <NoticeCard
          name="Swift GRBs"
          href="https://gcn.gsfc.nasa.gov/swift_grbs.html"
          tags={['gamma', 'x-ray', 'uv', 'optical']}
          selectedTags={tagNames}
        >
          GRBs detected by Swift.
        </NoticeCard>
        <NoticeCard
          name="Swift Sub-Threshold"
          href="https://gcn.gsfc.nasa.gov/swift_sub_sub_archive.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          Sub-threshold events detected by Swift.
        </NoticeCard>
        <NoticeCard
          name="Swift BAT Monitor"
          href="https://gcn.gsfc.nasa.gov/bat_mon_alerts.html"
          tags={['gamma', 'x-ray']}
          selectedTags={tagNames}
        >
          Monitoring of known sources by the BAT instrument on Swift.
        </NoticeCard>
        <NoticeCard
          name="Swift Counterpart"
          href="https://gcn.gsfc.nasa.gov/counterpart_tbl.html"
          tags={['x-ray', 'gw']}
          selectedTags={tagNames}
        >
          Swift counterpart candidates of LVK events.
        </NoticeCard>
        <NoticeCard
          name="INTEGRAL GRBs"
          href="https://gcn.gsfc.nasa.gov/integral_grbs.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          GRBs detected by INTEGRAL.
        </NoticeCard>
        <NoticeCard
          name="INTEGRAL SPI-ACS"
          href="https://gcn.gsfc.nasa.gov/integral_spiacs.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          Gamma-ray transients and light curves from the SPI-ACS instrument on
          INTEGRAL.
        </NoticeCard>
        <NoticeCard
          name="AGILE"
          href="https://gcn.gsfc.nasa.gov/agile_grbs.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          GRBs detected by AGILE.
        </NoticeCard>
        <NoticeCard
          name="IPN"
          href="https://gcn.gsfc.nasa.gov/ipn/gcn_ipn_raw.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          Light curves of GRBs detected by instruments that participate in the
          InterPlanetary Network (IPN).
        </NoticeCard>
        <NoticeCard
          name="Konus/WIND"
          href="https://gcn.gsfc.nasa.gov/konus_grbs.html"
          tags={['gamma']}
          selectedTags={tagNames}
        >
          GRBs detected by Konus/WIND.
        </NoticeCard>
        <NoticeCard
          name="MOA"
          href="https://gcn.gsfc.nasa.gov/moa_events.html"
          tags={['optical']}
          selectedTags={tagNames}
        >
          Gravitational microlensing events detected by MOA.
        </NoticeCard>
        <NoticeCard
          name="SNEWS"
          href="https://gcn.gsfc.nasa.gov/snews_trans.html"
          tags={['nu']}
          selectedTags={tagNames}
        >
          Supernova neutrinos reported by the SuperNova Early Warning System
          (SNEWS).
        </NoticeCard>
        <NoticeCard
          name="Super-Kamiokande"
          href="https://gcn.gsfc.nasa.gov/sk_sn_events.html"
          tags={['nu']}
          selectedTags={tagNames}
        >
          Supernova neutrinos detected by Super-Kamiokande.
        </NoticeCard>
        <NoticeCard
          name="IPN GRB Positions"
          href="https://gcn.gsfc.nasa.gov/ipn/gcn_ipn_pos.html"
          tags={['gamma', 'discontinued']}
          selectedTags={tagNames}
        >
          Position estimates of GRBs from IPN.
        </NoticeCard>
        <NoticeCard
          name="IPN Segments"
          href="https://gcn.gsfc.nasa.gov/ipn/gcn_ipn.html"
          tags={['gamma', 'discontinued']}
          selectedTags={tagNames}
        >
          Light curves of GRBs from IPN.
        </NoticeCard>
        <NoticeCard
          name="IceCube HESE"
          href="https://gcn.gsfc.nasa.gov/amon_hese_events.html"
          tags={['nu', 'discontinued']}
          selectedTags={tagNames}
        >
          IceCube high-energy starting events (HESE).
        </NoticeCard>
        <NoticeCard
          name="IceCube EHE"
          href="https://gcn.gsfc.nasa.gov/amon_hese_events.html"
          tags={['nu', 'discontinued']}
          selectedTags={tagNames}
        >
          IceCube extremely high energy (EHE) events.
        </NoticeCard>
        <NoticeCard
          name="Suzaku"
          href="https://gcn.gsfc.nasa.gov/suzaku_wam.html"
          tags={['x-ray', 'discontinued']}
          selectedTags={tagNames}
        >
          X-ray transients detected by the Wide-band All-sky Monitor (WAM) on
          Suzaku.
        </NoticeCard>
        <NoticeCard
          name="RXTE"
          href="https://gcn.gsfc.nasa.gov/rxte_grbs.html"
          tags={['gamma', 'x-ray', 'discontinued']}
          selectedTags={tagNames}
        >
          GRBs detected by RXTE.
        </NoticeCard>
        <NoticeCard
          name="HETE-2"
          href="https://gcn.gsfc.nasa.gov/hete_grbs.html"
          tags={['gamma', 'x-ray', 'discontinued']}
          selectedTags={tagNames}
        >
          GRBs detected by HETE-2.
        </NoticeCard>
        <NoticeCard
          name="MILAGRO"
          href="https://gcn.gsfc.nasa.gov/milagro_trans.html"
          tags={['gamma', 'discontinued']}
          selectedTags={tagNames}
        >
          GRBs detected by MILAGRO.
        </NoticeCard>
        <NoticeCard
          name="BeppoSAX"
          href="https://gcn.gsfc.nasa.gov/sax_grbs.html"
          tags={['x-ray', 'discontinued']}
          selectedTags={tagNames}
        >
          X-ray observations of GRBs by BeppoSAX.
        </NoticeCard>
        <NoticeCard
          name="NEAR"
          href="https://gcn.gsfc.nasa.gov/near_grbs.html"
          tags={['gamma', 'discontinued']}
          selectedTags={tagNames}
        >
          GRBs and gamma-ray transients detected by NEAR.
        </NoticeCard>
        <NoticeCard
          name="ALEXIS"
          href="https://gcn.gsfc.nasa.gov/alexis_trans.html"
          tags={['uv', 'discontinued']}
          selectedTags={tagNames}
        >
          Extreme UV transients detected by ALEXIS.
        </NoticeCard>
        <NoticeCard
          name="Compton BATSE GRBs"
          href="https://gcn.gsfc.nasa.gov/batse_grbs.html"
          tags={['gamma', 'discontinued']}
          selectedTags={tagNames}
        >
          GRBs detected by BATSE on CGRO.
        </NoticeCard>
        <NoticeCard
          name="Compton COMPTEL GRBs"
          href="https://gcn.gsfc.nasa.gov/comptel_grbs.html"
          tags={['gamma', 'discontinued']}
          selectedTags={tagNames}
        >
          GRBs detected by COMPTEL on CGRO.
        </NoticeCard>
        <NoticeCard
          name="Compton Status"
          href="https://gcn.gsfc.nasa.gov/gro/gcn_gro.html"
          tags={['gamma', 'discontinued']}
          selectedTags={tagNames}
        >
          Status of the CGRO spacecraft.
        </NoticeCard>
      </CardGroup>
    </>
  )
}
