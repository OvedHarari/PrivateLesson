const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: false,
            minlength: 2
        },
        middleName: {
            type: String,
            required: false,
            minlength: 0,
        },
        lastName: {
            type: String,
            required: false,
            minlength: 2
        },
    },
    phone: {
        mobile: {
            type: String,
            required: true,
            minlength: 2
        },
        landline: {
            type: String,
            required: false,
            minlength: 0
        },
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: false,

    },
    image: {
        url: {
            type: String,
            required: false,
            minlength: 0,
        },
        alt: {
            type: String,
            required: false,
            minlength: 0,
        },
    },
    gender: {
        type: String,
        required: false,
        minlength: 2
    },
    role: {
        type: String,
        required: false,
        minlength: 2


    },
    isActive: {
        type: Boolean,
        required: true,
    },
    address: {
        country: {
            type: String,
            required: false,
            minlength: 0

        },
        state: {
            type: String,
            required: false,
            minlength: 0,
        },
        city: {
            type: String,
            required: false,
            minlength: 0

        },
        street: {
            type: String,
            required: false,
            minlength: 0

        },
        houseNumber: {
            type: String,
            required: false,
            minlength: 0

        },
        zipcode: {
            type: String,
            required: false,
            minlength: 0

        },
    },
    schoolGrade: {
        type: String,
        required: false,
        default: 0
    },
    hourlyPay: {
        type: Number,
        required: false,
        default: 0
    },
    educationType: {
        type: String,
        required: false,
        minlength: 0
    },
    educationText: {
        type: String,
        required: false,
        minlength: 0,
        maxlength: 200
    },
    numberRating: {
        type: Number,
        default: 0,
        required: false
    },
    avgRating: {
        type: Number,
        default: 0,
        required: false
    },
    teaching: {
        type: Array,
        required: false
    },
    teacherDescription: {
        type: String,
        required: false,
        minlength: 0,
        maxlength: 200
    },
    teacherComments: {
        type: String,
        required: false,
        minlength: 0,
        maxlength: 200
    },

    loginAttempts: {
        type: Number,
        default: 0,
        required: false
    },
    lastFailedLogin: {
        type: Date,
        default: null,
        required: false
    },

})

const User = mongoose.model("users", userSchema);
module.exports = User;