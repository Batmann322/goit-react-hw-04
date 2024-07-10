import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export default async function MyTopic(query, currentPage) {
  const response = await axios.get(`/search/photos`, {
    params: {
      client_id: "qm2FJcEw2XiQlqKPIJXTe4Mos7AfCrVC1RB7jgLHqF4",
      query: query,
      page: currentPage,
      per_page: 9,
    },
  });
  return response.data.results;
}
