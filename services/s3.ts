import CredentialEncryptionService from "@/lib/encrytion";

export const fetch_buckets = async () => {
    try {
        const encryptedCred = JSON.parse(localStorage.getItem('encrypted_aws_creds')!) as EncryptionObj;
        const encryptionService = new CredentialEncryptionService();
        const credsAsString = await encryptionService.decrypt(encryptedCred!);
        const credentials = JSON.parse(credsAsString) as AWSCredentials;
        // const creds = localStorage.getItem('encrypted_aws_creds');
        // if (!creds) {
        //     throw new Error('AWS credentials not found in local storage');
        // }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND}/s3/buckets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                region: credentials.region,
            })
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
}