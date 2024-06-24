export async function studentLogin(student){
  return new Promise(async(resolve)=>{
      const response = await fetch("http://localhost:7711/login",{
          method:"POST",
          body:JSON.stringify(student),
          headers:{'content-type':'application/json'}
      })
      const data = await response.json()
      resolve({data}) 
  })
}

export async function getAllStudent() {
  try {
    const response = await fetch("http://localhost:7711/getStudent", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}
