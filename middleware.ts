import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
    async function middleware(req: NextRequest) {
    },
    {
        publicRoutes: ["/"],
    }
);

export const config = {
    matcher: ["/((?!_next|static|favicon.ico).*)"],
};