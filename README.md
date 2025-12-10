# HC Linear – Frontend Tesztfeladat

Ez a projekt egy React + TypeScript + Vite alapú frontend, amely két külön backendhez kapcsolódik.  

A feladat leírása megtalálható a kezdő oldalon, a projekt elindítása után.
---

## Minimum követelmények

- **Node.js 18+**
- **npm 9+** vagy **pnpm / yarn**
- **Docker + Docker Compose**

---

## Projekt indítása (frontend)

A projekt gyökérmappájában futtasd:

```bash
npm install
npm run dev
```

Ez elindítja a fejlesztői szervert, amely alapértelmezés szerint a `http://localhost:5173` címen érhető el.

## Backend indítása (Docker Compose)

A backend konfiguráció a `backend/` mappában található.
Az adatstruktúra megtekinthető a `backend/data` mappában található **json** fájlokban.

Lépj be:
```bash
cd backend
```

Indítsd el a JSON server konténereket:
```bash
docker compose up -d
```

Ez elindít két külön backend szolgáltatást:

### 1. CRUD Backend

```
URL: http://localhost:3001
Resource: /buses
```
Ez a backend szolgálja ki a buszokkal kapcsolatos alap CRUD műveleteket
(lista, lekérés, mentés, módosítás, törlés).
A feladat első része ehhez a végponthoz kapcsolódik.

### 2. Board Backend

```
URL: http://localhost:3002
Resource: /board
```

## Általános API végpontok (clue/json-server)

| Művelet             | HTTP                   | Leírás                         |
| ------------------- | ---------------------- | ------------------------------ |
| Lista lekérése      | `GET /resource`        | Összes elem lekérése           |
| Egy elem lekérése   | `GET /resource/:id`    | Egy elem részletes adatai      |
| Új elem létrehozása | `POST /resource`       | Új bejegyzés mentése           |
| Elem módosítása     | `PATCH /resource/:id`  | Egy tétel részleges módosítása |
| Teljes csere        | `PUT /resource/:id`    | Egy tétel teljes újraírása     |
| Törlés              | `DELETE /resource/:id` | Egy elem törlése               |


<!-- Feladatmegoldás -->


A modulok saját API-réteget, hookokat, komponenseket és stílusfájlokat használnak — így a kódbázis jól szeparált és könnyen karbantartható.

---

# 1. Busz CRUD modul

A busz modul funkciói:

- buszok listázása reszponzív táblázatban  
- új busz felvétele modálban  
- részletező oldal  
- szerkesztési felület valós idejű validációval  
- törlés megerősítése ConfirmDialog segítségével  

Az adatkezelés teljes egészében **TanStack Query**-n keresztül történik,  
az űrlapvalidáció külön `utils` fájlban található.

---

# 2. Drag & Drop Feladatboard

A board három státuszoszlopból áll:

- **todo**
- **in_progress**
- **done**

Funkciók:

- feladatok áthúzása oszlopok között  
- státusz frissítése a backendben  
- új feladat létrehozása  
- feladat törlése  
- mobilon státuszválasztó modál  
- inline szerkesztés  

A drag & drop logika és a státuszfrissítések React Query mutationökkel működnek.

---

# Globális UI elemek

A következő komponensek modulfüggetlenek és újrahasznosíthatók:

- **Modal** – általános modális ablak  
- **ConfirmDialog** – egységesített megerősítő dialógus  
- **ToastProvider** – alkalmazásszintű értesítések  

Ezek a `component/ui/` mappában találhatók.

---

# További megvalósított extra elemek

- globális UI komponensek létrehozása (Modal, ConfirmDialog, ToastProvider)  
- egységes gomb- és ikonrendszer mindkét modulban  
- globális szín- és designrendszer (CSS változók alapján)  
- buszlista reszponzív táblázatból mobilbarát kártyanézet  
- részletes űrlapvalidáció és input-normalizáció (regex, clamp, karaktertisztítás)  
- touch–desktop differenciált működés a boardon  
- inline cím szerkesztése feladatkártyákon  
- státuszszínezés és vizuális dropzone kiemelés  
- egységes toast visszajelzések minden fontos műveletnél  

---

# Mappastruktúra




src
├── component
│   ├── navbar
│   │   ├── data
│   │   │   └── menuItems.data.ts      
│   │   ├── style
│   │   │   └── navbar.style.ts        
│   │   └── Navbar.tsx                 
│   │
│   └── ui                             # Globális UI elemek
│       ├── modal
│       │   ├── ConfirmDialog.tsx      # Törlés/megerősítés dialógus (Modalra építve)
│       │   ├── ConfirmDialog.css      # ConfirmDialog gombstílusok (cancel/confirm)
│       │   ├── Modal.css              # Modal vizuális stílusai
│       │   └── Modal.tsx              # Általános modális ablak komponens
│       │
│       └── toast
│           └── ToastProvider.tsx      # Globális toast értesítések (React context)
│
├── config
│   ├── axios.config.ts               
│   ├── queryClient.config.ts          
│   ├── routes.ts                      
│   └── useDocumentTitle.ts            # Custom hook a document.title beállításához
│
├── page
│   │
│   ├── task                           # A feladat eredeti leírása (kapott anyag)
│   │ 
│   ├── board
│   │   ├── data
│   │   │   └── board.data.ts          # Board oszlopok metaadatai (id, cím)
│   │   ├── style
│   │   │   ├── board.classes.css      # Board kártyák, státusz-színek, dropzone stílusok
│   │   │   ├── board.style.ts         # Board layout és oszlopok stílusa
│   │   │   └── boardButtons.style.ts  # Board gomb- és ikonstílusok
│   │   ├── board.api.ts               # Board API hívások (/tasks endpoint)
│   │   ├── board.hooks.ts             # React Query hookok board műveletekhez
│   │   ├── board.types.ts             # Board típusdefiníciók (Task, TaskStatus)
│   │   ├── BoardColumn.tsx            # Oszlop komponens (todo / in_progress / done)
│   │   ├── BoardPage.tsx              # Teljes board oldal + drag & drop logika
│   │   ├── StatusSelect.tsx           # Mobil státuszváltás modálban
│   │   ├── TaskCard.tsx               # Feladatkártya (drag, edit, delete)
│   │   └── TaskCreateForm.tsx         # Új feladat létrehozása oszlopban
│   │
│   └── bus
│       ├── data
│       │   └── bus.data.ts            # Busz oldal címei, rövid leírás
│       ├── style
│       │   ├── css
│       │   │   └── bus.classes.css    # Busz státusz pill, űrlap layout, plate inputok
│       │   ├── bus.style.ts           # Listaoldal stílusa és táblázat megjelenése
│       │   ├── busButtons.style.ts    # Busz modul gomb- és ikonstílusok
│       │   ├── busDetail.style.ts     # Busz részletező oldal stílusa
│       │   └── busEdit.style.ts       # Busz szerkesztő nézet stílusa
│       ├── utils
│       │   └── busForm.utils.ts       # Űrlap validáció, regexek, alapértékek
│       ├── bus.api.ts                 # Busz API hívások (/buses endpoint)
│       ├── bus.hooks.ts               # React Query hookok busz adatokhoz
│       ├── bus.types.ts               # Busz típusdefiníciók (Bus, BusStatus)
│       ├── BusCreateModal.tsx         # Új busz felvétele modál űrlappal
│       ├── BusDetail.tsx              # Busz részletező oldal
│       ├── BusEdit.tsx                # Busz adatainak szerkesztése validációval
│       └── BusList.tsx                # Buszok listázása táblázatban
│                      
│
├── App.tsx                            # Router és oldalak regisztrálása
├── index.css                          # Globális stílusok és CSS változók
└── main.tsx                           # Belépési pont (QueryClient, ToastProvider, App)
