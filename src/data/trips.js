// Single source of truth for all trip data.
// Add new trips/stops here — pages, map, and RSS all read from this file.
// Image paths: relative to public/ with no leading slash (e.g. "images/YYYYMMDD/name.jpg")
//
// routes: array of coordinate arrays — supports multiple driving legs per trip.
// Each inner array is one continuous polyline on the map.
//
// subStops: optional array for days with multiple distinct locations.
//   Each subStop: { id, name, coords, images }
//   - id: used as anchor (#id) and map marker link
//   - coords: shown as individual map markers when present
//   - If no subStops, the stop's top-level coords + images are used as before.

export const trips = [
  {
    slug: 'december-2025',
    label: 'December 2025',
    month: 'December',
    year: 2025,
    homePreviewImage: 'images/20251213/IMG_1305.webp',
    homePreviewAlt: 'Hole-in-the-Wall Campground, Essex, California',
    routes: [
      // Leg 1: LA → Nipton → LA (Dec 11)
      [
        [-118.24, 34.05],
        [-116.50, 34.50],
        [-115.29, 35.47],
        [-116.50, 34.50],
        [-118.24, 34.05],
      ],
      // Leg 2: LA → Essex → LA (Dec 13)
      [
        [-118.24, 34.05],
        [-116.80, 34.10],
        [-115.40, 34.74],
        [-116.80, 34.10],
        [-118.24, 34.05],
      ],
    ],
    stops: [
      {
        id: 'nipton',
        date: 'December 11, 2025',
        location: 'White Cross World War I Memorial, Nipton, California',
        coords: [-115.2930, 35.4733],
        coverImage: 'images/20251211/morning_rear_view.jpg',
        coverAlt: 'Morning in Nipton',
        contentKey: 'december-2025/nipton',
        images: [
          { src: 'images/20251211/night_setup.jpg', alt: 'Night Setup', caption: 'I swear it was comfier than it looks but will need to get more organized for easier setup.' },
          { src: 'images/20251211/morning_rear_view_setup.jpg', alt: 'Morning Setup', caption: '' },
          { src: 'images/20251211/morning_inside_camper.jpg', alt: 'Morning inside camper', caption: '' },
          { src: 'images/20251211/morning_inside_camper_2.jpg', alt: 'Morning inside camper', caption: '' },
          { src: 'images/20251211/morning_side_view.jpg', alt: 'Morning side view', caption: '' },
        ],
      },
      {
        id: 'hole-in-the-wall',
        date: 'December 13, 2025',
        location: 'Hole-in-the-Wall Campground, Essex, California',
        coords: [-115.4041, 34.7376],
        coverImage: 'images/20251213/morning_setup.jpg',
        coverAlt: 'Morning setup at Essex',
        contentKey: 'december-2025/hole-in-the-wall',
        images: [
          { src: 'images/20251213/IMG_1303.jpg', alt: 'Morning Views Essex', caption: '' },
          { src: 'images/20251213/IMG_1304.jpg', alt: 'Morning Views Essex', caption: '' },
          { src: 'images/20251213/IMG_1305.jpg', alt: 'Morning Views Essex', caption: '' },
          { src: 'images/20251213/IMG_1306.jpg', alt: 'Morning Views Essex', caption: '' },
        ],
      },
    ],
  },
  {
    slug: 'january-2026',
    label: 'January 2026',
    month: 'January',
    year: 2026,
    homePreviewImage: 'images/20260103/golden_canyon.webp',
    homePreviewAlt: 'Golden Canyon, Death Valley',
    routes: [
      // LA → Trona → Ridgecrest → Stovepipe Wells → Death Valley → Badwater → LA (Jan 1–4)
      [
        [-118.24, 34.05],
        [-117.80, 34.60],
        [-117.37, 35.76],
        [-117.67, 35.62],
        [-117.40, 36.10],
        [-117.19, 36.60],
        [-116.87, 36.42],
        [-116.77, 36.23],
        [-117.20, 35.80],
        [-118.24, 34.05],
      ],
    ],
    stops: [
      {
        id: 'trona-pinnacles',
        date: 'January 1, 2026',
        location: 'Pinnacle Road, Trona, California',
        coords: [-117.3742, 35.7630],
        coverImage: 'images/20260101/trona_night_back.jpg',
        coverAlt: 'Camper at night near Trona Pinnacles',
        contentKey: 'january-2026/trona-pinnacles',
        images: [
          { src: 'images/20260101/trona_night_side.jpg', alt: 'Side covered in mud', caption: '' },
          { src: 'images/20260101/trona_night_side_2.jpg', alt: 'Side covered in mud', caption: '' },
          { src: 'images/20260101/trona_night_inside.jpg', alt: 'Inside the camper', caption: '' },
          { src: 'images/20260101/trona_night_back_2.jpg', alt: 'Rear view at night', caption: '' },
        ],
      },
      {
        id: 'mud-pit',
        date: 'January 2, 2026',
        location: 'Trona and Ridgecrest, California',
        coords: [-117.6709, 35.6225],
        coverImage: 'images/20260102/stuck_in_mud_back.jpg',
        coverAlt: 'Stuck in the mud',
        contentKey: 'january-2026/mud-pit',
        images: [
          { src: 'images/20260102/stuck_in_mud_back_tire.jpg', alt: 'Stuck in mud back tire', caption: '' },
          { src: 'images/20260102/stuck_in_mud_front_tire.jpg', alt: 'Stuck in mud front tire', caption: '' },
          { src: 'images/20260102/morning_stuck.jpg', alt: 'Can barely see my car through the pit', caption: 'Can barely see my car in the back right. Beautiful view though.' },
          { src: 'images/20260102/covered_in_mud_mcdonalds.jpg', alt: 'Covered in mud at McDonalds', caption: '' },
          { src: 'images/20260102/american_towin_saving_my_life.jpg', alt: 'American Towing saving my life', caption: '' },
          { src: 'images/20260102/aftermath_1.jpg', alt: 'Aftermath of the mud pit', caption: '' },
          { src: 'images/20260102/stovepipe_camp_1.jpg', alt: 'Stovepipe Wells setup', caption: '' },
          { src: 'images/20260102/stovepipe_camp_2.jpg', alt: 'Stovepipe Wells setup', caption: '' },
        ],
      },
      {
        id: 'death-valley-hikes',
        date: 'January 3, 2026',
        location: 'Death Valley National Park, California',
        coords: [-116.8703, 36.4169],
        coverImage: 'images/20260103/golden_canyon.jpg',
        coverAlt: 'Golden Canyon',
        contentKey: 'january-2026/death-valley-hikes',
        subStops: [
          {
            id: 'mosaic-canyon',
            name: 'Mosaic Canyon',
            coords: [-116.9700, 36.7186],
            images: [
              { src: 'images/20260103/mosaic_canyon_1.jpg', alt: 'Mosaic Canyon', caption: 'Mosaic Canyon' },
              { src: 'images/20260103/mosaic_canyon_3.jpg', alt: 'Mosaic Canyon', caption: 'Mosaic Canyon' },
              { src: 'images/20260103/mosaic_canyon_4.jpg', alt: 'Mosaic Canyon', caption: 'Mosaic Canyon' },
            ],
          },
          {
            id: 'golden-canyon',
            name: 'Golden Canyon',
            coords: [-116.8303, 36.3910],
            images: [
              { src: 'images/20260103/golden_canyon_4.jpg', alt: 'Golden Canyon', caption: 'Golden Canyon' },
              { src: 'images/20260103/golden_canyon_2.jpg', alt: 'Golden Canyon', caption: 'Golden Canyon' },
              { src: 'images/20260103/golden_canyon_3.jpg', alt: 'Golden Canyon', caption: 'Golden Canyon' },
            ],
          },
          {
            id: 'mesquite-dunes',
            name: 'Mesquite Flat Sand Dunes',
            coords: [-116.9617, 36.6197],
            images: [
              { src: 'images/20260103/mesquite_dunes.jpg', alt: 'Mesquite Flat Sand Dunes', caption: 'Mesquite Flat Sand Dunes' },
              { src: 'images/20260103/mesquite_dunes_2.jpg', alt: 'Mesquite Flat Sand Dunes', caption: 'Mesquite Flat Sand Dunes' },
              { src: 'images/20260103/mesquite_dunes_3.jpg', alt: 'Mesquite Flat Sand Dunes', caption: 'Mesquite Flat Sand Dunes' },
            ],
          },
        ],
      },
      {
        id: 'badwater',
        date: 'January 4, 2026',
        location: 'Badwater Road, Death Valley National Park, California',
        coords: [-116.7670, 36.2310],
        coverImage: 'images/20260104/badwater_basin_2.jpg',
        coverAlt: 'Badwater Basin',
        contentKey: 'january-2026/badwater',
        subStops: [
          {
            id: 'badwater-basin',
            name: 'Badwater Basin',
            coords: [-116.7712, 36.2254],
            images: [
              { src: 'images/20260104/badwater_basin.jpg', alt: 'Badwater Basin', caption: 'Badwater Basin' },
              { src: 'images/20260104/badwater_basin_1.jpg', alt: 'Badwater Basin', caption: 'Badwater Basin' },
              { src: 'images/20260104/badwater_basin_3.jpg', alt: 'Badwater Basin', caption: 'Badwater Basin' },
            ],
          },
          {
            id: 'lake-manly',
            name: 'Lake Manly',
            coords: [-116.7900, 36.1900],
            images: [
              { src: 'images/20260104/lake_manly_1.jpg', alt: 'Lake Manly', caption: 'Lake Manly' },
            ],
          },
          {
            id: 'artists-palette',
            name: "Artist's Palette",
            coords: [-116.7788, 36.3144],
            images: [
              { src: 'images/20260104/artists_drive_1.jpg', alt: "Artist's Drive", caption: "Artist's Drive" },
              { src: 'images/20260104/artists_drive_2.jpg', alt: "Artist's Drive", caption: "Artist's Drive" },
              { src: 'images/20260104/artists_drive_3.jpg', alt: "Artist's Palette", caption: "Artist's Palette" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'may-2026',
    label: 'May 2026',
    month: 'May',
    year: 2026,
    homePreviewImage: 'images/20260520/james_irvine_fern_canyon_loop_9.webp',
    homePreviewAlt: 'James Irvine Trail, Prairie Creek Redwoods',
    routes: [
      // Leg 1: LA → Joshua Tree → LA (May 8–9)
      [
        [-118.24, 34.05],  // LA
        [-116.90, 34.12],  // Hwy 62 / Yucca Valley
        [-116.39, 34.07],  // Black Rock Canyon
        [-116.17, 34.01],  // Hidden Valley
        [-116.60, 33.90],  // Palm Springs area
        [-118.24, 34.05],  // back to LA
      ],
      // Leg 2: LA → Lassen → Oregon → Jedediah Smith → Redwoods → Bay Area (May 17–21)
      [
        [-118.24, 34.05],  // LA
        [-119.80, 36.00],  // Central Valley
        [-121.50, 38.58],  // Sacramento
        [-121.48, 40.43],  // Sulfur Works, Lassen Volcanic
        [-121.23, 40.31],  // Mill Creek Resort, Chester
        [-122.40, 40.58],  // Redding
        [-122.87, 42.33],  // Medford, OR (I-5 north)
        [-123.33, 42.44],  // Grants Pass, OR
        [-123.65, 42.17],  // Cave Junction, OR (Hwy 199)
        [-124.10, 41.80],  // Jedediah Smith / Crescent City
        [-124.05, 41.40],  // Prairie Creek / Fern Canyon
        [-123.98, 40.37],  // Avenue of Giants, Humboldt
        [-123.20, 39.50],  // coast highway south
        [-122.40, 37.80],  // Bay Area
      ],
    ],
    stops: [
      // ── Joshua Tree ──────────────────────────────────────────────
      {
        id: 'black-rock-canyon',
        date: 'May 8, 2026',
        location: 'Joshua Tree National Park, California',
        coords: [-116.3878, 34.0697],
        coverImage: 'images/20260508/hidden_valley_scramble.jpg',
        coverAlt: 'Hidden Valley Scramble, Joshua Tree',
        contentKey: 'may-2026/black-rock-canyon',
        subStops: [
          {
            id: 'hidden-valley-scramble',
            name: 'Hidden Valley Trail',
            coords: [-116.1654, 34.0094],
            images: [
              { src: 'images/20260508/hidden_valley_scramble.jpg', alt: 'Hidden Valley Scramble', caption: '' },
              { src: 'images/20260508/hidden_valley_scramble_2.jpg', alt: 'Hidden Valley Scramble', caption: '' },
              { src: 'images/20260508/hidden_valley_scramble_3.jpg', alt: 'Hidden Valley Scramble', caption: '' },
              { src: 'images/20260508/hidden_valley_scramble_4.jpg', alt: 'Hidden Valley Scramble', caption: '' },
              { src: 'images/20260508/dinner.jpg', alt: 'Dinner', caption: '' },
              { src: 'images/20260508/joshua_tree_sticker.jpg', alt: 'Joshua Tree sticker', caption: '' },
            ],
          },
        ],
      },
      {
        id: 'hidden-valley',
        date: 'May 9, 2026',
        location: 'Joshua Tree National Park, California',
        coords: [-116.1654, 34.0094],
        coverImage: 'images/20260509/chasm_of_doom.jpg',
        coverAlt: 'Chasm of Doom, Joshua Tree',
        contentKey: 'may-2026/hidden-valley',
        subStops: [
          {
            id: 'black-rock-campground',
            name: 'Black Rock Canyon Campground',
            coords: [-116.3878, 34.0697],
            images: [
              { src: 'images/20260509/campsite.jpg', alt: 'Campsite', caption: '' },
              { src: 'images/20260509/campsite_2.jpg', alt: 'Campsite', caption: '' },
            ],
          },
          {
            id: 'hidden-valley-trail',
            name: 'Chasm of Doom',
            coords: [-116.1654, 34.0094],
            images: [
              { src: 'images/20260509/chasm_of_doom.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/chasm_of_doom_2.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/chasm_of_doom_3.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/chasm_of_doom_4.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/chasm_of_doom_5.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/chasm_of_doom_6.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/chasm_of_doom_7.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/chasm_of_doom_8.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/chasm_of_doom_10.jpg', alt: 'Chasm of Doom', caption: '' },
              { src: 'images/20260509/snake.jpg', alt: 'Snake', caption: '' },
            ],
          },
        ],
      },
      // ── Lassen Volcanic ──────────────────────────────────────────
      {
        id: 'sulfur-works',
        date: 'May 17, 2026',
        location: 'Lassen Volcanic National Park, California',
        coords: [-121.4822, 40.4348],
        coverImage: 'images/20260517/sulfur_works.jpg',
        coverAlt: 'Sulfur Works, Lassen Volcanic',
        contentKey: 'may-2026/sulfur-works',
        subStops: [
          {
            id: 'sulfur-works-trail',
            name: 'Sulfur Works',
            coords: [-121.4822, 40.4348],
            images: [
              { src: 'images/20260517/lassen_volcanic_entracnce.jpg', alt: 'Lassen Volcanic entrance', caption: '' },
              { src: 'images/20260517/sulfur_works.jpg', alt: 'Sulfur Works', caption: '' },
              { src: 'images/20260517/sulfur_works_2.jpg', alt: 'Sulfur Works', caption: '' },
              { src: 'images/20260517/sulfur_works_3.jpg', alt: 'Sulfur Works', caption: '' },
              { src: 'images/20260517/lassen_volcanic_sticker.jpg', alt: 'Lassen Volcanic sticker', caption: '' },
            ],
          },
          {
            id: 'mill-creek-resort',
            name: 'Mill Creek Resort',
            coords: [-121.2300, 40.3100],
            images: [
              { src: 'images/20260517/campsite.jpg', alt: 'Campsite', caption: '' },
              { src: 'images/20260517/campsite_2.jpg', alt: 'Campsite', caption: '' },
              { src: 'images/20260517/campsite_3.jpg', alt: 'Campsite', caption: '' },
              { src: 'images/20260517/campsite_4.jpg', alt: 'Campsite', caption: '' },
              { src: 'images/20260517/campsite_5.jpg', alt: 'Campsite', caption: '' },
              { src: 'images/20260517/cookin_ribs.jpg', alt: 'Cooking ribs', caption: '' },
            ],
          },
        ],
      },
      {
        id: 'mill-creek-falls',
        date: 'May 18, 2026',
        location: 'Lassen Volcanic National Park, California',
        coords: [-121.4822, 40.4348],
        coverImage: 'images/20260518/mills_creek_falls_1.jpg',
        coverAlt: 'Mill Creek Falls',
        contentKey: 'may-2026/mill-creek-falls',
        subStops: [
          {
            id: 'highway-89-bike',
            name: 'Highway 89 Bike Ride',
            coords: [-121.4500, 40.4600],
            images: [
              { src: 'images/20260518/packed_up.jpg', alt: 'Packed up', caption: '' },
              { src: 'images/20260518/bike.jpg', alt: 'Bike', caption: '' },
              { src: 'images/20260518/highway_89_bike_1.jpg', alt: 'Highway 89 bike ride', caption: '' },
              { src: 'images/20260518/higway_89_bike_2.jpg', alt: 'Highway 89 bike ride', caption: '' },
              { src: 'images/20260518/highway_89_bike_3.jpg', alt: 'Highway 89 bike ride', caption: '' },
              { src: 'images/20260518/highway_89_bike_4.jpg', alt: 'Highway 89 bike ride', caption: '' },
              { src: 'images/20260518/highway_89_bike_5.jpg', alt: 'Highway 89 bike ride', caption: '' },
              { src: 'images/20260518/highway_89_bike_lunch.jpg', alt: 'Lunch on Highway 89', caption: '' },
              { src: 'images/20260518/highway_89_lassen_peak.jpg', alt: 'Lassen Peak from Highway 89', caption: '' },
              { src: 'images/20260518/highway_bike_lasssen_peak_lake_helen.jpg', alt: 'Lassen Peak and Lake Helen', caption: '' },
            ],
          },
          {
            id: 'mill-creek-falls-trail',
            name: 'Mill Creek Falls Trail',
            coords: [-121.2800, 40.3200],
            images: [
              { src: 'images/20260518/mills_creek_falls_trail_flowers.jpg', alt: 'Mill Creek Falls trail flowers', caption: '' },
              { src: 'images/20260518/mills_creek_falls_1.jpg', alt: 'Mill Creek Falls', caption: '' },
              { src: 'images/20260518/mills_creek_falls_3.jpg', alt: 'Mill Creek Falls', caption: '' },
              { src: 'images/20260518/mills_creek_falls_4.jpg', alt: 'Mill Creek Falls', caption: '' },
              { src: 'images/20260518/mills_creek_falls_5.jpg', alt: 'Mill Creek Falls', caption: '' },
              { src: 'images/20260518/mills_creek_falls_deer_2.jpg', alt: 'Deer at Mill Creek Falls', caption: '' },
              { src: 'images/20260518/mills_creek_falls_trail_deer.mov', alt: 'Deer on trail', caption: '' },
              { src: 'images/20260518/mills_creek_falls_trail_falls.MOV', alt: 'Mill Creek Falls', caption: '' },
              { src: 'images/20260518/mills_creek_falls_trail_falls_2.mov', alt: 'Mill Creek Falls', caption: '' },
              { src: 'images/20260518/mills_creek_falls_trail_falls_3.mov', alt: 'Mill Creek Falls', caption: '' },
            ],
          },
        ],
      },
      // ── Redwoods (based at Jedediah Smith Campground) ────────────
      {
        id: 'stout-grove',
        date: 'May 19, 2026',
        location: 'Jedediah Smith Redwoods State Park, California',
        coords: [-124.0995, 41.7993],
        coverImage: 'images/20260519/grove_of_titans_1.jpg',
        coverAlt: 'Grove of Titans, Jedediah Smith Redwoods',
        contentKey: 'may-2026/stout-grove',
        subStops: [
          {
            id: 'grove-of-titans',
            name: 'Mill Creek Trail & Grove of Titans',
            coords: [-124.1071, 41.7926],
            images: [
              { src: 'images/20260519/mills_creek_1.jpg', alt: 'Mill Creek', caption: '' },
              { src: 'images/20260519/grove_of_titans_1.jpg', alt: 'Grove of Titans', caption: '' },
              { src: 'images/20260519/grove_of_titans_2.jpg', alt: 'Grove of Titans', caption: '' },
              { src: 'images/20260519/grove_of_titans_3.JPG', alt: 'Grove of Titans', caption: '' },
              { src: 'images/20260519/grove_of_titans_4.jpg', alt: 'Grove of Titans', caption: '' },
              { src: 'images/20260519/grove_of_titans_5.JPG', alt: 'Grove of Titans', caption: '' },
            ],
          },
          {
            id: 'stout-grove-trail',
            name: 'Stout Grove',
            coords: [-124.0906, 41.7923],
            images: [
              { src: 'images/20260519/stout_grove.jpg', alt: 'Stout Grove', caption: '' },
              { src: 'images/20260519/stout_grove_2.jpg', alt: 'Stout Grove', caption: '' },
              { src: 'images/20260519/stout_grove_3.jpg', alt: 'Stout Grove', caption: '' },
              { src: 'images/20260519/stout_grove_4.jpg', alt: 'Stout Grove', caption: '' },
              { src: 'images/20260519/stout_grove_5.jpg', alt: 'Stout Grove', caption: '' },
              { src: 'images/20260519/stout_grove_6.jpg', alt: 'Stout Grove', caption: '' },
              { src: 'images/20260519/stout_grove_7.jpg', alt: 'Stout Grove', caption: '' },
              { src: 'images/20260519/stout_grove_8.jpg', alt: 'Stout Grove', caption: '' },
            ],
          },
          {
            id: 'jedediah-smith-campground',
            name: 'Jedediah Smith Campground',
            coords: [-124.0995, 41.7993],
            images: [
              { src: 'images/20260519/camp_setup.jpg', alt: 'Camp setup', caption: '' },
              { src: 'images/20260519/jedediah_smith_campground_creek.jpg', alt: 'Jedediah Smith campground creek', caption: '' },
              { src: 'images/20260519/jedediah_smith_campground_campsite_1.jpg', alt: 'Jedediah Smith campsite', caption: '' },
              { src: 'images/20260519/jedediah_smith_campground_campsite-2.jpg', alt: 'Jedediah Smith campsite', caption: '' },
              { src: 'images/20260519/redwoods_sticker.jpg', alt: 'Redwoods sticker', caption: '' },
            ],
          },
        ],
      },
      {
        id: 'fern-canyon',
        date: 'May 20, 2026',
        location: 'Prairie Creek Redwoods & Redwood National Park, California',
        coords: [-124.0545, 41.3966],
        coverImage: 'images/20260520/james_irvine_fern_canyon_loop_9.jpg',
        coverAlt: 'Fern Canyon, Prairie Creek Redwoods',
        contentKey: 'may-2026/fern-canyon',
        subStops: [
          {
            id: 'crescent-beach-overlook',
            name: 'Crescent Beach Overlook',
            coords: [-124.0652, 41.7400],
            images: [
              { src: 'images/20260520/breakfast_campsite.jpg', alt: 'Breakfast at campsite', caption: '' },
              { src: 'images/20260520/crescent_beach_overlook_2.jpg', alt: 'Crescent Beach overlook', caption: '' },
              { src: 'images/20260520/crescent_beach_overlook_3.jpg', alt: 'Crescent Beach overlook', caption: '' },
              { src: 'images/20260520/crescent_beach_overlook_4.jpg', alt: 'Crescent Beach overlook', caption: '' },
              { src: 'images/20260520/crescent_beach_overlook_5.jpg', alt: 'Crescent Beach overlook', caption: '' },
              { src: 'images/20260520/crescent_beach_overlook_6.jpg', alt: 'Crescent Beach overlook', caption: '' },
            ],
          },
          {
            id: 'james-irvine-fern-canyon',
            name: 'James Irvine Trail & Fern Canyon',
            coords: [-124.0662, 41.4037],
            images: [
              { src: 'images/20260520/james_irvine_fern_canyon_loop_7.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_8.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_9.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_10.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_11.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_12.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_13.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_14.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_15.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_16.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_17.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_18.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_19.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_20.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_21.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_22.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
              { src: 'images/20260520/james_irvine_fern_canyon_loop_23.jpg', alt: 'James Irvine / Fern Canyon loop', caption: '' },
            ],
          },
          {
            id: 'high-bluff-overlook',
            name: 'High Bluff Overlook',
            coords: [-124.0872, 41.3500],
            images: [
              { src: 'images/20260520/high_bluff_overlook_24.jpg', alt: 'High Bluff overlook', caption: '' },
              { src: 'images/20260520/high_bluff_overlook_25.jpg', alt: 'High Bluff overlook', caption: '' },
            ],
          },
          {
            id: 'klamath-river-overlook',
            name: 'Klamath River Overlook',
            coords: [-124.0624, 41.5308],
            images: [
              { src: 'images/20260520/klamath_river_overlook_26.jpg', alt: 'Klamath River overlook', caption: '' },
              { src: 'images/20260520/klamath_river_overlook_27.jpg', alt: 'Klamath River overlook', caption: '' },
            ],
          },
          {
            id: 'simpson-reed-trail',
            name: 'Simpson-Reed Trail',
            coords: [-124.1000, 41.7800],
            images: [
              { src: 'images/20260520/simpson_reed_trail_30.jpg', alt: 'Simpson-Reed Trail', caption: '' },
              { src: 'images/20260520/simpson_reed_trail_31.jpg', alt: 'Simpson-Reed Trail', caption: '' },
              { src: 'images/20260520/simpson_reed_trail_32.jpg', alt: 'Simpson-Reed Trail', caption: '' },
              { src: 'images/20260520/simpson_reed_trail_33.jpg', alt: 'Simpson-Reed Trail', caption: '' },
              { src: 'images/20260520/simpson_reed_trail_34.jpg', alt: 'Simpson-Reed Trail', caption: '' },
              { src: 'images/20260520/jedediah_smith_campground_creek_28.jpg', alt: 'Jedediah Smith campground creek', caption: '' },
              { src: 'images/20260520/redwood_sticker_29.jpg', alt: 'Redwood sticker', caption: '' },
            ],
          },
        ],
      },
      {
        id: 'avenue-of-giants',
        date: 'May 21, 2026',
        location: 'Humboldt Redwoods State Park, California',
        coords: [-123.9800, 40.3500],
        coverImage: 'images/20260521/big_tree_2.jpg',
        coverAlt: 'Avenue of Giants',
        contentKey: 'may-2026/avenue-of-giants',
        subStops: [
          {
            id: 'ten-taypo-hope-creek',
            name: 'Ten Taypo–Hope Creek Loop',
            coords: [-123.9600, 40.3400],
            images: [
              { src: 'images/20260521/ten_taypo-hope_creek_loop.jpg', alt: 'Ten Taypo–Hope Creek Loop', caption: '' },
            ],
          },
          {
            id: 'big-tree-area',
            name: 'Big Tree Area',
            coords: [-123.9700, 40.3550],
            images: [
              { src: 'images/20260521/big_tree_1.jpg', alt: 'Big tree', caption: '' },
              { src: 'images/20260521/big_tree_2.jpg', alt: 'Big tree', caption: '' },
              { src: 'images/20260521/big_tree_3.mov', alt: 'Big tree', caption: '' },
            ],
          },
          {
            id: 'avenue-of-giants-drive',
            name: 'Avenue of Giants',
            coords: [-123.9900, 40.3200],
            images: [
              { src: 'images/20260521/avenue_of_giants_1.MOV', alt: 'Avenue of Giants', caption: '' },
              { src: 'images/20260521/avenue_of_giants_2.MOV', alt: 'Avenue of Giants', caption: '' },
            ],
          },
        ],
      },
    ],
  },
]
