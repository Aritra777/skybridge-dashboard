"use client";
import CredentialEncryptionService from "@/lib/encrytion";

export const fetch_all_storage = async () => {
    try {
        const encryptedCred = JSON.parse(localStorage.getItem("encrypted_aws_creds")!) as EncryptionObj;
        const encryptionService = new CredentialEncryptionService();
        const credsAsString = await encryptionService.decrypt(encryptedCred!);
        const credentials = JSON.parse(credsAsString) as AWSCredentials;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND}/storage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                region: credentials.region,
            }),
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch storage data: ${res.statusText}`);
        }

        const data = await res.json();

        return data;
    } catch (e) {
        console.error("Error fetching all storage info:", e);
    }
};