# Eksamensdokument

## Medlemmer

-   Marius Begby

## Vanskelighetsgrad

Jeg har gått for høyeste vanskelighetsgrad, karakter A-krav.

## Redegjørelser og forutsetninger

-   Ved kall til RAWG.io API, har jeg valgt å sende med stores=1 som query-parameter. Dette for å kun hente spill med Steam som butikk. Jeg merket at når jeg ikke filtrerte på Steam som butikk, fikk jeg mange spill med navn "test test test", og mye manglende data på JSON-objektet fra API. Jeg tok derfor avgjørelsen med å legge på dette query-parameteret for å få mer kvalitetsdata fra API.
-   Ved kall til RAWG.io API for å hente "nyeste spill" som følge av kravene, har jeg valgt å definere "nyeste spill" som "sist oppdaterte spill" og ikke "sist utgitte spill". Jeg benytter derfor query parameter "ordering=-updated" istedenfor "ordering=-released". Denne endringen gjør jeg grunnet "ordering=-released" parameteret som gir sist utgitte spill, gir spill i responsen som har utgivelsesdato i fremtiden, slik som år 2033. Disse spillene vil alltid være de samme, men med "ordering=-updated" som parameter istedenfor kan man se at spillene i "GameShop" blir jevnlig oppdatert med andre spill.
-   Når man ikke er logget inn, gir det ingen mening å kunne gå til "My Games" eller "Favourites", så man må logge inn for å kunne gå til/se dette.
-   Jeg har også fjernet muligheten for å legge til favoritter på spill man ikke eier (som er i "My Games"), siden favoritt-status er knyttet til spill på bruker, og brukeren må derfor "eie" spillet for å kunne ha det som favoritt.
-   `react-wordcloud` pakken fungerte ikke for min installasjon av React. Prosjektet ble sist oppdatert for 3 år siden og det er et 3 år gammelt issue på GitHub siden med mitt problem, uløst. Jeg har derfor benyttet en lignedne npm pakke: react-tagcloud: https://www.npmjs.com/package/react-tagcloud. Konseptet og bruk er tilsvarende.

## Kilder

-   Sette opp og koble React og Sanity: https://webtricks.blog/start-et-prosjekt-med-react-sanity-og-sass-fra-scratch/
-   Sjekke tidligere prosjekt for oppsett til å hente fra API, samt bruk av state: https://github.com/mariusbegby/uin23ak4_moviesearch_begby
-   Sjekke dokumentasjon for RAWG.io API: https://api.rawg.io/docs/
-   Generere ikon/logo (favicon) for nettsiden (for å unngå opphavsrett-trøbbel), med hjelp av AI: https://openai.com/product/dall-e-2
-   Et par linjer kode for å løse problem med space-between for siste rad i flexbox når raden ikke er full: https://stackoverflow.com/questions/18744164/flex-box-align-last-row-to-grid
-   Sjekke diverse syntax, bruk og oppsett av React-metoder/hooks etc. som f.eks. useEffect: https://react.dev/
-   Sjekke syntax, bruk og oppsett av Santiy schemas: https://www.sanity.io/docs/schema-types
