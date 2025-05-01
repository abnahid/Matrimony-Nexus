import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useBiodatas = (currentPage, itemsPerPage, filters) => {
  const [biodatas, setBiodatas] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchBiodatas = async () => {
      setLoading(true);
      try {
        const { gender, ageRange, heightRange, permanentDivision, biodataId } = filters;

        const params = {
          page: currentPage,
          limit: itemsPerPage,
        };

        if (biodataId) {
          params.biodataId = biodataId;
        } else {
          const [minAge, maxAge] = ageRange;
          const [minHeight, maxHeight] = heightRange;

          params.gender = gender;
          params.minAge = minAge;
          params.maxAge = maxAge;
          params.minHeight = minHeight;
          params.maxHeight = maxHeight;
          params.permanentDivision = permanentDivision;
        }

        const response = await axiosPublic.get("/biodatas", { params });

        setBiodatas(response.data.data || []);
        setTotal(response.data.total || 0);
      } catch (error) {
        console.error("Failed to fetch biodatas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBiodatas();
  }, [currentPage, itemsPerPage, filters, axiosPublic]);

  return { biodatas, total, loading };
};

export default useBiodatas;