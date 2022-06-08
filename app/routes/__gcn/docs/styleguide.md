---
meta:
  title: GCN - Circulars Style Guide
---

## Style Guide

Every Circular begins with the header information. In the example below the Title, Number, Date, and From are added automatically by the GCN system. The GCN Circular Subject is taken from the email subject line from the submission process.

The body of the email contains, in order, the author list, the scientific content, and then references or acknowledgements when necessary. Note below the submitter is an email from Kim Page, which is distinct from the lead author of J.D. Gropp.

```text
TITLE:   GCN CIRCULAR
NUMBER:  32060
SUBJECT: GRB 220518A: Swift detection of a burst
DATE:    22/05/18 06:47:24 GMT
FROM:    Kim Page at U.of Leicester  <kimlpage1978@gmail.com>

J.D. Gropp (PSU), K. L. Page (U Leicester),
T. M. Parsotan (GSFC/UMBC/CRESSTII), B. Sbarufatti (PSU) and
M. H. Siegel (PSU) report on behalf of the Neil Gehrels Swift
Observatory Team:

At 06:19:20 UT, the Swift Burst Alert Telescope (BAT) triggered and
located GRB 220518A (trigger= 1107050).  Swift slewed immediately to the burst.
The BAT on-board calculated location is
RA, Dec 55.369, -47.571 which is
   RA(J2000) = +03h 41m 29s
   Dec(J2000) = -47d 34' 15"
with an uncertainty of 3 arcmin (radius, 90% containment, including
systematic uncertainty).  There are currently no BAT light curve data available
at this time.

The XRT began observing the field at 06:21:27.1 UT, 126.4 seconds after
the BAT trigger. Using promptly downlinked data we find an uncatalogued
X-ray source with an enhanced position: RA, Dec 55.34297, -47.58392
which is equivalent to:
   RA(J2000)  = 03h 41m 22.31s
   Dec(J2000) = -47d 35' 02.1"
with an uncertainty of 1.9 arcseconds (radius, 90% containment). This
location is 78 arcseconds from the BAT onboard position, within the BAT
error circle. This position may be improved as more data are received;
the latest position is available at https://www.swift.ac.uk/sper.

A power-law fit to a spectrum formed from promptly downlinked event
data gives a column density in excess of the Galactic value (9.33 x
10^19 cm^-2, Willingale et al. 2013), with an excess column of 5
(+3.25/-2.72) x 10^21 cm^-2 (90% confidence).

UVOT took a finding chart exposure of 150 seconds with the White filter
starting 129 seconds after the BAT trigger. No credible afterglow candidate has
been found in the initial data products. The 2.7'x2.7' sub-image covers none of
the XRT error circle. The 8'x8' region for the list of sources generated
on-board covers 100% of the XRT error circle. The list of sources is typically
complete to about 18 mag. No correction has been made for the expected
extinction corresponding to E(B-V) of 0.008.

Burst Advocate for this burst is J.D. Gropp (jdg44 AT psu.edu).
Please contact the BA by email if you require additional information
regarding Swift followup of this burst. In extremely urgent cases, after
trying the Burst Advocate, you can contact the Swift PI by phone (see
Swift TOO web site for information: http://www.swift.psu.edu/)
```

The above Circular is a great example only the relevant information in the title and the content. Swift detection Circulars are generally longer than the style guide recommends due to reporting infrmation from three unique instruments, in this case two detections and one non-detection.

This style guide contains information on how to properly prepare a GCN Circular for submission. Before your first submission, and especially when creating templates, please follow the guidlines below.

- **One Event per Circular:** Each message should be limited to discussion of a single event, i.e. a GRB or a GW. Reporting multiple candidate counterparts is acceptable as this is observations specific to a single event. If you have observations on more than one event then you must divide them into multiple submissions. This allows for automated grouping of circulars by individual event.
- **Near-Term**: Circulars must be timely. Their content must be relevant to inform potential additional observations for that specific event. A nominal working definition is a few weeks which is generally sufficient for GRBs and kilonovae; however, long-evolving transients allow for longer term consideration (e.g. the afterglow of GRB 170817A).
- **Just the Facts:** Submitters are discouraged from editorializing, debating, critiquing, etc other people's work and reports. This is not a "discussion group" nor a "chat room". Limit your submissions to just the facts of your observations, the conclusions to be drawn from your observations, plans for future observations, & requests for correlated efforts with the rest of the community. However, if your observations are in disagreement with another observation, you can of course discuss these differences in your Circular.
- **Writing Style:** Please remember that this media (e-mail) does not lend itself to a wide latitude of inter-personal communications. That is to say, the reader does not have access to the writer's "tone of voice", facial expressions, nor (in some cases) knowledge of the writer's personality. So a casually used phrase might be taken the wrong way by the reader. Please keep your writing style to that used in scientific journals.
- **Quality of Content:** It is understood by everyone in the GCN/GRB/transient community that these reports are preliminary. While everyone makes their best attempt to submit accurate reports, these reports are also timely, based on preliminary analysis, and may be subject to change when the full analysis is done months later. See the "Corrections" section below.

### Scope

Acceptable content for the GCN Circulars falls within only four areas:

- **Observations:** A brief report on new observations, including observing conditions, analysis methods, and conclusions. Comparison with previously reported results is acceptable, simply critique or editorialize another's report. Significant hanges in analysis, interpretation, or results of previous data can be reported in an additional Circular.
- **Quantitative Near-Term Predictions:** Circulars which contain theory or model-based predictions on future expectations are acceptable only when they contain quantitiave predictions with a confidence level and are relevant in the near-term (defined below). This is necessary both to guide the submitter to consider their certitude and to inform observers who may use this information. Specific good examples:
  - "the OT will brighten in the I-band by 0.5-2 mags in the next 3-5 days"
  - "the probability of a repeated lensed event is less than 10% in the next 2 weeks, but if it happens it will be about 3 arcsec to the north of the current OT position"
  - "to separate the X & Y models, the observations must be made in the I & R bands and should be taken hourly".
- **Requests for Correlated or Cooperative Observations:** Requests for observations to be made by others for coordinated follow-up across wavelengths, in response to local bad weather, the need for longer-term monitoring, etc.
- **Future Plans:** Sites can make statements about future plans for observations. An example would be "HST will image the OT plus host galaxy to X-th mag Y days from now (and the data will be made available to the public within Z hours)".

### Message Content

- **Subject-line Format:** The subject line in your submission should describe the event being discussed (e.g. GRB YYMMDDa, SYYMMDDa, ATYYYYxyz), the observation (e.g. Fermi-GBM, LIGO/Virgo/KAGRA, VLA, etc), and a description of the results (e.g. discovery, detection, upper limits, etc). The Circular subject line is "SUBJECT:" prepended to your email subject. Automatic subject-line filters are in place to prevent spam Circulars (e.g. rejecting all subject lines with "RE:", "vacation", "?", etc).
- **Contact Information:** You can list "contact" information (e.g. phone number(s) & e-mail address(s), especially if different than the address that appears in the by-line) to allow the reader to contact you for further communications. However, ensure email signatures are not sent in the email content for your circular.
- **Total Length:** Circular submissions should be brief, generally less than 60 lines, as they must be easily digestable by observers for prompt follow-up. The text must contain the salient information for follow-up.
- **URLs & Tables:** It is acceptable to provide a URL in cases where content does not fit within the Style Guide. The URL must be active at the time of Circular submission. Examples include reports of many observations, images or spctra, or detailed descriptions of model assumptions for predictive circulars. However, see "Dont's" below.
- **Tabs and Special Characters:** The use of tabs in producing tables is cautioned, because the recipient may have a different tab-stop setting than the one you used (tabstops of 4 and 8 spaces are common). The use of special characters (e.g. control characters) is strongly discouraged, as well are any formatting type directives (e.g. LaTeX, \*roff, MSWord, etc), since it is extremely unlikely that the reader will have access to these formatting packages, especially at remote locations like telescope domes, etc. And do not include question marks ("?") in the Subject line. And for things like exponentiation, please use techniques like: 1.2x10^-11 erg/cm2-s or 1.2x10E-11 erg/cm^2-s, etc.
- **Line Length:** People are encouraged to keep the line length to about 70-75 characters. The use of proportional fonts when composing a circular is discouraged. The reason being that when read by people using fixed-width fonts (a common choice) the line lengths come out a little longer, and as a result strange 1 or 2-word orphaned lines come out.
- **Line Breaks:** It is now getting common that people use mailers with an editor window that automatically inserts line breaks on the screen. However, these line breaks are not actually in the message. As such, when they are received/read by people using simple-text displays, they appear as one long giant line that wraps on their screens at strange places. Please insert explicit line-breaks into your text when composing the circular.
- **MIME/Mailer Stuff:** The processing of the incoming circular submissions is now MIME-compliant. That means any HTML-ized duplicates attached will be ignored -- only the plain_text version will be distributed. Attachments will also be deleted from the outgoing distribution.

### Referencing, Citations, and Acknowledgements

- **References:** References to previous GCN Circulars on an event are required; references to external articles are acceptable. References to previous GCN Circulars should be of the form "J. Doe, et al., GCN Circ. 270" or "J. Doe, et al., GCN Circ. 270, 1998". Note "J. Doe" should be the first author of the Circular, which sometimes differs from the submitter (the FROM-line entry). References to journal articles, books, etc, follow the standard conventions and formats.
- **Support Acknowledgements:** It is quite acceptable to included statements acknowledging support (eg "This work was supported by XYZ Grant #1234." or "This work was conducted using the National Hoosits Facility.", etc).
- **Citability (all are citable by default):** All Circulars are citable and indexed as such. Journal articles, books, etc that make use of content in Circulars should cite them the same as journal articles.
- **Citations:** Since these GRB follow-up efforts are fast-paced, it is possible that not everyone will be aware of all previous work. The reasons are numerous: people may not have access to their normal or full e-mail accounts, they have just spent the last two hours furiously analyzing their own data, it's 5 o'clock in the morning and the mind is somewhat frazzled by lack of sleep, etc. As such, a reference to prior work may be innocently left out of the current Circular. While everyone will make an honest effort to be current and to cite prior work, it is understood that some omissions will inevitably happen.

### Dont's

- Do not submit a Circular without a specified event in the title
- Do not submit instrument specific information. Submit physical units (with specified energy range). E.g. do not quote "we detect Event X at 10 cts", report "we detect Event X at 1.0E-12 erg/s/cm^2 in the 0.2-10 keV energy range"
- Do not use the Circulars as an advertisement to some paper or web page.
- Do not include your email signature in the submitted Circular content.
- Do not use special characters or LaTeX formatting
- Do not produce excessively long or unfocused Circulars
- Do not submit automated circulars from templates without clear language and grammar
- Do not imply you alone discover a transient that has already been reported
- Do not neglect to mention potential systematic errors if they are expeced
- Do not declare an event start time if you likely missed the beginning

### Do's

- Work together to discover secrets of the Universe

#### Acknowledgements

The GCN Circular service has benefited from numerous discussions and beta-testing with many people, most notably Roland Vanderspek, Ralph Wijers, James Rhoads, and Hye-Sook Park, plus the people at the 4th Huntsville GRB Workshop evening SIG session and the Woods Hole GRB Workshop. The overwhelming development work was performed by Scott Barthelmy. This Style Guide was adapted from the original with input from Kevin Hurley.
