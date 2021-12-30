import React, { useEffect, useState } from "react";

import { Video } from "../video";

const VideoGrid: React.FunctionComponent<{
  videos: Video[];
}> = ({ videos }) => {
  const [hasEthAccount, setHasEthAccount] = useState(false);
  const [ethAmount, setEthAmount] = useState("0.001");

  const web3 = new window.Web3(window.Web3.givenProvider);
  const receivingAccount = "0x806f7b4d2bf4FD97dBC446aefe0be2bA26e12799";

  useEffect(() => {
    if (window.ethereum) {
      setHasEthAccount(true);
    }
  }, []);

  const handleSend = async function (e) {
    e.preventDefault();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const wei = web3.utils.toWei(ethAmount, "ether");
    if (accounts.length > 0) {
      window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: receivingAccount,
            value: web3.utils.toHex(wei),
          },
        ],
      });
    }
    console.log(ethAmount);
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
    >
      {videos.map((video) => (
        <li key={video.id} className="relative">
          <a href={`https://youtube.com/watch?v=${video.id}`}>
            <div className="group block w-full aspect-w-16 aspect-h-9 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="object-cover pointer-events-none group-hover:opacity-75"
              />
            </div>
            <p className="text-xl mt-2 block font-semibold text-gray-900 truncate pointer-events-none">
              {video.title}
            </p>
            {hasEthAccount && <button onClick={handleSend}>Tip!</button>}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default VideoGrid;
