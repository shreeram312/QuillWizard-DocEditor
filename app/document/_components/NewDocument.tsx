"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { Plus } from "lucide-react";
import React from "react";

const NewDocument = () => {
  const createNewDoc = async () => {
    try {
      const res = await axios.post("/api/document/new");
    } catch (e) {
      console.log(e);
    }
  };
  const TemplateMap = [
    {
      component: (
        <button
          onClick={() => {
            createNewDoc();
          }}
        >
          <Card className="w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center mx-autp">
              <Plus size={80} />
            </CardContent>
            <CardFooter>ff</CardFooter>
          </Card>
        </button>
      ),
      footer: "Blank Document",
    },
  ];
  return (
    <div className="bg-gray-50 h-[300px] flex flex-row md:flex-col justify-center flex-wrap">
      <div className="flex flex-col space-y-4 w-10/12 mx-auto flex-wrap">
        <h3 className="text-muted-foreground text-sm">Start a new Document</h3>
        <div className="flex  flex-wrap ">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="px-2">
                {TemplateMap[0].component}
                <p className="text-sm mt-2 ml-2">{TemplateMap[0].footer}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewDocument;
