import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const GotMarried = () => {
  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImage: null,
    imageUrl: "",
    successStory: "",
  });

  const axiosSecure = useAxiosSecure();
  const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coupleImage: file });

      try {
        // Upload file and get the URL
        const formDataImage = new FormData();
        formDataImage.append("image", file);

        const res = await axiosSecure.post(image_hosting_api, formDataImage, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          const uploadedUrl = res.data.data.display_url;
          setFormData((prevData) => ({ ...prevData, imageUrl: uploadedUrl }));
        } else {
          toast.error("Image upload failed. Please try again.");
        }
      } catch (error) {
        toast.error("Error uploading the image.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        selfBiodataId: formData.selfBiodataId,
        partnerBiodataId: formData.partnerBiodataId,
        coupleImage: formData.imageUrl || "",
        successStory: formData.successStory,
      };

      await axiosSecure.post("success-story", dataToSubmit);
      toast.success("Success Story Submitted Successfully");
      setFormData({
        selfBiodataId: "",
        partnerBiodataId: "",
        coupleImage: null,
        imageUrl: "",
        successStory: "",
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Share Your Success Story</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="selfBiodataId">Self Biodata ID</Label>
              <Input
                type="text"
                id="selfBiodataId"
                name="selfBiodataId"
                value={formData.selfBiodataId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="partnerBiodataId">Partner Biodata ID</Label>
              <Input
                type="text"
                id="partnerBiodataId"
                name="partnerBiodataId"
                value={formData.partnerBiodataId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label>Couple Image</Label>
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* File Upload */}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
                {/* URL Input */}
                <Input
                  type="text"
                  placeholder="Or enter an image URL"
                  name="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="successStory">Success Story</Label>
              <Textarea
                id="successStory"
                name="successStory"
                value={formData.successStory}
                onChange={handleChange}
                required
              />
            </div>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-custom-gradient hover:bg-BgPrimary"
              >
                Submit
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GotMarried;
