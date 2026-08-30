# Communist Compass

**Take the test: https://thenicedoctor.github.io/communist-values/**

A single-page, no-build political values test. 60 statements, rated on a 5-point
agree/disagree scale, scored across 8 independent axes instead of a single
left/right line, then matched against 12 named communist and socialist tendencies:

| Axis | Left pole | Right pole |
|---|---|---|
| Economic Policy | Equality | Free Market |
| Authority | Libertarian | Authoritarian |
| Social Values | Progressive | Conservative |
| Bioethics | Transhumanist | Bioconservative |
| Global Outlook | Internationalist | Nationalist |
| Ecology | Environmentalist | Productivist |
| Religion & State | Secular | Religious |
| Foreign Policy | Pacifist | Militarist |

Everything runs client-side, therefore no data is collected or sent anywhere.

## Running locally

No build step. Just serve the directory:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `index.html` — page shell (intro, quiz, results screens)
- `style.css` — styling, light/dark theme
- `questions.js` — the 60 statements and their axis/direction metadata
- `app.js` — quiz flow, scoring, and radar chart rendering

- ## Indexing Process

- Currently, we are working to index this site. Once it will finish, we will notify you guys. Stay updated with the repository.
- 
