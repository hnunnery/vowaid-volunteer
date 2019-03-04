import * as firebase from "firebase";

export const state = () => ({
  loadedEvents: [
    {
      imageUrl:
        "https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,w_600/v1538694547/VOWAID/coachella.jpg",
      id: "0001",
      title: "2019 Coachella Volunteer Event",
      location: "Los Angelos, CA",
      date: "2019-07-01",
      time: "1500 PST",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptate quibusdam hic ipsa beatae sit fugiat aliquam ab repellat, iste est repellendus dolores eius culpa!"
    },
    {
      imageUrl:
        "https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,q_auto:best,w_600/v1535518449/VOWAID/oscarsedit.jpg",
      id: "0002",
      title: "2019 Oscars Volunteer Event",
      location: "Los Angelos, CA",
      date: "2019-02-01",
      time: "1500 PST",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptate quibusdam hic ipsa beatae sit fugiat aliquam ab repellat, iste est repellendus dolores eius culpa!"
    }
  ],
  user: null,
  loading: false,
  error: null
});

export const mutations = {
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
  createEvent({ commit }, payload) {
    const event = {
      title: payload.title,
      location: payload.location,
      imageUrl: payload.imageUrl,
      description: payload.description,
      date: payload.date,
      time: payload.time,
      id: "0003"
    };
    // Reach out to Firebase and store it
    commit("createEvent", event);
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
