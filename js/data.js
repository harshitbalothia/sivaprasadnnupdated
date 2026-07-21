/* =====================================================================
   EDIT YOUR CONTENT HERE.
   This is the one file the team touches most. Change text, add a video,
   add an award, update contact details. Save, push to GitHub, done.
   No coding needed beyond keeping the quotes "" and commas in place.
   ===================================================================== */

window.SITE = {

  /* ---- contact + social. Change these anytime. ---- */
  contact: {
    phone: "+91 98201 26711",
    phoneRaw: "919820126711",         // used for WhatsApp link, digits only
    email: "sivaprasadnn@gmail.com",
    cityLine: "Vashi, Navi Mumbai, India",
    // Social links. Leave "" to hide an icon.
    instagram: "",   // Paste the exact profile URL to show this icon.
    facebook:  "",   // Paste the exact profile URL to show this icon.
    youtube:   "",   // Paste the exact channel URL to show this icon.
    linkedin:  ""
  },

  /* ---- performance videos (YouTube). Add/remove freely. ----
     id = the code after watch?v= in a YouTube link.
     group = "carnatic" | "dance" | "fusion"  (used to filter on Music page) */
  videos: [
    { id:"xEUA_AJr58M", title:"Carnatic Vocal, Raga Hamsadhwani",   group:"carnatic" },
    { id:"YpI_792nNmY", title:"Live Performance",                   group:"carnatic" },
    { id:"w3_kyZfiCSs", title:"Nataraj Kautukam",                   group:"dance" },
    { id:"OfuR0auG-uk", title:"Varnam",                             group:"dance" },
    { id:"oFDpEHxU0_E", title:"Swarajati",                          group:"dance" },
    { id:"RdVMFwY0JpQ", title:"Bho Shambho, Ensemble",              group:"dance" },
    { id:"gZcmnWoYTrU", title:"Kuchipudi, Swarajati in Vasanta",    group:"dance" },
    { id:"IU4G01g1P8w", title:"Thillana in Dhanashree, Mohiniattam",group:"dance" },
    { id:"1O6MPVjq5gw", title:"Bharatanatyam Recital",             group:"dance" },
    { id:"pkSUWfRqPOE", title:"Classical Dance Recital",           group:"dance" },
    { id:"opPvCPI-raw", title:"Fusion Jugalbandi",                 group:"fusion" },
    { id:"GobBH3Z_lPQ", title:"Live Jugalbandi Ensemble",          group:"fusion" }
  ],

  /* ---- locally hosted performance videos ---- */
  localVideos: [
    { src:"assets/videos/Gajavad.mp4", title:"Gajavadana", group:"carnatic" },
    { src:"assets/videos/Hamsadwani.mp4", title:"Raga Hamsadhwani", group:"carnatic" },
    { src:"assets/videos/Navaratri Nerul3 himagiri .mp4", title:"Himagiri Tanaye", group:"carnatic" },
    { src:"assets/videos/Pibare rama.mp4", title:"Pibare Rama", group:"carnatic" },
    { src:"assets/videos/Pibare.mp4", title:"Pibare Rama, performance excerpt", group:"carnatic" },
    { src:"assets/videos/Ragam saraswati.mp4", title:"Raga Saraswati", group:"carnatic" },
    { src:"assets/videos/Ragsm.mp4", title:"Raga Alapana", group:"carnatic" },
    { src:"assets/videos/Saraswati ragam.mp4", title:"Saraswati Raga Alapana", group:"carnatic" },
    { src:"assets/videos/Saraswati.mp4", title:"Saraswati", group:"carnatic" },
    { src:"assets/videos/Saraswatiaa.mp4", title:"Saraswati, performance excerpt", group:"carnatic" },
    { src:"assets/videos/Shuklambara.mp4", title:"Shuklambara Dharam", group:"carnatic" },
    { src:"assets/videos/Slokam rama.mp4", title:"Rama Slokam", group:"carnatic" },
    { src:"assets/videos/Sreechakra.mp4", title:"Sree Chakra Raja", group:"carnatic" },
    { src:"assets/videos/Swara gajavadana.mp4", title:"Gajavadana Swaras", group:"carnatic" },
    { src:"assets/videos/Test.mp4", title:"Live music excerpt", group:"carnatic" },
    { src:"assets/videos/WhatsApp Video 2026-07-09 at 7.38.44 PM.mp4", title:"Live Carnatic performance", group:"carnatic" }
  ],

  /* ---- awards & honours. Newest first. ---- */
  awards: [
    { yr:"2017", ti:"Pratham Samadhi, in honour of a quarter century of vocal support · Ashwini Ekbote Fine Arts Centre, Pune" },
    { yr:"2017", ti:"Uttara Chidambaram Shivaratri Nataranjali · Nataraj Temple Trust, Satara" },
    { yr:"2016", ti:"Omkaara Dhwani · Navarasa, Nerul, Navi Mumbai" },
    { yr:"2016", ti:"Dasopant Lalit Ratna · Panchamveda Academy of Fine Arts & Culture" },
    { yr:"2015", ti:"Nritya Sangeetha Sevamani · Vashi Fine Arts" },
    { yr:"2015", ti:"Girnar Sangeetha Ratna · Girnar Festivals Committee" },
    { yr:"2014", ti:"Outstanding Achievement · Yogakshema Sabha" },
    { yr:"2014", ti:"Shivali Sangeet Shiromani · 65th Shivali Festival" },
    { yr:"2014", ti:"Nupura Sangeeta Ratna · Nupuradwani Festival" },
    { yr:"2014", ti:"Kalaratna · Nupur Zankar Academy, Pune" },
    { yr:"2013", ti:"Mumbai Gourav Award · Aap Ki Awaaj Foundation" },
    { yr:"2010", ti:"Sur Ratna · Nateshwar Nritya Kala Mandir" },
    { yr:"2009", ti:"Sangeeta Praveena · Nateshwara" }
  ],

  /* ---- press pull-quotes ---- */
  quotes: [
    { q:"The vocal rendering of Shri Sivaprasad was excellent. One could immerse in sheer joy and taste the sweetness of music emanating from his vocal chords.", by:"The Indian Express" },
    { q:"Sivaprasad sang with feeling and verve, a most soulful music.", by:"Femina" },
    { q:"Sanpada-based Siva Prasad is the most sought-after vocal artist for practically every dance performance in the city.", by:"DNA" },
    { q:"An evocative recital.", by:"N. Hariharan, The Times of India" },
    { q:"Sivaprasad's mellifluous vocal support enhanced the performance.", by:"Kerala in Mumbai" }
  ],

  /* ---- curated Performances page archive ---- */
  performanceImages: [
    { src:"assets/GAllery /photo-71.jpg", shape:"feature" },
    { src:"assets/GAllery /photo-02.jpg", shape:"portrait" },
    { src:"assets/GAllery /photo-20.jpg", shape:"standard" },
    { src:"assets/photos/performances/photo-36.jpg", shape:"standard" },
    { src:"assets/GAllery /photo-28.jpg", shape:"feature" },
    { src:"assets/GAllery /sivaprasadnn-bio-03.jpg", shape:"portrait" },
    { src:"assets/photos/performances/photo-40.jpg", shape:"standard" },
    { src:"assets/photos/performances/photo-61.jpg", shape:"standard" },
    { src:"assets/GAllery /photo-26.jpg", shape:"feature" },
    { src:"assets/GAllery /sivaprasadnn-bio-05.jpg", shape:"portrait" },
    { src:"assets/photos/performances/photo-45.jpg", shape:"feature" },
    { src:"assets/GAllery /photo-38.jpg", shape:"standard" },
    { src:"assets/GAllery /photo-72.jpeg", shape:"portrait" },
    { src:"assets/photos/performances/photo-42.jpg", shape:"standard" },
    { src:"assets/photos/performances/photo-41.jpg", shape:"feature" },
    { src:"assets/GAllery /sivaprasadnn-bio-22.jpg", shape:"portrait" },
    { src:"assets/photos/performances/photo-59.jpg", shape:"standard" },
    { src:"assets/GAllery /photo-55.jpg", shape:"standard" },
    { src:"assets/GAllery /sivaprasadnn-bio-24.jpg", shape:"portrait" },
    { src:"assets/GAllery /photo-54.jpg", shape:"feature" },
    { src:"assets/photos/performances/photo-62.jpg", shape:"feature" }
  ],

  /* ---- gallery: how many optimized photos exist in assets/photos/gallery ---- */
  galleryCount: 42,   // files are perf-01.jpg ... perf-42.jpg
  pressCount: 18      // files are clip-01.jpg ... clip-18.jpg
};
