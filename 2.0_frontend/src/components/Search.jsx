import React, { useState, useEffect } from "react";
import { client } from "../client";
import MansonryLayout from "./MansonryLayout";
import { feedQuery } from "../utils/data";
import { searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (searchTerm) {
      setloading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setloading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setloading(false);
      });
    }
  }, [searchTerm]);
  return (
    <div>
      {loading && <Spinner message="Searching for pins..." />}
      {pins?.length !== 0 && <MansonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found</div>
      )}
    </div>
  );
};

export default Search;
