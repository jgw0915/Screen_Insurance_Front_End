export type userData ={
    username: string,
    password: string,
    phoneNumber: string,
    profileImage: string | undefined,
    current_phone_type: "IPhone" | "Android",
    current_phone_name: string,
    insured_phone: insured_phone[] | null,
}

export type insured_phone ={
    phone_name: string,
    phone_type: "IPhone" | "Android",
    expired: boolean,
    expired_date?: string,
    valid_date?: string,
    insurance_id: string,
}