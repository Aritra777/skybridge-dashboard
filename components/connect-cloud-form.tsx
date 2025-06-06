/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, Cloud, AlertCircle, Image as LucideImage } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import NextImage from "next/image";
import { regions } from "../constants/aws";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from "./ui/select";

// Define cloud provider types
type CloudProvider = "aws" | "azure" | "gcp";

// Create schemas for each provider
const awsSchema = z.object({
   provider: z.literal("aws"),
   accessKeyId: z.string().min(1, "Access Key ID is required"),
   secretAccessKey: z.string().min(1, "Secret Access Key is required"),
   region: z.string().min(1, "Region is required"),
});

const azureSchema = z.object({
   provider: z.literal("azure"),
   tenantId: z.string().min(1, "Tenant ID is required"),
   clientId: z.string().min(1, "Client ID is required"),
   clientSecret: z.string().min(1, "Client Secret is required"),
   subscriptionId: z.string().min(1, "Subscription ID is required"),
});

const gcpSchema = z.object({
   provider: z.literal("gcp"),
   projectId: z.string().min(1, "Project ID is required"),
   serviceAccountJson: z
      .string()
      .min(1, "Service Account JSON is required")
      .refine(
         (val) => {
            try {
               JSON.parse(val);
               return true;
            } catch (e) {
               return false;
            }
         },
         { message: "Invalid JSON format" }
      ),
});

// Combined schema with discriminated union
const formSchema = z.discriminatedUnion("provider", [
   awsSchema,
   azureSchema,
   gcpSchema,
]);

export function ConnectCloudForm({ onConnectAWSCloud }: { onConnectAWSCloud: (etc: any) => Promise<void> }) {
   const [provider, setProvider] = useState<CloudProvider>("aws");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState<{
      type: "success" | "error";
      message: string;
   } | null>(null);

   // Initialize the form with the default provider
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         provider: "aws",
         accessKeyId: "",
         secretAccessKey: "",
         region: "",
      },
   });

   // Handle provider change
   const handleProviderChange = (value: CloudProvider) => {
      setProvider(value);

      // Reset form with new provider values
      if (value === "aws") {
         form.reset({
            provider: "aws",
            accessKeyId: "",
            secretAccessKey: "",
            region: "",
         });
      } else if (value === "azure") {
         form.reset({
            provider: "azure",
            tenantId: "",
            clientId: "",
            clientSecret: "",
            subscriptionId: "",
         });
      } else if (value === "gcp") {
         form.reset({
            provider: "gcp",
            projectId: "",
            serviceAccountJson: "",
         });
      }
   };

   // Form submission handler
   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
         // Simulate API call
         // const Creds = values.provider === "aws" ? {
         //    accessKeyId: values.accessKeyId,
         //    secretAccessKey: values.secretAccessKey,
         //    region: values.region,
         // } : 
         // values.provider === "azure" ? {
         //    tenantId: values.tenantId,
         //    clientId: values.clientId,
         //    clientSecret: values.clientSecret,
         //    subscriptionId: values.subscriptionId,
         // } : 
         // {
         //    projectId: values.projectId,
         //    serviceAccountJson: JSON.parse(values.serviceAccountJson),
         // };

         await onConnectAWSCloud(values);

         console.log("Form submitted:", values);

         // Show success message
         setSubmitStatus({
            type: "success",
            message: `Successfully connected to ${provider.toUpperCase()} cloud provider.`,
         });
      } catch (error) {
         // Show error message
         setSubmitStatus({
            type: "error",
            message: `Failed to connect: ${error instanceof Error ? error.message : "Unknown error"
               }`,
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="space-y-6">
         {submitStatus && (
            <Alert
               variant={
                  submitStatus.type === "success" ? "default" : "destructive"
               }
               className={
                  submitStatus.type === "success"
                     ? "bg-green-50 text-green-800 border-green-200"
                     : ""
               }>
               {submitStatus.type === "success" ? (
                  <Check className="h-4 w-4" />
               ) : (
                  <AlertCircle className="h-4 w-4" />
               )}
               <AlertTitle>
                  {submitStatus.type === "success" ? "Success" : "Error"}
               </AlertTitle>
               <AlertDescription>{submitStatus.message}</AlertDescription>
            </Alert>
         )}

         <div className="space-y-4">
            <Label className="text-base">Select Cloud Provider</Label>
            <RadioGroup
               defaultValue="aws"
               value={provider}
               onValueChange={(value) =>
                  handleProviderChange(value as CloudProvider)
               }
               className="grid grid-cols-3 gap-4">
               <div>
                  <RadioGroupItem
                     value="aws"
                     id="aws"
                     className="peer sr-only"
                  />
                  <Label
                     htmlFor="aws"
                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                     <NextImage src="/assets/AWS.png" alt="Aws" width={48} height={48} />
                     <div className="text-center font-medium m-2">Amazon Web Service</div>
                  </Label>
               </div>

               <div>
                  <RadioGroupItem
                     value="azure"
                     id="azure"
                     className="peer sr-only"
                  />
                  <Label
                     htmlFor="azure"
                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                     <NextImage src="/assets/azure.png" alt="Microsoft Azure" width={32} height={32} />
                     <div className="text-center font-medium m-2">Microsoft Azure</div>
                  </Label>
               </div>

               <div>
                  <RadioGroupItem
                     value="gcp"
                     id="gcp"
                     className="peer sr-only"
                  />
                  <Label
                     htmlFor="gcp"
                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                     <NextImage src="/assets/GCP.png" alt="GCP" width={40} height={40} />
                     <div className="text-center font-medium m-2">Google Cloud Provider</div>
                  </Label>
               </div>
            </RadioGroup>
         </div>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <Card className="p-6">
                  <div className="space-y-4">
                     {provider === "aws" && (
                        <>
                           <FormField
                              control={form.control}
                              name="accessKeyId"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Access Key ID</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="AKIAIOSFODNN7EXAMPLE"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormDescription>
                                       Your AWS access key ID (20 characters)
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="secretAccessKey"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Secret Access Key</FormLabel>
                                    <FormControl>
                                       <Input
                                          type="password"
                                          placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormDescription>
                                       Your AWS secret access key (40
                                       characters)
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="region"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Region</FormLabel>
                                    <FormControl>
                                       {/* <Input
                                          placeholder="us-east-1"
                                          {...field}
                                       /> */}
                                       <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                       >
                                          <FormControl>
                                             <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select region" />
                                             </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                             {regions.map((region) => (
                                                <SelectItem key={region} value={region}>
                                                   {region}
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                    </FormControl>
                                    <FormDescription>
                                       The AWS region to connect to
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </>
                     )}

                     {provider === "azure" && (
                        <>
                           <FormField
                              control={form.control}
                              name="tenantId"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Tenant ID</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="00000000-0000-0000-0000-000000000000"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormDescription>
                                       Your Azure Active Directory tenant ID
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="clientId"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Client ID</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="00000000-0000-0000-0000-000000000000"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormDescription>
                                       Your Azure application client ID
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="clientSecret"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Client Secret</FormLabel>
                                    <FormControl>
                                       <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                       Your Azure application client secret
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="subscriptionId"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Subscription ID</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="00000000-0000-0000-0000-000000000000"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormDescription>
                                       Your Azure subscription ID
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </>
                     )}

                     {provider === "gcp" && (
                        <>
                           <FormField
                              control={form.control}
                              name="projectId"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Project ID</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="my-project-123456"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormDescription>
                                       Your Google Cloud project ID
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="serviceAccountJson"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Service Account JSON</FormLabel>
                                    <FormControl>
                                       <Textarea
                                          placeholder='{"type": "service_account", "project_id": "..."}'
                                          className="min-h-[150px] font-mono text-sm"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormDescription>
                                       Paste your GCP service account JSON key
                                       file contents
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </>
                     )}
                  </div>
               </Card>

               <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                     {isSubmitting ? (
                        <>
                           <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24">
                              <circle
                                 className="opacity-25"
                                 cx="12"
                                 cy="12"
                                 r="10"
                                 stroke="currentColor"
                                 strokeWidth="4"></circle>
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Connecting...
                        </>
                     ) : (
                        <>
                           <Cloud className="mr-2 h-4 w-4" />
                           Connect Cloud Provider
                        </>
                     )}
                  </Button>
               </div>
            </form>
         </Form>
      </div>
   );
}
