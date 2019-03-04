export default function({ store, redirect }) {
  if (!store.getters.user) {
    return redirect("/signin");
  }
}
