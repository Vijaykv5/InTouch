// UserProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../utils/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./styles.css";

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const headingAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(-50px)" },
  });

  const gridAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const handleSendMessage = (userName: string) => {
    navigate(`/creator/${userName}`, { state: { userName } });
  };

  const handleCardClick = (user: any) => {
    navigate(`/creator/${user.name}`, { state: { user } });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen container">
      <animated.div style={headingAnimation} className="text-center mb-12">
        <h2 className="heading">Content Creators</h2>
        <p className="subheading">
          Discover the Content Creators shaping the future.
        </p>
      </animated.div>

      <animated.div style={gridAnimation} className="grid-container">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="shimmer-wrapper w-full h-56">
                <div className="shimmer"></div>
              </div>
            ))
          : users.map((user, index) => (
              <div key={index} className="card">
                <UserCard
                  userImage={user.image}
                  userName={user.name}
                  onMessageClick={() => handleSendMessage(user.name)}
                  onClick={() => handleCardClick(user)} // Pass user object
                  loading={loading}
                />
              </div>
            ))}
      </animated.div>
    </div>
  );
};

export default UserProfilePage;
