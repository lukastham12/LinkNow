// Client testimonials — single source of truth (used by the home teaser and,
// later, a dedicated Testimonials page).
//
// POLICY: only real, verified **5-star Google reviews** belong here. Every
// entry is displayed with a 5-star rating, so `rating` must always be 5. Do NOT
// invent, paraphrase, or embellish reviews — paste the customer's own words.
//
// Until the owner supplies real reviews (BRIEF.md §12), keep this array EMPTY.
// Components read the empty state and show a clearly-marked "coming soon" note
// instead of fabricated content.

export interface Testimonial {
  /** The review text, verbatim. */
  quote: string;
  /** Always 5 — only 5-star reviews are listed here. */
  rating: 5;
}

// NOTE: reviewer names are deliberately NOT stored here. The site shows a
// neutral "Verified Google review" attribution instead of individual names
// (owner request), so names are neither displayed nor shipped in the JS bundle.

// Real 5-star Google reviews supplied by the owner (Google Business Profile for
// LinkNow Pte Ltd, pulled 10 Oct 2026 — 18 total reviews, 1 non-5-star excluded
// per the policy above). Lightly tidied for spelling/emoji only — wording is
// each reviewer's own. Newest first.
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'Thank you so much! Really appreciate how on time, friendly and efficient you were ' +
      'throughout the setup. Everything was done so smoothly, and we’re really happy with the ' +
      'decoration! Will engage them again in the future.',
    rating: 5,
  },
  {
    quote:
      'Had such a wonderful experience with LinkNow Pte Ltd for my son’s first birthday party! ' +
      'Everything turned out beautifully, and we were so happy with how everything came ' +
      'together. Novi was so helpful, professional, and attentive to all the little details. ' +
      'She made the whole process so much easier and stress-free for me, and we truly ' +
      'appreciate the effort she put into making Raphael’s special day memorable. Thank you so ' +
      'much for making his first birthday extra special! Highly recommend!',
    rating: 5,
  },
  {
    quote:
      'Got the chance to engage Novi to decorate for my friend’s bachelor party. She was super ' +
      'patient and engaging with us on what we wanted, from the atmosphere, kind of celebration ' +
      'and etc. She is very meticulous on asking the right questions and even did a run down ' +
      'with us within 1 day, paired with mock up design and ideas! On the day itself, I didn’t ' +
      'have to ask much and just left everything for her to handle and she really did a great ' +
      'job! The groom and guests absolutely loved the whole setup as well!',
    rating: 5,
  },
  {
    quote:
      'Excellent experience with Novi Tham as our party host! She kept the kids super ' +
      'entertained, and the party energy was fantastic. Thank you so much for making my son’s ' +
      'birthday special! Highly recommended.',
    rating: 5,
  },
  {
    quote:
      'Good service! Fantastic quality and very understanding to our deco needs! Will liaise ' +
      'with them again for future events! Please find them and experience great service!',
    rating: 5,
  },
  {
    quote:
      'I took her service at the last minute today at 4 pm. She did a very good job for my ' +
      'birthday party. I am very happy with the job done. She is very friendly.',
    rating: 5,
  },
  {
    quote:
      'I am extremely happy and satisfied with the service provided. The decorations were ' +
      'beautifully done, with great attention to detail, and everything turned out even better ' +
      'than I expected. The team was professional, friendly, and made the whole experience ' +
      'smooth and stress-free. I truly appreciate their hard work and creativity. I will ' +
      'definitely engage them again for future events and highly recommend their services to my ' +
      'family and friends. Thank you for making our son’s 1st birthday special!',
    rating: 5,
  },
  {
    quote:
      'Novi is a really kind lady and her setup is absolutely beautiful. Love working with her. ' +
      'Everyone loves the deco!',
    rating: 5,
  },
  {
    quote:
      'I engaged Novi and her team for balloon sculpting services, event decorations, and the ' +
      'grand opening setup. Despite a last-minute request for her team to come earlier for the ' +
      'setup, Novi was very accommodating and flexible. There were a few hiccups leading up to ' +
      'the event, but she was quick to respond, react, and rectify the issues immediately. As ' +
      'this was an open house event, we needed the balloon sculptor to be roving rather than ' +
      'stationed at one location. Her team was able to accommodate our request and engage with ' +
      'the children throughout the event, creating balloons for them along the way. I would ' +
      'definitely engage Novi and her team again for future events. They were responsive, ' +
      'accommodating, and professional throughout. Highly recommended!',
    rating: 5,
  },
  {
    quote:
      'We had such a wonderful experience with this company for our baby’s 100-day celebration. ' +
      'From the very beginning, they were incredibly attentive, patient, and responsive to every ' +
      'detail we wanted. What impressed us most was how accommodating they were with our ' +
      'requests. They listened to our ideas, catered to our specific demands, and made sure ' +
      'everything turned out exactly how we envisioned it. The decorations were beautifully ' +
      'done, and the quality exceeded our expectations. On top of that, their pricing was very ' +
      'reasonable, making them excellent value for money without compromising on quality or ' +
      'service. Highly recommend them to anyone looking for a reliable, professional, and ' +
      'thoughtful team to make their special occasion even more memorable. Thank you for ' +
      'helping make our baby’s 100-day celebration so beautiful!',
    rating: 5,
  },
  {
    quote:
      'Excellent service, I really service. Deco was done picture perfect, and Novi is such a ' +
      'kind-hearted, friendly person. Work was done fast and I enjoyed talking to Novi — she ' +
      'shared a lot of tips, etc. Kudos Novi, keep up the good work.',
    rating: 5,
  },
  {
    quote:
      'I can’t thank you enough for the amazing birthday backdrop decor! It truly elevated the ' +
      'whole celebration and made my special day extra memorable. Excellent pricing and perfect ' +
      'punctuality. You are the best, Nove!',
    rating: 5,
  },
  {
    quote:
      'Thank you for the big and beautiful bouquet! And personalised service — the owner ' +
      'Novestela really goes the extra mile for her customers. Can’t wait to surprise my MIL ' +
      'with this on Mother’s Day!',
    rating: 5,
  },
  {
    quote:
      'Thanks Novi for the speedy delivery of these soap flower bouquets! Service is superb and ' +
      'helped to make sure everything was delivered on time. Bouquets are huge and everyone ' +
      'loves it! Will definitely engage Novi for future occasions!',
    rating: 5,
  },
  {
    quote:
      'Did my baby shower decoration, it turned out exactly how I envisioned it to be. Will ' +
      'definitely engage them again for future events! Highly recommended.',
    rating: 5,
  },
  {
    quote:
      'A big thank you to Novi! Wonderful decorations and such friendly service. Everything was ' +
      'handled with great care, and she made sure the decor looked perfect. Thank you so much for ' +
      'making our son’s birthday celebration truly special.',
    rating: 5,
  },
  {
    quote:
      'A big thank you to Ms. Novi for decorating the birthday backdrop for my granddaughter’s ' +
      '1st birthday. Although she runs a small business, her service was truly excellent — ' +
      'friendly, patient, and very accommodating to all our requests and needs. The setup turned ' +
      'out so sweet and beautiful, making the celebration even more special. Do support her ' +
      'small business! Highly recommended.',
    rating: 5,
  },
];
