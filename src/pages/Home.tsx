import { useEffect, useState } from "react";
import api from "../api/axios";

function Home() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    api.get("/hello/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <h1>{message} </h1>;
}

export default Home;