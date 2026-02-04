import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./create-post.module.css";

const CreatePost = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    image: "",
    excerpt: "",
    isFeatured: false,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Post created successfully!");
      router.push("/");
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div className={classes.container}>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image filename"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          name="excerpt"
          placeholder="Excerpt"
          value={formData.excerpt}
          onChange={handleChange}
        />

        <label className={classes.checkbox}>
          Featured Post
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
        </label>

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
