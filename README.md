# EPWA-RDV

Plateforme de prise de rendez-vous médical (Patients  / Médecins  / Admin 🛠) construite avec **Next.js 15**, **TypeORM**, **PostgreSQL** et **Docker**.  
Medical appointment booking platform built with **Next.js 15**, **TypeORM**, **PostgreSQL**, and **Docker**.

---

##  Fonctionnalités / Features

-  Authentification avec JWT (Patients, Doctors, Admins)  
- Dashboards personnalisés selon le rôle  
- Internationalisation (fr, en, ar) avec **next-intl**  
- Déploiement facile avec Docker  
- Base de données PostgreSQL (gérée via TypeORM)

---

##  Installation locale 

### 1. Cloner le projet 
```bash
git clone [https://github.com/<ton-compte>/<ton-repo>.git](https://github.com/malikakika/epwa-appointment-app.git)
cd epwa-rdv
```
###  2. Installer les dépendances 
```bash
npm install
```
### 3. Configurer l’environnement 
Crée un fichier .env à la racine du projet :
```bash 
DATABASE_URL=postgres://rdv:rdvpass@localhost:5432/rdv
JWT_SECRET=your_jwt_secret
ADMIN_SIGNUP_TOKEN=changeme
```
### 4. Lancer PostgreSQL en local (optionnel si pas Docker)

```bash
docker run --name rdv_pg \
  -e POSTGRES_USER=rdv \
  -e POSTGRES_PASSWORD=rdvpass \
  -e POSTGRES_DB=rdv \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### 5. Lancer l’application en développement 

```bash 
npm run dev
```
 L’app est disponible sur http://localhost:3000

 ## Lancer avec DOCKER

 ### 1. Construire et lancer 

 ```bash 
 docker-compose up -build 
 ```

### 2. Accéder à l’app

http://localhost:3000

Base PostgreSQL accessible sur localhost:5432
PostgreSQL database available at localhost:5432

---
