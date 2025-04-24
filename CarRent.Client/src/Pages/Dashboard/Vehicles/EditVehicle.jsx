import React, { useEffect } from "react";
import Button from "../../../Components/Buttons/Button";
import ImageUpload from "../../../Components/Inputs/ImageUpload";
import DefaultInput from "../../../Components/Inputs/DefaultInput";
import DropDown from "../../../Components/Inputs/Dropdown";
import CheckBox from "../../../Components/Inputs/CheckBox";
import { VEHICLE_FEATURES } from "../../../VehicleFeatures";
import {
  BODY_TYPES,
  FUEL_TYPES,
  LOCATIONS,
  SEAT_OPTIONS,
  TRANSMISSIONS,
} from "../../../common/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VehicleSchema } from "../../../Schemas/VehicleSchema";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LoaderBarsSpinner } from "../../../Components/LoaderBarsSpinner";
import { useUpdateVehicle, useVehicleById } from "../../../Queries/vehicles";
import DatePickerInput from "../../../Components/Inputs/DatePickerInput";

const API_BASE_URL = "http://localhost:5160";

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: updateVehicle } = useUpdateVehicle();
  const { data: vehicle, isLoading: isLoadingVehicle } = useVehicleById(id);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VehicleSchema),
  });

  useEffect(() => {
    if (vehicle) {
      reset({
        brand: vehicle.brand || "",
        model: vehicle.model || "",
        makeYear: vehicle.year || "",
        licensePlates: vehicle.licensePlate || "",
        pricePerDay: vehicle.price || "",
        bodyType: vehicle.bodyType || "",
        transmission: vehicle.transmission || "",
        seatingCapacity: vehicle.seats || "",
        fuelType: vehicle.fuelType || "",
        location: vehicle.location || "",
        features: vehicle.features || [],
        images: vehicle.images || [],
      });
    }
  }, [vehicle, reset]);

  const submitForm = (data) => {
    try {
      console.log("Form data before processing:", data);
      const formData = new FormData();

      // Handle image files
      if (data.images && Array.isArray(data.images)) {
        data.images.forEach((file, index) => {
          if (file instanceof File) {
            console.log(`Appending image ${index}:`, file.name);
            formData.append("Images", file);
          } else if (
            typeof file === "string" &&
            file.startsWith(API_BASE_URL)
          ) {
            // Keep existing image URL, remove the API_BASE_URL prefix
            formData.append("Images", file.replace(API_BASE_URL, ""));
          }
        });
      }

      formData.append("Brand", data.brand || "");
      formData.append("Model", data.model || "");
      formData.append("LicensePlate", data.licensePlates || "");
      formData.append("Year", data.makeYear ? data.makeYear.toString() : "");
      formData.append("BodyType", data.bodyType || "");
      formData.append("FuelType", data.fuelType || "");
      formData.append("Transmission", data.transmission || "");
      formData.append(
        "Seats",
        data.seatingCapacity ? data.seatingCapacity.toString() : ""
      );
      formData.append(
        "Price",
        data.pricePerDay ? data.pricePerDay.toString() : ""
      );
      formData.append("Location", data.location || "");

      // Append features as individual entries
      if (data.features && Array.isArray(data.features)) {
        data.features.forEach((feature) => {
          if (feature) {
            formData.append("Features", feature);
          }
        });
      }

      updateVehicle({ id, updateData: formData });
      navigate("/dashboard/vehicles");
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data || error.message;
      toast.error(
        typeof errorMessage === "string"
          ? errorMessage
          : "Failed to update vehicle"
      );
    }
  };

  const onError = (errors) => {
    toast.error("Please fill in all required fields");
    console.log("Form errors:", errors);
  };

  if (isLoadingVehicle) {
    return <LoaderBarsSpinner />;
  }

  if (!vehicle) {
    return <div className="text-center text-red-500">Vehicle not found</div>;
  }

  return (
    <div className="">
      <Link
        to=".."
        relative="path"
        className="flex flex-row justify-start items-center text-gray-500 text-lg mb-5 gap-2 hover:text-gray-700"
      >
        <ArrowLeft size={20} />
        Back to vehicles
      </Link>

      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(submitForm, onError)}
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Edit Vehicle</h1>
            <p className="text-gray-500">Update vehicle information</p>
          </div>
          <Button type="submit" disabled={updateVehicle.isPending}>
            {updateVehicle.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* image upload */}
        <div className="">
          <ImageUpload
            className="w-full"
            multiple
            control={control}
            register={register}
            error={errors.images}
            name="images"
          />
        </div>

        <div className="flex flex-col divide-y-2 bg-white rounded-lg">
          {/* basic details */}
          <div className="px-8 py-10">
            <h2 className="text-2xl uppercase font-medium mb-7">
              Basic details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <DefaultInput
                label="Brand"
                placeholder="Brand Name"
                name="brand"
                error={errors.brand}
                register={register}
              />
              <DefaultInput
                label="Model"
                placeholder="Model"
                name="model"
                error={errors.model}
                register={register}
              />
              <DefaultInput
                label="License Plates"
                placeholder="License Plates"
                name="licensePlates"
                error={errors.licensePlates}
                register={register}
              />
              <DropDown
                label="Make Year"
                name="makeYear"
                className="bg-gray-100 px-4 py-3 mt-1.5"
                options={[
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                ]}
                placeholder="Select Make Year"
                error={errors.makeYear}
                control={control}
                required
              />
            </div>
          </div>

          {/* specifications */}
          <div className="px-8 py-10">
            <h2 className="text-2xl uppercase font-medium mb-7">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <DropDown
                label="Body Type"
                name="bodyType"
                className="bg-gray-100 px-4 py-3 mt-1.5"
                options={BODY_TYPES}
                error={errors.bodyType}
                control={control}
                defaultValue={vehicle?.bodyType}
              />
              <DropDown
                label="Transmission"
                name="transmission"
                className="bg-gray-100 px-4 py-3 mt-1.5"
                options={TRANSMISSIONS}
                error={errors.transmission}
                control={control}
                defaultValue={vehicle?.transmission}
              />
              <DropDown
                label="Fuel Type"
                name="fuelType"
                className="bg-gray-100 px-4 py-3 mt-1.5"
                options={FUEL_TYPES}
                error={errors.fuelType}
                control={control}
                defaultValue={vehicle?.fuelType}
              />
              <DropDown
                label="Nr. Of Seats"
                name="seatingCapacity"
                className="bg-gray-100 px-4 py-3 mt-1.5"
                options={SEAT_OPTIONS}
                error={errors.seatingCapacity}
                control={control}
                defaultValue={vehicle?.seats}
              />
            </div>
          </div>

          {/* pricing & location */}
          <div className="px-8 py-10">
            <h2 className="text-2xl uppercase font-medium mb-7">
              Pricing & Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <DefaultInput
                label="Price Per Day"
                placeholder="100$"
                name="pricePerDay"
                type="number"
                error={errors.pricePerDay}
                register={register}
              />
              <DropDown
                label="Location"
                name="location"
                className="bg-gray-100 px-4 py-3 mt-1.5"
                options={LOCATIONS}
                error={errors.location}
                control={control}
                defaultValue={vehicle?.location}
              />
            </div>
          </div>

          {/* features */}
          <div className="px-8 py-10">
            <h2 className="text-2xl uppercase font-medium mb-7">features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-20">
              {VEHICLE_FEATURES.map((feature) => (
                <CheckBox
                  key={feature.id}
                  label={feature.label}
                  id={feature.id}
                  name="features"
                  register={register}
                />
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
