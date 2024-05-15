import "server-only";
import { auth } from "@clerk/nextjs/server";

interface AuthContext {
  userId: string;
}

// Define the userAuth wrapper function with types
export const userAuth =
  <T>(fn: (context: AuthContext) => Promise<T>) =>
  async (): Promise<T> => {
    const user = auth();

    if (!user.userId) throw new Error("Unauthorized");

    // Create the context with userId
    const context: AuthContext = { userId: user.userId };

    // Call the wrapped function with the context
    return await fn(context);
  };
