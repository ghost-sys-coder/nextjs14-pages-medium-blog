import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaImages } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import { storage } from "@/utils/firebase";
import { errorOptions, successOptions } from "@/constants";

const ImageUpdate = ({ setImageUrl, imageUrl, postId }) => {
  const [file, setFile] = useState("");
    
  const deleteImageFromFirebase = async () => {
    try {
      const { status } = await axios.patch(`/api/posts/${postId}`, {
        imageUrl
      });
      if (status === 200) {
        toast.success('Image deleted!', successOptions);
        setImageUrl('')
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete image!', errorOptions)
    }
  }

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
                    setImageUrl(downloadURL)
                });
              }
            );
          };
      
          file && onUpload();

    }, [file, setImageUrl])

  return (
    <>
      <label
        htmlFor="image"
        className="flex sm:inline-flex justify-center items-center mb-2 gap-2 cursor-pointer font-semibold rounded-md shadow-lg px-2 py-1 bg-dark-1 dark:bg-light-1"
      >
        <FaImages size={30} className="dark:text-dark-3 text-light-1" />
        <span className="dark:text-dark-3 text-light-2">Click to upload!</span>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
      </label>
      {imageUrl && (
        <button
        disabled={imageUrl === ''}
        type="button"
        className="bg-dark-1 dark:bg-light-2 font-semibold text-light-2 dark:text-dark-3 rounded-md cursor-pointer py-1 px-4 inline-flex items-center justify-between gap-2 ml-2"
        onClick={deleteImageFromFirebase}
      >
      <FaImages size={30} className="dark:text-dark-3 text-light-1" />
        <span className="dark:text-dark-3 text-light-2">Delete Image!</span>
      </button>
      )}
      {imageUrl && (
        <Image
        src={imageUrl}
        alt="image"
        width={300}
        height={250}
        className="rounded-md object-cover mt-5"
          />
      )}
          <Toaster />
    </>
  );
};

export default ImageUpdate;
