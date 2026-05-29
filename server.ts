import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client with fallback for missing key checks
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('⚠️ GEMINI_API_KEY environment variable is not defined. Bot responses will fallback to simulated help.');
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Endpoint for real-time chatbot that knows products and prices
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Falta el cuerpo "messages" o no es un arreglo válido.' });
    }

    // Read products data to ground the chatbot's knowledge
    let productsListText = 'No products catalog available';
    try {
      const productsPath = path.join(process.cwd(), 'src/data/products.json');
      if (fs.existsSync(productsPath)) {
        const rawData = fs.readFileSync(productsPath, 'utf8');
        const products = JSON.parse(rawData);
        productsListText = products.map((p: any) => {
          return `ID: ${p.id}
Nombre: ${p.name}
Categoría: ${p.category}
Plataforma: ${p.platform}
Tipo: ${p.type}
Precio: $${p.price} USD (Precio de Descuento/Regular: $${p.originalPrice || 'N/A'} USD)
Descripción: ${p.description}
Características/Beneficios: ${p.features ? p.features.join(', ') : ''}
`;
        }).join('\n---\n');
      }
    } catch (err) {
      console.error('[SERVER] Error reading products data inside chatbot endpoint:', err);
    }

    const systemInstruction = `Eres "FlorkBot 🤖", el asistente de soporte técnico y guía de compras oficial en tiempo real para la tienda MR STREAMING en Perú.
Tu personalidad es extremadamente entretenida, graciosa, ágil y carismática (al estilo de los memes del títere blanco "Flork of Cows"), pero eres completamente confiable, prolijo e inquebrantable a la hora de dar precios reales, características técnicas o guiar al usuario a agregar productos al carrito.

PAUTAS CORPORATIVAS Y DE CONVERSACIÓN:
1. Tu ÚNICA fuente de verdad para precios, características y planes es la lista de productos provista abajo. NO inventes plataformas ni precios que no estén listados.
2. Si te preguntan el precio de Netflix, Max, Crunchyroll, Disney+, Prime, Spotify, etc., indica el precio exacto listado y dales una reseña divertida explicando por qué es una excelente opción.
3. El pago a realizarse se hace de forma muy confiable mediante pasarela digital (por ejemplo, Yape, Plin o links seguros) al finalizar de armar el Pedido en el carrito.
4. Explícales que la entrega es instantánea y que ofrecemos garantía total (reemplazo o solución en menos de 24h ante cualquier eventualidad).
5. Usa respuestas con excelente spacing, negritas e iconos gamer/emoji para que sean muy dinámicas y de rápida lectura en el feed de chat.
6. Mantén tus respuestas condensadas para no abrumar (máximo 2 a 3 párrafos medianos por intervención).

INFORMACIÓN REAL DEL CATÁLOGO DE PRODUCTOS DE MR STREAMING:
${productsListText}`;

    const client = getGeminiClient();
    if (!client) {
      // Return a smart fallback reply if GEMINI_API_KEY is not configured yet
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let reply = '¡Hola! 🤖 Soy FlorkBot, tu consultor de streaming favorito. (Nota: La API Key de Gemini aún no está cargada en Configuración > Secretos, pero puedo responderte localmente).\n\n';
      if (lastUserMsg.includes('net') || lastUserMsg.includes('cuenta')) {
        reply += 'Tenemos cuentas completas de Netflix Premium desde $9.99 USD y perfiles privados con PIN desde $2.49 USD con Ultra HD 4K y garantía total ante caídas. ¡Agrégalos al carrito!';
      } else if (lastUserMsg.includes('precio') || lastUserMsg.includes('cuanto') || lastUserMsg.includes('costo')) {
        reply += 'Nuestros precios van desde los $1.49 USD por perfiles de Paramount+ y Prime, hasta $9.99 por cuentas completas de Netflix. ¡Variedad épica para tu bolsillo gamer!';
      } else {
        reply += '¿Buscas Netflix, Disney+, Max, o Spotify Premium? Ofrecemos la máxima estabilidad del mercado con soporte veloz vía WhatsApp. ¡Dime qué plataforma te interesa y te doy los detalles!';
      }
      return res.json({ reply });
    }

    // Prepare contents correctly for the SDK
    const formattedContents = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Ups, ¡mi cerebro de Flork se desconectó un segundo! 🧠 Reintenta tu pregunta por favor.';
    res.json({ reply });
  } catch (error: any) {
    console.error('[SERVER] Gemini API backend error:', error);
    res.status(500).json({ error: error?.message || 'Error del servidor conversando con Gemini' });
  }
});

// Vite middleware setup for assets and SPA routing
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MR STREAMING] Fullstack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
