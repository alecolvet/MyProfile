export interface QuoteResponse {
  id: number;
  quote: string;
  author: string;
}

export const fetchDailyQuote = async (): Promise<QuoteResponse> => {
  const response = await fetch('https://dummyjson.com/quotes/random');
  if (!response.ok) {
    throw new Error('Não foi possível carregar a frase motivacional.');
  }
  const data: QuoteResponse = await response.json();
  return data;
};