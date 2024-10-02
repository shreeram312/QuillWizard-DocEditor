import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const IntroPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              My Amazing Platform
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
            Unlock Your Writing Potential✍️
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <Button size="lg" className="w-full sm:w-auto text-lg">
              <SignInButton>Get Started</SignInButton>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/hero.gif"
            alt="Platform preview"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          {
            title: "Easy to Use",
            description: "Intuitive interface for seamless navigation",
          },
          {
            title: "Powerful Features",
            description: "Advanced tools to boost your productivity",
          },
          {
            title: "Secure & Reliable",
            description: "Your data is safe with our robust security measures",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroPage;
