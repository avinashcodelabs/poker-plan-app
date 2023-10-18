"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";

export default function ParticipantsCard() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomid");
  const [userName, setUserName] = useLocalStorage("userName", "");

  const [isError, setError] = useState(false);
  const { push } = useRouter();

  const handleSubmit = (e) => {
    const newUserName = document.getElementById("user-name").value;
    e.preventDefault();
    if (newUserName.length < 2) {
      setError(true);
      return;
    }
    setUserName(newUserName);
    push(`/room/?roomid=${roomId ?? uuid4()}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          {roomId ? (
            <>
              <h1 className="text-lg text-primary font-bold">Join a room</h1>
              <h1 className="">{`You have been invited to join a room`}</h1>
            </>
          ) : (
            <>
              <h1 className="text-lg font-bold">Create a Room</h1>
            </>
          )}
        </div>
        <div className="form-control">
          <input
            id="user-name"
            type="text"
            autoFocus
            placeholder={userName || "Enter your name"}
            className={classNames(
              "input input-bordered border border-primary",
              {
                "border-red-600": isError,
              },
            )}
          />
        </div>
        <div className="form-control">
          <button
            className="btn btn-primary text-gray-950 normal-case"
            type="submit"
          >
            {roomId ? "Join Room" : "Create Room"}
          </button>
        </div>
      </form>
    </>
  );
}
