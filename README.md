# Shelved.

## A worldwide beverage database
Shelved (shelvedb.com) is a platform for cataloguing, tracking, and searching beverages from every corner of the globe. From historical releases to current craft brews, Shelved archives packaging, ingredients, and manufacturer data in a centralized, searchable database.

---

## 🚀 Key Features
*   **Global Catalogue:** Search drinks by brand, volume, flavor, or country of origin.
*   **AI-Powered OCR:** Effortless beverage entry. Upload can/bottle photos and use Google Gemini AI to automatically extract product names, multilingual ingredients, and nutrition facts.
*   **Multilingual Support:** Access packaging information in its original language, with automatic English translations provided for international items.
*   **Personal Collections:** Track your physical shelf digitally. Includes privacy settings to restrict your collection visibility to mutual followers only.
*   **Staff Management:** A unified dashboard for admins to moderate brands, companies, and packaging manufacturers.

---

## 🛠️ Technical Stack

### Backend
*   **Laravel 11 (PHP 8.5):** Robust API and server-side logic.
*   **PostgreSQL:** Utilizing **JSONB** columns for flexible storage of nutrition data and social links.
*   **Spatie Media Library:** Advanced media handling with automated image conversions for optimized performance.

### Frontend
*   **React + TypeScript:** A type-safe, reactive user interface.
*   **Inertia.js:** Seamless "Classic Monolith" feel with modern SPA performance.
*   **SCSS Modules:** Modular, scoped styling for a clean and consistent UI.

### Infrastructure & Security
*   **Cloudflare R2:** S3-compatible object storage for high-performance global asset delivery.
*   **Google Gemini 2.5 Flash:** Multimodal AI for high-accuracy data extraction from images.
*   **Cloudflare Turnstile:** Non-intrusive bot protection for registration and AI routes.

---

## 💻 Local Development

Shelved uses **Laravel Sail** (Docker) to provide a consistent development environment across all machines.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CrispyMiatr/shelved-db
   cd shelved
   ```

2. **Initialize Environment:**
   ```bash
   cp .env.example .env
   ```
   *Note: Ensure you fill in your `GEMINI_API_KEY` and Cloudflare credentials in the `.env` file.*

3. **Install Dependencies:**
   ```bash
   composer install
   npm install
   ```

4. **Start the Environment (Docker):**
   ```bash
   ./vendor/bin/sail up -d
   ```
   *The application will be accessible at `http://localhost/`*

5. **Database Setup:**
   ```bash
   ./vendor/bin/sail artisan migrate:fresh --seed
   ```
   *This creates the database tables and seeds a Head Admin account and basic company data.*

6. **Compile Assets:**
   ```bash
   ./vendor/bin/sail npm run dev
   ```
   *This starts the Vite development server for hot-reloading React components.*

---

## 📜 Attribution & Documentation

### Core Frameworks & Libraries
- [Laravel](https://laravel.com/docs/13.x/readme) - Backend logic & API
- [Inertia.js](https://inertiajs.com/docs/v3/getting-started/index) - The modern monolith bridge
- [React](https://reactjs.org/) - Frontend UI Library

### Languages & Tools
- [TypeScript](https://www.typescriptlang.org/docs/) - Type safety
- [Sass/SCSS](https://sass-lang.com/documentation/) - Modular styling
- [Lucide Icons](https://lucide.dev/) - Icon suite

### Services
- [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) - Object storage
- [Google Gemini AI](https://ai.google.dev/) - Data extraction
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) - Bot protection


### Articles
- [A Complete CSS Flexbox Layout Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)


### Gemeni
Gemeni was used to assist with the development of this project. Unfortunately, it won't let me share the conversations. I am looking for a fix.