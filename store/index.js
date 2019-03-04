import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "@/plugins/firebase/config";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const state = () => ({
  loadedEvents: [],
  user: null,
  loading: false,
  error: null
});

export const mutations = {
  setLoadedEvents(state, payload) {
    state.loadedEvents = payload;
  },
  createEvent(state, payload) {
    state.loadedEvents.push(payload);
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  }
};

export const actions = {
  loadEvents({ commit }) {
    firebase
      .database()
      .ref("events")
      .once("value")
      .then(data => {
        const events = [];
        const obj = data.val();
        for (let key in obj) {
          events.push({
            id: key,
            title: obj[key].title,
            location: obj[key].location,
            description: obj[key].description,
            date: obj[key].date,
            time: obj[key].time,
            imageUrl: obj[key].imageUrl
          });
        }
        commit("setLoadedEvents", events);
      })
      .catch(error => {
        console.log(error);
      });
  },
  createEvent({ commit }, payload) {
    const event = {
      title: payload.title,
      location: payload.location,
      imageUrl: payload.imageUrl,
      description: payload.description,
      date: payload.date,
      time: payload.time
    };
    // Reach out to Firebase and store it
    firebase
      .database()
      .ref("events")
      .push(event)
      .then(data => {
        const key = data.key;
        commit("createEvent", {
          ...event,
          id: key
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  signUserUp({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("setLoading", false);
        const newUser = {
          id: user.uid,
          registeredEvents: []
        };
        commit("setUser", newUser);
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      });
  },
  signUserIn({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("setLoading", false);
        const newUser = {
          id: user.uid,
          registeredEvents: []
        };
        commit("setUser", newUser);
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      });
  },
  clearError({ commit }) {
    commit("clearError");
  }
};

export const getters = {
  loadedEvents(state) {
    return state.loadedEvents.sort((eventA, eventB) => {
      return eventA.date > eventB.date;
    });
  },
  loadedEvent(state) {
    return eventId => {
      return state.loadedEvents.find(event => {
        return event.id === eventId;
      });
    };
  },
  user(state) {
    return state.user;
  },
  loading(state) {
    return state.loading;
  },
  error(state) {
    return state.error;
  }
};

export const strict = false;
