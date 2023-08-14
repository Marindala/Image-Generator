const btn = document.querySelector("#btn");
const img = document.querySelector("#img");
const input = document.querySelector("#input");



const OPENAI_API_KEY = "generar clave en https://platform.openai.com/apps ";

btn.addEventListener("click", async () => {
  if (input.value === "") {
    alert("Please enter a prompt!");
    return;
  }

  btn.disabled = true;

/*   const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createImage({
  prompt: "A cute baby sea otter",
  n: 2,
  size: "1024x1024",
}); */


  const res = await fetch("https://api.openai.com/v1/images/generations", {
    /* El error que estás viendo se refiere a un problema en tu código JavaScript que está intentando realizar una solicitud POST a la API de OpenAI para generar imágenes. El mensaje de error "Billing hard limit has been reached" indica que has alcanzado el límite de facturación establecido en la API de O */
    method: "POST",
    body: JSON.stringify({ /* convierte en string */
      prompt: input.value,
      n: 1,   /* solo 1 img */
      size: "1024x1024", 
    }),
    headers: {
      "Content-Type": "application/json", /* indica que el dato es un json */
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
  });
  const data = await res.json();
  console.log(data);

  input.value = "";

  img.src = data.data[0].url;
  btn.disabled = false;
   //img.src = "https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/erkxwhl1gd48xfhe2yld"
});