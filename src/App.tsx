import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signGen } from "./lib/signGen";

import {v4 as uuid} from "uuid"
const EsewaForm = () => {
  const { register,setValue} = useForm({
    defaultValues:{
      amount:100,
      tax_amount:0,
      total_amount:100,
      transaction_uuid:'',
      product_code:'EPAYTEST',
      signed_field_names:"total_amount,transaction_uuid,product_code",
      signature:'',
  product_service_charge:0,
  product_delivery_charge:0,
  success_url:"http://localhost:5173/success",
  failure_url:"http://localhost:5173/failure"
    }
  });


useEffect(() => {
  const baseAmount=100
  const tax_amount=0
  const product_delivery_charge=0
  const product_service_charge=0
  const total_amount=baseAmount+tax_amount+product_delivery_charge+product_service_charge
  const transaction_uuid=uuid()
  const signature=signGen(total_amount,transaction_uuid,"EPAYTEST")


  setValue("amount",baseAmount)
  setValue("product_delivery_charge",product_delivery_charge)
  setValue("product_service_charge",product_service_charge)
  setValue("total_amount",total_amount)
  setValue("signature",signature)
  setValue("tax_amount",tax_amount)
  setValue("transaction_uuid",transaction_uuid )
  setValue("product_code","EPAYTEST")
  setValue("signed_field_names","total_amount,transaction_uuid,product_code")
  setValue("success_url","http://localhost:5173/success")
  setValue("failure_url","http://localhost:5173/failure")
  
}, [setValue])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          eSewa Payment
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Amount</label>
          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="Enter amount"
            {...register("amount")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
         
        </div>

        <input type="hidden" {...register("tax_amount")} />
        <input type="hidden" {...register("total_amount")} />
        <input type="hidden" {...register("transaction_uuid")} />
        <input type="hidden" {...register("product_code")} />
        <input type="hidden" {...register("signed_field_names")} />
        <input type="hidden" {...register("signature")} />
        <input type="hidden" {...register("product_service_charge")} />
        <input type="hidden" {...register("product_delivery_charge")} />
        <input type="hidden" {...register("success_url")} />
        <input type="hidden" {...register("failure_url")} />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Pay Via esewa
        </button>
        
    
      </form>
    </div>
  );
};

export default EsewaForm;