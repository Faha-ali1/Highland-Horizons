/**
 * Highland Horizons — Reusable Destination Details Page Script
 * Reads the ?destination= query parameter from the URL, looks up the matching
 * destination object, and updates the page content and images dynamically.
 */
(function () {
  "use strict";

  var DEFAULT_DESTINATION_ID = "hunza-valley";

  // Allow both full IDs (used by destinations.js) and short names in the URL
  var DESTINATION_ALIASES = {
    "hunza": "hunza-valley",
    "hunza-valley": "hunza-valley",
    "skardu": "skardu",
    "swat": "swat-valley",
    "swat-valley": "swat-valley",
    "naran": "naran-valley",
    "naran-valley": "naran-valley"
  };

  // Inline SVG icons reused across the Things to Do cards
  var ACTIVITY_ICONS = {
    sightseeing:
      '<svg class="hh-activity-icon" viewBox="0 0 24 24" fill="none">' +
      '<path d="M3 19L9 10L13.5 16L16.5 12L21 19H3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />' +
      '<circle cx="17" cy="7" r="2" stroke="currentColor" stroke-width="1.8" />' +
      "</svg>",
    photography:
      '<svg class="hh-activity-icon" viewBox="0 0 24 24" fill="none">' +
      '<path d="M4 8.5C4 7.67157 4.67157 7 5.5 7H8L9.5 5H14.5L16 7H18.5C19.3284 7 20 7.67157 20 8.5V17.5C20 18.3284 19.3284 19 18.5 19H5.5C4.67157 19 4 18.3284 4 17.5V8.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />' +
      '<circle cx="12" cy="13" r="3.2" stroke="currentColor" stroke-width="1.8" />' +
      "</svg>",
    culture:
      '<svg class="hh-activity-icon" viewBox="0 0 24 24" fill="none">' +
      '<path d="M4 20V10L12 4L20 10V20H4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />' +
      '<path d="M9.5 20V14H14.5V20" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />' +
      "</svg>",
    lake:
      '<svg class="hh-activity-icon" viewBox="0 0 24 24" fill="none">' +
      '<path d="M3 14.5C5 13 7 13 9 14.5C11 16 13 16 15 14.5C17 13 19 13 21 14.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />' +
      '<path d="M3 18.5C5 17 7 17 9 18.5C11 20 13 20 15 18.5C17 17 19 17 21 18.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />' +
      '<path d="M5 10.5L9.5 5L13.5 9.5L16 6.5L19 10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
      "</svg>",
    nature:
      '<svg class="hh-activity-icon" viewBox="0 0 24 24" fill="none">' +
      '<path d="M12 3L6.5 11H10L5.5 17H18.5L14 11H17.5L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />' +
      '<line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />' +
      "</svg>"
  };

  // Destination data objects (image paths are relative to pages/destination-details.html)
  var DESTINATIONS = {
    "hunza-valley": {
      id: "hunza-valley",
      name: "Hunza Valley",
      shortName: "Hunza",
      subtitle: "Where Nature Meets Peace",
      region: "Gilgit-Baltistan",
      regionNote: "Located in Northern Pakistan along the scenic Karakoram Highway.",
      bestTime: "Spring / Summer",
      bestTimeNote: "Ideal months for clear mountain views, apricot blossoms, and open highland roads.",
      heroImage: "../assets/images/hunza.jpg",
      heroAlt: "Turquoise river winding past steep mountains, tall green trees, and a bridge in Hunza Valley",
      aboutParagraphs: [
        "Nestled in the Karakoram mountains of Gilgit-Baltistan, Hunza Valley is renowned for its snow-dusted peaks, bright turquoise waters, and serene terraced villages. Framed by towering mountains such as Rakaposhi and Ultar Sar, the valley shifts gently with the seasons — from blossoming apricot orchards in spring to crisp golden leaves in autumn.",
        "Along with its dramatic landscapes, Hunza is cherished for its welcoming local communities, historic hillside forts, and rich northern heritage. Whether you are admiring sunrise over jagged ridges or strolling along peaceful stone pathways, Hunza offers a timeless sense of calm."
      ],
      places: [
        {
          name: "Attabad Lake",
          image: "../assets/images/hunza-attabad.jpg",
          imageAlt: "Bright turquoise water of Attabad Lake surrounded by steep rocky mountains in Hunza",
          description:
            "Famous for its vivid turquoise water surrounded by dramatic rocky cliffs, offering quiet boat rides and unforgettable mountain reflections."
        },
        {
          name: "Passu Cones",
          image: "../assets/images/hunza-passu.jpg",
          imageAlt: "Jagged cathedral-shaped peaks of Passu Cones rising above Upper Hunza",
          description:
            "Iconic cathedral-shaped mountain peaks rising sharply above Upper Hunza, best admired along the Karakoram Highway near Passu village."
        },
        {
          name: "Karimabad",
          image: "../assets/images/hunza-karimabad.jpg",
          imageAlt: "Hillside town of Karimabad overlooking green orchards and snow-covered mountain peaks",
          description:
            "The lively cultural heart of Hunza, home to historic Baltit Fort, cozy craft bazaars, and panoramic viewpoints overlooking Rakaposhi."
        }
      ],
      thingsToDo: [
        {
          title: "Sightseeing",
          icon: "sightseeing",
          description:
            "Take in sweeping views of snow-covered peaks, glacial valleys, and terraced apricot orchards."
        },
        {
          title: "Photography",
          icon: "photography",
          description:
            "Capture golden hour light on the Passu Cones, turquoise reflections at Attabad Lake, and starlit mountain skies."
        },
        {
          title: "Exploring local culture",
          icon: "culture",
          description:
            "Visit heritage forts, browse handmade crafts in Karimabad, and experience warm local hospitality and traditional dishes."
        }
      ]
    },

    "skardu": {
      id: "skardu",
      name: "Skardu",
      shortName: "Skardu",
      subtitle: "Discover the Beauty of Skardu",
      region: "Gilgit-Baltistan",
      regionNote: "Located in the Baltistan region at the confluence of the Indus and Shigar rivers.",
      bestTime: "Spring / Summer",
      bestTimeNote: "Best season for clear skies, calm alpine lakes, and open mountain passes.",
      heroImage: "../assets/images/skardu.jpg",
      heroAlt: "Deep blue mountain lake surrounded by golden trees and rugged peaks in Skardu",
      aboutParagraphs: [
        "Set amid the high peaks of Gilgit-Baltistan, Skardu is a gateway to vast valleys, mirror-like alpine lakes, and dramatic desert-meets-mountain scenery. Towering ranges surround wide river plains, creating a peaceful environment where crisp mountain air and golden light define every view.",
        "From tranquil lakeshores and historic stone forts to quiet villages along winding streams, Skardu blends raw natural grandeur with calm valley life. Travelers visit to slow down beside clear waters and take in some of Pakistan's most memorable high-altitude landscapes."
      ],
      places: [
        {
          name: "Shangrila Lake",
          image: "../assets/images/skardu-shangrilla.jpg",
          imageAlt: "Red-roofed cottages and green lawns beside calm Shangrila Lake framed by mountains",
          description:
            "Also known as Lower Kachura Lake, celebrated for its heart-shaped shoreline, peaceful gardens, and clear mountain reflections."
        },
        {
          name: "Satpara Lake",
          image: "../assets/images/skardu-satpara.jpg",
          imageAlt: "Blue glacial waters of Satpara Lake nestled between barren rocky hills in Skardu",
          description:
            "A serene natural lake just outside Skardu town, surrounded by rugged slopes and crisp blue waters ideal for quiet lakeside walks."
        },
        {
          name: "Shigar Valley",
          image: "../assets/images/skardu-shigar.jpg",
          imageAlt: "Green valley orchards, river plains, and towering mountains in Shigar Valley",
          description:
            "A fertile valley along the Shigar River known for lush apricot orchards, historic Shigar Fort, and scenic routes toward the Karakoram."
        }
      ],
      thingsToDo: [
        {
          title: "Sightseeing",
          icon: "sightseeing",
          description:
            "Admire panoramic mountain vistas, historic forts, and wide river valleys framed by towering peaks."
        },
        {
          title: "Lake visits",
          icon: "lake",
          description:
            "Spend relaxing hours beside Shangrila Lake and Satpara Lake watching still mountain reflections."
        },
        {
          title: "Photography",
          icon: "photography",
          description:
            "Photograph dramatic contrasts of sandy riverbanks, emerald orchards, and snow-lined horizons."
        },
        {
          title: "Exploring nature",
          icon: "nature",
          description:
            "Walk through peaceful valleys, cold desert dunes, and shaded streams across the Skardu basin."
        }
      ]
    },

    "swat-valley": {
      id: "swat-valley",
      name: "Swat Valley",
      shortName: "Swat",
      subtitle: "The Switzerland of Pakistan",
      region: "Khyber Pakhtunkhwa",
      regionNote: "Located in northern Khyber Pakhtunkhwa along the scenic Swat River.",
      bestTime: "Spring / Summer",
      bestTimeNote: "Pleasant temperatures for lush green meadows, pine forests, and high valley lakes.",
      heroImage: "../assets/images/sawat.jpg",
      heroAlt: "Lush green alpine meadows, pine trees, and a calm pond under cloudy skies in Swat Valley",
      aboutParagraphs: [
        "Often called the Switzerland of Pakistan, Swat Valley stretches through Khyber Pakhtunkhwa with emerald meadows, dense pine forests, and clear glacier-fed rivers. Misty hillsides and terraced fields create a refreshing green landscape that feels welcoming in every direction.",
        "Moving northward from lively valley towns to high alpine pastures, visitors encounter rushing streams, cool cedar woods, and peaceful mountain lakes. Swat's accessible beauty and gentle climate make it a favorite retreat for nature lovers and families alike."
      ],
      places: [
        {
          name: "Kalam Valley",
          image: "../assets/images/sawat-kalam.jpg",
          imageAlt: "Clear river flowing past forested slopes and mountain peaks in Kalam Valley, Swat",
          description:
            "A cool green highland valley where rushing rivers meet thick pine forests, serving as the scenic heart of Upper Swat."
        },
        {
          name: "Malam Jabba",
          image: "../assets/images/sawat-malam-jabba.jpg",
          imageAlt: "Green mountain slopes and misty pine ridges at Malam Jabba in Swat Valley",
          description:
            "A famous hill station in the Hindu Kush range offering sweeping valley viewpoints, crisp mountain air, and scenic ridge walks."
        },
        {
          name: "Mahodand Lake",
          image: "../assets/images/sawat-mahodand.jpg",
          imageAlt: "Glacial Mahodand Lake surrounded by green meadows and snow-dusted peaks in Usho Valley",
          description:
            "A crystal-clear glacial lake tucked in the Usho Valley, surrounded by grassy meadows, wildflowers, and pine-covered peaks."
        }
      ],
      thingsToDo: [
        {
          title: "Exploring valleys",
          icon: "nature",
          description:
            "Travel through Kalam, Usho, and neighboring green valleys dotted with traditional wooden homes and streams."
        },
        {
          title: "Sightseeing",
          icon: "sightseeing",
          description:
            "Enjoy elevated viewpoints across Malam Jabba's forested ridges and sparkling stretches of the Swat River."
        },
        {
          title: "Photography",
          icon: "photography",
          description:
            "Capture misty pine slopes, turquoise glacial waters at Mahodand Lake, and vibrant mountain pastures."
        },
        {
          title: "Nature exploration",
          icon: "lake",
          description:
            "Breathe in cool alpine air along riverside trails, waterfalls, and peaceful meadow clearings."
        }
      ]
    },

    "naran-valley": {
      id: "naran-valley",
      name: "Naran Valley",
      shortName: "Naran",
      subtitle: "A Scenic Mountain Escape",
      region: "Khyber Pakhtunkhwa",
      regionNote: "Located in upper Kaghan Valley in Khyber Pakhtunkhwa along the Kunhar River.",
      bestTime: "Summer",
      bestTimeNote: "Warm valley days when snow melts and high alpine lakes and passes open to travelers.",
      heroImage: "../assets/images/Naran.jpg",
      heroAlt: "Clear mountain river flowing over rocks beside pine-covered slopes in Naran Valley",
      aboutParagraphs: [
        "Tucked high inside the Kaghan Valley of Khyber Pakhtunkhwa, Naran Valley is a classic summer retreat framed by steep forested ridges and the rushing Kunhar River. Snow patches linger on upper slopes well into warmer months, keeping the valley air crisp and refreshing.",
        "Surrounding Naran are legendary alpine lakes, high mountain passes, and quiet roadside meadows where travelers pause to take in the scenery. From shimmering glacial basins to sweeping ridge panoramas, Naran captures the timeless charm of northern mountain travel."
      ],
      places: [
        {
          name: "Lake Saif-ul-Malook",
          image: "../assets/images/naran-saif ul malook.jpg",
          imageAlt: "Emerald waters of Lake Saif-ul-Malook reflecting snowy mountain peaks in Naran",
          description:
            "One of Pakistan's most iconic alpine lakes, famed for its emerald glacial water and dramatic backdrop of Malika Parbat."
        },
        {
          name: "Lulusar Lake",
          image: "../assets/images/naran-lulusar.jpg",
          imageAlt: "Long blue mountain lake winding between green and rocky hills at Lulusar Lake",
          description:
            "A tranquil high-altitude lake along the Kaghan route whose deep blue waters mirror the surrounding summer peaks."
        },
        {
          name: "Babusar Pass",
          image: "../assets/images/naran-babusar.jpg",
          imageAlt: "Winding mountain road climbing toward the high ridges of Babusar Pass",
          description:
            "A breathtaking mountain pass at over 4,100 meters connecting Kaghan Valley to Chilas, offering wide views across misty ridges."
        }
      ],
      thingsToDo: [
        {
          title: "Sightseeing",
          icon: "sightseeing",
          description:
            "Take in dramatic river gorges, snow-topped ridges, and sweeping vistas along the Kaghan highway."
        },
        {
          title: "Exploring lakes",
          icon: "lake",
          description:
            "Visit Lake Saif-ul-Malook and Lulusar Lake to experience calm alpine waters framed by high peaks."
        },
        {
          title: "Photography",
          icon: "photography",
          description:
            "Photograph winding mountain roads at Babusar Pass, rushing rapids, and sunlit glacial lakes."
        },
        {
          title: "Mountain exploration",
          icon: "nature",
          description:
            "Enjoy cool high-altitude breezes, scenic mountain stops, and pine-lined trails along the Kunhar River."
        }
      ]
    }
  };

  /**
   * Reads the ?destination= query parameter and resolves it to a valid destination.
   * Defaults cleanly to Hunza Valley when missing or invalid.
   */
  function getSelectedDestination() {
    var params = new URLSearchParams(window.location.search);
    var rawParam = params.get("destination");

    if (!rawParam || !rawParam.trim()) {
      return {
        destination: DESTINATIONS[DEFAULT_DESTINATION_ID],
        isInvalidFallback: false
      };
    }

    var normalizedKey = rawParam.trim().toLowerCase();
    var resolvedId = DESTINATION_ALIASES[normalizedKey];

    if (resolvedId && DESTINATIONS[resolvedId]) {
      return {
        destination: DESTINATIONS[resolvedId],
        isInvalidFallback: false
      };
    }

    return {
      destination: DESTINATIONS[DEFAULT_DESTINATION_ID],
      isInvalidFallback: true
    };
  }

  /**
   * Builds a clean fallback card if a place image ever fails to load.
   */
  function createPlaceFallback(place) {
    var box = document.createElement("div");
    box.className = "hh-place-placeholder";
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", place.imageAlt + " (image placeholder)");

    var title = document.createElement("span");
    title.className = "hh-place-placeholder-title";
    title.textContent = place.name;

    var note = document.createElement("span");
    note.className = "hh-place-placeholder-note";
    note.textContent = "Image unavailable: " + place.image;

    box.appendChild(title);
    box.appendChild(note);
    return box;
  }

  /**
   * Creates one Places to Explore card using the destination's local photo.
   */
  function createPlaceCard(place) {
    var col = document.createElement("div");
    col.className = "col";

    var article = document.createElement("article");
    article.className = "hh-place-card";

    var media = document.createElement("div");
    media.className = "hh-place-media";

    var img = document.createElement("img");
    img.className = "hh-place-img";
    img.src = place.image;
    img.alt = place.imageAlt;
    img.addEventListener("error", function () {
      media.innerHTML = "";
      media.appendChild(createPlaceFallback(place));
    });

    media.appendChild(img);

    var body = document.createElement("div");
    body.className = "hh-place-body";

    var title = document.createElement("h3");
    title.className = "hh-place-title";
    title.textContent = place.name;

    var desc = document.createElement("p");
    desc.className = "hh-place-desc";
    desc.textContent = place.description;

    body.appendChild(title);
    body.appendChild(desc);

    article.appendChild(media);
    article.appendChild(body);
    col.appendChild(article);

    return col;
  }

  /**
   * Creates one Things to Do card with an icon, title, and description.
   */
  function createActivityCard(activity) {
    var col = document.createElement("div");
    col.className = "col";

    var card = document.createElement("div");
    card.className = "hh-activity-card";

    var iconBox = document.createElement("div");
    iconBox.className = "hh-activity-icon-box";
    iconBox.setAttribute("aria-hidden", "true");
    iconBox.innerHTML = ACTIVITY_ICONS[activity.icon] || ACTIVITY_ICONS.sightseeing;

    var title = document.createElement("h3");
    title.className = "hh-activity-title";
    title.textContent = activity.title;

    var desc = document.createElement("p");
    desc.className = "hh-activity-desc";
    desc.textContent = activity.description;

    card.appendChild(iconBox);
    card.appendChild(title);
    card.appendChild(desc);
    col.appendChild(card);

    return col;
  }

  /**
   * Populates the entire Destination Details page with the selected destination.
   */
  function renderDestination(destination, isInvalidFallback) {
    document.title = destination.name + " — Destination Details | Highland Horizons";

    var heroImageEl = document.getElementById("heroImage");
    var heroHeadingEl = document.getElementById("heroHeading");
    var heroSubtitleEl = document.getElementById("heroSubtitle");
    var fallbackNoticeEl = document.getElementById("destinationFallbackNotice");
    var aboutHeadingEl = document.getElementById("aboutHeading");
    var aboutContentEl = document.getElementById("aboutContent");
    var bestTimeValueEl = document.getElementById("bestTimeValue");
    var bestTimeNoteEl = document.getElementById("bestTimeNote");
    var regionValueEl = document.getElementById("regionValue");
    var regionNoteEl = document.getElementById("regionNote");
    var placesGridEl = document.getElementById("placesGrid");
    var thingsGridEl = document.getElementById("thingsToDoGrid");
    var gallerySectionEl = document.getElementById("galleryCtaSection");
    var galleryLinkEl = document.getElementById("destinationGalleryLink");

    if (heroImageEl) {
      heroImageEl.hidden = false;
      heroImageEl.onerror = function () {
        heroImageEl.hidden = true;
      };
      heroImageEl.src = destination.heroImage;
      heroImageEl.alt = destination.heroAlt;
    }

    if (heroHeadingEl) {
      heroHeadingEl.textContent = destination.name;
    }

    if (heroSubtitleEl) {
      heroSubtitleEl.textContent = destination.subtitle;
    }

    if (fallbackNoticeEl) {
      fallbackNoticeEl.hidden = !isInvalidFallback;
    }

    if (aboutHeadingEl) {
      aboutHeadingEl.textContent = "About " + destination.name;
    }

    if (aboutContentEl) {
      aboutContentEl.innerHTML = "";
      destination.aboutParagraphs.forEach(function (paragraphText) {
        var p = document.createElement("p");
        p.className = "hh-about-text";
        p.textContent = paragraphText;
        aboutContentEl.appendChild(p);
      });
    }

    if (bestTimeValueEl) {
      bestTimeValueEl.textContent = destination.bestTime;
    }
    if (bestTimeNoteEl) {
      bestTimeNoteEl.textContent = destination.bestTimeNote;
    }
    if (regionValueEl) {
      regionValueEl.textContent = destination.region;
    }
    if (regionNoteEl) {
      regionNoteEl.textContent = destination.regionNote;
    }

    if (placesGridEl) {
      placesGridEl.innerHTML = "";
      destination.places.forEach(function (place) {
        placesGridEl.appendChild(createPlaceCard(place));
      });
    }

    if (thingsGridEl) {
      thingsGridEl.innerHTML = "";
      // Use 3 columns for 3 activities (Hunza) and 4 columns on desktop for 4 activities
      thingsGridEl.className =
        destination.thingsToDo.length === 4
          ? "row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4"
          : "row row-cols-1 row-cols-md-3 g-4";

      destination.thingsToDo.forEach(function (activity) {
        thingsGridEl.appendChild(createActivityCard(activity));
      });
    }

    if (gallerySectionEl) {
      gallerySectionEl.setAttribute("aria-label", destination.name + " gallery link");
    }

    if (galleryLinkEl) {
      galleryLinkEl.textContent = "View " + destination.shortName + " Gallery \u2192";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var result = getSelectedDestination();
    renderDestination(result.destination, result.isInvalidFallback);
  });
})();
