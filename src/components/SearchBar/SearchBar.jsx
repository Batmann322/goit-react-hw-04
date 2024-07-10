import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    if (topic.trim() === "") {
      toast.error("Введіть текст для пошуку зображень");
      return;
    }
    onSearch(topic);
    form.reset();
  };
  return (
    <header className={css.conatiner}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="topic"
          placeholder="Search images and photos"
          className={css.text}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
}
