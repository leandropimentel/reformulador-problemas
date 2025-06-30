export default async function handler(req, res) {
  const { problema } = req.body;

  const prompt = `Você é um analista de processos. Reformule o seguinte problema em uma frase clara e objetiva, destacando o que, onde, quando e impacto. Em seguida, liste 3 possíveis causas.

Problema: "${problema}"

Formato da resposta:
1. Problema reformulado:
2. Impacto identificado:
3. Possíveis causas:
- Causa 1
- Causa 2
- Causa 3`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await openaiRes.json();
    res.status(200).json({ resultado: data.choices[0].message.content });

  } catch (e) {
    res.status(500).json({ erro: 'Erro na chamada à OpenAI.' });
  }
}
