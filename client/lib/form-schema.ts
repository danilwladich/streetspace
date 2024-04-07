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
export const MAX_FILES_COUNT = 5;

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
