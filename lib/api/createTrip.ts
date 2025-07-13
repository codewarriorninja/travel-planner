export async function createTripApi(formData:FormData){
    const res = await fetch("/api/trips",{
        method:"POST",
        body:formData
    });

    if(!res.ok){
        const {message} = await res.json();
        throw new Error(message ?? "Failed to create trip")
    }
}