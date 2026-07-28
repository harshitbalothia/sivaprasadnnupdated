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
     group = "carnatic" | "dance" | "fusion" | "conversations"
     (used to filter on Music page) */
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
    { id:"GobBH3Z_lPQ", title:"Live Jugalbandi Ensemble",          group:"fusion" },
    { id:"7RHTrpgFVtc", title:"In conversation with Sivaprasad NN", group:"conversations" },
    { id:"53iI7rCHFJk", title:"Sivaprasad NN, an interview",        group:"conversations" },
    { id:"0PnHYO3nUSc", title:"A conversation on music and life",   group:"conversations" }
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
    { src:"assets/videos/WhatsApp Video 2026-07-09 at 7.38.44 PM.mp4", title:"Live Carnatic performance", group:"carnatic" },
    { src:"assets/videos/new-collection/video-01.mp4", title:"Classical performance excerpt", group:"carnatic" },
    { src:"assets/videos/new-collection/video-02.mp4", title:"An expressive live performance", group:"carnatic" },
    { src:"assets/videos/new-collection/video-03.mp4", title:"Carnatic music on stage", group:"carnatic" },
    { src:"assets/videos/new-collection/video-04.mp4", title:"Varunasandhi Kautwam", group:"dance" },
    { src:"assets/videos/new-collection/video-05.mp4", title:"Vocal accompaniment in performance", group:"dance" },
    { src:"assets/videos/new-collection/video-06.mp4", title:"A moment from the concert stage", group:"carnatic" },
    { src:"assets/videos/new-collection/video-07.mp4", title:"A glimpse from the final rehearsal", group:"dance" },
    { src:"assets/videos/new-collection/video-08.mp4", title:"On compositions and expression", group:"carnatic" },
    { src:"assets/videos/new-collection/video-09.mp4", title:"Seated on stage with the ensemble", group:"carnatic" },
    { src:"assets/videos/new-collection/video-10.mp4", title:"A timeless piece of emotion", group:"dance" },
    { src:"assets/videos/new-collection/video-11.mp4", title:"Shaping a performance together", group:"dance" },
    { src:"assets/videos/new-collection/video-12.mp4", title:"Sharing a special composition", group:"dance" },
    { src:"assets/videos/new-collection/video-13.mp4", title:"Music for classical dance", group:"dance" },
    { src:"assets/videos/new-collection/video-14.mp4", title:"Live accompaniment excerpt", group:"dance" },
    { src:"assets/videos/new-collection/video-15.mp4", title:"Om Sharavanabhava", group:"carnatic" },
    { src:"assets/videos/new-collection/video-16.mp4", title:"The Devarnamas", group:"carnatic" },
    { src:"assets/videos/new-collection/video-17.mp4", title:"The art of absolute expression", group:"fusion" },
    { src:"assets/videos/new-collection/video-18.mp4", title:"An intimate music excerpt", group:"carnatic" }
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
    { src:"assets/photos/performances/photo-62.jpg", shape:"feature" },
    { src:"assets/photos/performances/new/performance-01.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-02.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-03.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-04.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-05.jpg", shape:"standard" },
    { src:"assets/photos/performances/new/performance-06.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-07.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-08.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-09.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-10.jpg", shape:"standard" },
    { src:"assets/photos/performances/new/performance-11.jpg", shape:"feature" },
    { src:"assets/photos/performances/new/performance-12.jpg", shape:"feature" },
    { src:"assets/photos/performances/new/performance-13.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-14.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-15.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-16.jpg", shape:"standard" },
    { src:"assets/photos/performances/new/performance-17.jpg", shape:"feature" },
    { src:"assets/photos/performances/new/performance-18.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-19.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-20.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-21.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-22.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-23.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-24.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-25.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-26.jpg", shape:"standard" },
    { src:"assets/photos/performances/new/performance-27.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-28.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-29.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-30.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-31.jpg", shape:"portrait" },
    { src:"assets/photos/performances/new/performance-32.jpg", shape:"portrait" }
  ],

  /* ---- gallery: how many optimized photos exist in assets/photos/gallery ---- */
  galleryCount: 42,   // files are perf-01.jpg ... perf-42.jpg
  pressCount: 18      // files are clip-01.jpg ... clip-18.jpg
};
