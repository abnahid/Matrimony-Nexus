import ThemeContext from "@/context/ThemeContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const SuccessStoryCarousel = () => {
  const [stories, setStories] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchStories = async () => {
      const response = await axiosPublic.get("/success-story");
      setStories(response.data);
    };

    fetchStories();
  }, []);

  return (
    <section
      className={`py-16 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
    >
      <div className="container max-w-7xl mx-auto px-8 flex flex-wrap">
        <h2 className="text-4xl font-bold text-center mb-8">Success Stories</h2>
        {stories.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop
            autoplay={{ delay: 3000 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {stories.map((story) => (
              <SwiperSlide key={story._id}>
                <div
                  className={`p-6 rounded-lg text-center h-96 flex flex-col justify-between ${isDarkMode ? "bg-BgDarkSecondary" : "bg-white"
                    }`}
                >
                  <img
                    src={story.coupleImage || "https://via.placeholder.com/150"}
                    alt="Couple"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold">
                    {`Biodata IDs: ${story.selfBiodataId} & ${story.partnerBiodataId}`}
                  </h3>
                  <p
                    className={`mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {story.successStory}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p
            className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            No success stories yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default SuccessStoryCarousel;