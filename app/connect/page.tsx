/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { AlertCircle, Loader2 } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import CredentialEncryptionService from '@/lib/encrytion';
// import { useRouter } from 'next/navigation';

// const ConnectCloudAccountPage = () => {
//     const router = useRouter();
//     const [credentials, setCredentials] = useState({
//         accessKeyId: '',
//         secretAccessKey: '',
//         region: 'ap-southeast-2',
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const regions = [
//         'us-east-1',
//         'us-east-2',
//         'us-west-1',
//         'us-west-2',
//         'eu-west-1',
//         'eu-central-1',
//         'ap-southeast-1',
//         'ap-southeast-2',
//         'ap-northeast-1'
//     ];

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             if (!credentials.accessKeyId || !credentials.secretAccessKey) {
//                 throw new Error('Access Key ID and Secret Access Key are required');
//             }
//             const encryptionService = new CredentialEncryptionService();
//             const encryptedCreds = await encryptionService.encrypt(
//                 JSON.stringify(credentials)
//             );

//             // Store encrypted credentials securely
//             // In a real app, send to your backend
//             localStorage.setItem('encrypted_aws_creds', JSON.stringify(encryptedCreds));

//             // Initialize S3 service
//             // const s3Service = new S3BucketService(credentials);
//             // await s3Service.testConnection();
//             router.push('/s3');

//         } catch (error: any) {
//             setError(error.message || 'Failed to connect to AWS');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-6">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Connect AWS Account</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Access Key ID
//                             </label>
//                             <input
//                                 type="text"
//                                 className="w-full p-2 border rounded-md"
//                                 value={credentials.accessKeyId}
//                                 onChange={(e) =>
//                                     setCredentials({
//                                         ...credentials,
//                                         accessKeyId: e.target.value,
//                                     })
//                                 }
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Secret Access Key
//                             </label>
//                             <input
//                                 type="password"
//                                 className="w-full p-2 border rounded-md"
//                                 value={credentials.secretAccessKey}
//                                 onChange={(e) =>
//                                     setCredentials({
//                                         ...credentials,
//                                         secretAccessKey: e.target.value,
//                                     })
//                                 }
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Region
//                             </label>
//                             <select
//                                 className="w-full p-2 border rounded-md"
//                                 value={credentials.region}
//                                 onChange={(e) =>
//                                     setCredentials({
//                                         ...credentials,
//                                         region: e.target.value,
//                                     })
//                                 }
//                             >
//                                 {regions.map((region) => (
//                                     <option key={region} value={region}>
//                                         {region}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {error && (
//                             <Alert variant="destructive">
//                                 <AlertCircle className="h-4 w-4" />
//                                 <AlertDescription>{error}</AlertDescription>
//                             </Alert>
//                         )}

//                         <button
//                             type="submit"
//                             className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <span className="flex items-center justify-center">
//                                     <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                     Connecting...
//                                 </span>
//                             ) : (
//                                 'Connect Account'
//                             )}
//                         </button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default ConnectCloudAccountPage;
"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ConnectCloudForm } from "@/components/connect-cloud-form";
import Navbar from "@/components/nav-bar-component";
import { Button } from "@/components/ui/button";
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar";
import CredentialEncryptionService from "@/lib/encrytion";
import { Separator } from "@radix-ui/react-separator";
import { Bell, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const handleConnectCloud = () => {
   window.location.href = "/connect";
};
const handleDashboard = () => {
   window.location.href = "/dashboard";
};

export default function ConnectCloudAccount() {
   const router = useRouter();
   const handleSubmit = async (credentials: any) => {

      try {
         if (!credentials.accessKeyId || !credentials.secretAccessKey) {
            throw new Error('Access Key ID and Secret Access Key are required');
         }
         const encryptionService = new CredentialEncryptionService();
         const encryptedCreds = await encryptionService.encrypt(
            JSON.stringify(credentials)
         );

         // Store encrypted credentials securely
         // In a real app, send to your backend
         localStorage.setItem('encrypted_aws_creds', JSON.stringify(encryptedCreds));

         // Initialize S3 service
         // const s3Service = new S3BucketService(credentials);
         // await s3Service.testConnection();
         router.push('/dashboard');

      } catch (error: any) {
         throw new Error(error.message || 'Failed to connect to AWS');
      }
   };

   return (
      // <div className="min-h-screen bg-gray-50 flex flex-col">
      //    <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
      //       <Image
      //          src={"/image/SkyBridge.svg"}
      //          width={40}
      //          height={40}
      //          alt="Picture of the author"
      //       />
      //       <nav className="flex gap-4">
      //          <Button variant="ghost" className="font-semibold">
      //             SkyBridge
      //          </Button>
      //          <Button variant="ghost">Inventory</Button>
      //       </nav>
      //       <div className="ml-auto flex items-center gap-4">
      //          <Button variant="ghost" size="icon">
      //             <Bell className="h-4 w-4" />
      //          </Button>
      //          <Button variant="ghost" size="icon">
      //             <HelpCircle className="h-4 w-4" />
      //          </Button>
      //       </div>
      //    </header>
      // <main className="flex-1 container mx-auto px-4 py-8">
      //    <div className="max-w-3xl mx-auto">
      //       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      //          <div className="p-6">
      //             <ConnectCloudForm />
      //          </div>
      //       </div>
      //    </div>
      // </main>
      // </div>
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
               <div className="flex items-center gap-2 px-4 w-full">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  {/* Navbar component used  */}
                  <Navbar handleConnectCloud={handleConnectCloud} handleDashboard={handleDashboard} />
               </div>
            </header>
            {/* <Dashboardui /> */}

            <main className="flex-1 container mx-auto px-4 py-8">
               <div className="max-w-3xl mx-auto">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                     <div className="p-6">
                        <ConnectCloudForm onConnectAWSCloud={handleSubmit} />
                     </div>
                  </div>
               </div>
            </main>
         </SidebarInset>
      </SidebarProvider>
   );
}
