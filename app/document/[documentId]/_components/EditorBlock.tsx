"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { redirect } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Editor from "@/components/ui/Editor";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useToast } from "@/hooks/use-toast";
import DrawerAi from "./DrawerAi";

const FormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
});

interface DocumentProps {
  id: string;
  userId: string;
  title: string | null;
  description: string | "";
  createdAt: Date;
  updatedAt: Date;
}

interface EditorBlockProps {
  document?: DocumentProps | null;
}
const EditorBlock: React.FC<EditorBlockProps> = ({ document }) => {
  const { toast } = useToast();
  if (!document) {
    redirect("/");
  }
  const EditorForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: document.title || "",
      description: document.description || "",
    },
  });

  const onUpdateChange = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    try {
      await axios.put(`/api/document/${document?.id}`, values);
      toast({
        title: "Document Successfully Updated",
        variant: "default",
      });
      revalidatePath("/");
      revalidatePath("/api/document/" + document?.id);
    } catch (e) {
      console.log(e);
    }
  };

  async function onDocumentDelete() {
    try {
      await axios.delete(`/api/document/${document?.id}`);
      toast({
        title: "Document Deleted Succesfully",
        variant: "destructive",
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="px-4">
      <div className="flex  float-right my-2 space-x-4">
        <DrawerAi description={document.description} />

        <form onSubmit={onDocumentDelete} className="flex  float-right m-2">
          <Button type="submit" variant="destructive">
            {" "}
            Delete
          </Button>
        </form>
      </div>
      <Form {...EditorForm}>
        <form
          onSubmit={EditorForm.handleSubmit(onUpdateChange)}
          className="space-y-8"
        >
          <FormField
            control={EditorForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <div>
            <FormField
              control={EditorForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditorBlock;
