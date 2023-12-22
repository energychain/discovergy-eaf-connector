# discovergy-eaf-connector
**Automated Meter Reading client for Discovergy Meters to [STROMDAO Energy Application Framework](https://github.com/energychain/STROMDAO_EAFs) based dynamic electricity tariffs.**

[![Downloads](https://img.shields.io/npm/dt/discovergy-eaf-connector.svg)](https://www.npmjs.com/package/discovergy-eaf-connector)
[![License](https://img.shields.io/npm/l/discovergy-eaf-connector.svg)](https://github.com/energychain/discovergy-eaf-connector/blob/master/LICENSE)

Der Discovergy EAF Connector ist ein Kommandozeilen-Tool, das es Stadtwerken und regionalen Versorgern ermöglicht, hochfrequente Zählerstände von Discovergy-Zählern abzurufen und an die EAF-Schnittstelle des Stromversorgers zu übermitteln. Das Tool ist in Node.js implementiert und kann einfach über die Befehlszeile ausgeführt werden.

Der Discovergy EAF Connector bietet folgende Vorteile:

-   Ermöglicht den Aufbau eines dynamischen Stromtarifs, der auf den tatsächlichen Verbrauch der Kunden basiert.
-   Reduziert die Kosten für die Messung und Abrechnung des Stromverbrauchs.
-   Verbessert die Transparenz und Kontrolle über den Stromverbrauch.
-   Ermöglicht die Entwicklung neuer innovativer Dienstleistungen rund um das Thema Energie.

Der Discovergy EAF Connector ist ein wichtiges Werkzeug für Stadtwerke und regionale Versorger, die ihre Energieversorgung zukunftsfähig gestalten wollen. Das Tool ist einfach zu bedienen und bietet eine Vielzahl von Vorteilen.

Um den Discovergy EAF Connector zu verwenden, benötigen Sie:

-   Einen Discovergy-Zähler
-   Ein Contentrator Token aus dem EAF
-   Einen Computer mit Internetzugang
-   Node.js installiert

Sobald Sie diese Voraussetzungen erfüllt haben, können Sie den Discovergy EAF Connector wie folgt verwenden:

1.  Installieren Sie den Discovergy EAF Connector mit folgendem Befehl:

```
npm install -g discovergy-eaf-connector
```

2.  Konfigurieren Sie den Discovergy EAF Connector mit Ihren Zugangsdaten:

Kopieren Sie die `sample.env` nach `.env` und passen Sie diese entsprechend an.

3.  Führen Sie den Discovergy EAF Connector aus:

```
discovergy-eaf-connector
```

Der Discovergy EAF Connector wird nun die Zählerstände von Ihren Discovergy-Zählern abrufen und an die EAF-Schnittstelle des Stromversorgers übermitteln.

## License

Distributed under the Apache-2.0 License. See [License](./LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Maintainer / Imprint

<addr>
STROMDAO GmbH  <br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany  <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
dev@stromdao.com  <br/>
  <br/>
Handelsregister: HRB 728691 (Amtsgericht Mannheim)<br/>
  <br/>
https://stromdao.de/<br/>
</addr>

