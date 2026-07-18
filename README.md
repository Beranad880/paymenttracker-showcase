# Připomenutí Plateb & Povinností

Moderní, minimalistická a rychlá webová aplikace vytvořená v **Next.js**.
Slouží k evidování, správě a vizuálnímu připomínání všech blížících se povinností a plateb (pojištění, energie, internet, služby, daně apod.). Aplikace je plně veřejná (bez nutnosti přihlašování), nabízí filtrování podle kategorií a barevně zvýrazňuje úkoly podle toho, za jak dlouho vyprší jejich termín splatnosti. Podporuje Dark Mode i Light Mode.

## 🛠️ Technologie
* **Frontend:** Next.js (App Router), React, Tailwind CSS v4, Lucide React (ikony)
* **Backend:** Next.js API Routes
* **Databáze:** PostgreSQL
* **ORM:** Drizzle ORM
* **Úlohy na pozadí:** Vlastní TS skript zastupující Cron job

## 🚀 Jak začít (Lokální spuštění)

### 1. Prerekvizity
* Nainstalovaný [Node.js](https://nodejs.org/).
* Nainstalovaný a běžící [PostgreSQL](https://www.postgresql.org/) server na tvém lokálním počítači.

### 2. Konfigurace databáze
V kořenové složce projektu (`humblenext7`) byl vytvořen soubor `.env.local` s připojovacím řetězcem k databázi. 
Pokud tvůj lokální PostgreSQL běží pod jiným uživatelem, heslem, nebo portem, uprav tuto proměnnou uvnitř `.env.local`:
```env
DATABASE_URL=postgresql://postgres:test@localhost:5432/postgres
```
*(Ujisti se, že databáze s názvem `postgres` na tvém databázovém serveru existuje. Pokud ne, nejprve ji vytvoř.)*

### 3. Instalace závislostí
Pokud ještě nejsou nainstalované, nainstaluj všechny potřebné balíčky pro frontend i backend:
```bash
npm install
```

### 4. Nahrání schématu do databáze (Migrace)
Aplikace používá **Drizzle ORM** pro komunikaci s databází. Aby se v tvé prázdné databázi vytvořila tabulka `tasks`, spusť následující příkaz:
```bash
npm run db:push
```

*(Tip: Kdykoliv si budeš chtít prohlédnout nebo přímo upravit data v databázi skrze přehledné UI, můžeš spustit `npm run db:studio`.)*

### 5. Spuštění vývojového serveru
Nyní jsi připraven/a spustit samotnou Next.js webovou aplikaci:
```bash
npm run dev
```
Webová aplikace poté poběží ve tvém prohlížeči na adrese [http://localhost:3000](http://localhost:3000).

---

## ⏰ Kontrola úkolů (Cron skript)
Součástí projektu je také skript `scripts/cron.ts`, který načte data z databáze a do konzole přehledně vypíše všechny povinnosti, u kterých se blíží termín splatnosti (jsou splatné do 14 dnů nebo jsou už po splatnosti).

Skript můžeš kdykoliv spustit ručně příkazem:
```bash
npm run cron
```

*Pokud bys chtěl proces zcela automatizovat, můžeš si ve svém operačním systému (Plánovač úloh ve Windows nebo `cron` v Linuxu/Macu) nastavit pravidelné každodenní volání tohoto příkazu v této složce.*
