"use client";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

import { autocomplete, placeDetails } from "@/lib/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";

const states = [
  { abbrevation: "AL", display: "Alabama" },
  { abbrevation: "AK", display: "Alaska" },
  { abbrevation: "AS", display: "American Samoa" },
  { abbrevation: "AZ", display: "Arizona" },
  { abbrevation: "AR", display: "Arkansas" },
  { abbrevation: "CA", display: "California" },
  { abbrevation: "CO", display: "Colorado" },
  { abbrevation: "CT", display: "Connecticut" },
  { abbrevation: "DE", display: "Delaware" },
  { abbrevation: "DC", display: "District Of Columbia" },
  { abbrevation: "FM", display: "Federated States Of Micronesia" },
  { abbrevation: "FL", display: "Florida" },
  { abbrevation: "GA", display: "Georgia" },
  { abbrevation: "GU", display: "Guam" },
  { abbrevation: "HI", display: "Hawaii" },
  { abbrevation: "ID", display: "Idaho" },
  { abbrevation: "IL", display: "Illinois" },
  { abbrevation: "IN", display: "Indiana" },
  { abbrevation: "IA", display: "Iowa" },
  { abbrevation: "KS", display: "Kansas" },
  { abbrevation: "KY", display: "Kentucky" },
  { abbrevation: "LA", display: "Louisiana" },
  { abbrevation: "ME", display: "Maine" },
  { abbrevation: "MH", display: "Marshall Islands" },
  { abbrevation: "MD", display: "Maryland" },
  { abbrevation: "MA", display: "Massachusetts" },
  { abbrevation: "MI", display: "Michigan" },
  { abbrevation: "MN", display: "Minnesota" },
  { abbrevation: "MS", display: "Mississippi" },
  { abbrevation: "MO", display: "Missouri" },
  { abbrevation: "MT", display: "Montana" },
  { abbrevation: "NE", display: "Nebraska" },
  { abbrevation: "NV", display: "Nevada" },
  { abbrevation: "NH", display: "New Hampshire" },
  { abbrevation: "NJ", display: "New Jersey" },
  { abbrevation: "NM", display: "New Mexico" },
  { abbrevation: "NY", display: "New York" },
  { abbrevation: "NC", display: "North Carolina" },
  { abbrevation: "ND", display: "North Dakota" },
  { abbrevation: "MP", display: "Northern Mariana Islands" },
  { abbrevation: "OH", display: "Ohio" },
  { abbrevation: "OK", display: "Oklahoma" },
  { abbrevation: "OR", display: "Oregon" },
  { abbrevation: "PW", display: "Palau" },
  { abbrevation: "PA", display: "Pennsylvania" },
  { abbrevation: "PR", display: "Puerto Rico" },
  { abbrevation: "RI", display: "Rhode Island" },
  { abbrevation: "SC", display: "South Carolina" },
  { abbrevation: "SD", display: "South Dakota" },
  { abbrevation: "TN", display: "Tennessee" },
  { abbrevation: "TX", display: "Texas" },
  { abbrevation: "UT", display: "Utah" },
  { abbrevation: "VT", display: "Vermont" },
  { abbrevation: "VI", display: "Virgin Islands" },
  { abbrevation: "VA", display: "Virginia" },
  { abbrevation: "WA", display: "Washington" },
  { abbrevation: "WV", display: "West Virginia" },
  { abbrevation: "WI", display: "Wisconsin" },
  { abbrevation: "WY", display: "Wyoming" }
]

interface Address {
  id: number;
  default: boolean;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  editing: boolean;
}
function AddressEdit({ initAddress, onDelete }: { initAddress: Address, onDelete: () => void }) {

  const [query, setQuery] = useState('')
  const [palceId, setPlaceId] = useState('')
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);

  const [address, setAddress] = useState({
    id: initAddress.id,
    default: initAddress.default,
    line1: initAddress.line1,
    line2: initAddress.line2,
    city: initAddress.city,
    state: initAddress.state,
    zip: initAddress.zip,
    editing: initAddress.editing || false,
  });

  useEffect(() => {
    const fetchPredictions = async () => {
      if (query === '') {
        setPredictions([]);
        return;
      }

      const result = await autocomplete(query);
      setPredictions(result ?? []);
    };
    fetchPredictions();
  }, [query]);


  useEffect(() => {
    if (palceId === '') {
      return;
    }
    setQuery('');
    const fetchPlaceDetails = async () => {
      let line1 = "";
      let city = "";
      let state = ""
      let zip = "";

      const result = await placeDetails(palceId);
      document.getElementById('line2')?.focus();

      for (const component of result?.address_components || []) {
        const componentType = component.types[0];
  
        switch (componentType) {
          case "street_number": {
            line1 = `${component.long_name} ${line1}`;
            break;
          }
  
          case "route": {
            line1 += component.short_name;
            break;
          }
  
          case "postal_code": {
            zip = `${component.long_name}${zip}`;
            break;
          }
  
          case "postal_code_suffix": {
            zip = `${zip}-${component.long_name}`;
            break;
          }
  
          case "locality":
            city = component.long_name;
            break;
  
          case "administrative_area_level_1": {
            state = component.short_name;
            break;
          }
        }
      }
  
      setAddress({
        id: address.id,
        default: true,
        line1,
        line2: "",
        city,
        state,
        zip,
        editing: address.editing
      });
    };
    fetchPlaceDetails();
  }, [palceId, address]);

  return (
    <>
      {address.editing ?
        <>
          <div className="flex justify-between">
            <div className="w-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <Combobox
                  onChange={(place: PlaceAutocompleteResult) => {
                    if (place) {
                      setPlaceId(place.place_id);
                    }
                  }}
                >
                  <div className="relative">
                    <div className="flex items-center">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <ComboboxInput
                        autoFocus
                        value={address.line1}
                        className="block w-full pl-11 pr-4 rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        placeholder="Search..."
                        onChange={(event) => {
                          setQuery(event.target.value);
                          setAddress({ ...address, line1: event.target.value });
                        }}
                        onBlur={() => setQuery('')}
                      />
                    </div>
                  </div>

                  {predictions.length > 0 && (
                    <ComboboxOptions static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                      {predictions.map((place) => (
                        <ComboboxOption
                          key={place.place_id}
                          value={place}
                          className="cursor-default select-none px-4 py-2 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                        >
                          {place.description}
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  )}

                  {query !== '' && predictions.length === 0 && (
                    <p className="p-4 text-sm text-gray-500">No addresses found.</p>
                  )}
                </Combobox>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="line2" className="block text-sm/6 font-medium text-gray-900">
                Unit/Apt #
              </label>
              <div className="mt-2">
                <input
                  id="line2"
                  name="line2"
                  type="text"
                  value={address.line2}
                  onChange={(event) => {
                    setAddress({ ...address, city: event.target.value });
                  }}
                  autoComplete="off"
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-between">
            <div className="w-full">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={address.city}
                  onChange={(event) => {
                    setAddress({ ...address, city: event.target.value });
                  }}
                  autoComplete="off"
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                State
              </label>
              <div className="mt-2">
                <select
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={(event) => {
                    setAddress({ ...address, state: event.target.value });
                  }}
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                >
                  {states.map((state) => (
                    <option key={state.abbrevation} value={state.abbrevation}>
                      {state.display}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  value={address.zip}
                  type="text"
                  autoComplete="off"
                  onChange={(event) => {
                    setAddress({ ...address, zip: event.target.value });
                  }}
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div className="col-span-full text-end">
            <button type="button" hidden={address.id != 0} className="font-semibold px-4 text-indigo-600 hover:text-indigo-500" onClick={onDelete}>
              Cancel
            </button>
            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => setAddress({ ...address, editing: false })}>
              Save
            </button>
          </div>
        </>
        :
        <li key={address.id} className="flex justify-between gap-x-6 py-6">
          <div className="font-medium text-gray-900">{address.default}</div>
          <div className="font-medium text-gray-900">{address.line1} {address.line2}, {address.city} {address.state} {address.zip}</div>
          <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => setAddress({ ...address, editing: true })}>
            Update
          </button>
        </li>
      }
    </>
  )
}

export default function AddressWrapper({ memberAddress }: { memberAddress: Address[] }) {
  const [address, setAddress] = useState(memberAddress);

  const handleDelete = (index: number) => {
    // Create a new array without the item to be deleted
    const newItems = address.filter((_, i) => i !== index);
    setAddress(newItems);
  };

  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900">Address</h2>
      <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
        {address.map((address, index) => {
          return (
            <AddressEdit key={"address_lookup_" + index} initAddress={address} onDelete={() => handleDelete(index)} />
          )
        })}

      </ul>

      <div className="flex border-t border-gray-100 pt-6">
        <button type="button" className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={() => {
            setAddress([...address, { id: 0, default: false, line1: '', line2: '', city: '', zip: '', state:  'IL', editing: true }])
          }}>
          <span aria-hidden="true">+</span> Add another address
        </button>
      </div>
    </div>
  )
}