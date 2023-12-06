import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { FaImage } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/firebase";

import { errorOptions } from "@/constants";

const ImageUpload = ({ setDetails }) => {
  const [preview, setPreview] = useState(false);
  const [media, setMedia] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    const onUpload = () => {
      const metadata = {
        contentType: "image/*",
      };

      const fileName = new Date().getTime + file?.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          toast.loading("Upload is" + progress + "% done", {
            position: "top-center",
            duration: 4000,
          });
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              toast.success("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              toast.success("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;

            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.success("Image upload successful", {
              position: "top-right",
              duration: 5000,
              style: {
                backgroundColor: "green",
                color: "#fff",
                borderRadius: "10px",
              },
            });
              setMedia(downloadURL);
              setPreview(true);
              setDetails((values) => ({
                  ...values,
                  imageUrl: downloadURL
              }))
          });
        }
      );
    };

    file && onUpload();
  }, [file, setDetails]);

  return (
    <>
      <label
        htmlFor="image"
        className="flex sm:inline-flex justify-center items-center mb-2 gap-2 cursor-pointer font-semibold rounded-md shadow-lg px-2 py-1 bg-dark-1 dark:bg-light-1"
      >
        <FaImage size={30} className="dark:text-dark-3 text-light-1" />
        <span className="dark:text-dark-3 text-light-2">Click to upload!</span>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setFile(e.target.files[0])}
        style={{ display: "none" }}
        />
      </label>
      {preview && (
        <Image
          src={media}
          alt="post"
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-[300px]"
        />
      )}
      <Toaster />
    </>
  );
};

export default ImageUpload;
