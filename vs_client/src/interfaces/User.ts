export default interface User {
    _id?: string;
    name: {
        firstName?: string;
        middleName?: string;
        lastName?: string;
    };
    phone: {
        mobile: string;
        landline?: string;
    }
    email: string;
    password?: string;
    image: {
        url?: string;
        alt?: string;
    }
    gender: string;
    role?: string;
    address: {
        country?: string;
        state?: string;
        city?: string;
        street?: string;
        houseNumber?: string;
        zipcode?: string;
    };
    schoolGrade?: string,
    educationType?: string,
    educationText?: string,
    numberRating?: number,
    avgRating?: number,
    teaching?: string[],
    teacherDescription?: string,
    teacherComments?: string,
    hourlyPay?: number,
    isActive?: boolean;
}
