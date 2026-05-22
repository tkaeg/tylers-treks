// Single source of truth for all trip data.
// Add new trips/stops here — pages, map, and RSS all read from this file.
// Image paths: relative to public/ with no leading slash (e.g. "images/YYYYMMDD/name.jpg")
//
// routes: array of coordinate arrays — supports multiple driving legs per trip.
// Each inner array is one continuous polyline on the map.

export const trips = [
  {
    slug: 'december-2025',
    label: 'December 2025',
    month: 'December',
    year: 2025,
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
        text: [
          `The first night in the camper shell! I drove up to Nipton, CA and camped out right next to <a href="https://maps.app.goo.gl/q6prwbHUXk6rEk8L7">White Cross World War I Memorial</a>. The spot was perfect for my first time, plenty of free camping spots and some great trails nearby.`,
          `For the first time sleeping in the camper, I was decently comfortable. A big miss on my part was not bringing a pillow. I also didn't bring a pump for my sleeping pad. The sleeping bag worked wonderfully though. So much room for improvement but I survived the first time! Only up from here.`,
        ],
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
        text: [
          `Second outing was definitely lazier in the setup. After getting cleaned out by Vegas, I drove up to Essex, CA and camped out near <a href="https://maps.app.goo.gl/atCuCDzLRG7YN7HE8">Hole in the Wall Campground</a>. By the time I got there, I was cooked so I just laid in my sleeping bag and used my sweatshirts as a pillow.`,
          `Although the sleeping setup was weaker than the first time, the morning out there was just as beautiful. Woke up and did the Hole in the Wall Rings loop before driving back home.`,
        ],
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
        text: [
          `Happy New Year! Drove out 3 hours around sunset to Trona Pinnacles. I should have left a wee bit earlier as it was tough to navigate in the dark. I stopped about 5 miles short on a random dirt road off of Pinnacle Road. My truck felt the effect of the rain on the dirt roads these past couple weeks.`,
        ],
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
        text: [
          `Oh boy. Buckle up for this one. Woke up at 6 am because I was worrying about the mud pit I had driven through the night before. I wanted to just get through it as early as possible in case anything went wrong. And in fact, everything went wrong. I tried to be sneaky and cut around the water that I barely made it through the night before and ended up getting stuck in a mud pit. I did everything you aren't supposed to do when you're in mud. I floored it in drive, floored it in reverse, turned my tires every which way. After I had dug myself deeper in the mud pit, I found some wood left by others who had also gotten stuck but were able to get out. I tried shimmying those under my tires and giving it another go. Did it work? Absolutely not.`,
          `So now it's 7 am. I'm covered head to toe in mud to match my mud covered car. With all my focus on getting out and not even considering the mud I was bringing in, I also managed to dump probably half the desert's supply of mud into the driver's seat. No cell service out there either. But I'm not panicking quite yet. This happens all the time to people. Just gotta wave someone down. And I do, three guys in a mid sized 2WD Honda. I walk over to them knowing that their car will suffer the same fate as mine, if not worse. They think I'm a park ranger which they quickly find out I'm not as I approached them, appearing as if I had been birthed from the mud pit. They were good people and offered to take me to Trona which I swiftly took them up on, hopping in the car with my extra 10 pounds of mud before they could reassess their decision.`,
          `On the way out, we stop by a jeep and a 70 year old man. He's kind enough to give a try at pulling my car out. No dice. He drove me into Ridgecrest, about 20 miles from where I was stuck. In Ridgecrest, he drops me off at a towing shop. I walk in and as the man sees my mud torn outfit, he recommends a different shop down the road, one made specifically for off road rescues. I'm optimistic. I show the guy the photos, say it's only a mile from the main road. My optimism is crushed and immediately replaced by dread when he replies "nope, it's too risky, probably won't work". So you're telling me the shop known for off road rescues can't rescue my car? I'm cooked.`,
          `I sit in a McDonalds still dripping mud accepting the fact that I am now a mud person and will live the rest of my days in the mud beside my mud covered truck. I am the mud. I don't know where the mud ends and where I begin. I'm calling every towing company west of the Mississippi until finally, there's one that will do it. <a href="https://www.yelp.com/biz/american-towing-and-recovery-ridgecrest">American Towing</a>, literal angels. They pick me up from McDonalds, the employees celebrating the departure of the mud monster (probably). It takes an hour but the heroes get my truck out of the clutches of the mud. American Towing, thank you thank you thank you. I drive off and take my pavement princess (they coined my truck) to the car wash.`,
          `So my original plan of having today be the big adventure in Death Valley went a bit different. I made it eventually to Stovepipe Wells and got a campsite (on a real road) and set up shop. My pre-calculated agenda got wrecked and I had to freestyle for a bit. I guess that's the point though — makes for a better story!`,
        ],
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
        text: [
          `Today was the big hiking day. First hike of the day was <a href="https://www.alltrails.com/trail/us/california/mosaic-canyon-trail">Mosaic Canyon</a>. Very beautiful, like being on the moon with the black gravel. Second hike was <a href="https://www.alltrails.com/trail/us/california/golden-canyon-trail-and-badlands-loop-to-zabriskie-point">Golden Canyon</a>. This one was the bee's knees. Rock slabs were incredible. The last hike of the day was the <a href="https://www.alltrails.com/trail/us/california/mesquite-flat-sand-dunes-trail">Mesquite Flat Sand Dunes</a> right before sunset.`,
        ],
        images: [
          { src: 'images/20260103/mosaic_canyon_1.jpg', alt: 'Mosaic Canyon', caption: 'Mosaic Canyon' },
          { src: 'images/20260103/mosaic_canyon_3.jpg', alt: 'Mosaic Canyon', caption: 'Mosaic Canyon' },
          { src: 'images/20260103/mosaic_canyon_4.jpg', alt: 'Mosaic Canyon', caption: 'Mosaic Canyon' },
          { src: 'images/20260103/golden_canyon_4.jpg', alt: 'Golden Canyon', caption: 'Golden Canyon' },
          { src: 'images/20260103/golden_canyon_2.jpg', alt: 'Golden Canyon', caption: 'Golden Canyon' },
          { src: 'images/20260103/golden_canyon_3.jpg', alt: 'Golden Canyon', caption: 'Golden Canyon' },
          { src: 'images/20260103/mesquite_dunes.jpg', alt: 'Mesquite Flat Sand Dunes', caption: 'Mesquite Flat Sand Dunes' },
          { src: 'images/20260103/mesquite_dunes_2.jpg', alt: 'Mesquite Flat Sand Dunes', caption: 'Mesquite Flat Sand Dunes' },
          { src: 'images/20260103/mesquite_dunes_3.jpg', alt: 'Mesquite Flat Sand Dunes', caption: 'Mesquite Flat Sand Dunes' },
        ],
      },
      {
        id: 'badwater',
        date: 'January 4, 2026',
        location: 'Badwater Road, Death Valley National Park, California',
        coords: [-116.7670, 36.2310],
        coverImage: 'images/20260104/badwater_basin_2.jpg',
        coverAlt: 'Badwater Basin',
        text: [
          `Wrapped up the trip with a drive down Badwater Road to see <a href="https://www.alltrails.com/trail/us/california/badwater-basin-salt-flats-trail">Badwater Basin</a>, Lake Manly, and <a href="https://www.alltrails.com/explore/poi/us/california/death-valley/artists-palette">Artist's Palette</a>.`,
        ],
        images: [
          { src: 'images/20260104/badwater_basin.jpg', alt: 'Badwater Basin', caption: 'Badwater Basin' },
          { src: 'images/20260104/badwater_basin_1.jpg', alt: 'Badwater Basin', caption: 'Badwater Basin' },
          { src: 'images/20260104/badwater_basin_3.jpg', alt: 'Badwater Basin', caption: 'Badwater Basin' },
          { src: 'images/20260104/lake_manly_1.jpg', alt: 'Lake Manly', caption: 'Lake Manly' },
          { src: 'images/20260104/artists_drive_1.jpg', alt: "Artist's Drive", caption: "Artist's Drive" },
          { src: 'images/20260104/artists_drive_2.jpg', alt: "Artist's Drive", caption: "Artist's Drive" },
          { src: 'images/20260104/artists_drive_3.jpg', alt: "Artist's Palette", caption: "Artist's Palette" },
        ],
      },
    ],
  },
  {
    slug: 'may-2026',
    label: 'May 2026',
    month: 'May',
    year: 2026,
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
        location: 'Black Rock Canyon Campground, Joshua Tree National Park, California',
        coords: [-116.3878, 34.0697],
        coverImage: 'images/20260508/hidden_valley_scramble.jpg',
        coverAlt: 'Hidden Valley Scramble, Joshua Tree',
        text: [''],
        images: [
          { src: 'images/20260508/hidden_valley_scramble.jpg', alt: 'Hidden Valley Scramble', caption: '' },
          { src: 'images/20260508/hidden_valley_scramble_2.jpg', alt: 'Hidden Valley Scramble', caption: '' },
          { src: 'images/20260508/hidden_valley_scramble_3.jpg', alt: 'Hidden Valley Scramble', caption: '' },
          { src: 'images/20260508/hidden_valley_scramble_4.jpg', alt: 'Hidden Valley Scramble', caption: '' },
          { src: 'images/20260508/dinner.jpg', alt: 'Dinner', caption: '' },
          { src: 'images/20260508/joshua_tree_sticker.jpg', alt: 'Joshua Tree sticker', caption: '' },
        ],
      },
      {
        id: 'hidden-valley',
        date: 'May 9, 2026',
        location: 'Hidden Valley Trail, Joshua Tree National Park, California',
        coords: [-116.1654, 34.0094],
        coverImage: 'images/20260509/chasm_of_doom.jpg',
        coverAlt: 'Chasm of Doom, Joshua Tree',
        text: [''],
        images: [
          { src: 'images/20260509/campsite.jpg', alt: 'Campsite', caption: '' },
          { src: 'images/20260509/campsite_2.jpg', alt: 'Campsite', caption: '' },
          { src: 'images/20260509/chasm_of_doom.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_2.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_3.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_4.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_5.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_6.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_7.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_8.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_9.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/chasm_of_doom_10.jpg', alt: 'Chasm of Doom', caption: '' },
          { src: 'images/20260509/snake.jpg', alt: 'Snake', caption: '' },
        ],
      },
      // ── Lassen Volcanic ──────────────────────────────────────────
      {
        id: 'sulfur-works',
        date: 'May 17, 2026',
        location: 'Sulfur Works & Mill Creek Resort, Lassen Volcanic National Park, California',
        coords: [-121.4822, 40.4348],
        coverImage: 'images/20260517/sulfur_works.jpg',
        coverAlt: 'Sulfur Works, Lassen Volcanic',
        text: [''],
        images: [
          { src: 'images/20260517/lassen_volcanic_entracnce.jpg', alt: 'Lassen Volcanic entrance', caption: '' },
          { src: 'images/20260517/sulfur_works.jpg', alt: 'Sulfur Works', caption: '' },
          { src: 'images/20260517/sulfur_works_2.jpg', alt: 'Sulfur Works', caption: '' },
          { src: 'images/20260517/sulfur_works_3.jpg', alt: 'Sulfur Works', caption: '' },
          { src: 'images/20260517/campsite.jpg', alt: 'Campsite', caption: '' },
          { src: 'images/20260517/campsite_2.jpg', alt: 'Campsite', caption: '' },
          { src: 'images/20260517/campsite_3.jpg', alt: 'Campsite', caption: '' },
          { src: 'images/20260517/campsite_4.jpg', alt: 'Campsite', caption: '' },
          { src: 'images/20260517/campsite_5.jpg', alt: 'Campsite', caption: '' },
          { src: 'images/20260517/cookin_ribs.jpg', alt: 'Cooking ribs', caption: '' },
          { src: 'images/20260517/lassen_volcanic_sticker.jpg', alt: 'Lassen Volcanic sticker', caption: '' },
        ],
      },
      {
        id: 'mill-creek-falls',
        date: 'May 18, 2026',
        location: 'Mill Creek Falls Trail & Highway 89, Lassen Volcanic, California',
        coords: [-121.2800, 40.3200],
        coverImage: 'images/20260518/mills_creek_falls_1.jpg',
        coverAlt: 'Mill Creek Falls',
        text: [''],
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
      // ── Redwoods (based at Jedediah Smith Campground) ────────────
      {
        id: 'stout-grove',
        date: 'May 19, 2026',
        location: 'Mill Creek Trail, Stout Grove & Grove of Titans — Jedediah Smith Redwoods, California',
        coords: [-124.0995, 41.7993],
        coverImage: 'images/20260519/grove_of_titans_1.jpg',
        coverAlt: 'Grove of Titans, Jedediah Smith Redwoods',
        text: [''],
        images: [
          { src: 'images/20260519/camp_setup.jpg', alt: 'Camp setup', caption: '' },
          { src: 'images/20260519/mills_creek_1.jpg', alt: 'Mill Creek', caption: '' },
          { src: 'images/20260519/grove_of_titans_1.jpg', alt: 'Grove of Titans', caption: '' },
          { src: 'images/20260519/grove_of_titans_2.jpg', alt: 'Grove of Titans', caption: '' },
          { src: 'images/20260519/grove_of_titans_3.JPG', alt: 'Grove of Titans', caption: '' },
          { src: 'images/20260519/grove_of_titans_4.jpg', alt: 'Grove of Titans', caption: '' },
          { src: 'images/20260519/grove_of_titans_5.JPG', alt: 'Grove of Titans', caption: '' },
          { src: 'images/20260519/stout_grove.jpg', alt: 'Stout Grove', caption: '' },
          { src: 'images/20260519/stout_grove_2.jpg', alt: 'Stout Grove', caption: '' },
          { src: 'images/20260519/stout_grove_3.jpg', alt: 'Stout Grove', caption: '' },
          { src: 'images/20260519/stout_grove_4.jpg', alt: 'Stout Grove', caption: '' },
          { src: 'images/20260519/stout_grove_5.jpg', alt: 'Stout Grove', caption: '' },
          { src: 'images/20260519/stout_grove_6.jpg', alt: 'Stout Grove', caption: '' },
          { src: 'images/20260519/stout_grove_7.jpg', alt: 'Stout Grove', caption: '' },
          { src: 'images/20260519/stout_grove_8.jpg', alt: 'Stout Grove', caption: '' },
          { src: 'images/20260519/jedediah_smith_campground_creek.jpg', alt: 'Jedediah Smith campground creek', caption: '' },
          { src: 'images/20260519/jedediah_smith_campground_campsite_1.jpg', alt: 'Jedediah Smith campsite', caption: '' },
          { src: 'images/20260519/jedediah_smith_campground_campsite-2.jpg', alt: 'Jedediah Smith campsite', caption: '' },
          { src: 'images/20260519/redwoods_sticker.jpg', alt: 'Redwoods sticker', caption: '' },
        ],
      },
      {
        id: 'fern-canyon',
        date: 'May 20, 2026',
        location: 'James Irvine Trail, Fern Canyon & Simpson-Reed Trail — Prairie Creek Redwoods, California',
        coords: [-124.0545, 41.3966],
        coverImage: 'images/20260520/james_irvine_fern_canyon_loop_7.jpg',
        coverAlt: 'James Irvine Trail, Prairie Creek Redwoods',
        text: [''],
        images: [
          { src: 'images/20260520/breakfast_campsite.jpg', alt: 'Breakfast at campsite', caption: '' },
          { src: 'images/20260520/crescent_beach_overlook_2.jpg', alt: 'Crescent Beach overlook', caption: '' },
          { src: 'images/20260520/crescent_beach_overlook_3.jpg', alt: 'Crescent Beach overlook', caption: '' },
          { src: 'images/20260520/crescent_beach_overlook_4.jpg', alt: 'Crescent Beach overlook', caption: '' },
          { src: 'images/20260520/crescent_beach_overlook_5.jpg', alt: 'Crescent Beach overlook', caption: '' },
          { src: 'images/20260520/crescent_beach_overlook_6.jpg', alt: 'Crescent Beach overlook', caption: '' },
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
          { src: 'images/20260520/high_bluff_overlook_24.jpg', alt: 'High Bluff overlook', caption: '' },
          { src: 'images/20260520/high_bluff_overlook_25.jpg', alt: 'High Bluff overlook', caption: '' },
          { src: 'images/20260520/klamath_river_overlook_26.jpg', alt: 'Klamath River overlook', caption: '' },
          { src: 'images/20260520/klamath_river_overlook_27.jpg', alt: 'Klamath River overlook', caption: '' },
          { src: 'images/20260520/simpson_reed_trail_30.jpg', alt: 'Simpson-Reed Trail', caption: '' },
          { src: 'images/20260520/simpson_reed_trail_31.jpg', alt: 'Simpson-Reed Trail', caption: '' },
          { src: 'images/20260520/simpson_reed_trail_32.jpg', alt: 'Simpson-Reed Trail', caption: '' },
          { src: 'images/20260520/simpson_reed_trail_33.jpg', alt: 'Simpson-Reed Trail', caption: '' },
          { src: 'images/20260520/simpson_reed_trail_34.jpg', alt: 'Simpson-Reed Trail', caption: '' },
          { src: 'images/20260520/jedediah_smith_campground_creek_28.jpg', alt: 'Jedediah Smith campground creek', caption: '' },
          { src: 'images/20260520/redwood_sticker_29.jpg', alt: 'Redwood sticker', caption: '' },
        ],
      },
      {
        id: 'avenue-of-giants',
        date: 'May 21, 2026',
        location: 'Ten Taypo–Hope Creek Loop & Avenue of Giants, Humboldt Redwoods, California',
        coords: [-123.9800, 40.3500],
        coverImage: 'images/20260521/big_tree_1.jpg',
        coverAlt: 'Avenue of Giants',
        text: [''],
        images: [
          { src: 'images/20260521/ten_taypo-hope_creek_loop.jpg', alt: 'Ten Taypo–Hope Creek Loop', caption: '' },
          { src: 'images/20260521/big_tree_1.jpg', alt: 'Big tree', caption: '' },
          { src: 'images/20260521/big_tree_2.jpg', alt: 'Big tree', caption: '' },
          { src: 'images/20260521/big_tree_3.mov', alt: 'Big tree', caption: '' },
          { src: 'images/20260521/avenue_of_giants_1.MOV', alt: 'Avenue of Giants', caption: '' },
          { src: 'images/20260521/avenue_of_giants_2.MOV', alt: 'Avenue of Giants', caption: '' },
        ],
      },
    ],
  },
]
