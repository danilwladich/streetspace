import moment from "moment";
import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const MAX_FILE_SIZE_STRING = "5MB";
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES_STRING = ".jpg, .jpeg, .png and .webp";
export const MAX_FILES_COUNT = 6;

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(3, { message: "This field must be at least 3 characters." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  recaptchaToken: z.string(),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .regex(/^\w+$/g, "Username must be alphanumeric.")
      .min(3, {
        message: "Username must be at least 3 characters.",
      })
      .max(16, { message: "Username must be less than 16 characters." }),
    email: z.string().trim().email("This is not a valid email."),
    password: z
      .string()
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .regex(/[A-Z]/g, "Password must contain at least 1 uppercase letter.")
      .regex(/[a-z]/g, "Password must contain at least 1 lowercase letter.")
      .regex(/[0-9]/g, "Password must contain at least 1 digit.")
      .refine((value) => !/\s/.test(value), {
        message: "Password cannot contain whitespaces.",
      }),
    confirmPassword: z.string().trim().min(1, {
      message: "This field has to be filled.",
    }),
    recaptchaToken: z.string(),
  })
  .refine(
    // Additional refinement to check if passwords match in client
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords don't match.",
      path: ["confirmPassword"],
    },
  );

export const markerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: "Name must be at least 4 characters." })
    .max(40, { message: "Name must be less than 40 characters." }),
  coords: z
    .string()
    .regex(
      /^(-?\d+(\.\d+)?)\,\s*(-?\d+(\.\d+)?)$/g,
      "Must be a latitude and longitude separated by a comma.",
    ),
  address: z
    .string()
    .trim()
    .min(4, { message: "Address must be at least 4 characters." })
    .max(100, { message: "Address must be less than 100 characters." }),
  images: z
    .any()
    .refine(
      (files?: File[]) => !!files?.length,
      "At least one image must be provided.",
    )
    .refine(
      (files: File[]) => files.length <= MAX_FILES_COUNT,
      `Maximum number of images must be less than ${MAX_FILES_COUNT}.`,
    )
    .refine(
      (files: File[]) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Max image size is ${MAX_FILE_SIZE_STRING}.`,
    )
    .refine(
      (files: File[]) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      `Only ${ACCEPTED_IMAGE_TYPES_STRING} formats are supported.`,
    ),
  recaptchaToken: z.string(),
});

export const editUsernameSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^\w+$/g, "Username must be alphanumeric.")
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(16, { message: "Username must be less than 16 characters." }),
});

export const editProfileSchema = z
  .object({
    avatar: z
      .any()
      .refine(
        (file?: File) => (file ? file.size <= MAX_FILE_SIZE : true),
        `Max image size is ${MAX_FILE_SIZE_STRING}.`,
      )
      .refine(
        (file?: File) =>
          file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : true,
        `Only ${ACCEPTED_IMAGE_TYPES_STRING} formats are supported.`,
      ),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/g, "Invalid date format.")
      .refine(
        (date) =>
          moment(date).toDate() <= moment().subtract(16, "years").toDate(),
        "You must be at least 16 years old.",
      )
      .refine(
        (date) =>
          moment(date).toDate() >= moment().subtract(120, "years").toDate(),
        "You must be at most 120 years old.",
      )
      .optional(),
    country: z
      .string()
      .trim()
      .max(20, { message: "Country must be less than 20 characters." })
      .optional(),
    city: z
      .string()
      .trim()
      .max(20, { message: "City must be less than 20 characters." })
      .optional(),
    socialMedia: z.object({
      facebook: z
        .string()
        .regex(
          /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)\/?(?:[\?#]?.*)/gi,
          "Invalid Facebook URL.",
        )
        .optional(),
      twitter: z
        .string()
        .regex(
          /(https?:\/\/twitter.com\/(\w+))\/?(?:[\?#]?.*)/gi,
          "Invalid Twitter URL.",
        )
        .optional(),
      instagram: z
        .string()
        .regex(
          /(?:(?:https?):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)\/?(?:[\?#]?.*)/gi,
          "Invalid Instagram URL.",
        )
        .optional(),
      youtube: z
        .string()
        .regex(
          /^(?:https?:\/\/)?(?:(?:www|gaming)\.)?youtube\.com\/@?(\w+)\/?(?:[\?#]?.*)/gi,
          "Invalid YouTube URL.",
        )
        .optional(),
    }),
  })
  .refine((data) => !(!data.country && !!data.city), {
    message: "Provide the country.",
    path: ["country"],
  })
  .refine(
    (data) =>
      Object.values(data).some(Boolean) ||
      Object.values(data.socialMedia).some(Boolean),
    {
      message: "At least one field must be filled.",
      path: ["avatar"],
    },
  );

export const editAvatarSchema = z.object({
  image: z
    .any()
    .refine((file?: File) => !!file, "No image provided.")
    .refine(
      (file: File) => file.size <= MAX_FILE_SIZE,
      `Max image size is ${MAX_FILE_SIZE_STRING}.`,
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only ${ACCEPTED_IMAGE_TYPES_STRING} formats are supported.`,
    ),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    newPassword: z
      .string()
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .regex(/[A-Z]/g, "Password must contain at least 1 uppercase letter.")
      .regex(/[a-z]/g, "Password must contain at least 1 lowercase letter.")
      .regex(/[0-9]/g, "Password must contain at least 1 digit.")
      .refine((value) => !/\s/.test(value), {
        message: "Password cannot contain whitespaces.",
      }),
    passwordConfirmation: z.string().trim().min(1, {
      message: "This field has to be filled.",
    }),
  })
  .refine(
    // Additional refinement to check if passwords match in client
    (data) => data.currentPassword !== data.newPassword,
    {
      message: "New password must be different.",
      path: ["newPassword"],
    },
  )
  .refine(
    // Additional refinement to check if passwords match in client
    (data) => data.newPassword === data.passwordConfirmation,
    {
      message: "Passwords don't match.",
      path: ["passwordConfirmation"],
    },
  );

export const getMarkersSchema = z.object({
  latMin: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/g, "Must be a latitude/longitude."),
  latMax: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/g, "Must be a latitude/longitude."),
  lngMin: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/g, "Must be a latitude/longitude."),
  lngMax: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/g, "Must be a latitude/longitude."),
});
