"use server";
import { Client, Language, PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

const client = new Client();

export const autocomplete = async (query: string) => {
    try {
        const response = await client.placeAutocomplete({
            params: {
                input: query,
                key: process.env.GOOGLE_MAPS_API_KEY!,
                language: Language.en,
                types: PlaceAutocompleteType.address,
                components:['country:us'],
            }
        });

        return response.data.predictions;
    } catch (error) {
        console.error(error);
    }
}

export const placeDetails = async (palceId: string) => {
    try {
        const response = await client.placeDetails({
            params: {
                place_id: palceId,
                key: process.env.GOOGLE_MAPS_API_KEY!,
                fields: ['address_components'],
            },
        });

        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}