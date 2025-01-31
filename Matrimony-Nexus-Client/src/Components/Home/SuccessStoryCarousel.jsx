import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const SuccessStoryCarousel = () => {
  const [stories, setStories] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchStories = async () => {
      const response = await axiosPublic.get("/success-story");
      setStories(response.data);
    };

    fetchStories();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-8 flex flex-wrap">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Success Stories
        </h2>
        {stories.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop
            autoplay={{ delay: 3000 }}
          >
            {stories.map((story) => (
              <SwiperSlide key={story._id}>
                <div className="p-6 bg-white rounded-lg text-center h-96 flex flex-col justify-between">
                  <img
                    src={story.coupleImage || "https://via.placeholder.com/150"}
                    alt="Couple"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {`Biodata IDs: ${story.selfBiodataId} & ${story.partnerBiodataId}`}
                  </h3>
                  <p className="text-gray-600 mt-4">{story.successStory}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-600">No success stories yet.</p>
        )}
      </div>
    </section>
  );
};

export default SuccessStoryCarousel;
