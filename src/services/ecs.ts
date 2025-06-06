import CredentialEncryptionService from "@/lib/encrytion";

export const fetch_ecs_clusters = async () => {
    try {
        const encryptedCred = JSON.parse(localStorage.getItem('encrypted_aws_creds')!) as EncryptionObj;
        const encryptionService = new CredentialEncryptionService();
        const credsAsString = await encryptionService.decrypt(encryptedCred!);
        const credentials = JSON.parse(credsAsString) as AWSCredentials;
        const res = await fetch("http://localhost:4000/api/ecs/clusters", {
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
};

export const fetch_ecs_services = async () => {
    try {
        const encryptedCred = JSON.parse(localStorage.getItem('encrypted_aws_creds')!) as EncryptionObj;
        const encryptionService = new CredentialEncryptionService();
        const credsAsString = await encryptionService.decrypt(encryptedCred!);
        const credentials = JSON.parse(credsAsString) as AWSCredentials;
        const res = await fetch("http://localhost:4000/api/ecs/services", {
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
};