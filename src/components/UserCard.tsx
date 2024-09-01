import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

interface UserCardProps {
  userImage: string;
  userName: string;
  onMessageClick: () => void;
  onClick: () => void;
  loading: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  userImage,
  userName,
  onMessageClick,
  onClick,
  loading,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/creator/${userName}`);
  };

  return (
    <div
      className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 cursor-pointer relative"
      onClick={handleCardClick}
    >
      {loading ? (
        <div className="shimmer-wrapper w-24 h-24">
          <div className="shimmer"></div>
        </div>
      ) : (
        <img
          src={userImage}
          alt={userName}
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
      )}
      {loading ? (
        <div className="shimmer-wrapper w-32 h-6 mt-2">
          <div className="shimmer"></div>
        </div>
      ) : (
        <h3 className="text-lg font-semibold mb-2">{userName}</h3>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMessageClick();
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Message
      </button>
    </div>
  );
};

export default UserCard;
