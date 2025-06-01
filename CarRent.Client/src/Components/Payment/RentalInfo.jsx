import React from "react";
import DefaultInput from "../Inputs/DefaultInput";
import DatePickerInput from "../Inputs/DatePickerInput";
import TimePickerInput from "../Inputs/TimePickerInput";
import DropDown from "../Inputs/Dropdown";
import { LOCATIONS } from "../../common/constants";

export default function RentalInfo({ control, errors, locationData }) {
  return (
    <div>
      <div className="bg-white rounded-lg py-8 px-5">
        <h1 className="text-xl font-semibold">Rental Info</h1>
        <div className="flex flex-row justify-between text-sm text-slate-400">
          <p>Please select your rental date</p>
          <p>step 2 of 4</p>
        </div>
        <div className="rounded-lg mt-5">
          <div className="space-y-5">
            <h2 className="text-lg font-semibold">Pick-Up</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <DropDown
                options={LOCATIONS}
                label="Location"
                placeholder="Select your city"
                name="pickup.city"
                className="bg-gray-100 px-4 py-3 mt-4 text-gray-800"
                control={control}
                error={errors?.pickup?.city}
                defaultValue={locationData?.pickup?.city}
              />
              <DatePickerInput
                label="Date"
                name="pickup.date"
                control={control}
                error={errors?.pickup?.date}
                className="px-4 py-4 mt-5 bg-neutral-100 text-slate-400"
                defaultValue={locationData?.pickup?.date}
              />
              <TimePickerInput
                label="Time"
                name="pickup.time"
                control={control}
                error={errors?.pickup?.time}
                className="px-4 py-4 mt-4 bg-neutral-100 text-slate-400"
                defaultValue={locationData?.pickup?.time}
              />
            </div>
          </div>
          <div className="space-y-5 mt-10">
            <h2 className="text-lg font-semibold">Drop-Off</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <DropDown
                label="Location"
                options={LOCATIONS}
                placeholder="Select your city"
                name="dropoff.city"
                className="px-4 py-3 mt-4 bg-neutral-100 text-gray-800 "
                control={control}
                error={errors?.dropoff?.city}
                defaultValue={locationData?.dropoff?.city}
              />
              <DatePickerInput
                label="Date"
                name="dropoff.date"
                control={control}
                error={errors?.dropoff?.date}
                className="px-4 py-4 mt-5 bg-neutral-100 text-slate-400"
                defaultValue={locationData?.dropoff?.date}
              />
              <TimePickerInput
                label="Time"
                name="dropoff.time"
                control={control}
                error={errors?.dropoff?.time}
                className="px-4 py-3.5 mt-4 bg-neutral-100 text-slate-400"
                defaultValue={locationData?.dropoff?.time}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
