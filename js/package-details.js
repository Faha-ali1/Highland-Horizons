/* ==========================================================================
   Highland Horizons - Package Details Page Script
   Author: Asher Maqsood (26i-3246)
   ========================================================================== */

(function () {
  "use strict";

  // Storage keys matching project conventions
  const STORAGE_KEYS = {
    SELECTED_DETAIL_ID: "hh_selected_package_id",
    SAVED_PACKAGES: "hh_saved_packages",
    BOOKING_DATA: "hhBookingData"
  };

  /**
   * Builds a lightweight SVG landscape illustration as a data URI.
   * Matches the temporary illustrations used across Highland Horizons.
   */
  function createDestinationThumbnail(title, skyTop, skyBottom, ridgeBack, ridgeFront, accentColor) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-label="${title}">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${skyTop}" />
            <stop offset="100%" stop-color="${skyBottom}" />
          </linearGradient>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFFDF5" />
            <stop offset="100%" stop-color="${accentColor}" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#skyGrad)" />
        <circle cx="640" cy="110" r="50" fill="url(#sunGrad)" opacity="0.92" />
        <path d="M0 320 L160 190 L320 280 L490 160 L650 265 L800 210 L800 450 L0 450 Z" fill="${ridgeBack}" />
        <path d="M465 180 L490 160 L515 182 L500 178 L485 186 Z" fill="#FFFFFF" opacity="0.92" />
        <path d="M135 210 L160 190 L185 212 L170 206 L150 214 Z" fill="#FFFFFF" opacity="0.88" />
        <path d="M0 355 L120 285 L260 335 L410 260 L560 330 L720 280 L800 310 L800 450 L0 450 Z" fill="${ridgeFront}" />
        <rect x="0" y="380" width="800" height="70" fill="#26332E" opacity="0.85" />
        <text x="36" y="424" fill="#FFFDF5" font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="600">${title}</text>
      </svg>
    `.trim();

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  /**
   * Master package dataset.
   * Matches IDs, prices, durations, descriptions and amenities from tour-packages.js.
   * Day-by-day itineraries are crafted appropriately for each individual package.
   */
  const TOUR_PACKAGES = [
    {
      id: "hunza-valley",
      name: "Hunza Valley",
      destination: "Hunza",
      durationDays: 5,
      durationLabel: "5 days / 4 nights",
      pricePkr: 25000,
      description:
        "Discover Karimabad, Baltit Fort, Attabad Lake, and panoramic views of Rakaposhi on a scenic five-day journey through Hunza.",
      hotelCategory: "3-star hotel",
      meals: "Breakfast included",
      tourGuideAvailable: true,
      tourGuideLabel: "Tour guide available",
      imageAlt: "Scenic mountain valley illustration representing Hunza Valley",
      imageSrc: createDestinationThumbnail("Hunza Valley", "#88C9A1", "#E7F6EC", "#2E7D5B", "#1E563E", "#F4B183"),
      itinerary: [
        {
          day: 1,
          title: "Islamabad Departure & Scenic Drive to Chilas",
          description: "Depart early via Hazara Motorway and Karakoram Highway. Witness the confluence of Indus and Gilgit rivers before checking in at Chilas."
        },
        {
          day: 2,
          title: "Rakaposhi Viewpoint & Arrival in Karimabad",
          description: "Continue along the majestic KKH with a scenic lunch stop at Rakaposhi Viewpoint. Arrive in Karimabad, settle into your 3-star hotel, and enjoy the sunset."
        },
        {
          day: 3,
          title: "Baltit Fort, Altit Fort & Local Cultural Bazaar",
          description: "Guided heritage tour of the 700-year-old Baltit and Altit Forts. Spend the afternoon exploring authentic local handicraft markets and apricot orchards."
        },
        {
          day: 4,
          title: "Attabad Lake Boating & Passu Cones",
          description: "Cruise the vivid turquoise waters of Attabad Lake. Travel onward to view the iconic Passu Cones and the historic Hussaini Suspension Bridge."
        },
        {
          day: 5,
          title: "Souvenir Shopping & Return Journey",
          description: "Morning stroll in Karimabad for traditional dried fruits and walnut cake, followed by the return drive to Islamabad with cherished memories."
        }
      ]
    },
    {
      id: "skardu-adventure",
      name: "Skardu Adventure",
      destination: "Skardu",
      durationDays: 7,
      durationLabel: "7 days / 6 nights",
      pricePkr: 35000,
      description:
        "Experience Shangrila Resort, Upper Kachura Lake, Shigar Fort, and the cold desert of Sarfaranga over an unforgettable week.",
      hotelCategory: "4-star hotel",
      meals: "All meals included",
      tourGuideAvailable: true,
      tourGuideLabel: "Tour guide available",
      imageAlt: "Highland lake and peaks illustration representing Skardu Adventure",
      imageSrc: createDestinationThumbnail("Skardu Adventure", "#7AB8B2", "#E4F3F1", "#28666E", "#1C4B52", "#F4B183"),
      itinerary: [
        {
          day: 1,
          title: "Arrival in Skardu & Hotel Check-in",
          description: "Arrive in Skardu via scenic mountain flight or highway. Check into your 4-star hotel and enjoy a tranquil welcome dinner."
        },
        {
          day: 2,
          title: "Lower & Upper Kachura Lake Exploration",
          description: "Visit Shangrila Resort (Lower Kachura Lake) followed by a short hike to Upper Kachura Lake for trout fishing and relaxing boat rides."
        },
        {
          day: 3,
          title: "Historic Shigar Fort & Cold Desert",
          description: "Tour the 17th-century Raja Palace at Shigar Fort. On the way back, experience the surreal sand dunes of Sarfaranga Cold Desert."
        },
        {
          day: 4,
          title: "Deosai National Park & Sheosar Lake",
          description: "Full-day 4x4 jeep safari across Deosai Plains, the second highest plateau in the world, with panoramic stops at Sheosar Lake."
        },
        {
          day: 5,
          title: "Khaplu Palace & Chaqchan Mosque",
          description: "Excursion to the heritage village of Khaplu. Walk through lush royal gardens and visit the 700-year-old wooden Chaqchan Mosque."
        },
        {
          day: 6,
          title: "Manthokha Waterfall & Local Skardu Bazaar",
          description: "Witness the cascading Manthokha Waterfall in Kharmang valley. Spend the evening browsing Skardu's gemstone and craft bazaar."
        },
        {
          day: 7,
          title: "Farewell Breakfast & Departure",
          description: "Enjoy a hearty breakfast with regional Balti delicacies before departing with unforgettable highland memories."
        }
      ]
    },
    {
      id: "fairy-meadows-trek",
      name: "Fairy Meadows Trek",
      destination: "Fairy Meadows",
      durationDays: 6,
      durationLabel: "6 days / 5 nights",
      pricePkr: 30000,
      description:
        "Take a thrilling jeep ride to Tato and trek up to lush alpine meadows facing the towering north face of Nanga Parbat.",
      hotelCategory: "Alpine cabins & camps",
      meals: "Breakfast & dinner included",
      tourGuideAvailable: true,
      tourGuideLabel: "Tour guide available",
      imageAlt: "Alpine meadow and snow peak illustration representing Fairy Meadows Trek",
      imageSrc: createDestinationThumbnail("Fairy Meadows", "#90D0A8", "#ECF8F0", "#357A57", "#23533A", "#FFD59E"),
      itinerary: [
        {
          day: 1,
          title: "Islamabad to Chilas via Babusar Pass",
          description: "Scenic journey through Kaghan Valley and Babusar Pass (seasonal) down to Chilas on the banks of the Indus."
        },
        {
          day: 2,
          title: "Raikot Bridge, 4x4 Jeep Ride to Tato & Trek to Fairy Meadows",
          description: "Exciting 4x4 mountain jeep ride to Tato village, followed by a scenic 3 to 4 hour guided alpine trek up to Fairy Meadows."
        },
        {
          day: 3,
          title: "Exploration Around Fairy Meadows & Nanga Parbat Views",
          description: "Acclimatization day exploring pine forests, reflection pools, and breathtaking direct views of Nanga Parbat (8,126m)."
        },
        {
          day: 4,
          title: "Day Hike to Beyal Camp & Nanga Parbat Base Camp Viewpoint",
          description: "Hike through birch woods to Beyal Camp and onward to the edge of the Raikot Glacier for a close-up vista of the Killer Mountain."
        },
        {
          day: 5,
          title: "Descent to Tato & Return Drive to Chilas / Besham",
          description: "Trek back down to Tato village, board jeeps to Raikot Bridge, and proceed to comfortable night lodging in Chilas or Besham."
        },
        {
          day: 6,
          title: "Return Drive to Islamabad",
          description: "Drive back to Islamabad via the Hazara Motorway, concluding an exhilarating mountain expedition."
        }
      ]
    },
    {
      id: "swat-valley-escape",
      name: "Swat Valley Escape",
      destination: "Swat",
      durationDays: 3,
      durationLabel: "3 days / 2 nights",
      pricePkr: 15000,
      description:
        "Unwind along the Swat River with visits to Mingora, Malam Jabba chairlift, and the cedar forests of Kalam.",
      hotelCategory: "3-star hotel",
      meals: "Breakfast included",
      tourGuideAvailable: true,
      tourGuideLabel: "Tour guide available",
      imageAlt: "Green valley hills illustration representing Swat Valley Escape",
      imageSrc: createDestinationThumbnail("Swat Valley", "#A2DBB7", "#F2FBF5", "#3A8862", "#265E43", "#F4B183"),
      itinerary: [
        {
          day: 1,
          title: "Islamabad to Swat Valley & Malam Jabba Ski Resort",
          description: "Drive via Swat Motorway to Malam Jabba. Enjoy the scenic chairlift ride, zipline adventures, and fresh mountain breezes."
        },
        {
          day: 2,
          title: "Scenic Transfer to Kalam Valley & Ushu Forest",
          description: "Travel alongside the rushing Swat River to Kalam. Explore the dense pine and cedar trees of Ushu Forest and Mahodand Lake approach."
        },
        {
          day: 3,
          title: "Mingora Cultural Bazaar, White Palace & Return",
          description: "Visit the historic White Palace at Marghuzar and shop for traditional Swati shawls and wooden handicrafts in Mingora before returning."
        }
      ]
    },
    {
      id: "naran-kaghan-tour",
      name: "Naran Kaghan Tour",
      destination: "Naran Kaghan",
      durationDays: 4,
      durationLabel: "4 days / 3 nights",
      pricePkr: 20000,
      description:
        "Cruise along the Kunhar River to Saif-ul-Malook Lake, Lulusar Lake, and the misty heights of Babusar Top.",
      hotelCategory: "3-star hotel",
      meals: "Breakfast & dinner included",
      tourGuideAvailable: true,
      tourGuideLabel: "Tour guide available",
      imageAlt: "Mountain river and peaks illustration representing Naran Kaghan Tour",
      imageSrc: createDestinationThumbnail("Naran Kaghan", "#7FC49B", "#E6F5EC", "#2A7253", "#1D4E39", "#F4B183"),
      itinerary: [
        {
          day: 1,
          title: "Islamabad to Naran via Balakot & Kunhar River",
          description: "Depart from Islamabad via Hazara Motorway. Trace the scenic Kunhar River past Balakot and Kewai Waterfall to reach Naran town."
        },
        {
          day: 2,
          title: "Jeep Safari to Saif-ul-Malook Lake",
          description: "Ascend by 4x4 jeep to legendary Saif-ul-Malook Lake. Admire the turquoise waters crowned by Malika Parbat, with optional boating and walking."
        },
        {
          day: 3,
          title: "Lulusar Lake & High-Altitude Babusar Top (4,173m)",
          description: "Excursion through upper Kaghan Valley to the calm expanse of Lulusar Lake, followed by panoramic mountain passes at Babusar Top."
        },
        {
          day: 4,
          title: "River Rafting Stop & Return Drive",
          description: "Optional morning river rafting on the Kunhar River, followed by a comfortable return drive to Islamabad."
        }
      ]
    },
    {
      id: "shogran-tour",
      name: "Shogran Tour",
      destination: "Shogran",
      durationDays: 3,
      durationLabel: "3 days / 2 nights",
      pricePkr: 18000,
      description:
        "Enjoy a refreshing pine-forest retreat in Shogran with a jeep excursion up to Siri Paye Meadows and Makra Peak views.",
      hotelCategory: "3-star hill resort",
      meals: "Breakfast included",
      tourGuideAvailable: true,
      tourGuideLabel: "Tour guide available",
      imageAlt: "Pine meadow plateau illustration representing Shogran Tour",
      imageSrc: createDestinationThumbnail("Shogran Tour", "#9BD4B0", "#EEF9F2", "#317B59", "#21553D", "#F7C59F"),
      itinerary: [
        {
          day: 1,
          title: "Islamabad to Kawai & Jeep Ascent to Shogran",
          description: "Scenic drive to Kewai. Transfer to 4x4 mountain jeeps for a winding forest climb up to the serene plateau of Shogran."
        },
        {
          day: 2,
          title: "Siri Paye Meadows & Makra Peak Viewpoint",
          description: "Full-day exploration of Siri Lake and the sprawling alpine meadows of Paye, surrounded by pine forests with views of Makra Peak."
        },
        {
          day: 3,
          title: "Morning Forest Walk & Return Journey",
          description: "Enjoy a peaceful sunrise walk in Shogran pine woods before descending to Kewai and journeying back to Islamabad."
        }
      ]
    }
  ];

  // State
  let currentPackage = null;
  let travellerCount = 1;

  // DOM Elements
  const dom = {
    wrapper: document.getElementById("pd-package-wrapper"),
    notFoundState: document.getElementById("pd-not-found-state"),
    notificationBanner: document.getElementById("pd-notification-banner"),
    title: document.getElementById("pd-package-title"),
    destination: document.getElementById("pd-package-destination"),
    duration: document.getElementById("pd-package-duration"),
    heroImg: document.getElementById("pd-hero-image"),
    description: document.getElementById("pd-package-description"),
    accommodation: document.getElementById("pd-package-accommodation"),
    meals: document.getElementById("pd-package-meals"),
    guide: document.getElementById("pd-package-guide"),
    durationDetail: document.getElementById("pd-package-duration-detail"),
    itineraryDayCount: document.getElementById("pd-itinerary-day-count"),
    itineraryList: document.getElementById("pd-itinerary-list"),
    ratePerPerson: document.getElementById("pd-rate-per-person"),
    btnMinus: document.getElementById("pd-btn-minus"),
    btnPlus: document.getElementById("pd-btn-plus"),
    travellerDisplay: document.getElementById("pd-traveller-display"),
    calcBreakdown: document.getElementById("pd-calc-breakdown"),
    calcSubtotal: document.getElementById("pd-calc-subtotal"),
    totalPrice: document.getElementById("pd-total-price"),
    btnBookNow: document.getElementById("pd-btn-book-now"),
    btnSavePackage: document.getElementById("pd-btn-save-package"),
    saveBtnText: document.getElementById("pd-save-btn-text")
  };

  /**
   * Formats PKR values cleanly (e.g. 25000 -> "PKR 25,000")
   */
  function formatPkr(amount) {
    return "PKR " + Number(amount).toLocaleString("en-PK");
  }

  /**
   * Resolves target package from URL parameter (?id=xxx) or localStorage fallback.
   */
  function resolveSelectedPackage() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("id");

    if (idFromUrl) {
      const match = TOUR_PACKAGES.find(function (pkg) {
        return pkg.id.toLowerCase() === idFromUrl.trim().toLowerCase();
      });
      if (match) {
        try {
          localStorage.setItem(STORAGE_KEYS.SELECTED_DETAIL_ID, match.id);
        } catch (e) {
          // Ignore storage quota
        }
        return match;
      }
    }

    // Fall back to localStorage if available
    try {
      const idFromStorage = localStorage.getItem(STORAGE_KEYS.SELECTED_DETAIL_ID);
      if (idFromStorage) {
        const match = TOUR_PACKAGES.find(function (pkg) {
          return pkg.id === idFromStorage;
        });
        if (match) return match;
      }
    } catch (e) {
      // Ignore
    }

    // Default fallback to first package if no ID was supplied at all
    if (!idFromUrl) {
      return TOUR_PACKAGES[0];
    }

    // If an invalid ID was explicitly in URL, return null to show graceful Not Found state
    return null;
  }

  /**
   * Shows graceful Not Found UI when an invalid package ID is accessed
   */
  function renderNotFound() {
    if (dom.wrapper) dom.wrapper.hidden = true;
    if (dom.notFoundState) dom.notFoundState.hidden = false;
    document.title = "Package Not Found — Highland Horizons";
  }

  /**
   * Populates all package content, amenities, and itinerary timeline
   */
  function renderPackageDetails(pkg) {
    if (dom.wrapper) dom.wrapper.hidden = false;
    if (dom.notFoundState) dom.notFoundState.hidden = true;

    document.title = pkg.name + " — Highland Horizons";

    if (dom.title) dom.title.textContent = pkg.name;
    if (dom.destination) dom.destination.textContent = pkg.destination;
    if (dom.duration) dom.duration.textContent = pkg.durationLabel;
    if (dom.durationDetail) dom.durationDetail.textContent = pkg.durationLabel;
    if (dom.description) dom.description.textContent = pkg.description;
    if (dom.accommodation) dom.accommodation.textContent = pkg.hotelCategory;
    if (dom.meals) dom.meals.textContent = pkg.meals;
    if (dom.guide) dom.guide.textContent = pkg.tourGuideLabel;

    if (dom.heroImg) {
      dom.heroImg.src = pkg.imageSrc;
      dom.heroImg.alt = pkg.imageAlt || pkg.name;
    }

    if (dom.ratePerPerson) {
      dom.ratePerPerson.textContent = formatPkr(pkg.pricePkr);
    }

    if (dom.itineraryDayCount) {
      dom.itineraryDayCount.textContent = pkg.durationDays + "-Day Journey";
    }

    // Populate day-by-day itinerary
    if (dom.itineraryList) {
      dom.itineraryList.innerHTML = "";
      if (Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0) {
        pkg.itinerary.forEach(function (dayItem) {
          const dayEl = document.createElement("div");
          dayEl.className = "pd-itinerary-day";
          dayEl.innerHTML = `
            <div class="pd-day-badge" aria-hidden="true">${dayItem.day}</div>
            <div class="pd-day-content">
              <h3 class="pd-day-title">Day ${dayItem.day}: ${dayItem.title}</h3>
              <p class="pd-day-desc">${dayItem.description}</p>
            </div>
          `;
          dom.itineraryList.appendChild(dayEl);
        });
      }
    }

    updatePriceCalculation();
    syncSaveButtonState();
  }

  /**
   * Updates traveller counter UI and recalculates total price
   */
  function updatePriceCalculation() {
    if (!currentPackage) return;

    if (dom.travellerDisplay) {
      dom.travellerDisplay.value = travellerCount;
    }

    if (dom.btnMinus) {
      dom.btnMinus.disabled = travellerCount <= 1;
    }

    const total = currentPackage.pricePkr * travellerCount;

    if (dom.calcBreakdown) {
      dom.calcBreakdown.textContent = `${formatPkr(currentPackage.pricePkr)} × ${travellerCount} traveller${travellerCount > 1 ? "s" : ""}`;
    }

    if (dom.calcSubtotal) {
      dom.calcSubtotal.textContent = formatPkr(total);
    }

    if (dom.totalPrice) {
      dom.totalPrice.textContent = formatPkr(total);
    }
  }

  /**
   * Shows a top banner notification with auto-dismiss
   */
  let notificationTimer = null;
  function showNotification(message, type) {
    if (!dom.notificationBanner) return;

    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }

    dom.notificationBanner.className = "pd-notification " + (type === "success" ? "pd-notification--success" : "pd-notification--info");
    dom.notificationBanner.innerHTML = `
      <span>${message}</span>
      <button type="button" class="pd-notification-btn" aria-label="Close message">&times;</button>
    `;
    dom.notificationBanner.hidden = false;

    const closeBtn = dom.notificationBanner.querySelector(".pd-notification-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        dom.notificationBanner.hidden = true;
      });
    }

    notificationTimer = setTimeout(function () {
      dom.notificationBanner.hidden = true;
    }, 4500);
  }

  /**
   * Reads saved packages from localStorage
   */
  function getSavedPackages() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SAVED_PACKAGES);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Checks if current package is saved in localStorage
   */
  function isPackageSaved(packageId) {
    const list = getSavedPackages();
    return list.some(function (item) {
      return (typeof item === "string" ? item : item.id) === packageId;
    });
  }

  /**
   * Updates Save / Unsave Package button visual state based on localStorage
   */
  function syncSaveButtonState() {
    if (!dom.btnSavePackage || !currentPackage) return;
    const saved = isPackageSaved(currentPackage.id);

    if (saved) {
      dom.btnSavePackage.classList.add("pd-btn--saved");
      dom.btnSavePackage.setAttribute("aria-pressed", "true");
      if (dom.saveBtnText) dom.saveBtnText.textContent = "Unsave Package";
    } else {
      dom.btnSavePackage.classList.remove("pd-btn--saved");
      dom.btnSavePackage.setAttribute("aria-pressed", "false");
      if (dom.saveBtnText) dom.saveBtnText.textContent = "Save Package";
    }
  }

  /**
   * Toggles saving and unsaving the package with duplicate prevention and user confirmation
   */
  function handleToggleSavePackage() {
    if (!currentPackage) return;

    let list = getSavedPackages();
    const alreadySaved = isPackageSaved(currentPackage.id);

    if (alreadySaved) {
      // Unsave: remove from localStorage
      list = list.filter(function (item) {
        return (typeof item === "string" ? item : item.id) !== currentPackage.id;
      });

      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_PACKAGES, JSON.stringify(list));
        syncSaveButtonState();
        showNotification(`"${currentPackage.name}" has been removed from your saved packages.`, "info");
      } catch (e) {
        showNotification("Could not update saved packages due to storage restrictions.", "info");
      }
    } else {
      // Save: add with duplicate prevention
      const exists = list.some(function (item) {
        return (typeof item === "string" ? item : item.id) === currentPackage.id;
      });

      if (!exists) {
        const packageRecord = {
          id: currentPackage.id,
          name: currentPackage.name,
          destination: currentPackage.destination,
          durationLabel: currentPackage.durationLabel,
          pricePkr: currentPackage.pricePkr,
          savedAt: new Date().toISOString()
        };
        list.push(packageRecord);
      }

      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_PACKAGES, JSON.stringify(list));
        syncSaveButtonState();
        showNotification(`"${currentPackage.name}" has been saved successfully to your wishlist!`, "success");
      } catch (e) {
        showNotification("Could not save package due to storage restrictions.", "info");
      }
    }
  }

  /**
   * Handles Book Now action by persisting to localStorage and transferring parameters
   * to booking.html matching its actual integration requirements.
   */
  function handleBookNow() {
    if (!currentPackage) return;

    const totalPrice = currentPackage.pricePkr * travellerCount;

    // Actual integration requirements used by booking.html (hhBookingData):
    const bookingPayload = {
      packageName: currentPackage.name,
      duration: currentPackage.durationLabel,
      pricePerPerson: currentPackage.pricePkr,
      currency: "PKR",
      travellers: travellerCount,
      totalPrice: totalPrice,
      packageId: currentPackage.id
    };

    try {
      // 1. Check if there are existing traveller details saved in booking.html so we preserve them
      let existingBooking = {};
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKING_DATA);
      if (raw) {
        try {
          existingBooking = JSON.parse(raw) || {};
        } catch (err) {
          existingBooking = {};
        }
      }

      // Merge package & traveller count into hhBookingData
      const mergedBooking = Object.assign({}, existingBooking, bookingPayload);
      localStorage.setItem(STORAGE_KEYS.BOOKING_DATA, JSON.stringify(mergedBooking));
      localStorage.setItem(STORAGE_KEYS.SELECTED_DETAIL_ID, currentPackage.id);
    } catch (e) {
      // Continue even if localStorage is disabled
    }

    // 2. Also pass parameters via URL query parameters for guaranteed cross-page transfer
    const params = new URLSearchParams({
      packageId: currentPackage.id,
      package: currentPackage.name,
      duration: currentPackage.durationLabel,
      pricePerPerson: String(currentPackage.pricePkr),
      travellers: String(travellerCount),
      totalPrice: String(totalPrice)
    });

    // Path from pages/package-details.html to root booking.html is ../booking.html
    window.location.href = "../booking.html?" + params.toString();
  }

  /**
   * Event listeners and initialization
   */
  function setupEventListeners() {
    // Decrease travellers (min: 1)
    if (dom.btnMinus) {
      dom.btnMinus.addEventListener("click", function () {
        if (travellerCount > 1) {
          travellerCount -= 1;
          updatePriceCalculation();
        }
      });
    }

    // Increase travellers
    if (dom.btnPlus) {
      dom.btnPlus.addEventListener("click", function () {
        if (travellerCount < 50) {
          travellerCount += 1;
          updatePriceCalculation();
        }
      });
    }

    // Direct input change
    if (dom.travellerDisplay) {
      dom.travellerDisplay.addEventListener("change", function () {
        let val = parseInt(dom.travellerDisplay.value, 10);
        if (isNaN(val) || val < 1) {
          val = 1;
        } else if (val > 50) {
          val = 50;
        }
        travellerCount = val;
        updatePriceCalculation();
      });
    }

    // Book Now button
    if (dom.btnBookNow) {
      dom.btnBookNow.addEventListener("click", handleBookNow);
    }

    // Save / Unsave Package toggle button
    if (dom.btnSavePackage) {
      dom.btnSavePackage.addEventListener("click", handleToggleSavePackage);
    }
  }

  function init() {
    setupEventListeners();
    currentPackage = resolveSelectedPackage();

    if (currentPackage) {
      renderPackageDetails(currentPackage);
    } else {
      renderNotFound();
    }
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
