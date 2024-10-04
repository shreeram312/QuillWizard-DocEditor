"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { openAI } from "@/lib/openai";

interface DrawerProps {
  description: string;
}

const DrawerAi = ({ description }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const [wizardsuggestion, setwizardsuggestion] = useState("");
  const [isloading, setisloading] = useState(false);

  const handleUserSuggestion = async () => {
    setisloading(true);
    setwizardsuggestion(""); // Reset suggestion on new request
    try {
      const response: any = await openAI(description);
      setwizardsuggestion(response);
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      setisloading(false); // Ensure loading state resets
    }
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="flex float-right m-2">
          <Button
            onClick={handleUserSuggestion}
            variant="outline"
            disabled={isloading}
          >
            {isloading ? "Loading..." : "Ask your Wizard 🧙🪄"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Oye..! Wizard here.🧙🪄 Helping you out to write story or resume
              writing
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {wizardsuggestion ? (
              <p>{JSON.stringify(wizardsuggestion)}</p> // Display the wizard's suggestion
            ) : (
              <p>No suggestion yet. Ask your wizard!</p>
            )}
          </div>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerAi;
