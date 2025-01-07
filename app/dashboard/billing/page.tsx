"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
 // Ensure Lucid React is installed

interface CardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  loading: boolean;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  price,
  features,
  buttonText,
  onButtonClick,
  loading,
  disabled,
}) => {
  return (
    <div className="w-64 p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <p className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-50">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {price}
        <span className="text-sm text-gray-300"> / month</span>
      </p>
      <ul className="w-full mt-6 mb-6 text-sm text-gray-600 dark:text-gray-100">
        {features.map((feature, index) => (
          <li key={index} className="mb-3 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              stroke="currentColor"
              fill="#10b981"
              viewBox="0 0 1792 1792"
            >
              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45z"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={onButtonClick}
        disabled={disabled}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader2Icon className="mr-2 animate-spin" /> Loading...
          </span>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};

const Page: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);
  const {user} = useUser();

  const CreateSubscription = () => {
    setLoader(true);
    axios
      .post("/api/create-subscription", {})
      .then(
        (resp) => {
          console.log(resp.data);
          onPayment(resp.data.id);
        },
        (error) => {
          console.error(error);
          setLoader(false);
        }
      );
  };

  const onPayment = (subId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "AI content generator",
      description: "Monthly plan",
      handler: async (resp: any) => {
        console.log(resp);
        SaveSubscription(resp?.razorpay_payment_id)
        setLoader(false);
      },
    };
    //@ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const SaveSubscription = async(paymentId :string)=>{
    const result = await db.insert(UserSubscription)
    .values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName,
      active:true,
      paymentId: paymentId,
      joinDate: moment().format('DD/MM/yyyy')
    });
    console.log(result);
    if(result){
      window.location.reload()
    }
  }

  return (
    <div className="h-[88vh] flex flex-col items-center gap-6 md:flex-row md:justify-center">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <Card
        title="Free Plan"
        price="$0"
        features={["10+ templates", "10,000 credits access", "One month of history"]}
        buttonText="Currently Active"
        onButtonClick={() => alert("Free plan is active")}
        loading={false}
        disabled={false}
      />
      <Card
        title="Silver Plan"
        price="$0.23"
        features={["10+ templates", "100,000 credits access", "One year of history"]}
        buttonText={userSubscription? "Plan is Active" : "Buy"}
        onButtonClick={() => CreateSubscription()}
        loading={loader}
        disabled={loader}
      />
    </div>
  );
};

export default Page;
