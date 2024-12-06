import React from "react";
import { FaTimes } from "react-icons/fa";

const NotiPopup = ({ notifications, onClose, onRemoveNotification }) => {
  return (
    <div className="absolute top-16 right-4 bg-gradient-to-b from-black from-10% via-zinc-700 to-neutral-700 text-white rounded-lg shadow-lg w-80 p-4 z-50">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Notifications</h2>

        {/* Danh sách thông báo */}
        {notifications && notifications.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                {/* Nội dung thông báo */}
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-400">{notification.message}</p>
                  </div>
                </div>

                {/* Nút xóa thông báo */}
                <button
                  onClick={() => onRemoveNotification(notification.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No new notifications.</p>
        )}

        {/* Nút đóng popup */}
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotiPopup;
