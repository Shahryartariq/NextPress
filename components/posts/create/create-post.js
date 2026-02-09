import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./create-post.module.css";
import { getTodayDate } from "../../../lib/helper/getTodayDate";

const CreatePost = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    date: getTodayDate(),
    thumbnail: null,
    excerpt: "",
    isFeatured: false,
    content: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    /* FILE UPLOAD */
    if (type === "file") {
      const file = files[0];

      if (!file) return;

      // Validate type
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Only PNG or JPEG allowed");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));

      // Preview
      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    submitData.append("title", formData.title);
    submitData.append("excerpt", formData.excerpt);
    submitData.append("content", formData.content);
    submitData.append("isFeatured", formData.isFeatured);
    submitData.append("thumbnail", formData.thumbnail);

    try {
      const response = await fetch("/api/create-post", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) throw new Error();

      alert("Post created successfully!");
      router.push("/");
    } catch {
      alert("Failed to create post");
    }
  };

  return (
    <div className={classes.container}>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        {/* TITLE */}
        <input
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
        />

        {/* DATE (READ ONLY DISPLAY) */}
        <input type="date" value={formData.date} disabled />

        {/* THUMBNAIL */}
        <input
          type="file"
          name="thumbnail"
          accept="image/png, image/jpeg"
          required
          onChange={handleChange}
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className={classes.preview}
          />
        )}

        {/* EXCERPT */}
        <input
          name="excerpt"
          placeholder="Excerpt"
          value={formData.excerpt}
          onChange={handleChange}
        />

        {/* FEATURED */}
        <label className={classes.checkbox}>
          Featured Post
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
        </label>

        {/* CONTENT */}
        <textarea
          name="content"
          placeholder="Write markdown content..."
          rows="10"
          value={formData.content}
          onChange={handleChange}
        />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;