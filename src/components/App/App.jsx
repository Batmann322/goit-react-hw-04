import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import MyTopic from "../../articles-api";
import css from "../App/App.module.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleSearch = async (newTopic) => {
    setArticles([]);
    setPage(1);
    setTopic(newTopic);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const handleImageClick = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getArticles() {
      try {
        setError(false);
        setLoading(true);
        const data = await MyTopic(topic, page);
        setArticles((prevArticles) => {
          return [...prevArticles, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, [topic, page]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Images Gallery</h1>
      <SearchBar onSearch={handleSearch} />
      {articles.length > 0 && (
        <ImageGallery items={articles} onImageClick={handleImageClick} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <div>{loading && <Loader />}</div>
      <div>
        {articles.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      </div>
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          data={modalData}
        />
      )}
    </div>
  );
}
