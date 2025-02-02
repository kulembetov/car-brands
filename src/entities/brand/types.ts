import { z } from 'zod';

export const brandSchema = z.object({
  id: z.number().optional(),
  brand_name: z
    .string()
    .min(2, 'Brand name must be at least 2 characters long'),
  country: z.string().min(2, 'Country name must be at least 2 characters long'),
  founded: z
    .number()
    .min(1800, 'Founded year must be 1800 or later')
    .max(
      new Date().getFullYear(),
      `Founded year must be ${new Date().getFullYear()} or earlier`
    )
    .refine((value) => !isNaN(value), {
      message: 'Founded year must be a valid number',
    }),
  popular_model: z
    .string()
    .min(2, 'Popular model must be at least 2 characters long'),
  luxury_division: z.string().nullable().optional(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

export type Brand = z.infer<typeof brandSchema>;

export const carStoreSchema = z.object({
  brands: z.array(brandSchema),
  isLoading: z.boolean(),
  isAuthenticated: z.boolean(),
  isAdmin: z.boolean(),
  loginAsGuest: z.function().returns(z.void()),
  loginAsAdmin: z.function().args(z.string()).returns(z.void()),
  fetchBrands: z.function().returns(z.promise(z.void())),
  addCar: z
    .function(z.tuple([brandSchema.omit({ id: true })]))
    .returns(z.promise(z.void())),
  removeCar: z.function(z.tuple([z.number()])).returns(z.promise(z.void())),
  logout: z.function().returns(z.void()),
});

export type CarStore = z.infer<typeof carStoreSchema>;
