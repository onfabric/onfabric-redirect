"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateLinkUserEmail } from './actions';

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  email: z.string().email({ message: "Email address must be valid" }),
});

export default function DetailsForm(props: { externalId: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    if (formMessage) {      
      setTimeout(() => {
        setFormMessage("");
      }, 3000);
    }
  }, [formMessage])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateLinkUserEmail(props.externalId, data.email);
      window.location.replace(`${process.env.NEXT_PUBLIC_REDIRECT_URL}?userId=${props.externalId}`);
    } catch (err) {
      console.log(err);
      setFormMessage("An error occurred. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-12">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <Button disabled={form.formState.isSubmitting} type="submit" className="flex items-center justify-center px-4 py-2 min-w-[70]">
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              </div>
              <FormMessage>
                {formMessage}
              </FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
