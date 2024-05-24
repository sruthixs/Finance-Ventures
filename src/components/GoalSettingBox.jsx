import React from "react";
import { Link } from "react-router-dom";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "../helpers";

const GoalSettingBox = ({ positiveDifference }) => {
  return (
    <div className="goal-setting-box">
      <h3>Goal Setting</h3>
      <p>You have saved {formatCurrency(positiveDifference)} towards your goal.</p>
      <Link to="/goal-setting" className="btn">
        <span>Set New Goal</span>
        <BanknotesIcon width={20} />
      </Link>
    </div>
  );
};

export default GoalSettingBox;
