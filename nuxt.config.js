const pkg = require("./package");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: "VOWAID Volunteers",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "The Veterans of War Aid Foundation (VOWAID) is a 501 (c) 3 non-profit organization founded by U.S. Service Members, dedicated to assisting veterans, spouses and children of disabled veterans, and Fallen Heroes by providing opportunities for financial, emotional growth and self- empowerment."
      },
      {
        name: "keywords",
        content:
          "veteran, veterans, non-profit, non profit, charity, charitable, organization, military, vet, vets, war, donate, donation, donations, foundation, 501, 501c, 501 c, san antonio, marine, marines"
      },
      { name: "robots", content: "index" },
      { name: "apple-mobile-app-title", content: "VOWAID" },
      { name: "application-name", content: "VOWAID" },
      { name: "msapplication-TileColor", content: "#2a2968" },
      { name: "msapplication-config", content: "/icons/browserconfig.xml" },
      { name: "theme-color", content: "#ffffff" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      {
        property: "og:title",
        content: "Veterans of War Aid Foundation"
      },
      {
        property: "og:description",
        content: "Non-profit organization dedicated to assisting Veterans"
      },
      {
        property: "og:image",
        content:
          "https://res.cloudinary.com/missionwebdev/image/upload/f_auto/v1539475870/VOWAID/vowaid_twitter_card.jpg"
      },
      { property: "og:url", content: "https://www.vowaidfoundation.org" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
      },
      // Icon Meta Tags
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/icons/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/icons/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/icons/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/icons/site.webmanifest"
      },
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#2a2968"
      },
      {
        rel: "shortcut icon",
        href: "/icons/favicon.ico"
      }
    ]
  },

  /*
   ** loads new pages at top of page
   */
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#141434" },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl", "~/assets/style/styles.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/vuetify", { src: "@/plugins/firebase", ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
