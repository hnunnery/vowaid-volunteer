export const state = () => ({
  loadedEvents: [
    {
      imageUrl:
        "https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,w_600/v1538694547/VOWAID/coachella.jpg",
      id: "0001",
      title: "2019 Coachella Volunteer Event",
      location: "Los Angelos, CA",
      date: "2019-07-01",
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
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptate quibusdam hic ipsa beatae sit fugiat aliquam ab repellat, iste est repellendus dolores eius culpa!"
    }
  ],
  user: {
    id: "101",
    registeredEvents: ["0001"]
  }
});

export const mutations = {
  createEvent(state, payload) {
    state.loadedEvents.push(payload);
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
      id: "0003"
    };
    // Reach out to Firebase and store it
    commit("createEvent", event);
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
  }
};
