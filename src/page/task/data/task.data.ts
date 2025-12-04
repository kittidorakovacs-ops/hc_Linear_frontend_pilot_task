export const taskData = {
    title: "Frontend Tesztfeladat",
    subtitle:
        "A projekt fejlesztéséhez két backend használható, ezek indítási lépései a README-ben találhatóak.",

    sections: [
        {
            title: "Leadási követelmények",
            markdown: `
- Klónozd le a kiinduló repository-t a saját gépedre.
- A feladat kidolgozása után hozd létre a saját GitLab fiókodban egy új repository-t, és töltsd fel oda a megoldást.
- A kész projekt GitLab repository linkjét küldd vissza.
      `,
        },

        {
            title: "Általános követelmények",
            markdown: `
- A kommunikáció **Axios-szal** történjen.  
- A lekérésekhez **TanStack Query**, az adatmódosításhoz **TanStack Mutation** legyen használva.  
- A megoldás legyen moduláris és átlátható.
      `,
        },

        {
            title: "1. Feladat – Busz CRUD oldal",
            markdown: `
Feladatok:

- Készíts egy listázó oldalt táblázattal.
- Készíts egy gombot, ami felnyit 1 formot tartalmazó modált az új busz felvételéhez.
- Legyen törlés művelet a sorokon.  
- Legyen egy külön megtekintő és szerkesztő oldala egy adott sornak.    
      `,
        },

        {
            title: "2. Feladat – Drag & Drop táblázat",
            markdown: `
Feladatok:

- Készíts egy **drag & drop** felületet, ahol a feladatok az oszlopok között mozgathatók.
- A mozgatás után a feladat **status** mezője frissüljön a backendben.
- A felület három oszlopból álljon: **Teendő (todo)**, **Folyamatban (in_progress)**, **Kész (done)**.
- A feladatkártyák legyenek áthúzhatók egyik oszlopból a másikba.
- Legyen lehetőség új feladatot hozzáadni (minimum a \`title\` megadásával).
- Legyen lehetőség egy feladat törlésére is.
      `,
        }
    ],
};
