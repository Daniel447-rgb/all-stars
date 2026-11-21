# ALL Stars Academy - Official Football Club Website

A modern, high-performance football academy web platform built with **React**, **Tailwind CSS**, **ImgBB Free Image Hosting** (no credit card needed), and **Firebase (Auth & Firestore)**.

---

## 🌟 Key Features

1. **30-Second Auto-Rotating Hero Spotlight Carousel**:
   - Player images change automatically every **30 seconds**.
   - Includes a smooth visual countdown bar ("Changes every 30s"), time remaining indicator, manual previous/next arrows, and a pause/play button.
   - Highlights player attributes: Stamina %, Dribbling %, Agility %, Pace %, and scout score.

2. **Squad Roster & Technical Skills**:
   - Prominently displays the **Total Player Count** badge (e.g. 15 Active Academy Talents).
   - Filter by position: All, Forwards, Midfielders, Defenders, Goalkeepers, with real-time search.
   - Comprehensive skill meters for every player: **Stamina %**, **Dribbling %**, **Agility %**, **Pace %**, **Passing %**, and **Shooting %**.
   - Click any card to view their full Scouting Dossier modal (apps, goals, assists, physical metrics, bio).

3. **Starting Eleven (First XI) Tactical Pitch**:
   - Interactive 2D tactical football pitch with authentic pitch lines, penalty boxes, and center circle.
   - Supports **4-3-3**, **4-4-2**, and **3-5-2** formations.
   - 11 starting player pins on the pitch showing avatars, jersey numbers, and ratings.
   - Starters and bench reserve lists.

4. **Player of the Week Showcase**:
   - Prestigious weekly spotlight honoring the academy's top performer.
   - Golden trophy badge, matchday performance review, and coach tribute quote.

5. **Club Achievements & Trophy Cabinet**:
   - Showcases tournament championships, national cup finalist honors, golden boot trophies, and fair play awards.
   - Filterable by award category.

6. **Prospective Player Trial Application & Coach WhatsApp Integration**:
   - Structured trial application form: Full Name, Age, Primary Position, Dominant Foot, City, Experience, and Personal Message to Coach.
   - **1-Click WhatsApp Button**: Automatically formats the applicant's responses into a professional message and opens the Head Coach's WhatsApp directly (`wa.me/<coachPhone>?text=...`).
   - Quick WhatsApp inquiry button for fast questions.

7. **Admin Portal with Full CRUD (`dadekunle226@gmail.com`)**:
   - Strictly reserved for administrator **`dadekunle226@gmail.com`**.
   - **Player CRUD**: Add new players, edit attributes/percentages, delete players.
   - **ImgBB Photo Upload**: Direct upload to ImgBB CDN (free, no credit card required) or direct image URL.
   - **First Eleven Squad**: Assign players to starting positions and choose formation.
   - **Player of the Week**: Select this week's MVP and edit weekly remarks.
   - **Achievements CRUD**: Add, edit, or delete trophies and honors.
   - **Club Settings**: Update Coach WhatsApp phone number, training times, and ImgBB API key.

---

## 🚀 How to Run the Website

### 1. Start the Development Server
```bash
cd "C:\Users\HomePC\.gemini\antigravity\scratch\all-stars-academy"
npm run dev
```
Open your browser at the local URL shown in your terminal (usually `http://localhost:5173`).

---

## 🔑 Admin Access (`dadekunle226@gmail.com`)

1. Click **Admin Login** in the top navigation bar.
2. You can authenticate in either of two ways:
   - **Instant Admin Access Button**: Click *"Enter as dadekunle226@gmail.com"* to immediately test and access the full CRUD dashboard.
   - **Firebase Sign-In**: Sign in with Google using your `dadekunle226@gmail.com` Google account or Firebase email/password.

---

## 📸 ImgBB Free Image Storage Setup (No Credit Card)

To upload player portraits directly to the cloud without needing a credit card:
1. Visit [api.imgbb.com](https://api.imgbb.com/)
2. Click **Get API Key** and sign up for free (takes 30 seconds, zero payment info required).
3. Copy your API Key.
4. In the website's Admin Panel, go to the **Club & ImgBB Settings** tab, paste the key into the **ImgBB API Key** field, and click **Save All Settings**.
*(Note: If you haven't added an ImgBB key yet, the application gracefully converts uploaded image files to local high-quality Data URLs so image uploads work right out of the box!)*

---

## 📱 Coach WhatsApp Configuration

The Head Coach's WhatsApp number can be customized anytime:
1. Open the **Admin Panel**.
2. Go to **Club & ImgBB Settings**.
3. Under **Coach WhatsApp Phone Number**, enter your phone number with your country code (e.g. `+2347037143782`).
4. Click **Save All Settings**.
All visitor trial applications will immediately direct to that number!
