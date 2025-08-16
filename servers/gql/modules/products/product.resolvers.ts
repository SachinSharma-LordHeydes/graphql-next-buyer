import { PrismaClient } from "@/app/generated/prisma";
import { requireAuth } from "../../auth/auth";
import { GraphQLContext } from "../../context";

const prisma = new PrismaClient();

export const productResolvers = {
  Query: {
    getProducts: async (_: any, __: any, ctx: GraphQLContext) => {
      requireAuth(ctx);

      return prisma.product.findMany({
        include: {
          seller: true,
          variants: true,
          images: true,
          reviews: true,
          category: {
            include: {
              children: true,
              parent: true,
            },
          },
          brand: true,
          wishlistItems: true,
        },
        orderBy: {
          createdAt: "desc", // latest first
        },
      });
    },
    getProduct: async (
      _: any,
      { productId }: { productId: string },
      ctx: GraphQLContext
    ) => {
      requireAuth(ctx);

      if (!productId) throw new Error("Product id is required");

      return prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          seller: true,
          variants: {
            include: {
              specifications: true,
            },
          },
          images: true,
          reviews: true,
          category: {
            include: {
              children: true,
              parent: true,
            },
          },
          brand: true,
          wishlistItems: true,
        },
      });
    },
  },
};
