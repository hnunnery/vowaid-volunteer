import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: "#2a2968",
    accent: colors.orange.lighten2,
    secondary: colors.grey.darken2,
    darkgrey: "#2C2C2C",
    info: colors.teal.lighten1,
    warning: "#BE2030",
    error: colors.deepOrange.accent4,
    success: "#22aa00"
  }
});
