import React from "react";
import { useParams } from "react-router-dom";
import ProfilePage from "./Previewthings/ProfilePage";

const Test = () => {
  const { slug } = useParams();

  return (
    <div>
      <ProfilePage
        slug={slug}
        apiBase="http://localhost:5000/api"
      />
    </div>
  );
};

export default Test;
