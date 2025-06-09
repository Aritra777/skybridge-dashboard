
export const getRecommendation = async (user_requirement: any): Promise<any> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND}/recommendations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user_requirement),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
}