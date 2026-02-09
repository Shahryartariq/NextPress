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
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  /* --------------------------
     INPUT CHANGE
  -------------------------- */

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setErrorMsg("");
    setSuccessMsg("");

    if (type === "file") {
      const file = files[0];

      if (!file) return;

      if (!["image/png", "image/jpeg"].includes(file.type)) {
        setErrorMsg("Only PNG or JPEG images allowed");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));

      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* --------------------------
     SUBMIT FORM
  -------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

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

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setSuccessMsg("🎉 Post created successfully!");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setErrorMsg(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1>Create New Post ✍️</h1>

        {errorMsg && <p className={classes.error}>{errorMsg}</p>}
        {successMsg && <p className={classes.success}>{successMsg}</p>}

        <form onSubmit={handleSubmit} className={classes.form}>
          {/* TITLE */}
          <div className={classes.field}>
            <label>Title</label>
            <input
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* DATE */}
          <div className={classes.field}>
            <label>Date</label>
            <input type="date" value={formData.date} disabled />
          </div>

          {/* THUMBNAIL */}
          <div className={classes.field}>
            <label>Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              accept="image/png, image/jpeg"
              required
              onChange={handleChange}
            />
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className={classes.preview}
            />
          )}

          {/* EXCERPT */}
          <div className={classes.field}>
            <label>Excerpt</label>
            <input
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
            />
          </div>

          {/* FEATURED */}
          <div className={classes.checkbox}>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            <label>Featured Post</label>
          </div>

          {/* CONTENT */}
          <div className={classes.field}>
            <label>Content</label>
            <textarea
              rows="10"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write markdown content..."
            />
          </div>

          <button disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;