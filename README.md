# PRODA-semestralka
semestrální práce na PRODA, UPOL

# 🗺️ Interaktivní Mapové Rozhraní

Tento projekt obsahuje jednoduché mapové rozhraní postavené na knihovně [Leaflet.js](https://leafletjs.com/), umožňující ovládání mapy pomocí vlastních tlačítek a klávesnice.

---

## 📦 Obsah projektu

- `html_proda.html` – Hlavní HTML stránka s mapou a ovládacími prvky
- `leaflet.js` – Inicializace mapy a základní ovládání
- `controls.js` – Implementace ovládacích tlačítek (zoom, pohyb)
- `pointers.js` – Přidávání a mazání markerů pomocí klávesnice
- `styly.css` – Stylování ovládacích prvků a rozložení

---

## 🧭 Funkcionalita

- ✅ Zobrazení OpenStreetMap
- ✅ Ovládání zoomu a pohybu myši pomocí najetí myši na tlačítka (bez klikání!)
- ✅ Přidávání markerů pomocí klávesy `A`
- ✅ Smazání markerů v obdélníku při podržení `D` a tažení myší
- ✅ Zakázání výchozích interakcí mapy pro větší kontrolu

---

## 🖱️ Ovládání bez klikání

| Akce                          | Ovládání                 |
|------------------------------|--------------------------|
| Přiblížení / oddálení        | Tlačítka `+` / `-`       |
| Pohyb mapy                   | Tlačítka se šipkami      |
| Přidání bodu (marker)        | Stiskni `A`              |
| Výběr a smazání bodů         | Drž `D`, táhni myší      |

---

## 🚀 Spuštění

Stačí otevřít soubor `html_proda.html` v prohlížeči. Knihovna Leaflet se načítá z CDN, takže není potřeba žádná instalace.

---

## 📄 Licence

Projekt je otevřený a volně použitelný pod licencí **MIT**.

---

Vytvořeno s ❤️ a JavaScriptem. (a chatGPT)
