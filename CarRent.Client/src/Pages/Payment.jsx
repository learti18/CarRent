import React from "react";
import BillingInfo from "../Components/Payment/BillingInfo";
import RentalInfo from "../Components/Payment/RentalInfo";
import PaymentMethod from "../Components/Payment/PaymentMethod";
import Confirmation from "../Components/Payment/Confirmation";
import RentalSummary from "../Components/Payment/RentalSummary";
import { LoaderBarsSpinner } from "../Components/LoaderBarsSpinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PaymentSchema } from "../Schemas/PaymentSchema";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useVehicleById } from "../Queries/vehicles";
import { useSearchForm } from "../Contexts/SearchFormContext";
import { useAddRental } from "../Queries/Rentals";

export default function Payment() {
  const { getRentalLocationData } = useSearchForm();
  const locationData = getRentalLocationData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      payment: {
        cardNumber: "",
        expiration: "",
        cardHolder: "",
        cvc: "",
      },
      pickup: {
        city: locationData.pickup.city || "",
        date: locationData.pickup.date || "",
        time: locationData.pickup.time || "",
      },
      dropoff: {
        city: locationData.dropoff.city || "",
        date: locationData.dropoff.date || "",
        time: locationData.dropoff.time || "",
      },
      // newsletter:false,
      // termsConditions:false
    },
  });

  const { id } = useParams();
  const { data: vehicle, isLoading, error } = useVehicleById(id);
  const addRentalMutation = useAddRental();

  const submitForm = async (data) => {
    await addRentalMutation.mutateAsync({
      ...data,
      vehicleId: vehicle.id,
    });
  };

  const onError = (errors) => {
    toast.error("Please fill in all required fields correctly");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <LoaderBarsSpinner />
      </div>
    );

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl py-10 px-5 mx-auto">
        <form
          onSubmit={handleSubmit(submitForm, onError)}
          className="flex flex-col lg:flex-row-reverse gap-7"
        >
          <RentalSummary vehicle={vehicle} rentalData={locationData} />
          <div className="flex flex-col gap-5">
            <BillingInfo register={register} errors={errors} />
            <RentalInfo
              register={register}
              control={control}
              errors={errors}
              locationData={locationData}
            />
            <PaymentMethod
              register={register}
              control={control}
              errors={errors}
            />
            <Confirmation car={vehicle} register={register} errors={errors} />
          </div>
        </form>
      </div>
    </div>
  );
}
