import React, { useState } from "react";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";
import { toast } from 'react-toastify';

const BudgetItem = ({ budget, showDelete = false, userId }) => {
  const { id, name, amount, color, ownerId } = budget;
  
  // Calculate spent and difference
  const spent = userId === ownerId ? calculateSpentByBudget(id) : 0;
  const difference = amount - spent;

  // State to track if notification has been shown
  const [notificationShown, setNotificationShown] = useState(false);

  // Function to display notification
  const notifyPositiveDifference = (difference) => {
    if (!notificationShown && difference > 0) {
      toast.success(`Yayyy! You've saved ${formatCurrency(difference)}!`);
      setNotificationShown(true);
    }
  };

  // Trigger notification
  notifyPositiveDifference(difference);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
        <small>Difference: {formatCurrency(difference)}</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
      {/* Goal setting box based on difference */}
      {difference > 0 && userId === ownerId && (
        <div className="goal-setting-box">
          <h3>Goal Setting</h3>
          <p>You have saved {formatCurrency(difference)} towards your goal.</p>
          {/* Add link or button to set new goal */}
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
