export type GooglePlace = {
    business_status: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: {
        open_now: boolean;
    };
    photos: {
        height: number;
        width: number;
        html_attributions: string[];
        photo_reference: string;
    }[];
    place_id: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
    price_level?: number; // Optional field
    rating?: number; // Optional field
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total: number;
    vicinity: string;
}

