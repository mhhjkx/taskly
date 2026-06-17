# Taskly

Menedżer zadań napisany w Vue 3. Dane trzymane są w Local Storage przeglądarki, więc nie znikają po odświeżeniu strony.

Projekt zespołowy realizowany na zajęcia. Pomysł na aplikację wziął się z serwisu [todolistme.net](https://todolistme.net/) — chcieliśmy zrobić własną, prostszą wersję listy zadań z podziałem na kategorie i filtrami.

Termin oddania: 10–12 czerwca 2026. Na całość mieliśmy 4 tygodnie.

## Co potrafi aplikacja 

Taskly to lista zadań z dwoma rodzajami wpisów:

- **Codzienne** – rzeczy powtarzalne, które robi się regularnie.
- **Do wykonania (To-Do)** – jednorazowe zadania do odhaczenia.

Na zadaniach można wykonywać podstawowe operacje:

- dodawanie nowego zadania przez formularz (z walidacją tytułu),
- edycję nazwy, kategorii i terminu,
- usuwanie,
- oznaczanie jako ukończone,
- ustawianie daty i godziny wykonania.

Listę da się filtrować na trzy sposoby:

- po statusie — wszystkie / aktywne / ukończone,
- po kategorii — codzienne / do wykonania,
- po czasie — zaległe / na dzisiaj / nadchodzące.

## Wymagania projektowe

Aplikacja miała spełniać kilka warunków z listy zadań:

- napisana w Vue.js,
- minimum 3 komponenty komunikujące się przez propsy i eventy,
- walidacja formularzy i zapis do Local Storage,
- prosty wygląd oparty o framework CSS (użyliśmy Tailwinda),
- dokumentacja (cel, przeznaczenie, lista funkcji),
- analiza: 5 user stories, diagram, 5 przypadków testowych,
- instrukcja uruchomienia.

## Komponenty

| Komponent | Za co odpowiada | Eventy |
|-----------|-----------------|--------|
| `TaskList` | Renderuje listę, trzyma filtr, przekazuje eventy wyżej | — |
| `TaskItem` | Pojedyncze zadanie | `toggle`, `edit`, `delete` |
| `TaskForm` | Formularz dodawania i edycji z walidacją | `submit` |

Dane lecą w dół przez propsy, akcje wracają w górę przez eventy.

## Jak wyglądają dane w Local Storage

Każde zadanie zapisujemy jako obiekt. Zapis dzieje się automatycznie przy każdej zmianie, więc po odświeżeniu strony lista jest taka sama.

```json
{
  "id": 1,
  "title": "Nazwa zadania",
  "category": "daily",
  "done": false,
  "dueDate": "2026-06-01T10:00",
  "createdAt": "2026-05-14T08:30"
}
```

| Pole | Typ | Opis |
|------|-----|------|
| `id` | `number` | Unikalny identyfikator |
| `title` | `string` | Nazwa zadania |
| `category` | `"daily"` lub `"todo"` | Kategoria |
| `done` | `boolean` | Czy ukończone |
| `dueDate` | `string` lub `null` | Termin w formacie ISO 8601 |
| `createdAt` | `string` | Data utworzenia w formacie ISO 8601 |

## Uruchomienie

Nie trzeba nic instalować ani budować — Vue, Tailwind i GSAP ładują się z CDN. Wystarczy otworzyć `index.html` w przeglądarce. Jeśli chcesz uniknąć ewentualnych problemów z Local Storage przy otwieraniu pliku bezpośrednio, możesz odpalić dowolny lokalny serwer, np.:

```
python -m http.server
```

i wejść na `http://localhost:8000`.

## Zespół

| Rola | Osoba | Czym się zajmował |
|------|-------|-------------------|
| Scrum Master | [Jakub Schmidt](https://github.com/przelot3) | Harmonogram (daily co środę), organizacja sprintów, przydzielanie zadań, dokumentacja, oddanie projektu |
| Programista | [Bartosz Słomski](https://github.com/mhhjkx) | Implementacja, Vue.js, podział na komponenty, Local Storage |
| Analityk | [Szymon Piotrzkowski](https://github.com/szymonszkolaa) | Dokumentacja, user stories, makieta, przypadki użycia, wymagania |
| Tester | [Mateusz Witka](https://github.com/Entis7) | Testy, plany testów, weryfikacja wymagań, prezentacja |

## Technologie

HTML, Tailwind CSS, JavaScript, Vue 3, GSAP (animacje) oraz Local Storage do przechowywania danych.

## Licencja

MIT — szczegóły w pliku [`LICENSE`](LICENSE).
