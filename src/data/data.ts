export type userData ={
    username: string,
    password: string,
    phoneNumber: string,
    profileImage: string | undefined,
    current_phone_type: "IPhone" | "Android",
    current_phone_name: string,
    insured_phone: insured_phone[] | null,
}

interface insured_phone{
    phone_name: string,
    phone_type: "IPhone" | "Android",
    expired: boolean,
    expired_date?: string,
    valid_date?: string,
    insurance_id: string,
}

export { insured_phone }

export const initFakePhoneData : insured_phone[] = [
    {
        phone_name: "IPhone 15 pro",
        phone_type: "IPhone",
        expired: false,
        expired_date: "2023-12-12",
        valid_date: "2022-12-12",
        insurance_id: "123456",
    },
    {
        phone_name: "IPhone 11",
        phone_type: "IPhone",
        expired: true,
        expired_date: "2021-12-12",
        valid_date: "2020-12-12",
        insurance_id: "123457",
    },
    {
        phone_name: "Samsung Galaxy s24",
        phone_type: "Android",
        expired: false,
        expired_date: "2023-12-12",
        valid_date: "2022-12-12",
        insurance_id: "123458",
    },
    {
        phone_name: "Oppo A15",
        phone_type: "Android",
        expired: true,
        expired_date: "2021-11-12",
        valid_date: "2020-11-12",
        insurance_id: "123459",
    },
    {
        phone_name: "IPhone 14 pro max",
        phone_type: "IPhone",
        expired: false,
        expired_date: "2023-10-12",
        valid_date: "2022-10-12",
        insurance_id: "123460",
    },
    {
        phone_name: "Huawei P40",
        phone_type: "Android",
        expired: true,
        expired_date: "2021-9-12",
        valid_date: "2020-9-12",
        insurance_id: "123461",
    },
]

export const fakePhoneData : insured_phone[] = [
    {
        phone_name: "IPhone 13 pro",
        phone_type: "IPhone",
        expired: true,
        expired_date: "2021-12-12",
        valid_date: "2020-12-12",
        insurance_id: "123489",
    },
    {
        phone_name: "HTC One",
        phone_type: "Android",
        expired: false,
        expired_date: "2019-12-12",
        valid_date: "2018-12-12",
        insurance_id: "123490",
    },
    {
        phone_name: "Samsung Galaxy s23",
        phone_type: "Android",
        expired: false,
        expired_date: "2023-12-12",
        valid_date: "2022-12-30",
        insurance_id: "123491",
    },
    {
        phone_name: "Oppo Reno 5",
        phone_type: "Android",
        expired: true,
        expired_date: "2021-11-12",
        valid_date: "2020-11-12",
        insurance_id: "123492",
    },
    {
        phone_name: "IPhone 15 pro max",
        phone_type: "IPhone",
        expired: false,
        expired_date: "2023-10-12",
        valid_date: "2022-10-12",
        insurance_id: "123493",
    },
    {
        phone_name: "Huawei P50",
        phone_type: "Android",
        expired: true,
        expired_date: "2021-9-12",
        valid_date: "2020-9-12",
        insurance_id: "123494",
    },
]

export const initUserData : userData = {
    username: "",
    password: "",
    phoneNumber: "",
    current_phone_name: "IPhone 15 pro",
    current_phone_type: "IPhone",
    profileImage: undefined ,
    insured_phone: initFakePhoneData,
}

export const fakeUserData : userData = {
    username: "Programmer",
    current_phone_name: "Galaxy s21",
    current_phone_type: "Android",
    password: "1234",
    phoneNumber: "1234",
    profileImage: "https://i.pinimg.com/474x/ad/a3/85/ada38506e144d7940c4a5fea1358cbfa.jpg",
    insured_phone: fakePhoneData,

}