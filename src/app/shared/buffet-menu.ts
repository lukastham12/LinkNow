// Buffet Catering detail page data (route '/services/buffet-catering',
// pages/buffet-catering/) — added 19 Oct 2026. LinkNow engages a second,
// separate third-party vendor for buffet catering specifically — "Yea!
// Mama — Experiential Catering" (distinct from the vendor behind
// shared/addon-details.ts, which covers Popcorn Station/Candy Floss/Soft
// Serve Ice Cream/Bouncy Castle/Balloon Sculpting). The owner supplied two
// of that vendor's own PDF catalogues — "YMM Buffet Menu Catalogue" (the
// larger, self-serve "Classic"/"Premium" buffet lines, min 30–40 pax) and
// "YMM Mini Buffet Catalogue" (smaller, dropoff-tray lines for min 10–20
// pax) — as the pricing/menu reference. Every price, pax minimum, item
// count and dish name below is copied verbatim from those two catalogues.
//
// As with the other vendor, nothing of the vendor's own identity is
// published here: no vendor name, logo, phone, WhatsApp or Instagram
// anywhere on the detail page — every CTA routes to LinkNow's own
// WhatsApp/email only (see pages/buffet-catering/buffet-catering.ts).
//
// What was deliberately left OUT of this page (owner asked only for
// "pricing, what buffet offerings etc", not the vendor's full operating
// terms, and some of those terms are specific to how that vendor runs
// their own business, not confirmed as LinkNow's own policy):
// - The vendor's detailed booking/cancellation terms (3-working-day
//   confirmation window, 50%/100% cancellation penalties, 5% refund admin
//   fee, "email sales@yeamama.com.sg" instructions, etc.)
// - The vendor's own per-level delivery surcharge table, GST-registration
//   status, and SFA time-stamping guideline text.
// Service staff and transport/delivery fees ARE included below (as
// `EXTRA_CHARGES`) since those are plain added costs relevant to a buyer
// comparing this to in-house catering, not vendor-specific legal terms.
// If the owner wants the fuller terms published too, add them as their own
// section rather than guessing at how much of the vendor's operating
// process LinkNow wants to commit to in writing.

export interface MenuGroup {
  /** e.g. "Hot Favourites", "Dessert", "Chicken (choose one)". */
  heading: string;
  items: readonly string[];
}

export interface MenuColumn {
  /** Station/cuisine label for multi-column tiers, e.g. "Local Taste Buffet". Omit for single-column tiers. */
  label?: string;
  groups: readonly MenuGroup[];
}

export interface BuffetTier {
  id: string;
  name: string;
  price: string;
  priceInclGst: string;
  minPax: string;
  itemCount: string;
  columns: readonly MenuColumn[];
}

export interface BuffetLine {
  id: string;
  title: string;
  blurb: string;
  tiers: readonly BuffetTier[];
}

export const BUFFET_LINES: readonly BuffetLine[] = [
  {
    id: 'classic-buffet',
    title: 'Classic Buffet',
    blurb:
      'A full self-serve buffet spread across three cuisine stations — local, modern Asian and ' +
      'international — for larger gatherings.',
    tiers: [
      {
        id: 'classic-standard',
        name: 'Standard',
        price: '$18.90 / pax',
        priceInclGst: '$20.60 / pax incl. GST',
        minPax: 'Min 40 pax',
        itemCount: '9 items',
        columns: [
          {
            label: 'Local Taste Buffet',
            groups: [
              {
                heading: 'Hot Favourites',
                items: [
                  'Sweet and Sour Fish (with Triple Capsicum)',
                  "Mama's Signature Curry Chicken",
                  'Eight Treasure Lo Han Vegetable',
                  'Ngoh Hiang with Spicy Dip',
                  'Cocktail Spring Roll',
                  'Steamed Pandan Rice',
                  'Vegetarian Bee Hoon',
                ],
              },
              { heading: 'Dessert', items: ['Chilled Honey Dew Sago'] },
              { heading: 'Beverage', items: ['Cocktail Fruit Punch'] },
            ],
          },
          {
            label: 'Modern Asian Buffet',
            groups: [
              {
                heading: 'Hot Favourites',
                items: [
                  'Fish Fillet with Tangy Sambal',
                  'Lemon Thai Chicken',
                  'Mixed Vegetable Chest',
                  'Sotong Ball with Sweet Sauce',
                  'Cocktail Samosa',
                  'Johore Style Mee Goreng',
                  'Thai Pineapple Rice',
                ],
              },
              { heading: 'Dessert', items: ['Almond Jelly Longan'] },
              { heading: 'Beverage', items: ['Apple Juice'] },
            ],
          },
          {
            label: 'International Buffet',
            groups: [
              {
                heading: 'Hot Favourites',
                items: [
                  'Fish Fritter with Tartare Dip',
                  'Honey Glazed Chicken Topped with Mixed Salsa',
                  "Mama's Sweet & Sour Prawn with Triple Capsicums",
                  'Cauliflower with Mushroom',
                  'Scallop Cake with Tartare Dip',
                  'Butter Rice with Almond Flakes & Raisin',
                  'Hong Kong Noodle',
                ],
              },
              { heading: 'Dessert', items: ['Almond Jelly Cocktail'] },
              { heading: 'Beverage', items: ['Orange Cordial'] },
            ],
          },
        ],
      },
      {
        id: 'classic-deluxe',
        name: 'Deluxe',
        price: '$24.90 / pax',
        priceInclGst: '$27.14 / pax incl. GST',
        minPax: 'Min 30 pax',
        itemCount: '10 items',
        columns: [
          {
            label: 'Local Taste Buffet',
            groups: [
              {
                heading: 'Hot Favourites',
                items: [
                  'Steamed Snapper Fish Fillet "Nonya Style"',
                  'Wok Fried Chicken with Sweet Sauce',
                  '"Har Lok" Prawn',
                  'Broccoli with Three Mushrooms',
                  'Sotong Ball with Sambal Sauce',
                  'Honey Prawn Dumpling',
                  'Penang Keow Teow',
                  'Nasi Kuning (Malay-style rice flavoured with turmeric and lemongrass)',
                ],
              },
              { heading: 'Dessert', items: ['Glass Jelly with Longan and Sea Coconut'] },
              { heading: 'Beverage', items: ['Orange Cordial'] },
            ],
          },
          {
            label: 'Modern Asian Buffet',
            groups: [
              {
                heading: 'Hot Favourites',
                items: [
                  'Fish Fillet with Lemon Caper Buttercream',
                  'Stir Fried Sze Chuan Chicken',
                  "Mama's Salt & Pepper Prawn",
                  'BBQ Tofu with Vegetable',
                  'Meatless Wu Xiang Maki Roll with Mayo',
                  'Fried Lobster Ball',
                  'Mee Siam Goreng with Chives',
                  'Country-Style Wok Fried Rice with Assortment',
                ],
              },
              { heading: 'Dessert', items: ['Almond Jelly Cocktail'] },
              { heading: 'Beverage', items: ['Apple Juice'] },
            ],
          },
          {
            label: 'International Buffet',
            groups: [
              {
                heading: 'Hot Favourites',
                items: [
                  'Pan Fried Fish Fillet with Marmalade',
                  'Black Pepper Chicken Cutlet',
                  'Fried Sliced Lamb with Triple Capsicum',
                  'Mixed Nonya Curry Vegetable',
                  'Crispy Fried Wonton with Dip',
                  'Spicy Peri Peri Tiger Prawn',
                  'Singapore-Style Fried Bee Hoon with Crispy Soya',
                  'Mediterranean Rice with Raisins & Nuts',
                ],
              },
              { heading: 'Dessert', items: ['Chilled Honey Dew Sago'] },
              { heading: 'Beverage', items: ['Orange Cordial'] },
            ],
          },
        ],
      },
      {
        id: 'classic-executive',
        name: 'Executive',
        price: '$30.90 / pax',
        priceInclGst: '$33.68 / pax incl. GST',
        minPax: 'Min 30 pax',
        itemCount: '11 items',
        columns: [
          {
            label: 'Local Taste Buffet',
            groups: [
              { heading: 'Appetizer', items: ['Homemade Chicken Satay & Condiments'] },
              {
                heading: 'Hot Favourites',
                items: [
                  'Golden Sand Prawns',
                  'Steamed Hainanese Chicken',
                  'Xiao Bai Cai with Three Mushrooms',
                  'Grilled Fish in Banana Leaf',
                  'Steamed Dumpling (with Black Vinegar)',
                  "Mama's Signature Mee Siam",
                  "Mama's Signature Chicken Rice",
                ],
              },
              { heading: 'Dessert', items: ['Deluxe Fresh Fruit Platter', 'Assorted Pastries Platter'] },
              { heading: 'Beverage', items: ['Cocktail Fruit Punch'] },
            ],
          },
          {
            label: 'Modern Asian Buffet',
            groups: [
              { heading: 'Appetizer', items: ['Deluxe Garden Fresh Mesclun Salad'] },
              {
                heading: 'Hot Favourites',
                items: [
                  'Golden Cereal Prawn',
                  'Chicken Whole Leg with Honey',
                  'Banger & Truffle Mash',
                  'Seasonal Vegetable with Bai Ling Mushroom',
                  'Cocktail Fish Finger with BBQ Dip',
                  'Steamed Chicken Siew Mai',
                  'Tom Yam Clear Noodle Special (DIY)',
                  'Fried Rice with Salted Fish & Chicken',
                ],
              },
              { heading: 'Dessert', items: ['English Mini Tea Cake Platter'] },
              { heading: 'Beverage', items: ['Apple Juice Cordial'] },
            ],
          },
          {
            label: 'International Buffet',
            groups: [
              { heading: 'Appetizer', items: ['Deluxe Japanese Maki Sushi'] },
              {
                heading: 'Hot Favourites',
                items: [
                  'Oven Baked Snapper Fish with Plum Salsa',
                  'Grilled Teriyaki Chicken',
                  "Signature Shepherd's Pie",
                  'Tempura Prawn with Mentai Dip',
                  'Broccoli with Shimeiji Mushroom',
                  'Mozzarella Cheese Stick with Dip',
                  "Mama's Signature Laksa",
                  'Pilaf Rice with Almond Flakes & Raisins',
                ],
              },
              {
                heading: 'Dessert',
                items: ["Hot or Ice Mama's Cheng Tng, or Mini French Pastries Platter"],
              },
              { heading: 'Beverage', items: ['Pink Guava Cordial'] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'healthier-menu',
    title: 'Healthier Menu',
    blurb:
      'Lighter, better-for-you buffet lines — healthier oils, wholegrain options and more plant-based dishes.',
    tiers: [
      {
        id: 'healthier-asian',
        name: 'Asian Delights',
        price: '$25 / pax',
        priceInclGst: '$27.25 / pax incl. GST',
        minPax: 'Min 40 pax',
        itemCount: '10 items',
        columns: [
          {
            groups: [
              { heading: 'Starter', items: ['Home-Made Mango Kimchi'] },
              {
                heading: 'Hot Savoury Items',
                items: [
                  'Indian Chicken Tikka',
                  'Vietnamese Fish Stew',
                  'Plant-Based Mapo Tofu',
                  'Chinese Steamed Soon Kueh (with condiments)',
                  'Sayur Lemak Lodeh',
                  'Kunyit Fried Rice (brown rice)',
                ],
              },
              {
                heading: 'Dessert',
                items: ['Assorted Nyonya Kueh, or Assorted Fruit Platter'],
              },
              { heading: 'Beverages', items: ['Fruit Punch', 'Ice Water with Lemon'] },
            ],
          },
        ],
      },
      {
        id: 'healthier-western',
        name: 'Western Delights',
        price: '$28.90 / pax',
        priceInclGst: '$31.50 / pax incl. GST',
        minPax: 'Min 30 pax',
        itemCount: '10 items',
        columns: [
          {
            groups: [
              { heading: 'Starter', items: ['Plant Based Chicken Caesar Salad & Croutons'] },
              {
                heading: 'Hot Savoury Items',
                items: [
                  'Grilled Peri Peri Chicken',
                  'Baked Fish Served with Salsa Verde',
                  'Steamed Seasonal Vegetables',
                  'Volcano Hot Wings (DF)',
                  'Wholegrain Mac & Cheese',
                  'Organic Wholegrain Mushroom Aglio Olio',
                ],
              },
              { heading: 'Dessert', items: ['Assorted Mini Pastries, or Assorted Fruit Platter'] },
              { heading: 'Beverages', items: ['Fruit Punch', 'Ice Water with Lemon'] },
            ],
          },
        ],
      },
      {
        id: 'healthier-peranakan',
        name: 'Peranakan Delights',
        price: '$32.90 / pax',
        priceInclGst: '$35.86 / pax incl. GST',
        minPax: 'Min 30 pax',
        itemCount: '10 items',
        columns: [
          {
            groups: [
              { heading: 'Starter', items: ['Peranakan Nyonya Chap Chye'] },
              {
                heading: 'Hot Savoury Items',
                items: [
                  'Ayam Buah Keluak',
                  'Nyonya Assam Fish & Vegetables',
                  'Nyonya Beef Rendang & Kirisek',
                  'Steamed Nyonya Otah Otah',
                  'Brown Coconut Rice',
                  'Organic Wholegrain Mushroom Aglio Olio',
                ],
              },
              { heading: 'Dessert', items: ['Assorted Nyonya Kueh, or Assorted Fruit Platter'] },
              { heading: 'Beverages', items: ['Fruit Punch', 'Ice Water with Lemon'] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'build-your-own-buffet',
    title: 'Build-Your-Own Buffet',
    blurb:
      'Pick one dish per category to build your own spread — a more flexible, build-your-own buffet line.',
    tiers: [
      {
        id: 'byo-premium',
        name: 'Premium',
        price: '$18.90 / pax',
        priceInclGst: '$20.60 / pax incl. GST',
        minPax: 'Min 30 pax',
        itemCount: '8 items',
        columns: [
          {
            groups: [
              {
                heading: 'Chicken (choose one)',
                items: ['Mama’s Curry Chicken with Potatoes', 'Oven Baked Chicken with Apple Thyme'],
              },
              {
                heading: 'Fish (choose one)',
                items: ['Steamed Teochew Fish Fillet', 'Cajun Baked Fish with Mango Cream'],
              },
              {
                heading: 'Vegetable (choose one)',
                items: ['Mixed Nonya Chap Chye', 'Char Grilled Vegetables'],
              },
              {
                heading: 'Sides (choose one)',
                items: ['Chicken Ngoh Hiang with Sweet Sauce', 'Chicken Karaage with Bulgogi Sauce'],
              },
              {
                heading: 'Rice (choose one)',
                items: ['Nasi Goreng Kampung (spicy)', 'Butter Rice with Almond Flakes & Raisins'],
              },
              {
                heading: 'Noodles / Pasta (choose one)',
                items: ['Xin Chow Bee Hoon', 'Spaghetti Aglio Olio with Shiitake Mushroom'],
              },
              { heading: 'Desserts', items: ['Ai Yu Jelly with Cocktail Fruits', 'Petite Vanilla Cream Puff'] },
              { heading: 'Beverage', items: ['Fruit Punch Cordial'] },
            ],
          },
        ],
      },
      {
        id: 'byo-deluxe',
        name: 'Deluxe',
        price: '$23.90 / pax',
        priceInclGst: '$26.05 / pax incl. GST',
        minPax: 'Min 30 pax',
        itemCount: '9 items',
        columns: [
          {
            groups: [
              {
                heading: 'Chicken (choose one)',
                items: ['Szechuan Kong Bao Chicken', 'Oven Baked Chicken, Orange Glazed'],
              },
              {
                heading: 'Fish (choose one)',
                items: ['Salted Egg Fish Fillet', 'Baked Snapper with Thai Mango Sauce'],
              },
              {
                heading: 'Seafood (choose one)',
                items: ['Salt & Pepper Tiger Prawn', 'Grilled Masala Tiger Prawn'],
              },
              {
                heading: 'Vegetable (choose one)',
                items: ['Broccoli, Cauliflower, Carrot & Mushroom', 'Vegetables Medley'],
              },
              {
                heading: 'Sides (choose one)',
                items: ['Oriental Hong Shao Tofu', 'Sausage Platter with Brown Sauce (chicken chipolata & chicken frank)'],
              },
              {
                heading: 'Rice (choose one)',
                items: ['Olive Fried Rice with Cashew Nut', 'Tomato Rice with Triple Capsicum'],
              },
              {
                heading: 'Noodles / Pasta (choose one)',
                items: ['Hong Kong Mee with Crab Bites & Vegetables', 'Stir Fry Laksa Noodle with Tao Pok & Fishcake'],
              },
              { heading: 'Desserts', items: ['Chilled Honeydew with Sago', 'Petite Chocolate Éclair'] },
              { heading: 'Beverage', items: ['Fruit Punch Cordial'] },
            ],
          },
        ],
      },
      {
        id: 'byo-executive',
        name: 'Executive',
        price: '$28.90 / pax',
        priceInclGst: '$31.50 / pax incl. GST',
        minPax: 'Min 30 pax',
        itemCount: '10 items',
        columns: [
          {
            groups: [
              {
                heading: 'Chicken (choose one)',
                items: ['Fried Chicken with Thai Garlic Sauce', 'Oven Baked Chicken with Mushroom Sauce'],
              },
              {
                heading: 'Fish (choose one)',
                items: ['Pan Seared Salmon with Mango Sauce', 'Stir Fry Salmon Fillet with 3-Flavoured Sauce'],
              },
              {
                heading: 'Seafood (choose one)',
                items: ['Stir Fry Salted Egg Tiger Prawn', 'Baked Tiger Prawn with Garlic Butter'],
              },
              {
                heading: 'Appetizer (choose one)',
                items: [
                  'Chicken Satay with Condiments (2 sticks per pax)',
                  'Classic Caesar Salad with Turkey Bacon Bites & Croutons',
                ],
              },
              {
                heading: 'Vegetable (choose one)',
                items: ['Baby Kailan with Oyster Sauce', 'Vegetables Medley'],
              },
              {
                heading: 'Rice (choose one)',
                items: ['Pilaf Rice with Almond Flakes & Raisin', 'Yang Chow Fried Rice with Crab Bites'],
              },
              {
                heading: 'Noodle Bar Specials (choose one)',
                items: ["Mama's Signature Laksa", "Mama's Signature Mee Siam", "Shepherd's Pie"],
              },
              {
                heading: 'Sides (choose one)',
                items: ['Golden Tofu with Spicy Sauce', 'Crumbled Scallop with Mentaiko Dip'],
              },
              { heading: 'Desserts', items: ['New York Cheesecake (hot), or Cold Cheng Tng'] },
              { heading: 'Beverage', items: ['Fruit Punch Cordial'] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'mini-buffet-sedap',
    title: 'Mini Buffet — Sedap Fiesta',
    blurb:
      'A smaller dropoff-tray buffet for more intimate gatherings — local-flavour focused, min 10 pax.',
    tiers: [
      {
        id: 'sedap-fiesta',
        name: 'Sedap Mini Buffet Fiesta',
        price: '$28.90 / pax',
        priceInclGst: '$31.50 / pax incl. GST',
        minPax: 'Min 10 pax',
        itemCount: '9 dishes — choose one from each of 9 categories',
        columns: [
          {
            groups: [
              { heading: 'Chicken (choose one)', items: ['Ayam Masak Merah', 'Indonesian-Style Grilled Chicken', "Mama's Chicken Rendang"] },
              { heading: 'Fish (choose one)', items: ['Vietnamese-Style Fried Fish Fillet', 'Fried Fish Fillet "Tiga Rasa"', 'Sweet & Sour Fish with Capsicum'] },
              { heading: 'Prawn (choose one)', items: ['Tiger Prawn with Lemak Chilli Padi', 'Buttermilk Tiger Prawn', 'Stir Fry Sambal Tiger Prawn'] },
              { heading: 'Vegetables (choose one)', items: ['Mixed Sayur Lodeh', 'Sambal Goreng', 'Mixed Vegetables Chest'] },
              { heading: 'Sides (choose one)', items: ['Lychee Prawn Ball', 'Beancurd Prawn Roll with Mayonnaise'] },
              { heading: 'Rice & Noodle (choose one)', items: ['Kampung Fried Rice with Ikan Bilis', 'Lontong Rice Cake', 'Mee Siam Goreng with Chives', 'Spaghetti Aglio Olio with Shiitake Mushroom'] },
              { heading: 'Dessert (choose one)', items: ['Chocolate Eclairs & Cream Puff', 'Ai Yu Jelly with Cocktail Fruits & Longan', 'Chilled Honeydew with Sago Pearls'] },
              { heading: 'Starter (choose one)', items: ['Chicken Satay with Peanut Sauce (2 pcs)', 'Tauhu Goreng with Peanut Gravy', 'Thai Glass Noodles with Seafood'] },
              { heading: 'Signature (choose one)', items: ["Mama's Mutton Rendang", 'Traditional Shepherd Pie (Chicken)'] },
              { heading: 'Add-ons', items: ["Mama's Signature Mee Siam (+$6)", "Mama's Signature Laksa (+$6)"] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'mini-buffet-fusion',
    title: 'Mini Buffet — Fusion Cuisine',
    blurb:
      'A broader global-fusion mini buffet line with three tiers, min 10 pax — more dishes to pick from at each tier up.',
    tiers: [
      {
        id: 'fusion-a',
        name: 'Tier A',
        price: '$21.90 / pax',
        priceInclGst: '$23.87 / pax incl. GST',
        minPax: 'Min 10 pax',
        itemCount: '7 dishes — choose one from items 1–7',
        columns: [
          {
            groups: [
              { heading: '1. Chicken (choose one)', items: ['Baked Chicken with Garlic Sauce', 'Baked Chicken with Thai Sauce', 'Baked Chicken with Black Pepper Sauce', 'Grilled Chicken with Mushroom Sauce', 'Signature Teriyaki Chicken', 'Curry Chicken with Potatoes', 'Szechuan Kong Bao Chicken'] },
              { heading: '2. Fish (choose one)', items: ['Sweet & Sour Fish Fillet with Assortment Vegetables', 'Curry-Flavoured Cereal Fish Fillet', 'Steamed Snapper Fish Fillet with Teochew Sauce', 'Pan Seared Salmon Fillet with Lychee Ginger Cream (+$3)', 'Grilled Barramundi Fish Fillet with Miso Cream (+$3)', 'Thai-Style Snapper Fish Fillet with Green Mango Julienne'] },
              { heading: '3. Seafood (choose one)', items: ['Ebi Furai with Wasabi Mayo Dip', 'Baked Tiger Prawn with Garlic Herbs Butter (deshelled)', 'Cereal Tiger Prawn', 'Seafood Tom Yam Cream (prawn, squid, fish)', 'Tiger Prawn with Celery & Cashew Nuts', 'Salt & Pepper Prawn'] },
              { heading: '4. Vegetables (choose one)', items: ['Mixed Nonya Chap Chye (V)', 'Broccoli with Shimeiji Mushroom', 'Char Grilled Vegetables & Potatoes', 'Mixed Vegetables with Herbs Cream', 'Sweet Peas, Corn Kernels & Carrot'] },
              { heading: '5. Sides (choose one)', items: ['Steamed Chicken Siew Mai', 'Crispy Crumbed Scallop with Mentaiko Dip', 'Egg Beancurd with Minced Chicken & Vegetables', 'Meatless Chicken Nuggets with Cajun Mayo Dip', 'Bangers & Mash', 'Chicken Ngoh Hiang'] },
              { heading: '6. Rice and Noodles (choose one)', items: ['Authentic Thai Pineapple Fried Rice with Chicken Floss', 'Yang Chow Fried Rice with Mock Char Siew', 'Garlic Fried Rice with Chives', 'Mee Siam Goreng with Chives', 'Penang-Style Fried Kway Teow', 'Mee Siam Goreng'] },
              { heading: '7. Sweets (choose one)', items: ['Chocolate Eclairs & Cream Puffs', 'Homemade Chocolate Brownies', 'Hot Green Bean Soup', 'Ai Yu Jelly with Aloe Vera, Peach Tea', 'Chilled Mango Pudding with Nata De Coco', 'Assorted Flavoured Swiss Roll'] },
            ],
          },
        ],
      },
      {
        id: 'fusion-b',
        name: 'Tier B',
        price: '$23.90 / pax',
        priceInclGst: '$26.05 / pax incl. GST',
        minPax: 'Min 10 pax',
        itemCount: '8 dishes — choose one from items 1–8',
        columns: [
          {
            groups: [
              { heading: '8. Starters (choose one)', items: ['Chicken Satay with Thick Peanut Gravy (2 pcs)', 'Steamed Oriental Otah Bun', 'Thai-Style Glass Noodle', 'Potato Salad with Chicken Frankfurter', 'Grilled Otah in Banana Leaf', 'Waldorf Salad with Walnuts & Turkey Bacon Bites'] },
            ],
          },
        ],
      },
      {
        id: 'fusion-c',
        name: 'Tier C',
        price: '$26.90 / pax',
        priceInclGst: '$29.32 / pax incl. GST',
        minPax: 'Min 10 pax',
        itemCount: '9 dishes — choose one from items 1–9',
        columns: [
          {
            groups: [
              {
                heading: '9. Signatures (choose one)',
                items: [
                  'Traditional Chicken Shepherd Pie',
                  'Roasted Beef Platter with Au Jus & Mustard',
                  'House Special Laksa (+$1)',
                  "Chef's Pride Mee Siam (+$1)",
                  'Signature Mutton Rendang',
                  'White Truffle Oil Mac & Cheese',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'international-lite-breakfast',
    title: 'International Lite Breakfast',
    blurb: 'A lighter dropoff breakfast spread for morning events — takeaway trays, min 20 pax.',
    tiers: [
      {
        id: 'lite-breakfast',
        name: 'International Lite Breakfast',
        price: '$12.90 / pax',
        priceInclGst: '$14.06 / pax incl. GST',
        minPax: 'Min 20 pax',
        itemCount: '6 items',
        columns: [
          {
            groups: [
              {
                heading: 'Includes',
                items: [
                  'Pancake with Maple Syrup',
                  'Turkey Bacon Slices',
                  'Chipolata',
                  'Croissant',
                  'Fruit Platter',
                  'Orange Cup Juice',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export interface ExtraCharge {
  label: string;
  price: string;
}

/** Added costs shown once at the foot of the page — relevant across every buffet line above. */
export const EXTRA_CHARGES: readonly ExtraCharge[] = [
  { label: 'Service staff (per server, max 3 hrs)', price: 'From $100 ($107–108 incl. GST)' },
  { label: 'Transport & setup — full buffet (normal)', price: '$85 ($92.65 incl. GST)' },
  { label: 'Transport & setup — full buffet (Jurong Island)', price: '$135 ($147.15 incl. GST)' },
  { label: 'Delivery — mini buffet (normal)', price: 'From $50 (before GST)' },
  { label: 'Delivery — mini buffet (Jurong Island)', price: 'From $100 (before GST)' },
  { label: 'Optional table setup with floral centrepiece (mini buffet, 20 pax+)', price: '$180' },
];
