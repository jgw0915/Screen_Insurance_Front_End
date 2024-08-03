export type userData ={
    username: string,
    password: string,
    phoneNumber: string,
    profileImage: string | null,
}
export const initUserData : userData = {
    username: "",
    password: "",
    phoneNumber: "",
    profileImage: null ,
}

export const fakeUserData : userData = {
    username: "Programmer",
    password: "1234",
    phoneNumber: "1234",
    profileImage: "https://i.pinimg.com/474x/ad/a3/85/ada38506e144d7940c4a5fea1358cbfa.jpg",
}