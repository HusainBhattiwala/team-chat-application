import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

// setting up the profile with the login user
export const initialProfile = async () => {
  const user = await currentUser(); //getting the info of current user from clerk

  if (!user) {
    return redirectToSignIn(); //redirect the user to signin if not user
  }

  //getting if profile exist from prisma
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
