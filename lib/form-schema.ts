import * as z from "zod";
import { getYearsDiff } from "@/lib/dates";

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_FILE_SIZE_STRING = "10MB";
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
    .trim()
    .min(3, { message: "This field must be at least 3 characters" })
    .toLowerCase(),
  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters",
  }),
  recaptchaToken: z.string().max(1000),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .regex(/^\w+$/g, "Username must be alphanumeric")
      .min(3, {
        message: "Username must be at least 3 characters",
      })
      .max(16, { message: "Username must be less than 16 characters" })
      .toLowerCase(),
    email: z.string().trim().email("This is not a valid email").toLowerCase(),
    password: z
      .string()
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters",
      })
      .regex(/[A-Z]/g, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/g, "Password must contain at least 1 lowercase letter")
      .regex(/[0-9]/g, "Password must contain at least 1 digit")
      .refine((value) => !/\s/.test(value), {
        message: "Password cannot contain whitespaces",
      }),
    confirmPassword: z.string().trim().min(1, {
      message: "This field has to be filled",
    }),
    recaptchaToken: z.string().max(1000),
  })
  .refine(
    // Additional refinement to check if passwords match in client
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

export const markerSchema = z.object({
  coords: z
    .string()
    .trim()
    .regex(
      /^(-?\d+(\.\d+)?)\,\s*(-?\d+(\.\d+)?)$/g,
      "Must be a latitude and longitude separated by a comma",
    ),
  images: z
    .any()
    .refine(
      (files?: File[]) => !!files?.length,
      "At least one image must be provided",
    )
    .refine(
      (files: File[]) => files.length <= MAX_FILES_COUNT,
      `Maximum number of images must be less than ${MAX_FILES_COUNT}`,
    )
    .refine(
      (files: File[]) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Max image size is ${MAX_FILE_SIZE_STRING}`,
    )
    .refine(
      (files: File[]) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Invalid image format",
    ),
  recaptchaToken: z.string().max(1000),
});

export const editUsernameSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^\w+$/g, "Username must be alphanumeric")
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(16, { message: "Username must be less than 16 characters" })
    .toLowerCase(),
});

export const editProfileSchema = z
  .object({
    avatar: z
      .any()
      .refine(
        (file?: File) => (file ? file.size <= MAX_FILE_SIZE : true),
        `Max image size is ${MAX_FILE_SIZE_STRING}`,
      )
      .refine(
        (file?: File) =>
          file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : true,
        `Only ${ACCEPTED_IMAGE_TYPES_STRING} formats are supported`,
      ),
    dateOfBirth: z
      .date()
      .refine(
        (date) => getYearsDiff(date) >= 16,
        "You must be at least 16 years old",
      )
      .refine(
        (date) => getYearsDiff(date) <= 120,
        "You must be at most 120 years old",
      )
      .optional(),
    bio: z
      .string()
      .trim()
      .max(1000, { message: "Bio must be less than 1000 characters" })
      .optional(),
    coords: z
      .string()
      .trim()
      .regex(
        /^(-?\d+(\.\d+)?)\,\s*(-?\d+(\.\d+)?)$/g,
        "Must be a latitude and longitude separated by a comma",
      )
      .optional()
      .or(z.literal("")),
    socialMedia: z.object({
      facebook: z
        .string()
        .trim()
        .regex(
          /(?:https?:\/\/)(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)\/?(?:[\?#]?.*)/gi,
          "Invalid Facebook URL",
        )
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .trim()
        .regex(
          /(?:https?:\/\/(?:www\.)?(twitter|x).com\/(\w+))\/?(?:[\?#]?.*)/gi,
          "Invalid Twitter URL",
        )
        .optional()
        .or(z.literal("")),
      instagram: z
        .string()
        .trim()
        .regex(
          /(?:(?:https?):\/\/)?(?:www\.)?(instagram.com|instagr.am|instagr.com)\/(\w+)\/?(?:[\?#]?.*)/gi,
          "Invalid Instagram URL",
        )
        .optional()
        .or(z.literal("")),
      youtube: z
        .string()
        .trim()
        .regex(
          /^(?:https?:\/\/)?(?:(?:www|gaming)\.)?youtube\.com\/@?(\w+)\/?(?:[\?#]?.*)/gi,
          "Invalid YouTube URL",
        )
        .optional()
        .or(z.literal("")),
    }),
  })
  .refine(
    (data) =>
      Object.values(data).some(Boolean) ||
      Object.values(data.socialMedia).some(Boolean),
    {
      message: "At least one field must be filled",
      path: ["avatar"],
    },
  );

export const changeAvatarSchema = z.object({
  image: z
    .any()
    .refine((file?: File) => !!file, "No image provided")
    .refine(
      (file: File) => file.size <= MAX_FILE_SIZE,
      `Max image size is ${MAX_FILE_SIZE_STRING}`,
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Invalid image format",
    ),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    newPassword: z
      .string()
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters",
      })
      .regex(/[A-Z]/g, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/g, "Password must contain at least 1 lowercase letter")
      .regex(/[0-9]/g, "Password must contain at least 1 digit")
      .refine((value) => !/\s/.test(value), {
        message: "Password cannot contain whitespaces",
      }),
    passwordConfirmation: z.string().trim().min(1, {
      message: "This field has to be filled",
    }),
  })
  .refine(
    // Additional refinement to check if passwords match in client
    (data) => data.currentPassword !== data.newPassword,
    {
      message: "New password must be different",
      path: ["newPassword"],
    },
  )
  .refine(
    // Additional refinement to check if passwords match in client
    (data) => data.newPassword === data.passwordConfirmation,
    {
      message: "Passwords don't match",
      path: ["passwordConfirmation"],
    },
  );

export const getMarkersSchema = z.object({
  latMin: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/g, "Must be a latitude/longitude"),
  latMax: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/g, "Must be a latitude/longitude"),
  lngMin: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/g, "Must be a latitude/longitude"),
  lngMax: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/g, "Must be a latitude/longitude"),
});

export const reportMarkerTypes = [
  "incorrectImages",
  "incorrectLocation",
  "inappropriateContent",
  "other",
] as const;

export const markerReportSchema = z
  .object({
    markerId: z.string().max(50),
    type: z.enum(reportMarkerTypes, {
      message: "Provide a reason for reporting",
    }),
    message: z
      .string()
      .trim()
      .max(500, { message: "Message must be less than 500 characters" })
      .optional(),
  })
  .refine((data) => (data.type === "other" ? !!data.message : true), {
    message: "Provide a reason for reporting",
    path: ["message"],
  });

export const markerCommentSchema = z.object({
  markerId: z.string().max(50),
  message: z
    .string()
    .trim()
    .min(1, { message: "Provide a message" })
    .max(500, { message: "Message must be less than 500 characters" }),
  recaptchaToken: z.string().max(1000),
});
