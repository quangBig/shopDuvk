import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa6';

const CommentSection = () => {
    const [content, setContent] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const comments = [
        { id: 1, user: 'user1@example.com', content: 'Bình luận 1', createdAt: new Date() },
        { id: 2, user: 'user2@example.com', content: 'Bình luận 2', createdAt: new Date() },
    ];

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    return (
        <div className="container items-center ml-[85px] max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-lg bg-white text-gray-900">
            <form className="flex flex-col mb-6 p-4 border rounded-lg shadow bg-gray-100">
                <textarea
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Viết bình luận của bạn về sản phẩm ..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="mt-3 px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600"
                >
                    Bình luận
                </button>
            </form>

            <ul className="space-y-6">
                {comments.map((comment) => (
                    <li key={comment.id} className="p-4 border rounded-lg shadow bg-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <FaRegUserCircle className="w-10 h-10 text-gray-500" />
                                <div>
                                    <p className="text-lg font-semibold">{comment.user}</p>
                                    <span className="text-sm text-gray-500">{comment.createdAt.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="relative">
                                <button onClick={() => toggleDropdown(comment.id)} className="focus:outline-none">
                                    <MdMoreVert className="text-gray-700 cursor-pointer" />
                                </button>
                                {dropdownOpen === comment.id && (
                                    <div className="absolute right-3 -mt-2 w-32 rounded-lg shadow-lg bg-white border">
                                        <button className="block px-4 py-2  hover:bg-gray-200 w-full text-left">
                                            <MdEdit className="inline-block mr-2" /> Edit
                                        </button>
                                        <button className="block px-4 py-2  hover:bg-gray-200 w-full text-left">
                                            <MdDelete className="inline-block mr-2" /> Delete
                                        </button>
                                        <button className="block px-4 py-2  hover:bg-gray-200 w-full text-left">
                                            <FaFlag className="inline-block mr-2" /> Report
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="mt-3 text-black">{comment.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;
