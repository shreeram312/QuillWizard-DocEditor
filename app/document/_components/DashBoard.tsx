import { auth } from "@clerk/nextjs/server";
import React from "react";
import IntroPage from "./IntroPage";
import NewDocument from "./NewDocument";
import RecentDocument from "./RecentDocument";

const DashBoard = () => {
  const { userId } = auth();
  if (!userId) {
    return <IntroPage />;
  }
  console.log(auth);
  return (
    <div>
      hi
      <NewDocument />
      {/* Recent document */}
      <RecentDocument />
    </div>
  );
};

export default DashBoard;
