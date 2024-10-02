import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <div className="my-2 mx-4 flex justify-between items-center py-4">
      {/* logo Auth */}
      <Logo />
      <div>
        <SignedOut>
          <Button variant="destructive" color="blue">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
