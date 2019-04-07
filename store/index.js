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
  allUsers: [],
  loading: false,
  error: null
});

export const mutations = {
  registerUserForEvent(state, payload) {
    const id = payload.id;
    if (state.user.registeredEvents.findIndex(event => event.id === id) > 0) {
      return;
    }
    state.user.registeredEvents.push(id);
    state.user.fbKeys[id] = payload.fbKey;
  },
  unregisterUserFromEvent(state, payload) {
    const registeredEvents = state.user.registeredEvents;
    registeredEvents.splice(
      registeredEvents.findIndex(event => event.id === payload),
      1
    );
    Reflect.deleteProperty(state.user.fbKeys, payload);
  },
  setLoadedEvents(state, payload) {
    state.loadedEvents = payload;
  },
  createEvent(state, payload) {
    state.loadedEvents.push(payload);
  },
  updateEvent(state, payload) {
    const event = state.loadedEvents.find(event => {
      return event.id === payload.id;
    });
    if (payload.title) {
      event.title = payload.title;
    }
    if (payload.location) {
      event.location = payload.location;
    }
    if (payload.date) {
      event.date = payload.date;
    }
    if (payload.time) {
      event.time = payload.time;
    }
    if (payload.description) {
      event.description = payload.description;
    }
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setAllUsers(state, payload) {
    state.allUsers = payload;
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
  registerUserForEvent({ commit, getters }, payload) {
    commit("setLoading", true);
    const user = getters.user;
    firebase
      .database()
      .ref("/users/" + user.id)
      .child("/registrations/")
      .push(payload)
      .then(data => {
        commit("setLoading", false);
        commit("registerUserForEvent", { id: payload, fbKey: data.key });
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  unregisterUserFromEvent({ commit, getters }, payload) {
    commit("setLoading", true);
    const user = getters.user;
    if (!user.fbKeys) {
      return;
    }
    const fbKey = user.fbKeys[payload];
    firebase
      .database()
      .ref("/users/" + user.id + "/registrations/")
      .child(fbKey)
      .remove()
      .then(() => {
        commit("setLoading", false);
        commit("unregisterUserFromEvent", payload);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  loadEvents({ commit }) {
    commit("setLoading", true);
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
            imageUrl: obj[key].imageUrl,
            creatorId: obj[key].creatorId
          });
        }
        commit("setLoadedEvents", events);
        commit("setLoading", false);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  createEvent({ commit, getters }, payload) {
    commit("setLoading", true);
    const event = {
      title: payload.title,
      location: payload.location,
      description: payload.description,
      date: payload.date,
      time: payload.time,
      creatorId: getters.user.id
    };
    let myUrl;
    let key;
    firebase
      .database()
      .ref("events")
      .push(event)
      .then(data => {
        key = data.key;
        return key;
      })
      .then(key => {
        const filename = payload.image.name;
        const ext = filename.slice(filename.lastIndexOf("."));
        return firebase
          .storage()
          .ref("events/" + key + ext)
          .put(payload.image);
      })
      .then(fileData => {
        fileData.ref.getDownloadURL().then(downloadURL => {
          myUrl = downloadURL;
          return firebase
            .database()
            .ref("events")
            .child(key)
            .update({ imageUrl: myUrl });
        });
        commit("setLoading", false);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  updateEventData({ commit }, payload) {
    commit("setLoading", true);
    const updateObj = {};
    if (payload.title) {
      updateObj.title = payload.title;
    }
    if (payload.location) {
      updateObj.location = payload.location;
    }
    if (payload.date) {
      updateObj.date = payload.date;
    }
    if (payload.time) {
      updateObj.time = payload.time;
    }
    if (payload.description) {
      updateObj.description = payload.description;
    }
    if (payload.imageUrl) {
      updateObj.imageUrl = payload.imageUrl;
    }
    firebase
      .database()
      .ref("events")
      .child(payload.id)
      .update(updateObj)
      .then(() => {
        commit("setLoading", false);
        commit("updateEvent", payload);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  onDeleteEvent({ commit }, payload) {
    commit("setLoading", true);
    firebase
      .database()
      .ref("/events/" + payload)
      .remove()
      .then(() => {
        commit("setLoading", false);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  updateUserData({ commit }, payload) {
    commit("setLoading", true);
    const updateObj = {};
    updateObj.id = payload.id;
    updateObj.email = payload.email;
    updateObj.first = payload.first;
    updateObj.last = payload.last;
    updateObj.phone = payload.phone;
    updateObj.city = payload.city;
    firebase
      .database()
      .ref("users")
      .child(payload.id)
      .update(updateObj)
      .then(() => {
        commit("setUser", updateObj);
        commit("setLoading", false);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
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
          // user.uid is undefined until later
          id: user.uid,
          registeredEvents: [],
          fbKeys: {}
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
          registeredEvents: [],
          fbKeys: {},
          email: "",
          phone: "",
          first: "",
          last: "",
          city: ""
        };
        commit("setUser", newUser);
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      });
  },
  autoSignIn({ commit }, payload) {
    commit("setUser", {
      id: payload.uid,
      registeredEvents: [],
      fbKeys: {},
      email: "",
      phone: "",
      first: "",
      last: "",
      city: ""
    });
  },
  fetchUserData({ commit, getters }) {
    commit("setLoading", true);
    firebase
      .database()
      .ref("/users/" + getters.user.id + "/registrations/")
      .once("value")
      .then(data => {
        const dataPairs = data.val();
        let registeredEvents = [];
        let swappedPairs = {};
        for (let key in dataPairs) {
          registeredEvents.push(dataPairs[key]);
          swappedPairs[dataPairs[key]] = key;
        }
        firebase
          .database()
          .ref("/users/" + getters.user.id)
          .once("value")
          .then(data => {
            const obj = data.val();
            const updatedUser = {
              id: getters.user.id,
              registeredEvents: registeredEvents,
              fbKeys: swappedPairs,
              email: obj.email,
              phone: obj.phone,
              first: obj.first,
              last: obj.last,
              city: obj.city
            };
            commit("setLoading", false);
            commit("setUser", updatedUser);
          })
          .catch(error => {
            console.log(error);
            commit("setLoading", false);
          });
      });
  },
  logout({ commit }) {
    firebase.auth().signOut();
    commit("setUser", null);
    this.$router.push("/");
  },
  loadAllUsers({ commit }) {
    commit("setLoading", true);
    firebase
      .database()
      .ref("users")
      .once("value")
      .then(data => {
        let obj = data.val();
        let allUsers = Object.values(obj);
        commit("setAllUsers", allUsers);
        commit("setLoading", false);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  clearError({ commit }) {
    commit("clearError");
  }
};

export const getters = {
  loadedEvents(state) {
    return state.loadedEvents.sort((eventA, eventB) =>
      eventA.date < eventB.date ? -1 : 1
    );
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
  allUsers(state) {
    return state.allUsers;
  },
  loading(state) {
    return state.loading;
  },
  error(state) {
    return state.error;
  }
};

export const strict = false;
