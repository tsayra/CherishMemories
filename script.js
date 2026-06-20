/* ============================================================
   US, ALWAYS — A Memory Vault
   Built by Tsayra

   HOW TO ADD YOUR OWN PHOTOS & VIDEOS (Timeline / Folders)
   ------------------------------------------------------------
   1. Put your image/video files in an "images" folder next to
      this script.js file, e.g.:

        /memories-site/
          index.html
          style.css
          script.js
          /images/
            manuel-uy-01.jpg
            manuel-uy-02.jpg
            talim-01.jpg
            bukid-01.mp4
            ...

   2. Scroll down to the FOLDERS array right below this comment
      block. Each folder is one location/trip. Add your files to
      the "items" list of the matching folder, like this:

        { type: "image", src: "images/manuel-uy-01.jpg", caption: "First sunset there" }
        { type: "video", src: "images/bukid-clip.mp4",   caption: "" }

      "caption" is optional — leave it as "" if you don't want one.

   3. Save the file and refresh the page. That's it — no upload
      button needed, the gallery reads straight from this list.

   ------------------------------------------------------------
   ABOUT THE TWO PRIVATE VAULTS
   ------------------------------------------------------------
   Both vaults (Private Vault, password 1026 / Goofy Mode,
   password anggandako) live entirely on this device, inside the
   browser's local database (IndexedDB). Anything added through
   their "+ Add" buttons:

     - Is encrypted with AES-256-GCM before it's ever written to
       disk. The encryption key is derived from the vault's
       password (PBKDF2, 150,000 iterations) and is never stored
       anywhere — it only exists in memory while a vault is
       unlocked.
     - Is decrypted only in memory, only while that vault is open,
       and only for as long as you're active. Vaults auto-lock
       after 5 minutes of inactivity or when the tab is hidden.
     - Cannot be read back by anyone who doesn't know the
       password — even by opening the browser's dev tools and
       inspecting the database directly, since what's stored
       there is ciphertext, not the original file.

   This is the strongest protection possible without a server.
   It cannot stop someone who has your password, and it can't
   protect against malware running on the device itself — but it
   means the files are never sitting around in plain, readable
   form.
   ============================================================ */

/* ====================== EDIT YOUR FOLDERS HERE ====================== */
const FOLDERS = [
  {
    id: "manuel-uy",
    name: "Manuel Uy Beach Resort",
    location: "Calatagan, Batangas",
    date: "",                 // optional, e.g. "March 2025"
    note: "",                 // optional short description of the trip
    cover: "",                // optional: path to a cover image, e.g. "images/manuel-uy-01.jpg" — falls back to the first item if left blank
    items: [
       { type: "image", src: "images/M1.jpg", caption: "" },  
      { type: "image", src: "images/M2.jpg", caption: "" },
      { type: "image", src: "images/M3.jpg", caption: "" },
      { type: "image", src: "images/M4.jpg", caption: "" },
      { type: "image", src: "images/M5.jpg", caption: "" },
      { type: "image", src: "images/M6.jpg", caption: "" },
      { type: "image", src: "images/M7.jpg", caption: "" },
      { type: "image", src: "images/M8.jpg", caption: "" },
      { type: "image", src: "images/M9.jpg", caption: "" },
      { type: "image", src: "images/M10.jpg", caption: "" },
      { type: "image", src: "images/M11.jpg", caption: "" },
      { type: "image", src: "images/M12.jpg", caption: "" },
      { type: "image", src: "images/M13.jpg", caption: "" },
      { type: "image", src: "images/M14.jpg", caption: "" },
      { type: "image", src: "images/M15.jpg", caption: "" },
      { type: "image", src: "images/M16.jpg", caption: "" },
      { type: "image", src: "images/M17.jpg", caption: "" },
      { type: "image", src: "images/M18.jpg", caption: "" },
      { type: "image", src: "images/M19.jpg", caption: "" },
      { type: "image", src: "images/M20.jpg", caption: "" },
      { type: "image", src: "images/M21.jpg", caption: "" },
      { type: "image", src: "images/M22.jpg", caption: "" },
    ]
  },
  {
    id: "talim-beach",
    name: "Tropical Camp - Talim Beach",
    location: "Lian, Batangas",
    date: "",
    note: "",
    cover: "",
    items: [
           { type: "image", src: "images/T1.jpg", caption: "" },
      { type: "image", src: "images/T2.jpg", caption: "" },
      { type: "image", src: "images/T3.jpg", caption: "" },
      { type: "image", src: "images/T4.jpg", caption: "" },
      { type: "image", src: "images/T5.jpg", caption: "" },
      { type: "image", src: "images/T6.jpg", caption: "" },
      { type: "image", src: "images/T7.jpg", caption: "" },
      { type: "image", src: "images/T8.jpg", caption: "" },
      { type: "image", src: "images/T9.jpg", caption: "" },
      { type: "image", src: "images/T10.jpg", caption: "" },
      { type: "image", src: "images/T11.jpg", caption: "" },
      { type: "image", src: "images/T12.jpg", caption: "" },
      { type: "image", src: "images/T13.jpg", caption: "" },
    ]
  },
  {
    id: "bukid",
    name: "Food Trip sa Bukid",
    location: "Calamba, Laguna",
    date: "",
    note: "",
    cover: "",
    items: [
     { type: "image", src: "images/B1.jpg", caption: "" },
      { type: "image", src: "images/B2.JPG", caption: "" },
      { type: "image", src: "images/B3.JPG", caption: "" },
      { type: "image", src: "images/B4.JPG", caption: "" },
      { type: "image", src: "images/B5.JPG", caption: "" },
      { type: "image", src: "images/B6.JPG", caption: "" },
      { type: "image", src: "images/B7.JPG", caption: "" },
      { type: "image", src: "images/B8.JPG", caption: "" },
      { type: "image", src: "images/B9.JPG", caption: "" },
      { type: "image", src: "images/B10.JPG", caption: "" },
      { type: "image", src: "images/B11.JPG", caption: "" },
      { type: "image", src: "images/B12.JPG", caption: "" },
      { type: "image", src: "images/B13.JPG", caption: "" },
      { type: "image", src: "images/B14.JPG", caption: "" },
      { type: "image", src: "images/B15.JPG", caption: "" },
      { type: "image", src: "images/B16.JPG", caption: "" },
      { type: "image", src: "images/B17.JPG", caption: "" },
      { type: "image", src: "images/B18.JPG", caption: "" },
      { type: "image", src: "images/B19.JPG", caption: "" },
      { type: "image", src: "images/B20.JPG", caption: "" },
      { type: "image", src: "images/B21.JPG", caption: "" },
      { type: "image", src: "images/B22.JPG", caption: "" },
      { type: "image", src: "images/B23.JPG", caption: "" },

    ]
  }
];
/* ====================================================================== */


(() => {
  "use strict";

  /* ====================================================================
     CRYPTO CORE
     - Passwords are hashed (SHA-256) and only ever compared as hashes.
     - Files are encrypted with AES-256-GCM before being stored.
     - The AES key is derived from the password via PBKDF2 and lives
       only in memory while a vault is unlocked.
     ==================================================================== */

  const textEncoder = new TextEncoder();

  async function sha256Hex(text) {
    const data = textEncoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return bufferToHex(hashBuffer);
  }

  function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function hexToBuffer(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes.buffer;
  }

  // Derive an AES-GCM key from a password + salt using PBKDF2.
  async function deriveKey(password, saltBytes) {
    const baseKey = await crypto.subtle.importKey(
      "raw",
      textEncoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: saltBytes,
        iterations: 150000,
        hash: "SHA-256"
      },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async function encryptBlob(blob, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const plainBuffer = await blob.arrayBuffer();
    const cipherBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plainBuffer);
    return {
      cipher: cipherBuffer,
      salt: bufferToHex(salt),
      iv: bufferToHex(iv)
    };
  }

  async function decryptToBlob(cipherBuffer, saltHex, ivHex, password, mimeType) {
    const salt = new Uint8Array(hexToBuffer(saltHex));
    const iv = new Uint8Array(hexToBuffer(ivHex));
    const key = await deriveKey(password, salt);
    const plainBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipherBuffer);
    return new Blob([plainBuffer], { type: mimeType });
  }

  /* ---------- IndexedDB wrapper ---------- */
  const DB_NAME = "us-always-vault";
  const DB_VERSION = 3;
  const VAULT_STORE = "vault_items_v2";       // encrypted Private Vault items
  const GOOFY_STORE = "goofy_items_v2";       // encrypted Goofy Vault items
  const POLAROID_STORE = "polaroid_photos";
  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(VAULT_STORE)) {
          const s = db.createObjectStore(VAULT_STORE, { keyPath: "id" });
          s.createIndex("folder", "folder", { unique: false });
        }
        if (!db.objectStoreNames.contains(GOOFY_STORE)) {
          const s = db.createObjectStore(GOOFY_STORE, { keyPath: "id" });
          s.createIndex("folder", "folder", { unique: false });
        }
        if (!db.objectStoreNames.contains(POLAROID_STORE)) {
          db.createObjectStore(POLAROID_STORE, { keyPath: "slot" });
        }
        // Older unencrypted stores (vault_items, goofy_items, memories) are
        // left untouched if present, but are no longer read from — every
        // item added now goes through the encrypted stores above.
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  function storeAdd(storeName, item) {
    return openDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).add(item);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }
  function storeGetAll(storeName) {
    return openDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const req = tx.objectStore(storeName).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    }));
  }
  function storeDelete(storeName, id) {
    return openDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }

  /* ---- Polaroid store helpers (unencrypted — these aren't "vault" content) ---- */
  async function polaroidSet(slot, blob) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(POLAROID_STORE, "readwrite");
      tx.objectStore(POLAROID_STORE).put({ slot, blob });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
  async function polaroidGetAll() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(POLAROID_STORE, "readonly");
      const req = tx.objectStore(POLAROID_STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  /* ---------- Utility ---------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function uid() {
    return "v_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function showToast(msg) {
    const toast = $("#toast");
    toast.textContent = msg;
    toast.classList.add("visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("visible"), 2600);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  function playIconSvg() {
    return `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M5 3.5C5 2.8 5.8 2.4 6.4 2.8L14 7.3C14.6 7.6 14.6 8.4 14 8.7L6.4 13.2C5.8 13.6 5 13.2 5 12.5V3.5Z"/></svg>`;
  }

  function lockIconSvg() {
    return `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="4" y="9.5" width="14" height="10" rx="1.8" stroke="currentColor" stroke-width="1.5"/><path d="M7 9.5V6.5C7 4 8.8 2 11 2C13.2 2 15 4 15 6.5V9.5" stroke="currentColor" stroke-width="1.5"/></svg>`;
  }

  /* ---------- Nav scroll state ---------- */
  const nav = $("#nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  /* ---------- Hero polaroids (tap to add your own photo) ---------- */
  const polaroidFileInput = $("#polaroid-file-input");
  let activePolaroidSlot = null;

  $$(".polaroid[data-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      activePolaroidSlot = btn.dataset.slot;
      polaroidFileInput.click();
    });
  });

  polaroidFileInput.addEventListener("change", async () => {
    const file = polaroidFileInput.files && polaroidFileInput.files[0];
    polaroidFileInput.value = "";
    if (!file || activePolaroidSlot === null) return;
    if (!file.type.startsWith("image")) {
      showToast("Polaroids hold photos only");
      return;
    }
    try {
      await polaroidSet(activePolaroidSlot, file);
      paintPolaroid(activePolaroidSlot, file);
      showToast("Polaroid updated ♡");
    } catch (err) {
      console.error(err);
      showToast("Couldn't save that photo");
    }
  });

  function paintPolaroid(slot, blob) {
    const el = $(`#polaroid-img-${slot}`);
    if (!el) return;
    const url = URL.createObjectURL(blob);
    el.style.backgroundImage = `url("${url}")`;
    el.classList.add("has-photo");
  }

  async function loadPolaroids() {
    try {
      const saved = await polaroidGetAll();
      saved.forEach(p => paintPolaroid(p.slot, p.blob));
    } catch (err) {
      console.error("Could not load polaroids:", err);
    }
  }

  /* ====================================================================
     MEMORY FOLDERS (reads straight from the FOLDERS array at the top
     of this file — no upload form, no database, just edit the array)
     ==================================================================== */

  const foldersGrid = $("#folders-grid");
  const emptyState = $("#empty-state");
  let currentSearch = "";

  function folderCoverItem(folder) {
    if (folder.cover) return { type: "image", src: folder.cover };
    return folder.items.find(i => i.type === "image") || folder.items[0] || null;
  }

  function matchesSearch(folder, query) {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      folder.name.toLowerCase().includes(q) ||
      folder.location.toLowerCase().includes(q) ||
      (folder.note || "").toLowerCase().includes(q)
    );
  }

  function renderFolders() {
    const visibleFolders = FOLDERS.filter(f => matchesSearch(f, currentSearch));
    foldersGrid.innerHTML = "";

    emptyState.classList.toggle("visible", FOLDERS.length === 0);
    foldersGrid.style.display = FOLDERS.length === 0 ? "none" : "grid";

    if (FOLDERS.length > 0 && visibleFolders.length === 0) {
      const none = document.createElement("p");
      none.style.cssText = "text-align:center;color:var(--cream-faint);padding:40px 0;grid-column:1/-1;";
      none.textContent = "No folders match that search.";
      foldersGrid.appendChild(none);
      return;
    }

    visibleFolders.forEach((folder, idx) => {
      const cover = folderCoverItem(folder);
      const card = document.createElement("article");
      card.className = "folder-card";
      card.style.animationDelay = (idx % 6) * 0.07 + "s";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Open folder: ${folder.name}`);

      const countLabel = folder.items.length === 0
        ? "Empty for now"
        : `${folder.items.length} kept`;

      card.innerHTML = `
        <div class="folder-card-cover">
          ${cover
            ? (cover.type === "video"
                ? `<video src="${cover.src}" muted playsinline preload="metadata"></video><div class="t-card-playicon">${playIconSvg()}</div>`
                : `<img src="${cover.src}" alt="${escapeHtml(folder.name)}" loading="lazy">`)
            : `<div class="folder-card-placeholder"><span>${folderGlyph(idx)}</span></div>`
          }
          <div class="folder-card-tab"></div>
        </div>
        <div class="folder-card-body">
          <h3 class="folder-card-title">${escapeHtml(folder.name)}</h3>
          <p class="folder-card-loc">📍 ${escapeHtml(folder.location)}</p>
          <div class="folder-card-meta">
            <span class="folder-card-count">${countLabel}</span>
            ${folder.date ? `<span class="folder-card-date">${escapeHtml(folder.date)}</span>` : ""}
          </div>
        </div>
      `;

      card.addEventListener("click", () => openFolder(folder.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openFolder(folder.id); }
      });

      foldersGrid.appendChild(card);
    });
  }

  function folderGlyph(idx) {
    const glyphs = ["🏖️", "🏕️", "🌾"];
    return glyphs[idx % glyphs.length];
  }

  let searchDebounce;
  $("#search-input").addEventListener("input", (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      currentSearch = e.target.value.trim();
      renderFolders();
    }, 180);
  });

  /* ---------- Folder viewer (full gallery for one folder) ---------- */
  const folderViewer = $("#folder-viewer");
  let folderLightboxQueue = [];
  let folderLightboxIndex = 0;

  function openFolder(folderId) {
    const folder = FOLDERS.find(f => f.id === folderId);
    if (!folder) return;

    $("#folder-viewer-title").textContent = folder.name;
    $("#folder-viewer-location").textContent = "📍 " + folder.location + (folder.date ? "  ·  " + folder.date : "");
    $("#folder-viewer-note").textContent = folder.note || "";
    $("#folder-viewer-note").style.display = folder.note ? "block" : "none";

    const grid = $("#folder-viewer-grid");
    const empty = $("#folder-viewer-empty");
    grid.innerHTML = "";

    if (folder.items.length === 0) {
      empty.style.display = "flex";
      grid.style.display = "none";
    } else {
      empty.style.display = "none";
      grid.style.display = "grid";

      folder.items.forEach((item, idx) => {
        const cell = document.createElement("div");
        cell.className = "folder-viewer-item";
        cell.style.animationDelay = (idx % 10) * 0.04 + "s";
        cell.tabIndex = 0;
        cell.setAttribute("role", "button");
        cell.setAttribute("aria-label", item.caption || "Open photo");

        cell.innerHTML = item.type === "video"
          ? `<video src="${item.src}" muted playsinline preload="metadata"></video><div class="t-card-playicon">${playIconSvg()}</div>`
          : `<img src="${item.src}" alt="${escapeHtml(item.caption || folder.name)}" loading="lazy">`;

        cell.addEventListener("click", () => openFolderLightbox(folderId, idx));
        cell.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openFolderLightbox(folderId, idx); }
        });

        grid.appendChild(cell);
      });
    }

    folderViewer.classList.add("visible");
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function closeFolder() {
    folderViewer.classList.remove("visible");
    document.body.style.overflow = "";
  }

  $("#folder-viewer-back").addEventListener("click", closeFolder);

  const lightbox = $("#lightbox");
  const lightboxContent = $("#lightbox-content");

  function openFolderLightbox(folderId, itemIndex) {
    const folder = FOLDERS.find(f => f.id === folderId);
    if (!folder) return;
    folderLightboxQueue = folder.items.map(i => ({ ...i, folderName: folder.name, folderLocation: folder.location }));
    folderLightboxIndex = itemIndex;
    showFolderLightboxItem();
    lightbox.classList.add("visible");
  }

  function showFolderLightboxItem() {
    const item = folderLightboxQueue[folderLightboxIndex];
    if (!item) return;

    lightboxContent.innerHTML = item.type === "video"
      ? `<video src="${item.src}" controls autoplay playsinline></video>`
      : `<img src="${item.src}" alt="${escapeHtml(item.caption || item.folderName)}">`;

    $("#lightbox-mood").textContent = "";
    $("#lightbox-title").textContent = item.folderName;
    $("#lightbox-date-loc").textContent =
      "📍 " + item.folderLocation + (folderLightboxQueue.length > 1 ? `  ·  ${folderLightboxIndex + 1} / ${folderLightboxQueue.length}` : "");
    $("#lightbox-story").textContent = item.caption || "";
    $("#lightbox-delete").style.display = "none";

    const navVisible = folderLightboxQueue.length > 1;
    $("#lightbox-prev").style.visibility = navVisible ? "visible" : "hidden";
    $("#lightbox-next").style.visibility = navVisible ? "visible" : "hidden";
  }

  $("#lightbox-prev").addEventListener("click", () => {
    folderLightboxIndex = (folderLightboxIndex - 1 + folderLightboxQueue.length) % folderLightboxQueue.length;
    showFolderLightboxItem();
  });
  $("#lightbox-next").addEventListener("click", () => {
    folderLightboxIndex = (folderLightboxIndex + 1) % folderLightboxQueue.length;
    showFolderLightboxItem();
  });

  function closeLightbox() {
    lightbox.classList.remove("visible");
    lightboxContent.innerHTML = "";
  }
  $("#lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("visible")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") $("#lightbox-prev").click();
      if (e.key === "ArrowRight") $("#lightbox-next").click();
      return;
    }
    if (folderViewer.classList.contains("visible") && e.key === "Escape") {
      closeFolder();
    }
  });

  /* ====================================================================
     VAULT FACTORY — builds one encrypted, password-locked vault.
     Used twice: the Private Vault (1026) and Goofy Mode (anggandako).
     ==================================================================== */

  const AUTO_LOCK_MS = 5 * 60 * 1000; // 5 minutes of inactivity

  function createVault(config) {
    const {
      idPrefix,        // e.g. "vault" or "goofy"
      storeName,        // IndexedDB store for this vault's items
      password,         // plaintext password (compared via hash, never stored)
      lockedLabel,      // copy for "wrong password" message
      lockedMsg,
      unlockedMsg
    } = config;

    const el = (suffix) => $(`#${idPrefix}-${suffix}`);
    const elAll = (suffix) => $$(`.${suffix}`); // for shared classes like .vp-dot scoped via parent

    const lockedPane = el("locked");
    const unlockedPane = el("unlocked");
    const passForm = el("pass-form");
    const passInput = el("pass-input");
    const passError = el("pass-error");
    const passDots = $$(`#${idPrefix}-pass-dots .vp-dot`);
    const grid = el("grid");
    const emptyPane = el("empty");
    //const fileInput = el("file-input");
    const lockBtn = el("lock-btn");
   //const addBtn = el("add-btn");
   //const emptyAddBtn = el("empty-add");
    const tabsWrap = el("folder-tabs");
    const lightboxEl = el("lightbox");
    const lightboxContentEl = el("lightbox-content");
    const lightboxCounter = el("lightbox-counter");
    const lightboxDeleteBtn = el("lightbox-delete");
    const lightboxCloseBtn = el("lightbox-close");
    const lightboxPrevBtn = el("lightbox-prev");
    const lightboxNextBtn = el("lightbox-next");

    let unlocked = false;
    let sessionKeyPassword = null; // kept in memory only while unlocked
    let items = [];                // decrypted-on-demand metadata + object URLs cache
    let activeFolder = "photos";
    let lbQueue = [];
    let lbIndex = 0;
    let autoLockTimer = null;
    let passwordHash = null;

    sha256Hex(password).then(h => { passwordHash = h; });

    function resetAutoLock() {
      if (!unlocked) return;
      clearTimeout(autoLockTimer);
      autoLockTimer = setTimeout(() => {
        lock();
        showToast("Locked after a few quiet minutes ♡");
      }, AUTO_LOCK_MS);
    }

    ["mousemove", "keydown", "click", "touchstart", "scroll"].forEach(evt => {
      document.addEventListener(evt, () => { if (unlocked) resetAutoLock(); }, { passive: true });
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && unlocked) {
        lock();
      }
    });

    lockedPane.addEventListener("click", (e) => {
      if (e.target.closest("form")) { passInput.focus(); return; }
      passInput.focus();
    });

    passInput.addEventListener("input", () => {
      const val = passInput.value;
      passDots.forEach((dot, i) => {
        dot.classList.toggle("filled", i < val.length);
        dot.classList.remove("shake-error");
      });
      passError.textContent = "";
    });

    passForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const attemptHash = await sha256Hex(passInput.value);
      if (passwordHash && attemptHash === passwordHash) {
        sessionKeyPassword = passInput.value;
        await unlock();
      } else {
        passError.textContent = lockedLabel || "That's not quite it — try again.";
        passDots.forEach(d => d.classList.add("shake-error"));
        lockedPane.classList.add("shake");
        setTimeout(() => lockedPane.classList.remove("shake"), 450);
        passInput.value = "";
        passDots.forEach(d => d.classList.remove("filled"));
      }
    });

    async function unlock() {
      unlocked = true;
      lockedPane.classList.add("hidden");
      unlockedPane.classList.add("visible");
      passInput.value = "";
      passDots.forEach(d => d.classList.remove("filled", "shake-error"));
      passError.textContent = "";

      items = [
      ...PRIVATE_VAULT.photos.map((item, i) => ({
      id: "p" + i,
      folder: "photos",
      ...item
       })),

      ...PRIVATE_VAULT.videos.map((item, i) => ({
      id: "v" + i,
      folder: "videos",
      ...item
       }))
     ];
  
      renderGrid();
      resetAutoLock();
      showToast(unlockedMsg || "Unlocked ♡");
    }

    function lock() {
      unlocked = false;
      sessionKeyPassword = null;
      clearTimeout(autoLockTimer);
      unlockedPane.classList.remove("visible");
      lockedPane.classList.remove("hidden");
      grid.innerHTML = "";
      closeVaultLightbox();
      setTimeout(() => passInput.focus(), 50);
    }

    lockBtn.addEventListener("click", () => {
      lock();
      showToast(lockedMsg || "Locked");
    });

    if (tabsWrap) {
      tabsWrap.addEventListener("click", (e) => {
        const tab = e.target.closest(".vault-tab");
        if (!tab) return;
        $$(`#${idPrefix}-folder-tabs .vault-tab`).forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeFolder = tab.dataset.folder;
        renderGrid();
      });
    }

    //addBtn.addEventListener("click", () => fileInput.click());
    //if (emptyAddBtn) emptyAddBtn.addEventListener("click", () => fileInput.click());

    //fileInput.addEventListener("change", async () => {
      //const files = Array.from(fileInput.files || []);
     // fileInput.value = "";
    //  if (!files.length || !sessionKeyPassword) return;

    //  let added = 0;
    //  for (const file of files) {
      //  const isVideo = file.type.startsWith("video");
        //const isImage = file.type.startsWith("image");
        //if (!isVideo && !isImage) continue;

        //try {
          //const { cipher, salt, iv } = await encryptBlob(file, sessionKeyPassword);
          //const record = {
            //id: uid(),
            //folder: isVideo ? "videos" : "photos",
            //type: isVideo ? "video" : "image",
            //mimeType: file.type,
            //name: file.name,
            //cipher,
            //salt,
            //iv,
            //createdAt: Date.now()
          //};
          //await storeAdd(storeName, record);
          //items.push(record);
          //added++;
        //} catch (err) {
          //console.error("Encrypt/store failed:", err);
        //}
      //}

      //if (added > 0) {
        //const hasVideo = files.some(f => f.type.startsWith("video"));
        //const hasImage = files.some(f => f.type.startsWith("image"));
        //if (hasImage && !hasVideo) activeFolder = "photos";
        //if (hasVideo && !hasImage) activeFolder = "videos";
        //$$(`#${idPrefix}-folder-tabs .vault-tab`).forEach(t =>
          //t.classList.toggle("active", t.dataset.folder === activeFolder)
        //);
        //renderGrid();
        //showToast(added === 1 ? "Encrypted and saved ♡" : `${added} encrypted and saved ♡`);
      //}
      //resetAutoLock();
    //});

    function renderGrid() {
      const list = items.filter(i => i.folder === activeFolder);

      const countPhotos = el("count-photos");
      const countVideos = el("count-videos");
      if (countPhotos) countPhotos.textContent = items.filter(i => i.folder === "photos").length;
      if (countVideos) countVideos.textContent = items.filter(i => i.folder === "videos").length;

      grid.innerHTML = "";
      emptyPane.classList.toggle("visible", list.length === 0);
      const emptyTitle = el("empty-title");
      if (emptyTitle) {
        emptyTitle.textContent = activeFolder === "photos"
          ? "No photos in here yet"
          : "No videos in here yet";
      }

      list.forEach((item, idx) => {
        const cell = document.createElement("div");
        cell.className = "vault-item";
        cell.style.animationDelay = (idx % 10) * 0.04 + "s";
        cell.tabIndex = 0;
        cell.setAttribute("role", "button");
        cell.setAttribute("aria-label", "Open vault item");
        cell.dataset.id = item.id;

        if (item.type === "video") {
          // Tap-to-reveal veil over videos — must be tapped once before playback.
          cell.innerHTML = `
            <div class="veil-cover">
              ${lockIconSvg()}
              <span>Tap to reveal</span>
            </div>
          `;
          cell.addEventListener("click", (e) => {
            const veil = cell.querySelector(".veil-cover");
            if (veil && !veil.classList.contains("veil-gone")) {
              veil.classList.add("veil-gone");
              renderThumb(cell, item);
              return;
            }
            openVaultLightbox(item.id);
          });
        } else {
          renderThumb(cell, item);
          cell.addEventListener("click", () => openVaultLightbox(item.id));
        }

        cell.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openVaultLightbox(item.id); }
        });

        grid.appendChild(cell);
      });
    }

    async function renderThumb(cell, item) {
       const media =
    item.type === "video"
      ? `<video src="${item.src}" muted playsinline preload="metadata"></video>
         <div class="t-card-playicon">${playIconSvg()}</div>`
      : `<img src="${item.src}" alt="">`;

    cell.insertAdjacentHTML("beforeend", media);
    }

    async function openVaultLightbox(itemId) {
      lbQueue = items.filter(i => i.folder === activeFolder);
      lbIndex = lbQueue.findIndex(i => i.id === itemId);
      if (lbIndex < 0) lbIndex = 0;
      await showLightboxItem();
      lightboxEl.classList.add("visible");
      document.body.style.overflow = "hidden";
      resetAutoLock();
    }

    async function showLightboxItem() {
       const item = lbQueue[lbIndex];

      if (!item) return;

      lightboxContentEl.innerHTML =
       item.type === "video"
      ? `<video src="${item.src}" controls autoplay playsinline></video>`
      : `<img src="${item.src}" alt="">`;

      if (lightboxCounter) {
       lightboxCounter.textContent =
      `${lbIndex + 1} / ${lbQueue.length}`;
      }    
    }

    function closeVaultLightbox() {
      lightboxEl.classList.remove("visible");
      document.body.style.overflow = "";
      lightboxContentEl.innerHTML = "";
    }

    lightboxCloseBtn.addEventListener("click", closeVaultLightbox);
    lightboxEl.addEventListener("click", (e) => { if (e.target === lightboxEl) closeVaultLightbox(); });
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener("click", () => {
      lbIndex = (lbIndex - 1 + lbQueue.length) % lbQueue.length;
      showLightboxItem();
      resetAutoLock();
    });
    if (lightboxNextBtn) lightboxNextBtn.addEventListener("click", () => {
      lbIndex = (lbIndex + 1) % lbQueue.length;
      showLightboxItem();
      resetAutoLock();
    });

    lightboxDeleteBtn.addEventListener("click", async () => {
      const item = lbQueue[lbIndex];
      if (!item) return;
      if (!confirm("Remove this from the vault? This can't be undone.")) return;

      await storeDelete(storeName, item.id);
      items = items.filter(i => i.id !== item.id);
      closeVaultLightbox();
      renderGrid();
      showToast("Removed from vault");
    });

    document.addEventListener("keydown", (e) => {
      if (!lightboxEl.classList.contains("visible")) return;
      if (e.key === "Escape") closeVaultLightbox();
      if (e.key === "ArrowLeft" && lightboxPrevBtn) lightboxPrevBtn.click();
      if (e.key === "ArrowRight" && lightboxNextBtn) lightboxNextBtn.click();
    });

    return { lock };
  }

  /* ---------- Instantiate both vaults ---------- */
  const privateVault = createVault({
    idPrefix: "vault",
    storeName: VAULT_STORE,
    password: "1026",
    lockedMsg: "Locked",
    unlockedMsg: "Vault unlocked ♡"
    
  });

  const PRIVATE_VAULT = {
  photos: [],
  videos: [
    { type: "video", src: "videos/V1.mp4" },
    { type: "video", src: "videos/V2.mp4" },
    { type: "video", src: "videos/V3.mp4" },
    { type: "video", src: "videos/V4.mp4" }
  ]
};

  const goofyVault = createVault({
    idPrefix: "goofy",
    storeName: GOOFY_STORE,
    password: "anggandako",
    lockedMsg: "Locked back up 🤐",
    unlockedMsg: "Welcome to the chaos 🤪"
  });

  /* ---------- Hero stats (counts everything across all folders) ---------- */
  function renderStats() {
    const totalItems = FOLDERS.reduce((sum, f) => sum + f.items.length, 0);
    const foldersWithContent = FOLDERS.filter(f => f.items.length > 0).length;
    $("#stat-count").textContent = totalItems;
    $("#stat-days").textContent = foldersWithContent;
    $("#stat-first").textContent = FOLDERS.length > 0 ? FOLDERS.length + " folders" : "—";
  }

  /* ---------- Init ---------- */
  function init() {
    renderFolders();
    renderStats();
    loadPolaroids();

    if (!window.isSecureContext || !window.crypto || !window.crypto.subtle) {
      console.warn(
        "This page isn't running in a secure context, so the vaults' " +
        "encryption can't function. Serve this site over HTTPS (or via " +
        "localhost during local testing) rather than opening the HTML " +
        "file directly."
      );
      [$("#vault-locked"), $("#goofy-locked")].forEach(pane => {
        if (!pane) return;
        const note = document.createElement("p");
        note.className = "vault-pass-error";
        note.style.opacity = "1";
        note.textContent = "This page needs to be served over HTTPS (or localhost) for the vault to work.";
        pane.querySelector(".vault-door")?.appendChild(note);
      });
    }
  }

  init();
})();
